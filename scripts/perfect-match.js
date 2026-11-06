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
  const allDb = [...dbClass11, ...dbClass12];

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

  console.log(`Matched in Class 11: ${matched11.length}`);
  console.log(`Matched in Class 12: ${matched12.length}`);
  console.log(`Unmatched rows: ${unmatched.length}`);
  if (unmatched.length > 0) {
    console.log('Unmatched:', unmatched.map(u => `${u.name} (DOB: ${u.dob}, Father: ${u.father})`));
  }

  console.log('\nSample 5 Class 11 updates:');
  matched11.slice(0, 5).forEach(m => {
    console.log(`Roll ${m.dbS.roll} (${m.dbS.classId}) - ${m.dbS.name} | APAAR: ${m.row.apaarId} | PEN: ${m.row.penNumber}`);
  });

  console.log('\nClass 12 updates:');
  matched12.forEach(m => {
    console.log(`Roll ${m.dbS.roll} (${m.dbS.classId}) - ${m.dbS.name} | APAAR: ${m.row.apaarId} | PEN: ${m.row.penNumber}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
