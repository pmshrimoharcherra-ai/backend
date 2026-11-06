import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const records = await mongoose.connection.db.collection('examrecords').find({ classId: /11/i }).toArray();
  console.log(`Exam records for Class 11: ${records.length}`);
  records.forEach(r => {
    console.log(`- Term: ${r.examTerm} | Subject: ${r.subject} | Class: ${r.classId} | Marks entries: ${r.marks?.length}`);
  });
  await mongoose.disconnect();
}

run().catch(console.error);
