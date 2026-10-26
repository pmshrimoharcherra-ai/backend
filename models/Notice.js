import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true
    },
    noticeNo: {
      type: String,
      trim: true,
      default: () => `PMS/NOT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`
    },
    category: {
      type: String,
      enum: ['Academic', 'Examinations', 'Activities', 'Admissions', 'Scholarship', 'Holidays', 'General'],
      default: 'General'
    },
    audience: {
      type: String,
      default: 'All Students & Guardians'
    },
    publishDate: {
      type: String,
      default: () => {
        const d = new Date();
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    },
    pdfUrl: {
      type: String,
      required: [true, 'PDF file path or URL is required']
    },
    pdfFileName: {
      type: String,
      default: 'notice.pdf'
    },
    pdfFileSize: {
      type: String,
      default: 'PDF Document'
    },
    pinned: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Virtual for sorting by creation
noticeSchema.index({ pinned: -1, createdAt: -1 });

export default mongoose.model('Notice', noticeSchema);
