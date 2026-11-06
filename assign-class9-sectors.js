import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const sector1Rolls = [
  3, 5, 6, 7, 9, 11, 12, 13, 14, 17,
  19, 20, 21, 22, 24, 26, 28, 29, 30, 31,
  32, 35, 36, 37, 38, 40, 43, 44, 45, 47,
  48, 49, 51, 52, 58, 59, 60, 62, 64, 67
];

const sector2Rolls = [
  2, 4, 8, 10, 15, 16, 18, 23, 27, 33,
  34, 41, 42, 46, 53, 54, 55, 57, 61, 65,
  66, 70, 72, 73, 74, 75, 77, 78, 80, 81,
  82, 84, 85, 88, 89, 90, 91, 92, 93, 95
];

const nonVocationalRolls = [
  1, 25, 39, 50, 56, 63, 68, 69, 71, 76,
  79, 83, 86, 87, 94
];

const vocSubjects = [
  'English',
  'Bengali',
  'Science',
  'Social Science',
  'Mathematics',
  'IT/ITeS'
];

const nonVocSubjects = [
  'English',
  'Bengali',
  'Science',
  'Social Science',
  'Mathematics'
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
    console.log('Connected to MongoDB.');

    // 1. Update Sector 1 students
    const res1 = await Student.updateMany(
      { classId: 'class-9', rollNumber: { $in: sector1Rolls } },
      {
        $set: {
          sector: 'Sector 1',
          vocationalSector: 'Sector 1',
          subjects: vocSubjects
        }
      }
    );
    console.log(`Sector 1 students updated: ${res1.modifiedCount} (Expected: ${sector1Rolls.length})`);

    // 2. Update Sector 2 students
    const res2 = await Student.updateMany(
      { classId: 'class-9', rollNumber: { $in: sector2Rolls } },
      {
        $set: {
          sector: 'Sector 2',
          vocationalSector: 'Sector 2',
          subjects: vocSubjects
        }
      }
    );
    console.log(`Sector 2 students updated: ${res2.modifiedCount} (Expected: ${sector2Rolls.length})`);

    // 3. Update Non-vocational students (remove IT/ITeS subject and clear sector)
    const res3 = await Student.updateMany(
      { classId: 'class-9', rollNumber: { $in: nonVocationalRolls } },
      {
        $set: {
          sector: '',
          vocationalSector: '',
          subjects: nonVocSubjects
        }
      }
    );
    console.log(`Non-vocational students updated: ${res3.modifiedCount} (Expected: ${nonVocationalRolls.length})`);

    // Verification
    const s1Count = await Student.countDocuments({ classId: 'class-9', sector: 'Sector 1' });
    const s2Count = await Student.countDocuments({ classId: 'class-9', sector: 'Sector 2' });
    const noneCount = await Student.countDocuments({
      classId: 'class-9',
      $or: [{ sector: '' }, { sector: null }, { sector: { $exists: false } }]
    });

    console.log('\n--- Class 9 Verification Summary ---');
    console.log(`Sector 1 count: ${s1Count}`);
    console.log(`Sector 2 count: ${s2Count}`);
    console.log(`Non-vocational count: ${noneCount}`);
    console.log(`Total Class 9: ${s1Count + s2Count + noneCount}`);

    // Print sample of each sector
    const s1Sample = await Student.find({ classId: 'class-9', sector: 'Sector 1' }).limit(3);
    console.log('\nSector 1 sample:');
    s1Sample.forEach(s => console.log(`Roll #${s.roll}: ${s.name} [${s.sector}] - Subjs: [${s.subjects.join(', ')}]`));

    const s2Sample = await Student.find({ classId: 'class-9', sector: 'Sector 2' }).limit(3);
    console.log('\nSector 2 sample:');
    s2Sample.forEach(s => console.log(`Roll #${s.roll}: ${s.name} [${s.sector}] - Subjs: [${s.subjects.join(', ')}]`));

    const nonVocSample = await Student.find({ classId: 'class-9', rollNumber: { $in: nonVocationalRolls } }).limit(3);
    console.log('\nNon-vocational sample:');
    nonVocSample.forEach(s => console.log(`Roll #${s.roll}: ${s.name} [Sector: "${s.sector}"] - Subjs: [${s.subjects.join(', ')}]`));

    await mongoose.disconnect();
    console.log('\nDisconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error assigning Class 9 sectors:', err);
    process.exit(1);
  }
}

run();
