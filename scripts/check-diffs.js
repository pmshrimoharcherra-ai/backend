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

  let apaarUpdated = 0;
  let penUpdated = 0;
  let phoneUpdated = 0;
  let motherUpdated = 0;
  let fatherUpdated = 0;
  let dobUpdated = 0;

  const usedDbIds = new Set();
  const matched = [];

  for (const row of inputRows) {
    const penClean = cleanDigits(row.penNumber);
    const nClean = normalizeName(row.name);
    const fClean = normalizeName(row.father);
    const dob = row.dob;

    let dbS = null;
    if (row.name === 'RAJDEEP CHANDA') {
      dbS = dbClass11.find(s => s.classId === 'class-11-sci' && s.roll === '05');
    }
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && s.dob === dob && normalizeName(s.father) === fClean);
    }
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && s.dob === dob);
    }
    if (!dbS) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean && normalizeName(s.father) === fClean);
    }
    if (!dbS) {
      const candidates = dbClass11.filter(s => !usedDbIds.has(s._id.toString()) && normalizeName(s.name) === nClean);
      if (candidates.length === 1) dbS = candidates[0];
    }
    if (!dbS && penClean) {
      dbS = dbClass11.find(s => !usedDbIds.has(s._id.toString()) && cleanDigits(s.penNumber) === penClean);
    }
    if (!dbS) {
      dbS = dbClass11.find(s => {
        if (usedDbIds.has(s._id.toString())) return false;
        const sNorm = normalizeName(s.name);
        return s.dob === dob && (sNorm.includes(nClean) || nClean.includes(sNorm));
      });
    }

    if (dbS) {
      usedDbIds.add(dbS._id.toString());
      matched.push({ row, dbS });
      if (cleanDigits(dbS.apaarId) !== cleanDigits(row.apaarId)) apaarUpdated++;
      if (cleanDigits(dbS.penNumber) !== cleanDigits(row.penNumber)) penUpdated++;
      if (row.phone && (!dbS.phone || dbS.phone !== row.phone)) phoneUpdated++;
      if (row.mother && (!dbS.mother || normalizeName(dbS.mother) !== normalizeName(row.mother))) motherUpdated++;
      if (row.father && (!dbS.father || normalizeName(dbS.father) !== normalizeName(row.father))) fatherUpdated++;
      if (row.dob && (!dbS.dob || dbS.dob !== row.dob)) dobUpdated++;
    }
  }

  console.log(`Matched Class 11 students: ${matched.length}`);
  console.log(`APAAR IDs to update/change: ${apaarUpdated}`);
  console.log(`PEN Numbers to update/change: ${penUpdated}`);
  console.log(`Phone numbers to update: ${phoneUpdated}`);
  console.log(`Mother names to update: ${motherUpdated}`);
  console.log(`Father names to update: ${fatherUpdated}`);
  console.log(`DOBs to update: ${dobUpdated}`);

  await mongoose.disconnect();
}

run().catch(console.error);
