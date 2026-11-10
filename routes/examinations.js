import express from 'express';
import ExamRecord from '../models/ExamRecord.js';
import Student from '../models/Student.js';
import ReportCardMeta from '../models/ReportCardMeta.js';

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
      isLocked: req.body.isLocked !== undefined ? req.body.isLocked : true,
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

// GET /api/examinations/co-scholastic - Get Section B & Section C metadata for a class
router.get('/co-scholastic', async (req, res) => {
  try {
    const { classId, academicYear } = req.query;
    if (!classId) {
      return res.status(400).json({ success: false, message: 'classId is required.' });
    }

    const filter = { classId };
    if (academicYear) filter.academicYear = academicYear;

    const records = await ReportCardMeta.find(filter);
    return res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    console.error('Error fetching co-scholastic records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch co-scholastic records.',
      error: error.message
    });
  }
});

// POST /api/examinations/co-scholastic/save - Save or update Section B or Section C grades & remarks
router.post('/co-scholastic/save', async (req, res) => {
  try {
    const { classId, sectionType, items, teacherName, academicYear } = req.body;
    if (!classId || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'classId and items array are required.'
      });
    }

    const year = academicYear || '2025-2026';
    const operations = items.map((item) => {
      const updateData = {
        updatedBy: teacherName || 'Class Teacher',
        updatedAt: new Date()
      };

      if (sectionType === 'section_b') {
        if (item.workEducation !== undefined) updateData.workEducation = item.workEducation;
        if (item.artEducation !== undefined) updateData.artEducation = item.artEducation;
        if (item.healthPhysicalEducation !== undefined)
          updateData.healthPhysicalEducation = item.healthPhysicalEducation;
      } else if (sectionType === 'section_c') {
        if (item.discipline !== undefined) updateData.discipline = item.discipline;
        if (item.remarks !== undefined) updateData.remarks = item.remarks;
        if (item.result !== undefined) updateData.result = item.result;
      } else {
        // Full update
        if (item.workEducation !== undefined) updateData.workEducation = item.workEducation;
        if (item.artEducation !== undefined) updateData.artEducation = item.artEducation;
        if (item.healthPhysicalEducation !== undefined)
          updateData.healthPhysicalEducation = item.healthPhysicalEducation;
        if (item.discipline !== undefined) updateData.discipline = item.discipline;
        if (item.remarks !== undefined) updateData.remarks = item.remarks;
        if (item.result !== undefined) updateData.result = item.result;
        if (item.attendanceMarks !== undefined) updateData.attendanceMarks = item.attendanceMarks;
        if (item.notebookMarks !== undefined) updateData.notebookMarks = item.notebookMarks;
      }

      return {
        updateOne: {
          filter: { studentId: item.studentId, classId, academicYear: year },
          update: { $set: updateData },
          upsert: true
        }
      };
    });

    if (operations.length > 0) {
      await ReportCardMeta.bulkWrite(operations);
    }

    return res.json({
      success: true,
      message: `Successfully saved ${sectionType || 'evaluation'} data for ${items.length} students!`
    });
  } catch (error) {
    console.error('Error saving co-scholastic records:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save co-scholastic records.',
      error: error.message
    });
  }
});

// GET /api/examinations/annual-report - Full Consolidated Annual Marks Matrix for Class IX & XI
router.get('/annual-report', async (req, res) => {
  try {
    const { classId, academicYear } = req.query;
    if (!classId) {
      return res.status(400).json({ success: false, message: 'classId is required.' });
    }

    // 1. Fetch Students
    let queryClasses = [classId];
    if (classId === 'class-11') {
      queryClasses = ['class-11-arts', 'class-11-sci', 'class-11'];
    }
    const students = await Student.find({ classId: { $in: queryClasses } }).sort({
      rollNumber: 1,
      roll: 1
    });

    // 2. Fetch all Exam Records for these classes
    const examRecords = await ExamRecord.find({ classId: { $in: queryClasses } });

    // 3. Fetch Co-Scholastic metadata
    const metaFilter = { classId: { $in: queryClasses } };
    if (academicYear) metaFilter.academicYear = academicYear;
    const metaRecords = await ReportCardMeta.find(metaFilter);

    return res.json({
      success: true,
      classId,
      totalStudents: students.length,
      students: students.map((s) => s.toJSON()),
      examRecords,
      metaRecords
    });
  } catch (error) {
    console.error('Error generating annual report data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to compile annual report data.',
      error: error.message
    });
  }
});

export default router;
