import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Helper to sanitize / format student roll and ID
const formatRoll = (roll) => String(roll).trim().padStart(2, '0');

// GET /api/students - Retrieve students (with optional classId and search filters)
router.get('/', async (req, res) => {
  try {
    const { classId, search } = req.query;
    const filter = {};

    if (classId) {
      filter.classId = classId;
    }

    if (search && search.trim()) {
      const q = search.trim();
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { name: regex },
        { roll: regex },
        { studentId: regex },
        { enrollmentNo: regex },
        { guardian: regex },
        { father: regex },
        { mother: regex },
        { gender: regex },
        { aadhaar: regex },
        { penNumber: regex },
        { apaarId: regex },
        { dob: regex },
        { phone: regex },
        { caste: regex },
        { admissionNo: regex },
        { address: regex }
      ];
    }

    const students = await Student.find(filter).sort({ classId: 1, rollNumber: 1, roll: 1 });

    return res.json({
      success: true,
      count: students.length,
      students: students.map(s => s.toJSON())
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch students from database.',
      error: error.message
    });
  }
});

// GET /api/students/:id - Fetch single student by studentId or _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let student = await Student.findOne({ studentId: id });
    if (!student && id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.'
      });
    }

    return res.json({
      success: true,
      student: student.toJSON()
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student.',
      error: error.message
    });
  }
});

// POST /api/students - Create new student
router.post('/', async (req, res) => {
  try {
    const { name, classId, className, roll, guardian, father, mother, aadhaar, penNumber, apaarId, dob, phone, attendance, status, studentId, enrollmentNo, enrollmentYear, gender, caste, admissionDate, admissionNo, address } = req.body;

    if (!name || !classId || !roll) {
      return res.status(400).json({
        success: false,
        message: 'Name, classId, and roll number are required fields.'
      });
    }

    const formattedRoll = formatRoll(roll);
    const rollNum = parseInt(formattedRoll, 10) || 0;

    // Generate standard student ID if not explicitly provided
    let generatedId = studentId;
    if (!generatedId) {
      const classNumStr = classId.replace(/[^0-9]/g, '') || '00';
      generatedId = `PMS-26-${classNumStr.padStart(2, '0')}-${formattedRoll}`;
    }

    // Check if studentId already exists
    const existing = await Student.findOne({ studentId: generatedId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Student with ID ${generatedId} already exists in database.`
      });
    }

    const newStudent = new Student({
      studentId: generatedId,
      name: name.trim(),
      classId,
      className: className || `Class ${classId.replace('class-', '')}`,
      roll: formattedRoll,
      rollNumber: rollNum,
      gender: gender?.trim() || 'Boy',
      enrollmentNo: enrollmentNo?.trim() || '',
      enrollmentYear: enrollmentYear?.trim() || '2026',
      guardian: guardian?.trim() || (father ? father.trim() : ''),
      father: father?.trim() || '',
      mother: mother?.trim() || '',
      aadhaar: aadhaar?.trim() || '',
      caste: caste?.trim() || '',
      admissionDate: admissionDate?.trim() || '',
      admissionNo: admissionNo?.trim() || '',
      address: address?.trim() || '',
      penNumber: penNumber?.trim() || '',
      apaarId: apaarId?.trim() || '',
      dob: dob?.trim() || '',
      phone: phone?.trim() || '',
      attendance: attendance || '100%',
      status: status || 'Enrolled',
      monthlyAttendance: {}
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: 'Student successfully enrolled!',
      student: newStudent.toJSON()
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to enroll student.',
      error: error.message
    });
  }
});

// PUT /api/students/bulk-attendance - Bulk update attendance for class
router.put('/bulk-attendance', async (req, res) => {
  try {
    const { students: updatedList } = req.body;

    if (!Array.isArray(updatedList) || updatedList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No student attendance records provided for update.'
      });
    }

    const operations = updatedList.map((st) => {
      const query = st.studentId ? { studentId: st.studentId } : { studentId: st.id };
      const updateData = {};
      if (st.attendance !== undefined) updateData.attendance = st.attendance;
      if (st.monthlyAttendance) updateData.monthlyAttendance = st.monthlyAttendance;

      return {
        updateOne: {
          filter: query,
          update: { $set: updateData }
        }
      };
    });

    await Student.bulkWrite(operations);

    return res.json({
      success: true,
      message: `Updated attendance for ${updatedList.length} students successfully.`
    });
  } catch (error) {
    console.error('Error bulk updating attendance:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update bulk attendance.',
      error: error.message
    });
  }
});

// PUT /api/students/:id - Update student details or individual attendance
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roll, classId, className, guardian, father, mother, aadhaar, penNumber, apaarId, dob, phone, status, attendance, monthlyAttendance, enrollmentNo, enrollmentYear, gender, caste, admissionDate, admissionNo, address } = req.body;

    let student = await Student.findOne({ studentId: id });
    if (!student && id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found to update.'
      });
    }

    if (name !== undefined) student.name = name.trim();
    if (roll !== undefined) {
      student.roll = formatRoll(roll);
      student.rollNumber = parseInt(student.roll, 10) || 0;
    }
    if (gender !== undefined) student.gender = gender.trim();
    if (classId !== undefined) student.classId = classId;
    if (className !== undefined) student.className = className;
    if (guardian !== undefined) student.guardian = guardian.trim();
    if (father !== undefined) student.father = father.trim();
    if (mother !== undefined) student.mother = mother.trim();
    if (aadhaar !== undefined) student.aadhaar = aadhaar.trim();
    if (caste !== undefined) student.caste = caste.trim();
    if (admissionDate !== undefined) student.admissionDate = admissionDate.trim();
    if (admissionNo !== undefined) student.admissionNo = admissionNo.trim();
    if (address !== undefined) student.address = address.trim();
    if (penNumber !== undefined) student.penNumber = penNumber.trim();
    if (apaarId !== undefined) student.apaarId = apaarId.trim();
    if (dob !== undefined) student.dob = dob.trim();
    if (phone !== undefined) student.phone = phone.trim();
    if (status !== undefined) student.status = status;
    if (attendance !== undefined) student.attendance = attendance;
    if (monthlyAttendance !== undefined) student.monthlyAttendance = monthlyAttendance;
    if (enrollmentNo !== undefined) student.enrollmentNo = enrollmentNo.trim();
    if (enrollmentYear !== undefined) student.enrollmentYear = enrollmentYear.trim();

    await student.save();

    return res.json({
      success: true,
      message: 'Student record updated successfully.',
      student: student.toJSON()
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update student.',
      error: error.message
    });
  }
});

// DELETE /api/students/:id - Delete student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let result = await Student.findOneAndDelete({ studentId: id });
    if (!result && id.match(/^[0-9a-fA-F]{24}$/)) {
      result = await Student.findByIdAndDelete(id);
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    return res.json({
      success: true,
      message: `Student ${result.name} (${result.studentId}) removed successfully.`
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student.',
      error: error.message
    });
  }
});

export default router;
