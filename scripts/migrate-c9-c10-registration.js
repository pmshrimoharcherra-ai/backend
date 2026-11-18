import mongoose from 'mongoose';

async function run() {
  await mongoose.connect('mongodb+srv://schoolerp:Mohar2026@cluster0.wajxav6.mongodb.net/school_erp');
  const Student = mongoose.connection.collection('students');

  const students = await Student.find({
    classId: { $in: ['class-9', 'class-10'] }
  }).toArray();

  console.log(`Found ${students.length} students in Class 9 & Class 10`);

  let c9Count = 0;
  let c10Count = 0;
  const bulkOps = [];

  for (const s of students) {
    const isC10 = s.classId === 'class-10';
    if (isC10) c10Count++;
    else c9Count++;

    const rawEnr = s.enrollmentNo || '';
    const validRegNo = (rawEnr && rawEnr !== 'Not found' && rawEnr.trim() !== '') ? rawEnr.trim() : (s.registrationNo || '');
    const regYear = s.registrationYear || (isC10 ? '2025' : '2026');

    bulkOps.push({
      updateOne: {
        filter: { _id: s._id },
        update: {
          $set: {
            registrationNo: validRegNo,
            registrationYear: regYear,
            enrollmentNo: '',
            enrollmentYear: '',
            updatedAt: new Date()
          }
        }
      }
    });
  }

  console.log(`Class 9 students to update: ${c9Count}`);
  console.log(`Class 10 students to update: ${c10Count}`);

  console.log(`Executing bulkWrite of ${bulkOps.length} updates...`);
  const res = await Student.bulkWrite(bulkOps);
  console.log('bulkWrite result:', {
    matchedCount: res.matchedCount,
    modifiedCount: res.modifiedCount
  });

  // Verification
  const sampleC9 = await Student.find({ classId: 'class-9' }).limit(3).toArray();
  const sampleC10 = await Student.find({ classId: 'class-10' }).limit(3).toArray();

  console.log('\nUpdated Class 9 Sample:');
  sampleC9.forEach(s => console.log({
    roll: s.roll,
    name: s.name,
    classId: s.classId,
    regNo: s.registrationNo,
    regYear: s.registrationYear,
    enrNo: s.enrollmentNo,
    enrYear: s.enrollmentYear
  }));

  console.log('\nUpdated Class 10 Sample:');
  sampleC10.forEach(s => console.log({
    roll: s.roll,
    name: s.name,
    classId: s.classId,
    regNo: s.registrationNo,
    regYear: s.registrationYear,
    enrNo: s.enrollmentNo,
    enrYear: s.enrollmentYear
  }));

  // Check screenshot student Abhijit Singha Roy (Roll #01, Class 10)
  const abhijit = await Student.findOne({ classId: 'class-10', roll: '01' });
  console.log('\nAbhijit Singha Roy (Screenshot student):', {
    roll: abhijit.roll,
    name: abhijit.name,
    classId: abhijit.classId,
    regNo: abhijit.registrationNo,
    regYear: abhijit.registrationYear,
    enrNo: abhijit.enrollmentNo,
    enrYear: abhijit.enrollmentYear
  });

  await mongoose.disconnect();
}

run().catch(console.error);
