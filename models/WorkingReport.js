import mongoose from 'mongoose';

const leaveItemSchema = new mongoose.Schema(
  {
    leaveDays: { type: Number, default: 0 },
    leaveType: { type: String, default: 'Nil' }
  },
  { _id: false }
);

const staffEntrySchema = new mongoose.Schema(
  {
    teacherId: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    salutation: { type: String, default: 'Smt.' },
    pronoun: { type: String, default: 'He/She' },
    designation: { type: String, default: 'GT' },
    workingDays: { type: Number, default: 0 },
    daysPresent: { type: Number, default: 0 },
    leaveDays: { type: Number, default: 0 },
    leaveType: { type: String, default: 'Nil' },
    leaves: { type: [leaveItemSchema], default: [] }
  },
  { _id: false }
);

const workingReportSchema = new mongoose.Schema(
  {
    memoPrefix: {
      type: String,
      default: 'No. F.28(1)-HM/PM SHRI MHSS/2008 (V-1)/'
    },
    memoNumber: {
      type: String,
      default: ''
    },
    reportDate: {
      type: String,
      required: true
    },
    recipient: {
      type: String,
      default: ''
    },
    salutationHeader: {
      type: String,
      default: 'Sir,'
    },
    periodFrom: {
      type: String,
      required: true
    },
    periodTo: {
      type: String,
      required: true
    },
    staffEntries: {
      type: [staffEntrySchema],
      default: []
    },
    nbNote: {
      type: String,
      default: ''
    },
    createdBy: {
      type: String,
      default: 'Administrator'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('WorkingReport', workingReportSchema);
