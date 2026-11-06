import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const f1 = await Student.find({ father: /ATHINDRA/i });
  console.log('Father Athindra:', f1.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  const f2 = await Student.find({ father: /SUSHIL/i });
  console.log('Father Sushil:', f2.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  // Check DOB 06/08/2009 and 29/12/2007
  const d1 = await Student.find({ dob: '06/08/2009' });
  console.log('DOB 06/08/2009:', d1.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  const d2 = await Student.find({ dob: { $in: ['29/12/2007', '29-12-2007'] } });
  console.log('DOB 29/12/2007:', d2.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  await mongoose.disconnect();
}

run().catch(console.error);
