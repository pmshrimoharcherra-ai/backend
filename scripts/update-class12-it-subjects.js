import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const targetStudents = [
  { roll: 15, classId: 'class-12-arts', name: 'Bidyasree Das' },
  { roll: 20, classId: 'class-12-arts', name: 'Sumit Biswas' }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  console.log('Connecting to MongoDB and updating 6th subject IT/ITeS...');

  for (const t of targetStudents) {
    const student = await Student.findOne({ classId: t.classId, rollNumber: t.roll });
    if (!student) {
      console.error(`Student not found: ${t.name} (Roll: ${t.roll}, Class: ${t.classId})`);
      continue;
    }

    console.log(`\nBefore update for ${student.name} (Roll ${student.roll}):`);
    console.log('Current subjects:', student.subjects);

    let updatedSubjects = [...(student.subjects || [])];
    if (!updatedSubjects.includes('IT/ITeS')) {
      updatedSubjects.push('IT/ITeS');
    }

    const res = await Student.updateOne(
      { _id: student._id },
      { $set: { subjects: updatedSubjects } }
    );

    console.log(`Updated ${student.name}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
    const verifyDoc = await Student.findById(student._id);
    console.log('New subjects:', verifyDoc.subjects);
  }

  console.log('\nAll targeted Class 12 students successfully updated with IT/ITeS.');

  await mongoose.disconnect();
}

run().catch(console.error);
