import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    slNo: {
      type: Number,
      required: true
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      default: 'Faculty Member'
    },
    subject: {
      type: String,
      default: 'General'
    },
    department: {
      type: String,
      default: 'Teaching Faculty'
    },
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'Active Faculty'
    },
    qualification: {
      type: String,
      default: 'B.Ed. / Post Graduate'
    },
    joiningYear: {
      type: String,
      default: '2020'
    },
    password: {
      type: String,
      default: ''
    },
    assignedClassId: {
      type: String,
      default: ''
    },
    assignedClassName: {
      type: String,
      default: ''
    },
    teachingAssignments: [
      {
        classId: { type: String, default: '' },
        className: { type: String, default: '' },
        subject: { type: String, default: '' }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Helper to compute default password: FirstName + Subject (e.g. JoydebPhysics)
export const computeTeacherPassword = (name, subject) => {
  if (!name) return '';
  const firstName = name.trim().split(/\s+/)[0];
  const capFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  let capSubject = 'General';
  if (subject) {
    // Remove symbols and multiple spaces, PascalCase each main word
    const words = subject
      .replace(/[^\w\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length > 0) {
      capSubject = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    }
  }

  return `${capFirstName}${capSubject}`;
};

export default mongoose.model('Teacher', teacherSchema);
