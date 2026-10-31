import mongoose from 'mongoose';

const studentMarkSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true },
    roll: { type: String, default: '' },
    name: { type: String, required: true },
    enrollmentNo: { type: String, default: '' },
    marks: { type: Number, default: 0 }
  },
  { _id: false }
);

const examRecordSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: true,
      index: true
    },
    className: {
      type: String,
      default: ''
    },
    examTerm: {
      type: String,
      required: true,
      index: true
    },
    subject: {
      type: String,
      required: true,
      index: true
    },
    maxMarks: {
      type: Number,
      default: 80
    },
    teacherId: {
      type: String,
      default: ''
    },
    teacherName: {
      type: String,
      default: 'Faculty Member'
    },
    academicYear: {
      type: String,
      default: '2026-2027'
    },
    isLocked: {
      type: Boolean,
      default: true
    },
    marks: [studentMarkSchema],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Unique compound index so each class, exam term, and subject has one authoritative record
examRecordSchema.index({ classId: 1, examTerm: 1, subject: 1 }, { unique: true });

const ExamRecord = mongoose.model('ExamRecord', examRecordSchema);

export default ExamRecord;
