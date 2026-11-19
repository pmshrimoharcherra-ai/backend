import 'dotenv/config';
import mongoose from 'mongoose';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment or .env');
  }
  await mongoose.connect(uri);
  const Student = mongoose.connection.collection('students');

  const targets = ['Mandhira Debnath', 'Kishan Das'];
  const newSubjects = [
    'English',
    'Bengali',
    'History',
    'Education',
    'Political Science',
    'Philosophy',
    'IT/ITeS'
  ];

  for (const name of targets) {
    const res = await Student.updateOne(
      { classId: 'class-12-arts', name: name },
      {
        $set: {
          subjects: newSubjects,
          sector: 'Sector 1',
          vocationalSector: 'Sector 1',
          updatedAt: new Date()
        }
      }
    );
    console.log(`Updated ${name}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  }

  // Verify
  const verified = await Student.find({
    classId: 'class-12-arts',
    name: { $in: targets }
  }).toArray();

  for (const s of verified) {
    console.log('\nVerified student:', {
      roll: s.roll,
      name: s.name,
      classId: s.classId,
      sector: s.sector,
      vocationalSector: s.vocationalSector,
      registrationNo: s.registrationNo,
      enrollmentNo: s.enrollmentNo,
      subjectsCount: s.subjects?.length,
      subjects: s.subjects
    });
  }

  await mongoose.disconnect();
}

run().catch(console.error);
