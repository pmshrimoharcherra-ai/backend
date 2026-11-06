import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const spellingCorrections = [
  { roll: '138', classId: 'class-11-arts', oldName: 'Amiel Rudra Paul', newName: 'Amit Rudra Paul', pen: '21868429846' },
  { roll: '35', classId: 'class-11-arts', oldName: 'Arghadeep Halder', newName: 'Arghadeep Haldar', pen: '22478599144' },
  { roll: '36', classId: 'class-11-arts', oldName: 'Boishli Das', newName: 'Bristi Das', pen: '21926439157' },
  { roll: '80', classId: 'class-11-arts', oldName: 'Chirashri Mallik', newName: 'Chira Shri Mallik', pen: '22102374093' },
  { roll: '05', classId: 'class-11-arts', oldName: 'Ishmit Biswas', newName: 'Ishsmit Biswas', pen: '22018367195' },
  { roll: '28', classId: 'class-11-arts', oldName: 'Jhuthika Nama', newName: 'Jhutika Nama', pen: '21847239899' },
  { roll: '12', classId: 'class-11-arts', oldName: 'Mouchit Das', newName: 'Mouhit Das', pen: '21871114189' },
  { roll: '67', classId: 'class-11-arts', oldName: 'Papiya Nama Sudra', newName: 'Papiya Nama Shudra', pen: '22097571780' },
  { roll: '106', classId: 'class-11-arts', oldName: 'Rahul Nama Das', newName: 'Rahit Nama Das', pen: '22332207274' },
  { roll: '05', classId: 'class-11-sci', oldName: 'Rajdeep Chandra', newName: 'Rajdeep Chanda', pen: '21919123618' },
  { roll: '34', classId: 'class-11-arts', oldName: 'Rajdeep Das', newName: 'Rajdweep Das', pen: '22090072750' },
  { roll: '21', classId: 'class-11-arts', oldName: 'Shovanjit Sarkar', newName: 'Shovajit Sarkar', pen: '22025179375' },
  { roll: '154', classId: 'class-11-arts', oldName: 'Soma Roy', newName: 'Suma Roy', pen: '22221893922' },
  { roll: '82', classId: 'class-11-arts', oldName: 'Subankar Sarkar', newName: 'Suvankar Sarkar', pen: '22211723709' },
  { roll: '116', classId: 'class-11-arts', oldName: 'Vijala Barma', newName: 'Ujjala Barma', pen: '22084914724' }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  console.log(`--- UPDATING ${spellingCorrections.length} MISSPELLED STUDENT NAMES ---`);
  let updatedCount = 0;

  for (const item of spellingCorrections) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    if (!s) {
      console.error(`ERROR: Student not found: Roll ${item.roll} in ${item.classId}`);
      continue;
    }
    const oldName = s.name;
    await Student.updateOne(
      { _id: s._id },
      { $set: { name: item.newName } }
    );
    updatedCount++;
    console.log(`[OK] Roll ${item.roll.padStart(3)} (${item.classId}): "${oldName}" -> "${item.newName}" (PEN: ${item.pen})`);
  }

  console.log(`\nSuccessfully updated ${updatedCount} / ${spellingCorrections.length} student names.`);

  // Verification
  console.log('\n--- VERIFICATION OF UPDATED NAMES ---');
  for (const item of spellingCorrections) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    console.log(`Roll ${s.roll.padStart(3)} (${s.classId}): Current DB name is "${s.name}" (Expected: "${item.newName}")`);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
