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

  const allArts = await Student.find({ classId: 'class-11-arts' });
  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());

  const nonIT = allArts.filter(s => !(s.subjects || []).some(isIT));
  console.log(`Total Arts: ${allArts.length}`);
  console.log(`Arts with IT: ${allArts.length - nonIT.length}`);
  console.log(`Arts without IT: ${nonIT.length}`);
  console.log('Sample non-IT subjects:');
  nonIT.slice(0, 5).forEach(s => console.log(`Roll ${s.roll}: ${s.name} -> [${s.subjects.join(', ')}]`));

  await mongoose.disconnect();
}

run().catch(console.error);
