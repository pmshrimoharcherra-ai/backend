import express from 'express';
import ExamRecord from '../models/ExamRecord.js';
import Student from '../models/Student.js';

const router = express.Router();

// GET /api/examinations - Retrieve marks records by classId, examTerm, and/or subject
router.get('/', async (req, res) => {
  try {
    const { classId, examTerm, subject } = req.query;
    const filter = {};

    if (classId) filter.classId = classId;
    if (examTerm) filter.examTerm = examTerm;
    if (subject) filter.subject = subject;

    const records = await ExamRecord.find(filter).sort({ subject: 1, updatedAt: -1 });

    return res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    console.error('Error fetching examination records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch examination records.',
      error: error.message
    });
  }
});

// POST /api/examinations/save - Save or update examination marks for a subject
router.post('/save', async (req, res) => {
  try {
    const {
      classId,
      className,
      examTerm,
      subject,
      maxMarks,
      teacherId,
      teacherName,
      marks,
      academicYear
    } = req.body;

    if (!classId || !examTerm || !subject) {
      return res.status(400).json({
        success: false,
        message: 'classId, examTerm, and subject are required fields.'
      });
    }

    const payload = {
      classId,
      className: className || '',
      examTerm,
      subject,
      maxMarks: Number(maxMarks) || (examTerm.includes('40') ? 40 : 80),
      teacherId: teacherId || '',
      teacherName: teacherName || 'Faculty Member',
      marks: Array.isArray(marks) ? marks : [],
      academicYear: academicYear || '2026-2027',
      submittedAt: new Date()
    };

    const updatedRecord = await ExamRecord.findOneAndUpdate(
      { classId, examTerm, subject },
      { $set: payload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({
      success: true,
      message: `Marks successfully saved for ${subject} (${examTerm})!`,
      record: updatedRecord
    });
  } catch (error) {
    console.error('Error saving examination record:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save examination marks.',
      error: error.message
    });
  }
});

// GET /api/examinations/class-summary - Get consolidated results for a class
router.get('/class-summary', async (req, res) => {
  try {
    const { classId, examTerm } = req.query;

    if (!classId) {
      return res.status(400).json({
        success: false,
        message: 'classId is required.'
      });
    }

    // 1. Fetch all students in this class
    const students = await Student.find({ classId }).sort({ rollNumber: 1, roll: 1 });

    // 2. Fetch all saved exam records for this class & term
    const filter = { classId };
    if (examTerm) filter.examTerm = examTerm;
    const records = await ExamRecord.find(filter);

    return res.json({
      success: true,
      classId,
      examTerm: examTerm || 'All Terms',
      totalStudents: students.length,
      students: students.map((s) => s.toJSON()),
      records
    });
  } catch (error) {
    console.error('Error fetching class exam summary:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch class examination summary.',
      error: error.message
    });
  }
});

export default router;
