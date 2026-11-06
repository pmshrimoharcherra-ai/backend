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

  const res = await Student.find({ classId: 'class-12-arts', roll: { $in: ['124', '125', '126', '127', '128', '129', '130', '131'] } });
  console.log(res.map(s => ({ roll: s.roll, name: s.name, dob: s.dob, father: s.father })));

  await mongoose.disconnect();
}

run().catch(console.error);
