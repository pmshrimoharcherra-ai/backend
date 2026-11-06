import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const rec = await mongoose.connection.db.collection('examrecords').findOne({});
  if (rec && rec.marks) {
    console.log('Sample exam mark record marks[0]:', rec.marks[0]);
  }
  await mongoose.disconnect();
}

run().catch(console.error);
