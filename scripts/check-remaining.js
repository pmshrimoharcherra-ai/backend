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

  const c11 = await Student.find({ classId: /11/i }).sort({ classId: 1, rollNumber: 1 });
  const noApaar = c11.filter(s => !s.apaarId || s.apaarId.trim() === '' || s.apaarId === 'Not Available');
  console.log(`Class 11 students without APAAR (${noApaar.length}):`);
  noApaar.forEach(s => {
    console.log(`  Roll ${s.roll} (${s.classId}): ${s.name} | PEN: ${s.penNumber || 'EMPTY'} | APAAR: ${s.apaarId || 'EMPTY'}`);
  });

  const noPen = c11.filter(s => !s.penNumber || s.penNumber.trim() === '');
  console.log(`\nClass 11 students without PEN (${noPen.length}):`);
  noPen.forEach(s => {
    console.log(`  Roll ${s.roll} (${s.classId}): ${s.name} | PEN: ${s.penNumber || 'EMPTY'} | APAAR: ${s.apaarId || 'EMPTY'}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
