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
  console.log(`Class 11 DB total: ${dbStudents.length} (Arts: ${dbStudents.filter(s=>s.classId.includes('arts')).length}, Sci: ${dbStudents.filter(s=>s.classId.includes('sci')).length})`);

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

  console.log(`Input rows: ${inputRows.length}`);

  // Indexes on DB students
  const byPen = new Map();
  const byName = new Map();
  const byApaar = new Map();

  for (const s of dbStudents) {
    const p = cleanDigits(s.penNumber);
    if (p) byPen.set(p, s);
    const ap = cleanDigits(s.apaarId);
    if (ap) byApaar.set(ap, s);

    const n = normalizeName(s.name);
    if (!byName.has(n)) byName.set(n, []);
    byName.get(n).push(s);
  }

  const matches = [];
  const unmatched = [];
  const usedDbIds = new Set();

  for (let idx = 0; idx < inputRows.length; idx++) {
    const row = inputRows[idx];
    const penClean = cleanDigits(row.penNumber);
    const apaarClean = cleanDigits(row.apaarId);
    const nClean = normalizeName(row.name);

    let dbS = null;
    let matchReason = '';

    // 1. Try PEN
    if (penClean && byPen.has(penClean)) {
      dbS = byPen.get(penClean);
      matchReason = 'PEN';
    }

    // 2. Try APAAR
    if (!dbS && apaarClean && byApaar.has(apaarClean)) {
      dbS = byApaar.get(apaarClean);
      matchReason = 'APAAR';
    }

    // 3. Try Name + DOB
    if (!dbS && byName.has(nClean)) {
      const candidates = byName.get(nClean);
      if (candidates.length === 1) {
        dbS = candidates[0];
        matchReason = 'NAME_UNIQUE';
      } else {
        // match by DOB or father
        const dobMatch = candidates.find(c => c.dob === row.dob);
        if (dobMatch) {
          dbS = dobMatch;
          matchReason = 'NAME_AND_DOB';
        } else {
          const fatherMatch = candidates.find(c => normalizeName(c.father) === normalizeName(row.father));
          if (fatherMatch) {
            dbS = fatherMatch;
            matchReason = 'NAME_AND_FATHER';
          } else {
            // Pick first unused
            const unused = candidates.find(c => !usedDbIds.has(c._id.toString()));
            if (unused) {
              dbS = unused;
              matchReason = 'NAME_FIRST_UNUSED';
            }
          }
        }
      }
    }

    // 4. Fuzzy Name match (e.g. slight spelling differences)
    if (!dbS) {
      for (const s of dbStudents) {
        if (usedDbIds.has(s._id.toString())) continue;
        const sNorm = normalizeName(s.name);
        if (s.dob === row.dob && (sNorm.includes(nClean) || nClean.includes(sNorm))) {
          dbS = s;
          matchReason = 'DOB_AND_FUZZY_NAME';
          break;
        }
      }
    }

    if (dbS) {
      usedDbIds.add(dbS._id.toString());
      matches.push({ row, dbS, matchReason });
    } else {
      unmatched.push(row);
    }
  }

  console.log(`Matched: ${matches.length} / ${inputRows.length}`);
  console.log(`Unmatched: ${unmatched.length}`);
  if (unmatched.length > 0) {
    console.log('Unmatched rows:', unmatched);
  }

  // Check which DB students were NOT matched
  const notMatchedDb = dbStudents.filter(s => !usedDbIds.has(s._id.toString()));
  console.log(`DB students not matched from input (${notMatchedDb.length}):`);
  notMatchedDb.forEach(s => {
    console.log(`  Roll ${s.roll} (${s.classId}): ${s.name} | DOB: ${s.dob} | PEN: ${s.penNumber} | APAAR: ${s.apaarId} | Father: ${s.father}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
