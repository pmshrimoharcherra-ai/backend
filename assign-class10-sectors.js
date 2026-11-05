import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const sector1Rolls = [
  1, 2, 3, 5, 8, 10, 13, 15, 17, 20,
  21, 22, 29, 31, 32, 34, 36, 40, 42, 48,
  51, 52, 54, 55, 57, 58, 59, 61, 63, 67,
  68, 70, 71, 73, 75, 77, 78, 80, 81
];

const sector2Rolls = [
  4, 6, 7, 9, 11, 12, 14, 16, 18, 19,
  23, 24, 25, 26, 27, 28, 30, 33, 35, 37,
  38, 39, 41, 43, 44, 45, 46, 47, 49, 50,
  53, 56, 62, 64, 65, 66, 69, 72, 74, 79
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
    console.log('Connected to MongoDB.');

    // Update Sector 1
    const res1 = await Student.updateMany(
      { classId: 'class-10', rollNumber: { $in: sector1Rolls } },
      { $set: { sector: 'Sector 1', vocationalSector: 'Sector 1' } }
    );
    console.log(`Sector 1 students updated: ${res1.modifiedCount} (Expected: ${sector1Rolls.length})`);

    // Update Sector 2
    const res2 = await Student.updateMany(
      { classId: 'class-10', rollNumber: { $in: sector2Rolls } },
      { $set: { sector: 'Sector 2', vocationalSector: 'Sector 2' } }
    );
    console.log(`Sector 2 students updated: ${res2.modifiedCount} (Expected: ${sector2Rolls.length})`);

    // Verify
    const s1Count = await Student.countDocuments({ classId: 'class-10', sector: 'Sector 1' });
    const s2Count = await Student.countDocuments({ classId: 'class-10', sector: 'Sector 2' });
    const noneCount = await Student.countDocuments({ classId: 'class-10', sector: { $nin: ['Sector 1', 'Sector 2'] } });

    console.log('--- Verification Summary ---');
    console.log(`Sector 1 count: ${s1Count}`);
    console.log(`Sector 2 count: ${s2Count}`);
    console.log(`Non-vocational count (Roll 60 & 76): ${noneCount}`);

    // Print sample of each sector
    const s1Sample = await Student.find({ classId: 'class-10', sector: 'Sector 1' }).limit(3);
    console.log('\nSector 1 sample:');
    s1Sample.forEach(s => console.log(`Roll #${s.roll}: ${s.name} [${s.sector}]`));

    const s2Sample = await Student.find({ classId: 'class-10', sector: 'Sector 2' }).limit(3);
    console.log('\nSector 2 sample:');
    s2Sample.forEach(s => console.log(`Roll #${s.roll}: ${s.name} [${s.sector}]`));

    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error assigning sectors:', err);
    process.exit(1);
  }
}

run();
