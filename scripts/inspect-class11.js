import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const anamikas = await Student.find({ classId: /11/i, name: /Anamika/i });
  console.log('Anamikas in Class 11:');
  console.log(anamikas.map(s => ({
    roll: s.roll,
    name: s.name,
    classId: s.classId,
    dob: s.dob,
    aadhaar: s.aadhaar,
    subjects: s.subjects
  })));

  const parmitas = await Student.find({ classId: /11/i, name: /P[a]?rmita/i });
  console.log('\nP[a]rmitas in Class 11:');
  console.log(parmitas.map(s => ({
    roll: s.roll,
    name: s.name,
    classId: s.classId,
    dob: s.dob,
    aadhaar: s.aadhaar,
    subjects: s.subjects
  })));

  // Let's also check all students in class-11 with IT/ITeS
  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());
  const itStudents = await Student.find({ classId: /11/i });
  const withIT = itStudents.filter(s => (s.subjects || []).some(isIT));
  console.log(`\nTotal Class 11 with IT: ${withIT.length}`);

  await mongoose.disconnect();
}

run().catch(console.error);
