import express from 'express';
import WorkingReport from '../models/WorkingReport.js';

const router = express.Router();

// GET /api/working-reports - Fetch saved working reports
router.get('/', async (req, res) => {
  try {
    const reports = await WorkingReport.find().sort({ createdAt: -1 }).limit(100);
    return res.json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Error fetching working reports:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch working reports.',
      error: error.message
    });
  }
});

// POST /api/working-reports - Save a generated working report
router.post('/', async (req, res) => {
  try {
    const {
      memoPrefix,
      memoNumber,
      reportDate,
      recipient,
      salutationHeader,
      periodFrom,
      periodTo,
      staffEntries,
      nbNote,
      createdBy
    } = req.body;

    if (!reportDate || !periodFrom || !periodTo || !Array.isArray(staffEntries) || staffEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'reportDate, periodFrom, periodTo, and at least one staff entry are required.'
      });
    }

    const report = new WorkingReport({
      memoPrefix: memoPrefix || 'No. F.28(1)-HM/PM SHRI MHSS/2008 (V-1)/',
      memoNumber: memoNumber || '',
      reportDate,
      recipient: recipient || '',
      salutationHeader: salutationHeader || 'Sir,',
      periodFrom,
      periodTo,
      staffEntries,
      nbNote: nbNote || '',
      createdBy: createdBy || 'Administrator'
    });

    await report.save();

    return res.status(201).json({
      success: true,
      message: 'Working report saved successfully!',
      report
    });
  } catch (error) {
    console.error('Error saving working report:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save working report.',
      error: error.message
    });
  }
});

// DELETE /api/working-reports/:id - Delete a saved working report
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await WorkingReport.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Working report not found.'
      });
    }
    return res.json({
      success: true,
      message: 'Working report deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting working report:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete working report.',
      error: error.message
    });
  }
});

export default router;
