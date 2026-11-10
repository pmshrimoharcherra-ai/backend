import mongoose from 'mongoose';

const reportCardMetaSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      index: true
    },
    classId: {
      type: String,
      required: true,
      index: true
    },
    academicYear: {
      type: String,
      default: '2025-2026'
    },
    // Section B: Co-Scholastic Areas (A to E scale)
    workEducation: {
      type: String,
      default: 'B',
      enum: ['A', 'B', 'C', 'D', 'E', '']
    },
    artEducation: {
      type: String,
      default: 'B',
      enum: ['A', 'B', 'C', 'D', 'E', '']
    },
    healthPhysicalEducation: {
      type: String,
      default: 'C',
      enum: ['A', 'B', 'C', 'D', 'E', '']
    },
    // Section C: Discipline (A to E scale)
    discipline: {
      type: String,
      default: 'B',
      enum: ['A', 'B', 'C', 'D', 'E', '']
    },
    // Final Remarks & Status
    remarks: {
      type: String,
      default: 'v. good'
    },
    result: {
      type: String,
      default: 'Promoted'
    },
    // Internal 5-marks weights (preset to 5 by default)
    attendanceMarks: {
      type: Number,
      default: 5
    },
    notebookMarks: {
      type: Number,
      default: 5
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    updatedBy: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

reportCardMetaSchema.index({ studentId: 1, classId: 1, academicYear: 1 }, { unique: true });

const ReportCardMeta = mongoose.model('ReportCardMeta', reportCardMetaSchema);

export default ReportCardMeta;
