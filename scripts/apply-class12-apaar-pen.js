import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Student from '../models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const content = fs.readFileSync('backend/scripts/match-apaar-pen.js', 'utf-8');
const tableStrMatch = content.match(/const rawTable = `([\s\S]*?)`;/);
const rawTable = tableStrMatch[1];

const cleanStr = (s) => (s || '').trim().replace(/\s+/g, ' ').toLowerCase();

const normalizeDOB = (dob) => {
  if (!dob) return '';
  const d = dob.trim().replace(/\//g, '-');
  const parts = d.split('-');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${day}-${month}-${year}`;
  }
  return d;
};

function toTitleCase(str) {
  if (!str) return '';
  return str.trim().toLowerCase().split(' ').map(w => {
    if (w === 'lt' || w === 'kr' || w === 'ch') {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

const manualOverrides = {
  'ARUP BISWAS': { roll: 108, classId: 'class-12-arts' },
  'AYANTAN BHOWMIK': { roll: 97, classId: 'class-12-arts' },
  'DEEP SAHA': { roll: 79, classId: 'class-12-arts' },
  'JAYASREE GOPE': { roll: 47, classId: 'class-12-arts' },
  'JUYEL BISWAS': { roll: 80, classId: 'class-12-arts' },
  'KRISHNADHAN BISWAS': { roll: 64, classId: 'class-12-arts' },
  'MANDIRA DEBNATH': { roll: 45, classId: 'class-12-arts' },
  'NAYAN NANDI': { roll: 40, classId: 'class-12-arts' },
  'NAYAN SANNYASI': { roll: 74, classId: 'class-12-arts' },
  'PRIYANKA BISWAS': { roll: 92, classId: 'class-12-arts' },
  'RIMA RANI DAS': { roll: 43, classId: 'class-12-arts' },
  'SAMARJIT CHOUDHURY': { roll: 26, classId: 'class-12-arts' },
  'SHRITIKA SUKLA DAS': { roll: 117, classId: 'class-12-arts' },
  'SONALI DAS': { roll: 14, classId: 'class-12-arts' },
  'SWARUPA DAS': { roll: 66, classId: 'class-12-arts' },
  'TRISHNA SARKAR': { roll: 9, classId: 'class-12-arts' }
};

async function applyUpdates() {
  await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  console.log('Connected to MongoDB Atlas:', DB_NAME);

  const dbStudents = await Student.find({ classId: { $in: ['class-12-arts', 'class-12-sci'] } }).sort({ classId: 1, rollNumber: 1 });
  console.log(`Loaded ${dbStudents.length} Class 12 students from DB.`);

  const tableRows = rawTable.trim().split('\n').map((line, idx) => {
    const parts = line.split('\t');
    return {
      idx: idx + 1,
      name: parts[0]?.trim(),
      dob: parts[1]?.trim(),
      phone: parts[2]?.trim(),
      mother: parts[3]?.trim(),
      father: parts[4]?.trim(),
      pen: parts[5]?.trim(),
      apaar: parts[6]?.trim()
    };
  });

  const matched = [];
  const matchedDbIds = new Set();

  for (const row of tableRows) {
    let targetStudent = null;

    if (manualOverrides[row.name]) {
      const mo = manualOverrides[row.name];
      targetStudent = dbStudents.find(s => s.classId === mo.classId && s.rollNumber === mo.roll);
    } else {
      const rName = cleanStr(row.name);
      const rDob = normalizeDOB(row.dob);
      const rFather = cleanStr(row.father);

      if (rName === 'mandira das' && rFather.includes('bidhan')) {
        targetStudent = dbStudents.find(s => s.classId === 'class-12-arts' && s.rollNumber === 38);
      } else if (rName === 'subhajit das' && rFather.includes('shital')) {
        targetStudent = dbStudents.find(s => s.classId === 'class-12-arts' && s.rollNumber === 33);
      } else if (rName === 'subhajit das' && rFather.includes('nirmal')) {
        targetStudent = dbStudents.find(s => s.classId === 'class-12-arts' && s.rollNumber === 57);
      } else {
        const candidates = dbStudents.filter(s => {
          const sName = cleanStr(s.name);
          return (sName === rName || sName.replace(/\s+/g, '') === rName.replace(/\s+/g, '')) && !matchedDbIds.has(s._id.toString());
        });

        if (candidates.length === 1) {
          targetStudent = candidates[0];
        } else if (candidates.length > 1) {
          targetStudent = candidates.find(c => {
            const cDob = normalizeDOB(c.dob);
            const cFather = cleanStr(c.father);
            return (cDob && cDob === rDob) || (cFather && (cFather.includes(rFather) || rFather.includes(cFather)));
          }) || candidates[0];
        }
      }
    }

    if (targetStudent) {
      if (matchedDbIds.has(targetStudent._id.toString())) {
        console.error(`COLLISION on ${targetStudent.classId} Roll ${targetStudent.rollNumber}! Aborting.`);
        process.exit(1);
      }
      matchedDbIds.add(targetStudent._id.toString());
      matched.push({ row, targetStudent });
    }
  }

  console.log(`Starting update for ${matched.length} students...`);

  let updatedCount = 0;
  for (const item of matched) {
    const { row, targetStudent } = item;
    const updateFields = {
      penNumber: row.pen,
      apaarId: row.apaar,
      dob: normalizeDOB(row.dob),
      father: toTitleCase(row.father),
      mother: toTitleCase(row.mother),
      guardian: toTitleCase(row.father)
    };

    // If phone is valid and not dummy '9999999999'
    if (row.phone && row.phone.trim().length >= 10 && row.phone.trim() !== '9999999999') {
      updateFields.phone = row.phone.trim();
    }

    await Student.updateOne({ _id: targetStudent._id }, { $set: updateFields });
    updatedCount++;
  }

  console.log(`Updated ${updatedCount} students successfully!`);

  // Verification step
  const postArts = await Student.find({ classId: 'class-12-arts' }).sort({ rollNumber: 1 }).lean();
  const postSci = await Student.find({ classId: 'class-12-sci' }).sort({ rollNumber: 1 }).lean();

  console.log('\n--- VERIFICATION RESULTS ---');
  console.log(`Class 12 Arts Count: ${postArts.length} (Expected: 135)`);
  console.log(`Class 12 Science Count: ${postSci.length} (Expected: 6)`);

  const artsWithPen = postArts.filter(s => s.penNumber && s.penNumber.length > 5);
  const artsWithApaar = postArts.filter(s => s.apaarId && s.apaarId !== 'Not Available');
  const sciWithPen = postSci.filter(s => s.penNumber && s.penNumber.length > 5);
  const sciWithApaar = postSci.filter(s => s.apaarId && s.apaarId !== 'Not Available');

  console.log(`Class 12 Arts with PEN Number: ${artsWithPen.length} / 135`);
  console.log(`Class 12 Arts with APAAR ID: ${artsWithApaar.length} / 135 (plus ${postArts.filter(s => s.apaarId === 'Not Available').length} marked 'Not Available')`);
  console.log(`Class 12 Science with PEN Number: ${sciWithPen.length} / 6`);
  console.log(`Class 12 Science with APAAR ID: ${sciWithApaar.length} / 6 (plus ${postSci.filter(s => s.apaarId === 'Not Available').length} marked 'Not Available')`);

  // Verify roll serial is unbroken
  const artsRolls = postArts.map(s => s.rollNumber);
  const unbrokenArts = artsRolls.every((r, idx) => r === idx + 1);
  console.log(`Arts Roll Serial 1..135 intact: ${unbrokenArts}`);

  const sciRolls = postSci.map(s => s.rollNumber);
  const unbrokenSci = sciRolls.every((r, idx) => r === idx + 1);
  console.log(`Science Roll Serial 1..6 intact: ${unbrokenSci}`);

  // Display Science Students
  console.log('\n--- Class 12 Science Students after update ---');
  for (const s of postSci) {
    console.log(`Roll ${s.rollNumber}: ${s.name} | PEN: ${s.penNumber || 'N/A'} | APAAR: ${s.apaarId || 'N/A'} | DOB: ${s.dob} | Father: ${s.father} | Mother: ${s.mother} | Phone: ${s.phone}`);
  }

  // Display sample Arts Students
  console.log('\n--- Sample Class 12 Arts Students after update ---');
  for (const s of postArts.slice(0, 5)) {
    console.log(`Roll ${s.rollNumber}: ${s.name} | PEN: ${s.penNumber || 'N/A'} | APAAR: ${s.apaarId || 'N/A'} | DOB: ${s.dob} | Father: ${s.father} | Mother: ${s.mother} | Phone: ${s.phone}`);
  }

  await mongoose.connection.close();
}

applyUpdates().catch(console.error);
