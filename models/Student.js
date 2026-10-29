import mongoose from 'mongoose';

const monthlyRecordSchema = new mongoose.Schema({
  workingDays: { type: Number, default: 24 },
  presentDays: { type: Number, default: 22 },
  notes: { type: String, default: '' }
}, { _id: false });

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    roll: {
      type: String,
      required: true,
      trim: true
    },
    rollNumber: {
      type: Number,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    classId: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    className: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      enum: ['Boy', 'Girl', 'Other', ''],
      default: 'Boy',
      trim: true
    },
    guardian: {
      type: String,
      default: '',
      trim: true
    },
    father: {
      type: String,
      default: '',
      trim: true
    },
    mother: {
      type: String,
      default: '',
      trim: true
    },
    aadhaar: {
      type: String,
      default: '',
      trim: true
    },
    penNumber: {
      type: String,
      default: '',
      trim: true
    },
    apaarId: {
      type: String,
      default: '',
      trim: true
    },
    dob: {
      type: String,
      default: '',
      trim: true
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    attendance: {
      type: String,
      default: '95%'
    },
    monthlyAttendance: {
      type: Map,
      of: monthlyRecordSchema,
      default: {}
    },
    status: {
      type: String,
      enum: ['Enrolled', 'Leave', 'Transferred', 'Alumni', 'Failed'],
      default: 'Enrolled'
    },
    academicYear: {
      type: String,
      default: '2026-2027'
    },
    enrollmentNo: {
      type: String,
      default: '',
      trim: true
    },
    enrollmentYear: {
      type: String,
      default: '2026',
      trim: true
    },
    caste: {
      type: String,
      default: '',
      trim: true
    },
    admissionDate: {
      type: String,
      default: '',
      trim: true
    },
    admissionNo: {
      type: String,
      default: '',
      trim: true
    },
    address: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.studentId || ret._id.toString();
        // Convert monthlyAttendance Map to plain object if needed
        if (ret.monthlyAttendance instanceof Map) {
          ret.monthlyAttendance = Object.fromEntries(ret.monthlyAttendance);
        }
        return ret;
      }
    }
  }
);

// Pre-save hook to populate rollNumber as integer
studentSchema.pre('save', function (next) {
  if (this.roll) {
    this.rollNumber = parseInt(this.roll, 10) || 0;
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
