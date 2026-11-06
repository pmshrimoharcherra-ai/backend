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

  const rolls = ['124', '125', '126', '127', '135', '136', '137', '138', '139'];
  const res = await Student.find({ classId: 'class-11-arts', roll: { $in: rolls } }).sort({ roll: 1 });
  console.log('Students around rolls 124-139:');
  res.forEach(s => {
    console.log(`Roll ${s.roll}: ${s.name} | Gender: ${s.gender} | DOB: ${s.dob} | Aadhaar: ${s.aadhaar} | Subjs: [${s.subjects?.join(', ')}]`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
