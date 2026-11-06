import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanDigits = (s) => (s || '').replace(/\D/g, '');

// Convert "ABHIJIT DAS" to "Abhijit Das", handling initials, etc.
function toTitleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const dbStudents = await Student.find({ classId: { $in: [/11/i, /12/i] } });
  console.log(`Total DB students in Class 11 & 12: ${dbStudents.length}`);

  const content = fs.readFileSync(path.resolve(__dirname, 'user_input_names.txt'), 'utf8');
  const lines = content.split('\n');
  const inputRows = [];
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 6 && parts[0] !== 'Student Name' && !parts[0].startsWith('<')) {
      inputRows.push({
        rawName: parts[0].trim(),
        titleName: toTitleCase(parts[0].trim()),
        dob: parts[1] ? parts[1].trim() : '',
        phone: parts[2] ? parts[2].trim() : '',
        mother: parts[3] ? parts[3].trim() : '',
        father: parts[4] ? parts[4].trim() : '',
        penNumber: parts[5] ? parts[5].trim() : '',
        apaarId: parts[6] ? parts[6].trim() : ''
      });
    }
  }

  console.log(`Input rows count: ${inputRows.length}`);

  const byPen = new Map();
  const byApaar = new Map();
  for (const s of dbStudents) {
    const p = cleanDigits(s.penNumber);
    if (p) byPen.set(p, s);
    const ap = cleanDigits(s.apaarId);
    if (ap) byApaar.set(ap, s);
  }

  const differences = [];
  const identical = [];
  const notFound = [];

  for (const row of inputRows) {
    const penClean = cleanDigits(row.penNumber);
    const apaarClean = cleanDigits(row.apaarId);

    let s = byPen.get(penClean);
    if (!s && apaarClean) {
      s = byApaar.get(apaarClean);
    }

    if (!s) {
      notFound.push(row);
      continue;
    }

    const currentDbName = s.name.trim();
    const correctNameTitle = row.titleName;
    const correctNameRaw = row.rawName;

    // Check if name differs (case-insensitive or exact)
    if (currentDbName.toLowerCase() !== correctNameTitle.toLowerCase()) {
      differences.push({
        student: s,
        currentDbName,
        correctNameTitle,
        correctNameRaw,
        pen: row.penNumber,
        apaar: row.apaarId
      });
    } else if (currentDbName !== correctNameTitle) {
      // Just casing difference
      differences.push({
        student: s,
        currentDbName,
        correctNameTitle,
        correctNameRaw,
        pen: row.penNumber,
        apaar: row.apaarId,
        casingOnly: true
      });
    } else {
      identical.push({ student: s, name: currentDbName });
    }
  }

  console.log(`\nIdentical names: ${identical.length}`);
  console.log(`Names with differences/spelling errors: ${differences.length}`);
  console.log(`Not found in DB: ${notFound.length} (${notFound.map(n => n.rawName).join(', ')})`);

  console.log('\n--- LIST OF NAME DIFFERENCES / SPELLING ERRORS ---');
  differences.forEach((d, idx) => {
    console.log(`${(idx + 1).toString().padStart(2)}. Roll ${d.student.roll.toString().padStart(3)} (${d.student.classId}): "${d.currentDbName}" -> "${d.correctNameTitle}" [PEN: ${d.pen}] ${d.casingOnly ? '(casing only)' : ''}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
