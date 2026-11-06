import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanDigits = (s) => (s || '').replace(/\D/g, '');
const normalizeName = (s) => (s || '').toLowerCase().replace(/[^a-z]/g, '');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const dbStudents = await Student.find({ classId: /11/i });
  const content = fs.readFileSync(path.resolve(__dirname, 'user_input_full.txt'), 'utf8');
  const lines = content.split('\n');
  const inputRows = [];
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 6 && parts[0] !== 'Student Name' && !parts[0].startsWith('<')) {
      inputRows.push({
        name: parts[0].trim(),
        dob: parts[1] ? parts[1].trim() : '',
        phone: parts[2] ? parts[2].trim() : '',
        mother: parts[3] ? parts[3].trim() : '',
        father: parts[4] ? parts[4].trim() : '',
        penNumber: parts[5] ? parts[5].trim() : '',
        apaarId: parts[6] ? parts[6].trim() : ''
      });
    }
  }

  // Exact map of matches
  const updates = [];
  const unmatched = [];
  const usedDbIds = new Set();

  for (const row of inputRows) {
    const penClean = cleanDigits(row.penNumber);
    const apaarClean = cleanDigits(row.apaarId);
    const nClean = normalizeName(row.name);

    let dbS = null;

    // Special alias
    if (row.name === 'RAJDEEP CHANDA') {
      dbS = dbStudents.find(s => s.classId === 'class-11-sci' && s.roll === '05');
    }

    // 1. By PEN
    if (!dbS && penClean) {
      dbS = dbStudents.find(s => !usedDbIds.has(s._id.toString()) && cleanDigits(s.penNumber) === penClean);
    }

    // 2. By APAAR
    if (!dbS && apaarClean) {
      dbS = dbStudents.find(s => !usedDbIds.has(s._id.toString()) && cleanDigits(s.apaarId) === apaarClean);
    }

    // 3. By Exact Name + DOB
    if (!dbS) {
      dbS = dbStudents.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && s.dob === row.dob);
    }

    // 4. By Exact Name + Father
    if (!dbS) {
      dbS = dbStudents.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && normalizeName(s.father) === normalizeName(row.father));
    }

    // 5. By Exact Name (if unique unused)
    if (!dbS) {
      const cands = dbStudents.filter(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean);
      if (cands.length === 1) {
        dbS = cands[0];
      }
    }

    // 6. Fuzzy Name + DOB
    if (!dbS) {
      dbS = dbStudents.find(s => {
        if (usedDbIds.has(s._id.toString())) return false;
        const sNorm = normalizeName(s.name);
        return s.dob === row.dob && (sNorm.includes(nClean) || nClean.includes(sNorm));
      });
    }

    if (dbS) {
      usedDbIds.add(dbS._id.toString());
      updates.push({
        student: dbS,
        row
      });
    } else {
      unmatched.push(row);
    }
  }

  console.log(`Matched Class 11 students: ${updates.length} / ${inputRows.length}`);
  console.log(`Unmatched rows count: ${unmatched.length}`);
  console.log('Unmatched rows:', unmatched.map(u => `${u.name} (DOB: ${u.dob}, Father: ${u.father})`));

  console.log(`\nClass 11 DB students not in this update list (${dbStudents.length - updates.length}):`);
  const notUpdated = dbStudents.filter(s => !usedDbIds.has(s._id.toString()));
  notUpdated.forEach(s => {
    console.log(`  Roll ${s.roll.toString().padStart(3)} (${s.classId}): ${s.name.padEnd(22)} | DOB: ${(s.dob || '').padEnd(10)} | PEN: ${(s.penNumber || '').padEnd(12)} | APAAR: ${(s.apaarId || '').padEnd(13)} | Father: ${s.father}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
