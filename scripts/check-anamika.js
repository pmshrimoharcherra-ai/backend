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

  // Surrounding students in Sector 2 around Anamika Das:
  // 28. Bipul Debnath (Roll 22)
  // 29. Anamika Biswas (Roll 23)
  // 30. Susmita Deb Nath (Roll 40)
  // 31. Anamika Das (?)
  // 32. Joydipa Ghosh (Roll 66)
  // 33. Jwel Debnath (Roll 71)

  // Surrounding students in Sector 1 around Anamika Das:
  // 27. Ruhan Das (Roll 07)
  // 28. Ankita Das (Roll 15)
  // 29. Reshmi Das (Roll 24)
  // 30. Anamika Das (?)
  // 31. Titash Majumdar (Roll 123)

  const s43 = await Student.findOne({ classId: 'class-11-arts', roll: '43' });
  const s59 = await Student.findOne({ classId: 'class-11-arts', roll: '59' });

  console.log('Roll 43:', s43.name, s43.roll, s43.dob, s43.aadhaar, s43.subjects);
  console.log('Roll 59:', s59.name, s59.roll, s59.dob, s59.aadhaar, s59.subjects);

  await mongoose.disconnect();
}

run().catch(console.error);
