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
  const names = ['Mintu Biswas', 'Nandita Debnath', 'Biswajit Sarkar', 'Ankit Das', 'Ajit Sarkar', 'Angkita Barma', 'Manisha Sarkar'];
  for (const n of names) {
    const res = await Student.find({ name: new RegExp(n, 'i') });
    console.log(n, res.map(s => ({ roll: s.roll, classId: s.classId, name: s.name, dob: s.dob, father: s.father })));
  }
  await mongoose.disconnect();
}

run().catch(console.error);
