import mongoose from 'mongoose';

async function run() {
  await mongoose.connect('mongodb+srv://schoolerp:Mohar2026@cluster0.wajxav6.mongodb.net/school_erp');
  const Student = mongoose.connection.collection('students');

  // Update Roll 65
  await Student.updateOne(
    { classId: 'class-10', roll: '65' },
    {
      $set: {
        registrationNo: '31202727953',
        registrationYear: '2025',
        enrollmentNo: '',
        enrollmentYear: '',
        updatedAt: new Date()
      }
    }
  );

  // Update Roll 66
  await Student.updateOne(
    { classId: 'class-10', roll: '66' },
    {
      $set: {
        registrationNo: '31202727927',
        registrationYear: '2025',
        enrollmentNo: '',
        enrollmentYear: '',
        updatedAt: new Date()
      }
    }
  );

  // Update Roll 77
  await Student.updateOne(
    { classId: 'class-10', roll: '77' },
    {
      $set: {
        registrationNo: '32202727936',
        registrationYear: '2025',
        enrollmentNo: '',
        enrollmentYear: '',
        updatedAt: new Date()
      }
    }
  );

  // General pass across all Class 9 and Class 10 to ensure ANY student with enrollmentNo moves it to registrationNo
  const c9c10 = await Student.find({ classId: { $in: ['class-9', 'class-10'] } }).toArray();
  for (const s of c9c10) {
    if (s.enrollmentNo && (!s.registrationNo || s.registrationNo.trim() === '')) {
      const isC10 = s.classId === 'class-10';
      const validReg = s.enrollmentNo !== 'Not found' ? s.enrollmentNo.trim() : '';
      await Student.updateOne(
        { _id: s._id },
        {
          $set: {
            registrationNo: validReg,
            registrationYear: s.registrationYear || (isC10 ? '2025' : '2026'),
            enrollmentNo: '',
            enrollmentYear: '',
            updatedAt: new Date()
          }
        }
      );
    }
  }

  // Verification
  const verify = await Student.find({
    classId: 'class-10',
    roll: { $in: ['65', '66', '77'] }
  }).sort({ roll: 1 }).toArray();

  console.log('Verified students:');
  for (const v of verify) {
    console.log({
      roll: v.roll,
      name: v.name,
      regNo: v.registrationNo,
      regYear: v.registrationYear,
      enrNo: v.enrollmentNo,
      enrYear: v.enrollmentYear
    });
  }

  await mongoose.disconnect();
}

run().catch(console.error);
