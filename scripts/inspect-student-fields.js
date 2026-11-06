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

  const sampleArts = await Student.findOne({ classId: 'class-11-arts' });
  console.log('Sample Arts student keys & values:');
  console.log(sampleArts.toObject());

  const sampleSci = await Student.findOne({ classId: 'class-11-sci' });
  console.log('\nSample Sci student keys & values:');
  console.log(sampleSci.toObject());

  // Also check existing apaar / pen / apaarId / penNumber fields across class 11
  const c11 = await Student.find({ classId: /11/i });
  const hasApaar = c11.filter(s => s.apaar || s.apaarId || s.apaarNumber || s.APAAR);
  const hasPen = c11.filter(s => s.pen || s.penNumber || s.PEN);
  console.log(`Class 11 count: ${c11.length}`);
  console.log(`Has APAAR: ${hasApaar.length}`);
  console.log(`Has PEN: ${hasPen.length}`);
  if (hasApaar.length > 0) {
    console.log('Sample APAAR fields:', {
      apaar: hasApaar[0].apaar,
      apaarId: hasApaar[0].apaarId,
      pen: hasApaar[0].pen,
      penNumber: hasApaar[0].penNumber
    });
  }

  // Also check Class 9, 10, 12 to see standard field names used in this app for apaar and pen
  const sampleAny = await Student.findOne({ $or: [{ apaar: { $exists: true, $ne: '' } }, { apaarId: { $exists: true, $ne: '' } }] });
  if (sampleAny) {
    console.log('Sample student from whole DB with apaar/apaarId:', {
      name: sampleAny.name,
      classId: sampleAny.classId,
      apaar: sampleAny.apaar,
      apaarId: sampleAny.apaarId,
      pen: sampleAny.pen,
      penNumber: sampleAny.penNumber
    });
  }

  await mongoose.disconnect();
}

run().catch(console.error);
