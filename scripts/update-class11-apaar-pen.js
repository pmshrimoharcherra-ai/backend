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

  const dbClass11 = await Student.find({ classId: /11/i });
  const dbClass12 = await Student.find({ classId: /12/i });

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

  const usedDbIds = new Set();
  const matched11 = [];
  const matched12 = [];
  const unmatched = [];

  for (const row of inputRows) {
    const penClean = cleanDigits(row.penNumber);
    const nClean = normalizeName(row.name);
    const fClean = normalizeName(row.father);
    const dob = row.dob;

    let dbS = null;

    // Special manual aliases:
    if (row.name === 'RAJDEEP CHANDA') {
      dbS = dbClass11.find(s => s.classId === 'class-11-sci' && s.roll === '05');
    }

    // Match priority 1: Name + DOB + Father match in Class 11
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && s.dob === dob && normalizeName(s.father) === fClean);
    }

    // Match priority 2: Name + DOB in Class 11
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && s.dob === dob);
    }

    // Match priority 3: Name + Father in Class 11
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && normalizeName(s.father) === fClean);
    }

    // Match priority 4: Unique Name in Class 11
    if (!dbS) {
      const candidates = dbClass11.filter(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean);
      if (candidates.length === 1) {
        dbS = candidates[0];
      }
    }

    // Match priority 5: PEN match in Class 11
    if (!dbS && penClean) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && cleanDigits(s.penNumber) === penClean);
    }

    // Match priority 6: Fuzzy Name + DOB in Class 11
    if (!dbS) {
      dbS = dbClass11.find(s => {
        if (usedDbIds.has(s._id.toString())) return false;
        const sNorm = normalizeName(s.name);
        return s.dob === dob && (sNorm.includes(nClean) || nClean.includes(sNorm));
      });
    }

    if (dbS) {
      usedDbIds.add(dbS._id.toString());
      matched11.push({ row, dbS });
      continue;
    }

    // If not in Class 11, check Class 12
    let dbS12 = dbClass12.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && normalizeName(s.father) === fClean);
    if (!dbS12 && penClean) {
      dbS12 = dbClass12.find(s => !usedDbIds.has(s._id.toString()) && cleanDigits(s.penNumber) === penClean);
    }
    if (!dbS12) {
      dbS12 = dbClass12.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean);
    }

    if (dbS12) {
      usedDbIds.add(dbS12._id.toString());
      matched12.push({ row, dbS: dbS12 });
    } else {
      unmatched.push(row);
    }
  }

  console.log(`\n=================== UPDATING CLASS 11 STUDENTS (${matched11.length}) ===================`);
  let count11Updated = 0;
  for (const item of matched11) {
    const s = item.dbS;
    const r = item.row;

    const updateFields = {
      apaarId: r.apaarId.trim(),
      penNumber: r.penNumber.trim()
    };
    if (r.phone && r.phone.trim()) updateFields.phone = r.phone.trim();
    if (r.mother && r.mother.trim()) updateFields.mother = r.mother.trim();
    if (r.father && r.father.trim()) updateFields.father = r.father.trim();
    if (r.dob && r.dob.trim()) updateFields.dob = r.dob.trim();

    await Student.updateOne({ _id: s._id }, { $set: updateFields });
    count11Updated++;
    console.log(`[UPDATED C11] Roll ${s.roll.toString().padStart(3)} (${s.classId}) - ${s.name} | APAAR: ${r.apaarId} | PEN: ${r.penNumber}`);
  }

  console.log(`\n=================== UPDATING CLASS 12 STUDENTS (${matched12.length}) ===================`);
  let count12Updated = 0;
  for (const item of matched12) {
    const s = item.dbS;
    const r = item.row;

    const updateFields = {
      apaarId: r.apaarId.trim(),
      penNumber: r.penNumber.trim()
    };
    if (r.phone && r.phone.trim()) updateFields.phone = r.phone.trim();
    if (r.mother && r.mother.trim()) updateFields.mother = r.mother.trim();
    if (r.father && r.father.trim()) updateFields.father = r.father.trim();
    if (r.dob && r.dob.trim()) updateFields.dob = r.dob.trim();

    await Student.updateOne({ _id: s._id }, { $set: updateFields });
    count12Updated++;
    console.log(`[UPDATED C12] Roll ${s.roll.toString().padStart(3)} (${s.classId}) - ${s.name} | APAAR: ${r.apaarId} | PEN: ${r.penNumber}`);
  }

  console.log(`\nTotal Class 11 students updated: ${count11Updated}`);
  console.log(`Total Class 12 students updated: ${count12Updated}`);
  console.log(`Unmatched input rows (${unmatched.length}):`);
  unmatched.forEach(u => console.log(`  ${u.name} | DOB: ${u.dob} | Father: ${u.father}`));

  // VERIFY POST-UPDATE STATUS FOR CLASS 11
  const updatedC11 = await Student.find({ classId: /11/i });
  const withApaar = updatedC11.filter(s => s.apaarId && s.apaarId.trim() !== '' && s.apaarId !== 'Not Available');
  const withPen = updatedC11.filter(s => s.penNumber && s.penNumber.trim() !== '');
  console.log(`\n--- POST-UPDATE CLASS 11 VERIFICATION ---`);
  console.log(`Total Class 11 students in DB: ${updatedC11.length}`);
  console.log(`Class 11 students with valid APAAR ID: ${withApaar.length} (${((withApaar.length / updatedC11.length)*100).toFixed(1)}%)`);
  console.log(`Class 11 students with valid PEN Number: ${withPen.length} (${((withPen.length / updatedC11.length)*100).toFixed(1)}%)`);

  await mongoose.disconnect();
}

run().catch(console.error);
