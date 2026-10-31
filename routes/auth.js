import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Teacher, { computeTeacherPassword } from '../models/Teacher.js';
import Student, { computeStudentPassword, getClassRoman } from '../models/Student.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'pmshri_school_erp_secret_key_2026';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, email, password, role } = req.body;
    const rawIdentifier = (identifier || email || '').trim();

    if (!rawIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username/APAAR ID/Teacher ID/email and password.'
      });
    }

    // ── 1. STUDENT AUTHENTICATION ───────────────────────────────────────────
    if (role === 'student' || (!rawIdentifier.includes('@') && !rawIdentifier.toUpperCase().startsWith('TR') && !rawIdentifier.toUpperCase().startsWith('TP') && role !== 'admin' && role !== 'teacher')) {
      const cleanId = rawIdentifier.replace(/\s+/g, '');

      // Query student by APAAR ID (primary), PEN Number, Student ID, or Enrollment No
      const student = await Student.findOne({
        $or: [
          { apaarId: rawIdentifier },
          { apaarId: cleanId },
          { penNumber: rawIdentifier },
          { penNumber: cleanId },
          { studentId: rawIdentifier },
          { enrollmentNo: rawIdentifier }
        ]
      });

      if (!student) {
        return res.status(401).json({
          success: false,
          message: `Student record not found for APAAR ID "${rawIdentifier}". Please check your APAAR ID.`
        });
      }

      // Check password: Default format is FirstName + 2-digit Roll + ClassRoman (e.g. Kiran01IX)
      const expectedPassword = student.password || computeStudentPassword(student.name, student.roll, student.classId, student.className);
      let isMatch = false;

      // 1. Exact match
      if (password === expectedPassword) {
        isMatch = true;
      }
      // 2. Case-insensitive match (e.g. kiran01ix vs Kiran01IX)
      if (!isMatch && password.toLowerCase() === expectedPassword.toLowerCase()) {
        isMatch = true;
      }
      // 3. Fallback: Match with numeric class (e.g. Kiran019 or Kiran0110)
      if (!isMatch) {
        const firstName = student.name.trim().split(/\s+/)[0];
        const capFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const rollStr = String(student.roll || '1').trim().replace(/[^0-9]/g, '').padStart(2, '0');
        const numClass = (student.classId || '').replace(/[^0-9]/g, '');
        const altPass = `${capFirst}${rollStr}${numClass}`;
        if (password.toLowerCase() === altPass.toLowerCase()) {
          isMatch = true;
        }
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password. Password format is: First Name + 2-digit Roll + Class (e.g., Kiran01IX).'
        });
      }

      const token = jwt.sign(
        {
          id: student._id,
          studentId: student.studentId,
          name: student.name,
          roll: student.roll,
          classId: student.classId,
          className: student.className,
          apaarId: student.apaarId,
          role: 'student'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: `Welcome, ${student.name}! Student Login successful.`,
        token,
        user: {
          id: student._id,
          studentId: student.studentId,
          name: student.name,
          roll: student.roll,
          gender: student.gender,
          classId: student.classId,
          className: student.className,
          apaarId: student.apaarId,
          penNumber: student.penNumber,
          enrollmentNo: student.enrollmentNo,
          enrollmentYear: student.enrollmentYear,
          father: student.father,
          mother: student.mother,
          guardian: student.guardian,
          dob: student.dob,
          phone: student.phone,
          address: student.address,
          caste: student.caste,
          admissionNo: student.admissionNo,
          admissionDate: student.admissionDate,
          attendance: student.attendance,
          monthlyAttendance: student.monthlyAttendance,
          status: student.status,
          academicYear: student.academicYear || '2026-2027',
          role: 'student'
        }
      });
    }

    // ── 2. TEACHER AUTHENTICATION ──────────────────────────────────────────
    if (role === 'teacher' || (!rawIdentifier.includes('@') && (rawIdentifier.toUpperCase().startsWith('TR') || rawIdentifier.toUpperCase().startsWith('TP')))) {
      // Find teacher in Teacher collection by teacherId or email
      const teacher = await Teacher.findOne({
        $or: [
          { teacherId: rawIdentifier.toUpperCase() },
          { email: rawIdentifier.toLowerCase() }
        ]
      });

      // Also check if user exists in User collection
      const teacherUser = await User.findOne({
        $or: [
          { teacherId: rawIdentifier.toUpperCase() },
          { email: rawIdentifier.toLowerCase() }
        ]
      });

      if (!teacher && !teacherUser) {
        return res.status(401).json({
          success: false,
          message: `Teacher record not found for "${rawIdentifier}". Please check your Teacher ID.`
        });
      }

      // Determine valid password(s)
      const expectedPassword = teacher?.password || (teacher ? computeTeacherPassword(teacher.name, teacher.subject) : '');
      let isMatch = false;

      // 1. Exact match with stored teacher.password
      if (expectedPassword && password === expectedPassword) {
        isMatch = true;
      }
      // 2. Match with hashed user password if User record exists
      if (!isMatch && teacherUser) {
        isMatch = await teacherUser.comparePassword(password);
      }
      // 3. Fallback: Computed FirstName + Subject (case-insensitive check)
      if (!isMatch && teacher) {
        const computed = computeTeacherPassword(teacher.name, teacher.subject);
        if (password.toLowerCase() === computed.toLowerCase() || password === computed) {
          isMatch = true;
        }
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password. Please check your credentials.'
        });
      }

      const activeTeacher = teacher || teacherUser;
      const token = jwt.sign(
        {
          id: activeTeacher._id,
          teacherId: teacher?.teacherId || teacherUser?.teacherId || rawIdentifier.toUpperCase(),
          email: activeTeacher.email,
          role: 'teacher',
          name: activeTeacher.name
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: `Welcome, ${activeTeacher.name}! Login successful.`,
        token,
        user: {
          id: activeTeacher._id,
          teacherId: teacher?.teacherId || teacherUser?.teacherId || rawIdentifier.toUpperCase(),
          name: activeTeacher.name,
          email: activeTeacher.email,
          role: 'teacher',
          subject: teacher?.subject || '',
          assignedClassId: teacher?.assignedClassId || '',
          assignedClassName: teacher?.assignedClassName || '',
          teachingAssignments: teacher?.teachingAssignments || []
        }
      });
    }

    // ── 3. ADMIN / GENERAL USER AUTHENTICATION ─────────────────────────────
    const loginEmail = rawIdentifier.toLowerCase();
    const user = await User.findOne({ email: loginEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    // Role check (if role specified in request)
    if (role && user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: `Account is registered as "${user.role.toUpperCase()}", not "${role.toUpperCase()}". Please switch to the ${user.role.toUpperCase()} tab.`
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.'
    });
  }
});

// GET /api/auth/me (Verify session)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === 'student') {
      const student = await Student.findById(decoded.id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      return res.json({
        success: true,
        user: {
          id: student._id,
          studentId: student.studentId,
          name: student.name,
          roll: student.roll,
          gender: student.gender,
          classId: student.classId,
          className: student.className,
          apaarId: student.apaarId,
          penNumber: student.penNumber,
          enrollmentNo: student.enrollmentNo,
          enrollmentYear: student.enrollmentYear,
          father: student.father,
          mother: student.mother,
          guardian: student.guardian,
          dob: student.dob,
          phone: student.phone,
          address: student.address,
          caste: student.caste,
          admissionNo: student.admissionNo,
          admissionDate: student.admissionDate,
          attendance: student.attendance,
          monthlyAttendance: student.monthlyAttendance,
          status: student.status,
          academicYear: student.academicYear || '2026-2027',
          role: 'student'
        }
      });
    }

    if (decoded.role === 'teacher') {
      const teacher = (await Teacher.findById(decoded.id)) || (await User.findById(decoded.id));
      if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher record not found' });
      }
      return res.json({
        success: true,
        user: {
          id: teacher._id,
          teacherId: teacher.teacherId,
          name: teacher.name,
          email: teacher.email,
          role: 'teacher',
          subject: teacher.subject || '',
          assignedClassId: teacher.assignedClassId || '',
          assignedClassName: teacher.assignedClassName || '',
          teachingAssignments: teacher.teachingAssignments || []
        }
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

export default router;
