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
    },
    password: {
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

// Helper to convert class to Roman numeral string
export const getClassRoman = (classId = '', className = '') => {
  const str = `${classId} ${className}`.toLowerCase();
  if (str.includes('12') || str.includes('xii')) return 'XII';
  if (str.includes('11') || str.includes('xi')) return 'XI';
  if (str.includes('10') || str.includes('class x') || str.endsWith(' x') || str === 'x') return 'X';
  if (str.includes('9') || str.includes('ix')) return 'IX';
  if (str.includes('8') || str.includes('viii')) return 'VIII';
  if (str.includes('7') || str.includes('vii')) return 'VII';
  if (str.includes('6') || str.includes('vi')) return 'VI';
  if (str.includes('5') || str.includes('class v') || str.endsWith(' v') || str === 'v') return 'V';
  if (str.includes('4') || str.includes('iv')) return 'IV';
  if (str.includes('3') || str.includes('iii')) return 'III';
  if (str.includes('2') || str.includes('ii')) return 'II';
  if (str.includes('1') || str.includes('class i') || str.endsWith(' i') || str === 'i') return 'I';
  return 'X';
};

// Helper to compute default student password: FirstName + 2-digit Roll + ClassRoman (e.g. Kiran01IX)
export const computeStudentPassword = (name, roll, classId, className) => {
  if (!name) return '';
  const firstName = name.trim().split(/\s+/)[0];
  const capFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const rollStr = String(roll || '1').trim().replace(/[^0-9]/g, '').padStart(2, '0');
  const classRoman = getClassRoman(classId, className);
  return `${capFirstName}${rollStr}${classRoman}`;
};

export default Student;
