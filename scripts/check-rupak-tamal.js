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

  const rupaks = await Student.find({ classId: /11/i, name: /Rupak/i });
  console.log('Rupaks in Class 11:');
  rupaks.forEach(s => console.log(s.roll, s.classId, s.name, s.dob, s.father, s.penNumber, s.apaarId));

  const tamals = await Student.find({ classId: /11/i, name: /Tamal/i });
  console.log('\nTamals in Class 11:');
  tamals.forEach(s => console.log(s.roll, s.classId, s.name, s.dob, s.father, s.penNumber, s.apaarId));

  // Let's also check all students named Susmita
  const susmitas = await Student.find({ classId: /11/i, name: /Susmita/i });
  console.log('\nSusmitas in Class 11:');
  susmitas.forEach(s => console.log(s.roll, s.classId, s.name, s.dob, s.father, s.penNumber, s.apaarId));

  await mongoose.disconnect();
}

run().catch(console.error);
