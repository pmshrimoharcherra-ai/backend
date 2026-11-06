import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanAadhaar = (a) => (a || '').replace(/\D/g, '');
const normalizeName = (n) => (n || '').toLowerCase().replace(/[^a-z]/g, '');

import { readFileSync } from 'fs';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));
  const dbStudents = await Student.find({ classId: /11/i }).sort({ classId: 1, roll: 1 });

  const content = readFileSync(path.resolve(__dirname, 'match-class11-sectors.js'), 'utf8');
  const s1Match = content.match(/const sector1List = (\[[\s\S]*?\]);/);
  const s2Match = content.match(/const sector2List = (\[[\s\S]*?\]);/);
  const sector1List = eval(s1Match[1]);
  const sector2List = eval(s2Match[1]);

  console.log(`Class 11 total students in DB: ${dbStudents.length}`);

  // Let's print out all students who currently have IT in subjects
  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());
  const currentIT = dbStudents.filter(s => (s.subjects || []).some(isIT));
  console.log(`\nCurrent Class 11 students with IT in DB: ${currentIT.length}`);

  currentIT.forEach(s => {
    console.log(`[${s.classId}] Roll ${s.roll.toString().padStart(3)}: ${s.name.padEnd(22)} | Aadhaar: ${(s.aadhaar || '').padEnd(14)} | DOB: ${s.dob}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
