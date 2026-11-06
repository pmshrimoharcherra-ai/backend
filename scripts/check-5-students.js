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

  const rolls = ['12', '77', '94', '95', '97'];
  const res = await Student.find({ classId: 'class-11-arts', roll: { $in: rolls } }).sort({ roll: 1 });
  console.log('The 5 students with IT who are NOT in Sector 1 or Sector 2:');
  res.forEach(s => {
    console.log(`Roll ${s.roll}: ${s.name} | Gender: ${s.gender} | Aadhaar: ${s.aadhaar} | Sector: ${s.sector} | VocSector: ${s.vocationalSector} | Subjs: [${s.subjects?.join(', ')}]`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
