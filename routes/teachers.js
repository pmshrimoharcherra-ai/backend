import express from 'express';
import Teacher, { computeTeacherPassword } from '../models/Teacher.js';

const router = express.Router();

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ slNo: 1 });
    res.json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Server error fetching teachers', error: error.message });
  }
});

// GET single teacher by teacherId or _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let teacher = null;
    if (id.startsWith('TR') || id.startsWith('TP')) {
      teacher = await Teacher.findOne({ teacherId: id.toUpperCase() });
    } else {
      teacher = await Teacher.findById(id);
    }

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.json({ success: true, teacher });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ success: false, message: 'Error retrieving teacher record', error: error.message });
  }
});

// POST create teacher
router.post('/', async (req, res) => {
  try {
    const { slNo, teacherId, name, role, subject, department, phone, email, status, qualification, password, assignedClassId, assignedClassName } = req.body;

    if (!teacherId || !name) {
      return res.status(400).json({ success: false, message: 'Teacher ID and Name are required' });
    }

    const existing = await Teacher.findOne({ teacherId: teacherId.trim().toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: `Teacher with ID ${teacherId} already exists` });
    }

    const highestSl = await Teacher.findOne().sort({ slNo: -1 });
    const nextSl = slNo || (highestSl ? highestSl.slNo + 1 : 1);

    const generatedPassword = password || computeTeacherPassword(name.trim(), subject || 'General');

    const teacher = new Teacher({
      slNo: nextSl,
      teacherId: teacherId.trim().toUpperCase(),
      name: name.trim(),
      role: role || 'Faculty Member',
      subject: subject || 'General Subjects',
      department: department || 'Teaching Staff',
      phone: phone || '',
      email: email || '',
      status: status || 'Active Faculty',
      qualification: qualification || 'B.Ed. / Post Graduate',
      password: generatedPassword,
      assignedClassId: assignedClassId || '',
      assignedClassName: assignedClassName || '',
      teachingAssignments: req.body.teachingAssignments || []
    });

    await teacher.save();
    res.status(201).json({ success: true, message: 'Teacher added successfully', teacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ success: false, message: 'Server error creating teacher', error: error.message });
  }
});

// PUT update teacher
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.teacherId) {
      updateData.teacherId = updateData.teacherId.trim().toUpperCase();
    }

    let teacher = await Teacher.findById(id);
    if (!teacher) {
      teacher = await Teacher.findOne({ teacherId: id.toUpperCase() });
    }

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    // Auto-update password if name or subject changed and no explicit password was sent
    if (!updateData.password && (updateData.name || updateData.subject)) {
      updateData.password = computeTeacherPassword(
        updateData.name || teacher.name,
        updateData.subject || teacher.subject
      );
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(teacher._id, updateData, { new: true });

    res.json({ success: true, message: 'Teacher record updated successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ success: false, message: 'Server error updating teacher', error: error.message });
  }
});

// DELETE teacher
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      teacher = await Teacher.findOneAndDelete({ teacherId: id.toUpperCase() });
    }

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.json({ success: true, message: 'Teacher record deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ success: false, message: 'Server error deleting teacher', error: error.message });
  }
});

export default router;
