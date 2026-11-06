import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanDigits = (s) => (s || '').replace(/\D/g, '');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const unmatched = [
    { name: 'AJIT SARKAR', dob: '19/11/2008', father: 'MADAN SARKAR', pen: '21957706819', apaar: '572090021719' },
    { name: 'ANGKITA BARMA', dob: '06/09/2008', father: 'NARENDRA BARMA', pen: '21977244233', apaar: '499143469924' },
    { name: 'ANKIT DAS', dob: '06/08/2009', father: 'ATHINDRA DAS', pen: '22381942571', apaar: '896644046853' },
    { name: 'BISWAJIT SARKAR', dob: '29/12/2007', father: 'SUSHIL SARKAR', pen: '21813153689', apaar: '452022431988' },
    { name: 'MANISHA SARKAR', dob: '15/12/2008', father: 'PRADIP SARKAR', pen: '22575729796', apaar: '976802331393' },
    { name: 'MINTU BISWAS', dob: '01/06/2008', father: 'HAREKRISHNA BISWAS', pen: '22168105758', apaar: '459564692152' },
    { name: 'NANDITA DEBNATH', dob: '26/12/2008', father: 'SUDHANGSHU DEBNATH', pen: '22311367437', apaar: '132826639652' }
  ];

  for (const item of unmatched) {
    console.log(`\nSearching for: ${item.name} | DOB: ${item.dob} | Father: ${item.father} | PEN: ${item.pen}`);
    // Search across DB by PEN
    const byPen = await Student.find({ penNumber: item.pen });
    if (byPen.length > 0) {
      console.log('  Found by PEN:', byPen.map(s => `Roll ${s.roll} (${s.classId}) - ${s.name} | DOB: ${s.dob} | Father: ${s.father}`));
    }
    // Search across DB by DOB
    const byDob = await Student.find({ dob: item.dob });
    if (byDob.length > 0) {
      console.log('  Found by DOB:', byDob.map(s => `Roll ${s.roll} (${s.classId}) - ${s.name} | DOB: ${s.dob} | Father: ${s.father}`));
    }
    // Search across DB by Name regex
    const namePart = item.name.split(' ')[0];
    const byName = await Student.find({ classId: /11/i, name: new RegExp(namePart, 'i') });
    if (byName.length > 0) {
      console.log('  Found in Class 11 by Name Part:', byName.map(s => `Roll ${s.roll} (${s.classId}) - ${s.name} | DOB: ${s.dob} | Father: ${s.father} | PEN: ${s.penNumber}`));
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
