import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const sector1Students = [
  { roll: '14', classId: 'class-11-arts', name: 'Subrajit Das' },
  { roll: '35', classId: 'class-11-arts', name: 'Arghadeep Halder' },
  { roll: '46', classId: 'class-11-arts', name: 'Pritam Sarkar' },
  { roll: '47', classId: 'class-11-arts', name: 'Sukanta Das' },
  { roll: '49', classId: 'class-11-arts', name: 'Akhil Sarkar' },
  { roll: '50', classId: 'class-11-arts', name: 'Tanmoy Sarkar' },
  { roll: '61', classId: 'class-11-arts', name: 'Kishan Sarkar' },
  { roll: '62', classId: 'class-11-arts', name: 'Joy Sarkar' },
  { roll: '69', classId: 'class-11-arts', name: 'Sagar Das' },
  { roll: '82', classId: 'class-11-arts', name: 'Subankar Sarkar' },
  { roll: '124', classId: 'class-11-arts', name: 'Pritam Baishya' },
  { roll: '126', classId: 'class-11-arts', name: 'Sayen Das' },
  { roll: '137', classId: 'class-11-arts', name: 'Durjoy Biswas' },
  { roll: '33', classId: 'class-11-arts', name: 'Rajesh Das' },
  { roll: '39', classId: 'class-11-arts', name: 'Prasanjit Das' },
  { roll: '136', classId: 'class-11-arts', name: 'Anupam Biswas' },
  { roll: '138', classId: 'class-11-arts', name: 'Amiel Rudra Paul' },
  { roll: '139', classId: 'class-11-arts', name: 'Nitesh Paul' },
  { roll: '21', classId: 'class-11-arts', name: 'Shovanjit Sarkar' },
  { roll: '26', classId: 'class-11-arts', name: 'Riya Sarkar' },
  { roll: '32', classId: 'class-11-arts', name: 'Bipash Das' },
  { roll: '60', classId: 'class-11-arts', name: 'Supriya Sarkar' },
  { roll: '121', classId: 'class-11-arts', name: 'Piyash Debnath' },
  { roll: '135', classId: 'class-11-arts', name: 'Prashanta Paul' },
  { roll: '159', classId: 'class-11-arts', name: 'Tamal Das' },
  { roll: '06', classId: 'class-11-arts', name: 'Kaushik Debnath' },
  { roll: '07', classId: 'class-11-arts', name: 'Ruhan Das' },
  { roll: '15', classId: 'class-11-arts', name: 'Ankita Das' },
  { roll: '24', classId: 'class-11-arts', name: 'Reshmi Das' },
  { roll: '43', classId: 'class-11-arts', name: 'Anamika Das' },
  { roll: '123', classId: 'class-11-arts', name: 'Titash Majumder' },
  { roll: '140', classId: 'class-11-arts', name: 'Abhijit Debnath' },
  { roll: '05', classId: 'class-11-arts', name: 'Ishmit Biswas' },
  { roll: '25', classId: 'class-11-arts', name: 'Jaya Das' },
  { roll: '34', classId: 'class-11-arts', name: 'Rajdeep Das' },
  { roll: '36', classId: 'class-11-arts', name: 'Boishli Das' },
  { roll: '17', classId: 'class-11-arts', name: 'Riktika Sarkar' },
  { roll: '118', classId: 'class-11-arts', name: 'Susmita Das' },
  { roll: '04', classId: 'class-11-arts', name: 'Rupa Acharjee' },
  { roll: '148', classId: 'class-11-arts', name: 'Hrithik Modak' }
];

const sector2Students = [
  { roll: '10', classId: 'class-11-arts', name: 'Tanip Nama' },
  { roll: '20', classId: 'class-11-arts', name: 'Sandip Debnath' },
  { roll: '48', classId: 'class-11-arts', name: 'Biswajit Das' },
  { roll: '67', classId: 'class-11-arts', name: 'Papiya Nama Sudra' },
  { roll: '133', classId: 'class-11-arts', name: 'Sourav Das' },
  { roll: '162', classId: 'class-11-arts', name: 'Nayan Chowdhury' },
  { roll: '163', classId: 'class-11-arts', name: 'Ankita Biswas' },
  { roll: '16', classId: 'class-11-arts', name: 'Lipi Biswas' },
  { roll: '64', classId: 'class-11-arts', name: 'Sanjoy Mallik' },
  { roll: '68', classId: 'class-11-arts', name: 'Susmita Saha' },
  { roll: '70', classId: 'class-11-arts', name: 'Rima Debnath' },
  { roll: '120', classId: 'class-11-arts', name: 'Niharika Biswas' },
  { roll: '134', classId: 'class-11-arts', name: 'Rupan Sarkar' },
  { roll: '02', classId: 'class-11-arts', name: 'Pritush Das' },
  { roll: '09', classId: 'class-11-arts', name: 'Dhiman Das' },
  { roll: '13', classId: 'class-11-arts', name: 'Sujan Modak' },
  { roll: '18', classId: 'class-11-arts', name: 'Adipta Das' },
  { roll: '19', classId: 'class-11-arts', name: 'Dipanjan Debnath' },
  { roll: '44', classId: 'class-11-arts', name: 'Abhijit Das' },
  { roll: '65', classId: 'class-11-arts', name: 'Ruma Das' },
  { roll: '78', classId: 'class-11-arts', name: 'Prasenjit Sarkar' },
  { roll: '87', classId: 'class-11-arts', name: 'Jhumur Biswas' },
  { roll: '28', classId: 'class-11-arts', name: 'Jhuthika Nama' },
  { roll: '108', classId: 'class-11-arts', name: 'Susmita Biswas' },
  { roll: '111', classId: 'class-11-arts', name: 'Dipayan Debnath' },
  { roll: '158', classId: 'class-11-arts', name: 'Jiban Biswas' },
  { roll: '01', classId: 'class-11-arts', name: 'Deb Biswas' },
  { roll: '22', classId: 'class-11-arts', name: 'Bipul Debnath' },
  { roll: '23', classId: 'class-11-arts', name: 'Anamika Biswas' },
  { roll: '40', classId: 'class-11-arts', name: 'Susmita Debnath' },
  { roll: '59', classId: 'class-11-arts', name: 'Anamika Das' },
  { roll: '66', classId: 'class-11-arts', name: 'Joydipa Ghosh' },
  { roll: '71', classId: 'class-11-arts', name: 'Jwel Debnath' },
  { roll: '92', classId: 'class-11-arts', name: 'Arpita Biswas' },
  { roll: '107', classId: 'class-11-arts', name: 'Dipika Biswas' },
  { roll: '116', classId: 'class-11-arts', name: 'Vijala Barma' },
  { roll: '05', classId: 'class-11-sci', name: 'Rajdeep Chandra', aadhaar: '9446 8689 0759', dob: '14/09/2010' },
  { roll: '11', classId: 'class-11-arts', name: 'Trishana Biswas' },
  { roll: '166', classId: 'class-11-arts', name: 'Shristi Ghosh' },
  { roll: '06', classId: 'class-11-sci', name: 'Parmita Das', aadhaar: '4635 9694 1743', dob: '25/06/2010' }
];

// Non-vocational students in Arts who had IT/ITeS mistakenly
const nonVocationalArtsRolls = ['12', '77', '94', '95', '97'];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  console.log('--- UPDATING CLASS XI SECTOR 1 (40 students) ---');
  let s1Count = 0;
  for (const item of sector1Students) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    if (!s) {
      console.error(`ERROR: Student not found: ${item.roll} in ${item.classId}`);
      continue;
    }
    const currentSubjects = Array.isArray(s.subjects) ? [...s.subjects] : [];
    if (!currentSubjects.includes('IT/ITeS')) {
      currentSubjects.push('IT/ITeS');
    }
    const updateObj = {
      sector: 'Sector 1',
      vocationalSector: 'Sector 1',
      subjects: currentSubjects
    };
    await Student.updateOne({ _id: s._id }, { $set: updateObj });
    s1Count++;
  }
  console.log(`Updated ${s1Count} students to Sector 1.`);

  console.log('\n--- UPDATING CLASS XI SECTOR 2 (40 students) ---');
  let s2Count = 0;
  for (const item of sector2Students) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    if (!s) {
      console.error(`ERROR: Student not found: ${item.roll} in ${item.classId}`);
      continue;
    }
    const currentSubjects = Array.isArray(s.subjects) ? [...s.subjects] : [];
    if (!currentSubjects.includes('IT/ITeS')) {
      currentSubjects.push('IT/ITeS');
    }
    const updateObj = {
      sector: 'Sector 2',
      vocationalSector: 'Sector 2',
      subjects: currentSubjects
    };
    if (item.aadhaar && (!s.aadhaar || s.aadhaar.trim() === '')) {
      updateObj.aadhaar = item.aadhaar;
    }
    if (item.dob && (!s.dob || s.dob.trim() === '')) {
      updateObj.dob = item.dob;
    }
    await Student.updateOne({ _id: s._id }, { $set: updateObj });
    s2Count++;
  }
  console.log(`Updated ${s2Count} students to Sector 2.`);

  console.log('\n--- UPDATING NON-VOCATIONAL CLASS 11 STUDENTS ---');
  // For the 5 Arts students who had IT/ITeS accidentally:
  for (const roll of nonVocationalArtsRolls) {
    const s = await Student.findOne({ classId: 'class-11-arts', roll });
    if (s) {
      const cleanSubjects = (s.subjects || []).filter(sub => !/^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim()));
      await Student.updateOne(
        { _id: s._id },
        {
          $set: { subjects: cleanSubjects },
          $unset: { sector: 1, vocationalSector: 1 }
        }
      );
      console.log(`Removed IT/ITeS from Roll ${roll} (${s.name}). Subjects now: [${cleanSubjects.join(', ')}]`);
    }
  }

  // Clear any sector / vocationalSector on all other Class 11 students
  const s1Rolls = new Set(sector1Students.map(s => `${s.classId}-${s.roll}`));
  const s2Rolls = new Set(sector2Students.map(s => `${s.classId}-${s.roll}`));

  const allClass11 = await Student.find({ classId: /11/i });
  let clearedCount = 0;
  for (const s of allClass11) {
    const key = `${s.classId}-${s.roll}`;
    if (!s1Rolls.has(key) && !s2Rolls.has(key)) {
      if (s.sector || s.vocationalSector) {
        await Student.updateOne({ _id: s._id }, { $unset: { sector: 1, vocationalSector: 1 } });
        clearedCount++;
      }
    }
  }
  console.log(`Cleared extraneous sector tags on ${clearedCount} non-vocational Class 11 students.`);

  // FINAL VERIFICATION
  console.log('\n--- FINAL VERIFICATION OF CLASS 11 VOCATIONAL STUDENTS ---');
  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());
  const finalClass11 = await Student.find({ classId: /11/i });

  const finalSec1 = finalClass11.filter(s => s.sector === 'Sector 1' || s.vocationalSector === 'Sector 1');
  const finalSec2 = finalClass11.filter(s => s.sector === 'Sector 2' || s.vocationalSector === 'Sector 2');
  const finalWithIT = finalClass11.filter(s => (s.subjects || []).some(isIT));

  console.log(`Class 11 Sector 1 count: ${finalSec1.length} (Arts: ${finalSec1.filter(s => s.classId.includes('arts')).length}, Sci: ${finalSec1.filter(s => s.classId.includes('sci')).length})`);
  console.log(`Class 11 Sector 2 count: ${finalSec2.length} (Arts: ${finalSec2.filter(s => s.classId.includes('arts')).length}, Sci: ${finalSec2.filter(s => s.classId.includes('sci')).length})`);
  console.log(`Class 11 with IT/ITeS in subjects: ${finalWithIT.length}`);

  await mongoose.disconnect();
}

run().catch(console.error);
