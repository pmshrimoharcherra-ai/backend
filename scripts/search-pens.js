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

  const pens = ['21813153689', '22381942571'];
  for (const p of pens) {
    const res = await Student.find({ penNumber: p });
    console.log('PEN', p, res.map(s => ({ roll: s.roll, classId: s.classId, name: s.name })));
  }

  // Also search by phone
  const phones = ['9863141608', '8798234405'];
  for (const ph of phones) {
    const res = await Student.find({ phone: ph });
    console.log('Phone', ph, res.map(s => ({ roll: s.roll, classId: s.classId, name: s.name })));
  }

  // Also search by apaarId
  const apaars = ['452022431988', '896644046853'];
  for (const ap of apaars) {
    const res = await Student.find({ apaarId: ap });
    console.log('APAAR', ap, res.map(s => ({ roll: s.roll, classId: s.classId, name: s.name })));
  }

  await mongoose.disconnect();
}

run().catch(console.error);
