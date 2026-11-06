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

  const c12 = await Student.find({ classId: 'class-12-arts' }).sort({ rollNumber: 1 });
  console.log(`Class 12 Arts total: ${c12.length}`);
  const higherRolls = c12.filter(s => (s.rollNumber || parseInt(s.roll)) >= 120);
  higherRolls.forEach(s => {
    console.log(`Roll ${s.roll}: ${s.name} | DOB: ${s.dob} | Father: ${s.father} | PEN: ${s.penNumber} | APAAR: ${s.apaarId}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
