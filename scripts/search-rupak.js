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

  const byPen = await Student.find({ penNumber: '22266823454' });
  console.log('By PEN 22266823454:', byPen.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  const byFather = await Student.find({ father: /Gourchan/i });
  console.log('By Father Gourchan:', byFather.map(s => `${s.roll} (${s.classId}) - ${s.name} | Father: ${s.father}`));

  const byName = await Student.find({ name: /Rupak/i });
  console.log('All Rupak across school:', byName.map(s => `${s.roll} (${s.classId}) - ${s.name} | DOB: ${s.dob} | Father: ${s.father}`));

  await mongoose.disconnect();
}

run().catch(console.error);
