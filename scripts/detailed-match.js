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

  // Read match-class11-sectors.js to get lists
  const content = readFileSync(path.resolve(__dirname, 'match-class11-sectors.js'), 'utf8');
  // Evaluate sector1List and sector2List
  const s1Match = content.match(/const sector1List = (\[[\s\S]*?\]);/);
  const s2Match = content.match(/const sector2List = (\[[\s\S]*?\]);/);
  const sector1List = eval(s1Match[1]);
  const sector2List = eval(s2Match[1]);

  const byAadhaar = new Map();
  const byName = new Map();
  for (const s of dbStudents) {
    const a = cleanAadhaar(s.aadhaar);
    if (a) byAadhaar.set(a, s);
    const n = normalizeName(s.name);
    if (!byName.has(n)) byName.set(n, []);
    byName.get(n).push(s);
  }

  const checkMatches = (list, title) => {
    console.log(`\n=================== ${title} (${list.length}) ===================`);
    list.forEach((item, idx) => {
      const aClean = cleanAadhaar(item.aadhaar);
      const nClean = normalizeName(item.name);
      let s = byAadhaar.get(aClean);
      let type = 'AADHAAR';
      if (!s) {
        const cands = byName.get(nClean) || [];
        s = cands[0];
        type = 'NAME';
      }
      if (s) {
        const nameMatch = normalizeName(s.name) === nClean ? 'EXACT_NAME' : `DIFF_NAME (${s.name})`;
        const aadhMatch = cleanAadhaar(s.aadhaar) === aClean ? 'EXACT_AADHAAR' : `DIFF_AADHAAR (${s.aadhaar})`;
        console.log(`${(idx+1).toString().padStart(2)}. [${type}] Input: "${item.name}" (Aadhaar: ${item.aadhaar}, DOB: ${item.dob}) -> Matched: Roll ${s.roll} "${s.name}" (${s.classId}) | DB Aadhaar: ${s.aadhaar} | DB DOB: ${s.dob} | ${nameMatch} | ${aadhMatch}`);
      } else {
        console.log(`${(idx+1).toString().padStart(2)}. [UNMATCHED] Input: "${item.name}" (Aadhaar: ${item.aadhaar}, DOB: ${item.dob})`);
      }
    });
  };

  checkMatches(sector1List, 'SECTOR 1');
  checkMatches(sector2List, 'SECTOR 2');

  await mongoose.disconnect();
}

run().catch(console.error);
