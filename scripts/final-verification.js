import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/Student.js';

dotenv.config({ path: './backend/.env' });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

async function finalVerify() {
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  const arts = await Student.find({ classId: 'class-12-arts' }).sort({ rollNumber: 1 }).lean();
  const sci = await Student.find({ classId: 'class-12-sci' }).sort({ rollNumber: 1 }).lean();

  console.log(`Class 12 Arts count: ${arts.length}`);
  console.log(`Class 12 Science count: ${sci.length}`);

  const artsWithPen = arts.filter(s => s.penNumber && s.penNumber.length > 5);
  const artsWithApaar = arts.filter(s => s.apaarId && s.apaarId !== 'Not Available');
  const sciWithPen = sci.filter(s => s.penNumber && s.penNumber.length > 5);
  const sciWithApaar = sci.filter(s => s.apaarId && s.apaarId !== 'Not Available');

  console.log(`Arts with PEN: ${artsWithPen.length} / 135`);
  console.log(`Arts with APAAR: ${artsWithApaar.length} / 135 (Not Available: ${arts.filter(s => s.apaarId === 'Not Available').length})`);
  console.log(`Sci with PEN: ${sciWithPen.length} / 6`);
  console.log(`Sci with APAAR: ${sciWithApaar.length} / 6 (Not Available: ${sci.filter(s => s.apaarId === 'Not Available').length})`);

  // Check the 20 corrected names in DB
  const checks = [
    { classId: 'class-12-arts', rollNumber: 9, name: 'Trishna Sarkar' },
    { classId: 'class-12-arts', rollNumber: 14, name: 'Sonali Das' },
    { classId: 'class-12-arts', rollNumber: 26, name: 'Samarjit Choudhury' },
    { classId: 'class-12-arts', rollNumber: 29, name: 'Anu Priya Debnath' },
    { classId: 'class-12-arts', rollNumber: 33, name: 'Subhajit Das' },
    { classId: 'class-12-arts', rollNumber: 38, name: 'Mandira Das' },
    { classId: 'class-12-arts', rollNumber: 40, name: 'Nayan Nandi' },
    { classId: 'class-12-arts', rollNumber: 43, name: 'Rima Rani Das' },
    { classId: 'class-12-arts', rollNumber: 45, name: 'Mandira Debnath' },
    { classId: 'class-12-arts', rollNumber: 47, name: 'Jayasree Gope' },
    { classId: 'class-12-arts', rollNumber: 64, name: 'Krishnadhan Biswas' },
    { classId: 'class-12-arts', rollNumber: 66, name: 'Swarupa Das' },
    { classId: 'class-12-arts', rollNumber: 74, name: 'Nayan Sannyasi' },
    { classId: 'class-12-arts', rollNumber: 79, name: 'Deep Saha' },
    { classId: 'class-12-arts', rollNumber: 80, name: 'Juyel Biswas' },
    { classId: 'class-12-arts', rollNumber: 92, name: 'Priyanka Biswas' },
    { classId: 'class-12-arts', rollNumber: 97, name: 'Ayantan Bhowmik' },
    { classId: 'class-12-arts', rollNumber: 105, name: 'Minakhi Nama' },
    { classId: 'class-12-arts', rollNumber: 108, name: 'Arup Biswas' },
    { classId: 'class-12-arts', rollNumber: 117, name: 'Shritika Sukla Das' }
  ];

  let allPassed = true;
  for (const c of checks) {
    const list = c.classId === 'class-12-arts' ? arts : sci;
    const found = list.find(s => s.rollNumber === c.rollNumber);
    if (!found || found.name !== c.name) {
      console.error(`Check failed for ${c.classId} Roll ${c.rollNumber}: expected ${c.name}, got ${found?.name}`);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('ALL 20 NAME CHECKS PASSED PERFECTLY!');
  }

  await mongoose.connection.close();
}

finalVerify();
