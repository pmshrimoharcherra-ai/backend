import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Teacher from '../models/Teacher.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const DEFAULT_DOB_MAP = {
  'TR45208338': '12/04/1987', // Joydeb Debnath
  'TP00693724': '08/02/1990', // Riti Debbarma
  'TP12999252': '15/07/1984', // Gita Das
  'TP40548371': '22/11/1986', // Rakhi Rudra Paul
  'TP41073978': '15/05/1985', // Soma Sarkar
  'TP41160956': '19/09/1988', // Joly Majumder
  'TP69529790': '07/03/1991', // Subarna Sarkar
  'TR02672728': '14/08/1984', // Rajib Sarkar
  'TR05821328': '05/10/1988', // Minakshi Sarkar
  'TR49491164': '18/06/1989', // Rupa Das
  'TP22856391': '23/12/1983', // Sanjit Banik
  'TR02672782': '24/09/1988', // Mamata Biswas
  'TR76404582': '04/07/1986', // Sujit Debnath
  'TP43381101': '16/03/1982', // Debamoy Chakraborty
  'TP13217757': '11/11/1989', // Rama Debbarma
  'TR65553969': '29/01/1990', // Anirban Sil
  'TR94841403': '03/05/1987', // Sangita Das
  'TR95081566': '17/10/1985', // Krishna Kamal Debnath
  'TR96957895': '25/08/1984', // Ranjit Sarkar
  'TP99812401': '09/04/1992', // Jusli Debbarma
  'PENDING1': '14/07/1986',   // Dipankar Dey
  'PENDING2': '20/02/1991',   // Pragati Das
  'PENDING3': '30/06/1989',   // Banti Debbarma
  'PENDING4': '02/12/1988',   // Mitan Nama Biswas
  'TR000107': '10/01/1992',   // Kiran Samanta
  'TR000108': '18/05/1993',   // Tarali Das
};

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log('Connected.');

    const teachers = await Teacher.find();
    console.log(`Found ${teachers.length} teachers.`);

    let updatedCount = 0;
    for (const t of teachers) {
      if (!t.dob) {
        const defaultDob = DEFAULT_DOB_MAP[t.teacherId] || '15/08/1988';
        t.dob = defaultDob;
        await t.save();
        updatedCount++;
        console.log(`Updated ${t.name} (${t.teacherId}) -> DOB: ${t.dob}`);
      }
    }

    console.log(`Successfully updated ${updatedCount} teachers with DOB.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error updating teachers DOB:', err);
    process.exit(1);
  }
}

run();
