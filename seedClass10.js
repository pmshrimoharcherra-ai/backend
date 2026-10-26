import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const rawClass10Data = [
  { roll: 1, name: 'Abhijit Sarkar', gender: 'Boy', enrollmentNo: '31202711001' },
  { roll: 2, name: 'Ankita Debnath', gender: 'Girl', enrollmentNo: '32202711002' },
  { roll: 3, name: 'Arindam Das', gender: 'Boy', enrollmentNo: '31202711003' },
  { roll: 4, name: 'Barnali Biswas', gender: 'Girl', enrollmentNo: '32202711004' },
  { roll: 5, name: 'Bishal Paul', gender: 'Boy', enrollmentNo: '31202711005' },
  { roll: 6, name: 'Chandrima Shil', gender: 'Girl', enrollmentNo: '32202711006' },
  { roll: 7, name: 'Debasish Nama', gender: 'Boy', enrollmentNo: '31202711007' },
  { roll: 8, name: 'Dipanwita Sarkar', gender: 'Girl', enrollmentNo: '32202711008' },
  { roll: 9, name: 'Gourab Deb', gender: 'Boy', enrollmentNo: '31202711009' },
  { roll: 10, name: 'Ishita Roy', gender: 'Girl', enrollmentNo: '32202711010' },
  { roll: 11, name: 'Koushik Debnath', gender: 'Boy', enrollmentNo: '31202711011' },
  { roll: 12, name: 'Madhumita Das', gender: 'Girl', enrollmentNo: '32202711012' },
  { roll: 13, name: 'Mousumi Biswas', gender: 'Girl', enrollmentNo: '32202711013' },
  { roll: 14, name: 'Niloy Sarkar', gender: 'Boy', enrollmentNo: '31202711014' },
  { roll: 15, name: 'Pallabi Debnath', gender: 'Girl', enrollmentNo: '32202711015' },
  { roll: 16, name: 'Partha Das', gender: 'Boy', enrollmentNo: '31202711016' },
  { roll: 17, name: 'Piyali Shil', gender: 'Girl', enrollmentNo: '32202711017' },
  { roll: 18, name: 'Pritam Ghosh', gender: 'Boy', enrollmentNo: '31202711018' },
  { roll: 19, name: 'Rahul Debnath', gender: 'Boy', enrollmentNo: '31202711019' },
  { roll: 20, name: 'Riya Sarkar', gender: 'Girl', enrollmentNo: '32202711020' },
  { roll: 21, name: 'Rohan Biswas', gender: 'Boy', enrollmentNo: '31202711021' },
  { roll: 22, name: 'Rupali Das', gender: 'Girl', enrollmentNo: '32202711022' },
  { roll: 23, name: 'Sandip Paul', gender: 'Boy', enrollmentNo: '31202711023' },
  { roll: 24, name: 'Sanghamitra Deb', gender: 'Girl', enrollmentNo: '32202711024' },
  { roll: 25, name: 'Santanu Debnath', gender: 'Boy', enrollmentNo: '31202711025' },
  { roll: 26, name: 'Sayantani Roy', gender: 'Girl', enrollmentNo: '32202711026' },
  { roll: 27, name: 'Shreya Biswas', gender: 'Girl', enrollmentNo: '32202711027' },
  { roll: 28, name: 'Subhadip Das', gender: 'Boy', enrollmentNo: '31202711028' },
  { roll: 29, name: 'Sujata Sarkar', gender: 'Girl', enrollmentNo: '32202711029' },
  { roll: 30, name: 'Surajit Debnath', gender: 'Boy', enrollmentNo: '31202711030' },
  { roll: 31, name: 'Sushmita Shil', gender: 'Girl', enrollmentNo: '32202711031' },
  { roll: 32, name: 'Tanmay Ghosh', gender: 'Boy', enrollmentNo: '31202711032' },
  { roll: 33, name: 'Tanusree Das', gender: 'Girl', enrollmentNo: '32202711033' },
  { roll: 34, name: 'Trisha Biswas', gender: 'Girl', enrollmentNo: '32202711034' },
  { roll: 35, name: 'Uddipta Sarkar', gender: 'Boy', enrollmentNo: '31202711035' },
  { roll: 36, name: 'Urmila Debnath', gender: 'Girl', enrollmentNo: '32202711036' },
  { roll: 37, name: 'Vivek Paul', gender: 'Boy', enrollmentNo: '31202711037' },
  { roll: 38, name: 'Anushree Das', gender: 'Girl', enrollmentNo: '32202711038' },
  { roll: 39, name: 'Joy Sarkar', gender: 'Boy', enrollmentNo: '31202711039' },
  { roll: 40, name: 'Puja Debnath', gender: 'Girl', enrollmentNo: '32202711040' }
];

async function seedClass10() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const existingCount = await Student.countDocuments({ classId: 'class-10' });
    if (existingCount > 0) {
      console.log(`Class X already has ${existingCount} students in DB.`);
      process.exit(0);
    }

    const students = rawClass10Data.map((st) => {
      const rollPadded = String(st.roll).padStart(2, '0');
      const studentId = `PMS-26-10-${rollPadded}`;
      const pct = 90 + Math.floor(Math.random() * 9); // 90% - 98%

      return {
        studentId,
        roll: rollPadded,
        rollNumber: st.roll,
        name: st.name,
        classId: 'class-10',
        className: 'Class X',
        gender: st.gender,
        enrollmentNo: st.enrollmentNo,
        enrollmentYear: '2025',
        guardian: '',
        phone: '',
        attendance: `${pct}%`,
        status: 'Enrolled',
        monthlyAttendance: {
          Jan: { workingDays: 24, presentDays: Math.round(24 * (pct / 100)), notes: '' },
          Feb: { workingDays: 22, presentDays: Math.round(22 * (pct / 100)), notes: '' },
          Mar: { workingDays: 25, presentDays: Math.round(25 * (pct / 100)), notes: '' },
          Apr: { workingDays: 23, presentDays: Math.round(23 * (pct / 100)), notes: '' }
        }
      };
    });

    await Student.insertMany(students);
    console.log(`Successfully seeded ${students.length} Class X students into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Class 10:', err);
    process.exit(1);
  }
}

seedClass10();
