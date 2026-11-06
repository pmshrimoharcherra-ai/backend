import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function verify() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const c11Arts = await Student.find({ classId: 'class-11-arts' });
  const c11Sci = await Student.find({ classId: 'class-11-sci' });

  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());

  const artsS1 = c11Arts.filter(s => s.sector === 'Sector 1');
  const artsS2 = c11Arts.filter(s => s.sector === 'Sector 2');
  const artsNoSec = c11Arts.filter(s => !s.sector);

  const sciS1 = c11Sci.filter(s => s.sector === 'Sector 1');
  const sciS2 = c11Sci.filter(s => s.sector === 'Sector 2');
  const sciNoSec = c11Sci.filter(s => !s.sector);

  console.log(`Class 11 Arts total: ${c11Arts.length}`);
  console.log(`  - Sector 1: ${artsS1.length}`);
  console.log(`  - Sector 2: ${artsS2.length}`);
  console.log(`  - General (No Sector): ${artsNoSec.length}`);

  console.log(`\nClass 11 Science total: ${c11Sci.length}`);
  console.log(`  - Sector 1: ${sciS1.length}`);
  console.log(`  - Sector 2: ${sciS2.length}`);
  console.log(`  - General (No Sector): ${sciNoSec.length}`);

  console.log(`\nTotal Sector 1: ${artsS1.length + sciS1.length}`);
  console.log(`Total Sector 2: ${artsS2.length + sciS2.length}`);
  console.log(`Total Vocational Class 11: ${artsS1.length + artsS2.length + sciS1.length + sciS2.length}`);

  const allIT = [...c11Arts, ...c11Sci].filter(s => (s.subjects || []).some(isIT));
  console.log(`Total with IT/ITeS in subjects array: ${allIT.length}`);

  // Also check cross-class totals:
  const allStudents = await Student.find({});
  const vocAll = allStudents.filter(s => (s.subjects || []).some(isIT) || s.sector === 'Sector 1' || s.sector === 'Sector 2');
  console.log(`\nGrand Total Vocational across entire school: ${vocAll.length}`);

  await mongoose.disconnect();
}

verify().catch(console.error);
