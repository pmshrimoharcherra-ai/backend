import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Teacher from './models/Teacher.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

export const OFFICIAL_TEACHERS = [
  { 
    slNo: 1, 
    teacherId: 'TR45208338', 
    name: 'Joydeb Debnath', 
    role: 'PGT Senior Faculty', 
    subject: 'Mathematics & Physical Science', 
    department: 'Science & Mathematics', 
    email: 'joydeb.debnath@pmshri.ac.in', 
    phone: '+91 94361 00201',
    status: 'Active Faculty',
    qualification: 'M.Sc. (Mathematics), B.Ed.'
  },
  { 
    slNo: 2, 
    teacherId: 'TP00693724', 
    name: 'Riti Debbarma', 
    role: 'TGT Faculty', 
    subject: 'Kokborok & Regional Languages', 
    department: 'Languages & Regional Culture', 
    email: 'riti.debbarma@pmshri.ac.in', 
    phone: '+91 94361 00202',
    status: 'Active Faculty',
    qualification: 'M.A., B.Ed.'
  },
  { 
    slNo: 3, 
    teacherId: 'TP12999252', 
    name: 'Gita Das', 
    role: 'Senior Faculty', 
    subject: 'Life Science & Biology', 
    department: 'Natural Sciences', 
    email: 'gita.das@pmshri.ac.in', 
    phone: '+91 94361 00203',
    status: 'Active Faculty',
    qualification: 'M.Sc. (Botany), B.Ed.'
  },
  { 
    slNo: 4, 
    teacherId: 'TP40548371', 
    name: 'Rakhi Rudra Paul', 
    role: 'TGT Faculty', 
    subject: 'Bengali Literature & Language', 
    department: 'Languages', 
    email: 'rakhi.rp@pmshri.ac.in', 
    phone: '+91 94361 00204',
    status: 'Active Faculty',
    qualification: 'M.A. (Bengali), B.Ed.'
  },
  { 
    slNo: 5, 
    teacherId: 'TP41073978', 
    name: 'Soma Sarkar', 
    role: 'Faculty Member', 
    subject: 'English & Humanities', 
    department: 'Languages & Humanities', 
    email: 'soma.sarkar@pmshri.ac.in', 
    phone: '+91 94361 00205',
    status: 'Active Faculty',
    qualification: 'M.A. (English), B.Ed.'
  },
  { 
    slNo: 6, 
    teacherId: 'TP41160956', 
    name: 'Joly Majumder', 
    role: 'Faculty Member', 
    subject: 'Mathematics', 
    department: 'Mathematics', 
    email: 'joly.majumder@pmshri.ac.in', 
    phone: '+91 94361 00206',
    status: 'Active Faculty',
    qualification: 'B.Sc. (Hons), B.Ed.'
  },
  { 
    slNo: 7, 
    teacherId: 'TP69529790', 
    name: 'Subarna Sarkar', 
    role: 'Faculty Member', 
    subject: 'Social Studies & History', 
    department: 'Social Sciences', 
    email: 'subarna.sarkar@pmshri.ac.in', 
    phone: '+91 94361 00207',
    status: 'Active Faculty',
    qualification: 'M.A. (History), B.Ed.'
  },
  { 
    slNo: 8, 
    teacherId: 'TR02672728', 
    name: 'Rajib Sarkar', 
    role: 'Senior Faculty', 
    subject: 'Chemistry & Science Lab', 
    department: 'Sciences', 
    email: 'rajib.sarkar@pmshri.ac.in', 
    phone: '+91 94361 00208',
    status: 'Active Faculty',
    qualification: 'M.Sc. (Chemistry), B.Ed.'
  },
  { 
    slNo: 9, 
    teacherId: 'TR05821328', 
    name: 'Minakshi Sarkar', 
    role: 'Faculty Member', 
    subject: 'Geography & Environmental Studies', 
    department: 'Social Sciences & Eco Club', 
    email: 'minakshi.sarkar@pmshri.ac.in', 
    phone: '+91 94361 00209',
    status: 'Active Faculty',
    qualification: 'M.A. (Geography), B.Ed.'
  },
  { 
    slNo: 10, 
    teacherId: 'TR49491164', 
    name: 'Rupa Das', 
    role: 'Teacher-In-Charge / H.M.', 
    subject: 'School Administration & Social Science', 
    department: 'School Administration', 
    email: 'rupa.das@pmshri.ac.in', 
    phone: '+91 94361 00111',
    status: 'Active Faculty',
    qualification: 'M.A., B.Ed., Educational Admin'
  },
  { 
    slNo: 11, 
    teacherId: 'TP22856391', 
    name: 'Sanjit Banik', 
    role: 'Faculty Member', 
    subject: 'Commerce & Accountancy', 
    department: 'Commerce Wing', 
    email: 'sanjit.banik@pmshri.ac.in', 
    phone: '+91 94361 00211',
    status: 'Active Faculty',
    qualification: 'M.Com, B.Ed.'
  },
  { 
    slNo: 12, 
    teacherId: 'TR02672782', 
    name: 'Mamata Biswas', 
    role: 'Faculty Member', 
    subject: 'Bengali & Cultural In-Charge', 
    department: 'Languages & Performing Arts', 
    email: 'mamata.biswas@pmshri.ac.in', 
    phone: '+91 94361 00212',
    status: 'Active Faculty',
    qualification: 'M.A. (Bengali), B.Ed.'
  },
  { 
    slNo: 13, 
    teacherId: 'TR76404582', 
    name: 'Sujit Debnath', 
    role: 'Physical Education Teacher (PET)', 
    subject: 'Physical Education, Yoga & Sports', 
    department: 'Sports & Wellness', 
    email: 'sujit.debnath@pmshri.ac.in', 
    phone: '+91 94361 00213',
    status: 'Active Faculty',
    qualification: 'B.P.Ed., NIS Certified'
  },
  { 
    slNo: 14, 
    teacherId: 'TP43381101', 
    name: 'Debamoy Chakraborty', 
    role: 'PGT', 
    subject: 'Chemistry', 
    department: 'Science & Chemistry', 
    email: 'debacha008@gmail.com', 
    phone: '+91 9436501316',
    status: 'Active Faculty',
    qualification: 'M.Sc. (Chemistry), B.Ed.'
  },
  { 
    slNo: 15, 
    teacherId: 'TP13217757', 
    name: 'Rama Debbarma', 
    role: 'Faculty Member', 
    subject: 'Kokborok & Tribal Heritage', 
    department: 'Languages & Cultural Wing', 
    email: 'rama.debbarma@pmshri.ac.in', 
    phone: '+91 94361 00215',
    status: 'Active Faculty',
    qualification: 'B.A., B.Ed.'
  },
  { 
    slNo: 16, 
    teacherId: 'TR65553969', 
    name: 'Anirban Sil', 
    role: 'ICT Coordinator / Computer Faculty', 
    subject: 'Computer Science & AI', 
    department: 'ICT & Smart Classroom', 
    email: 'anirban.sil@pmshri.ac.in', 
    phone: '+91 94361 00216',
    status: 'Active Faculty',
    qualification: 'MCA, B.Sc. (IT)'
  },
  { 
    slNo: 17, 
    teacherId: 'TR94841403', 
    name: 'Sangita Das', 
    role: 'Faculty Member', 
    subject: 'Fine Arts, Craft & SUPW', 
    department: 'Art & Creative Education', 
    email: 'sangita.das@pmshri.ac.in', 
    phone: '+91 94361 00217',
    status: 'Active Faculty',
    qualification: 'B.F.A., Diploma in Art'
  },
  { 
    slNo: 18, 
    teacherId: 'TR95081566', 
    name: 'Krishna Kamal Debnath', 
    role: 'PGT Faculty', 
    subject: 'Physics & STEM Coordinator', 
    department: 'Science Wing', 
    email: 'krishnakamal.d@pmshri.ac.in', 
    phone: '+91 94361 00218',
    status: 'Active Faculty',
    qualification: 'M.Sc. (Physics), B.Ed.'
  },
  { 
    slNo: 19, 
    teacherId: 'TR96957895', 
    name: 'Ranjit Sarkar', 
    role: 'Faculty Member', 
    subject: 'General Science & Eco Club', 
    department: 'Vocational & Applied Sciences', 
    email: 'ranjit.sarkar@pmshri.ac.in', 
    phone: '+91 94361 00219',
    status: 'Active Faculty',
    qualification: 'B.Sc., B.Ed.'
  }
];

const seedTeachers = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    console.log('Clearing existing teachers data...');
    await Teacher.deleteMany({});

    console.log(`Inserting ${OFFICIAL_TEACHERS.length} official school teachers...`);
    const inserted = await Teacher.insertMany(OFFICIAL_TEACHERS);
    console.log(` Successfully seeded ${inserted.length} teachers into MongoDB!`);

    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
  } catch (err) {
    console.error(' Seeding failed:', err);
    process.exit(1);
  }
};

seedTeachers();
