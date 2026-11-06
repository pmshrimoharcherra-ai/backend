import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanAadhaar = (a) => (a || '').replace(/\D/g, '');
const normalizeName = (n) => (n || '').toLowerCase().replace(/[^a-z]/g, '');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  // Sector 1 explicit mapping (40 students)
  const sector1Explicit = [
    { roll: '14', classId: 'class-11-arts', expectedName: 'Subrajit Das', listName: 'Subhrajit Das' },
    { roll: '35', classId: 'class-11-arts', expectedName: 'Arghadeep Halder', listName: 'Arghadeep Halder' },
    { roll: '46', classId: 'class-11-arts', expectedName: 'Pritam Sarkar', listName: 'Pritam Sarkar' },
    { roll: '47', classId: 'class-11-arts', expectedName: 'Sukanta Das', listName: 'Sukanta Das' },
    { roll: '49', classId: 'class-11-arts', expectedName: 'Akhil Sarkar', listName: 'Akhil Sarkar' },
    { roll: '50', classId: 'class-11-arts', expectedName: 'Tanmoy Sarkar', listName: 'Tanmay Sarkar' },
    { roll: '61', classId: 'class-11-arts', expectedName: 'Kishan Sarkar', listName: 'Kishan Sarkar' },
    { roll: '62', classId: 'class-11-arts', expectedName: 'Joy Sarkar', listName: 'Joy Sarkar' },
    { roll: '69', classId: 'class-11-arts', expectedName: 'Sagar Das', listName: 'Sagar Das' },
    { roll: '82', classId: 'class-11-arts', expectedName: 'Subankar Sarkar', listName: 'Subankar Sarkar' },
    { roll: '124', classId: 'class-11-arts', expectedName: 'Pritam Baishya', listName: 'Pritam Baishya' },
    { roll: '126', classId: 'class-11-arts', expectedName: 'Sayen Das', listName: 'Sayen Das (listed as Ankita Das Male 24-Aug-2009)' },
    { roll: '137', classId: 'class-11-arts', expectedName: 'Durjoy Biswas', listName: 'Durjoy Biswas' },
    { roll: '33', classId: 'class-11-arts', expectedName: 'Rajesh Das', listName: 'Rajesh Das' },
    { roll: '39', classId: 'class-11-arts', expectedName: 'Prasanjit Das', listName: 'Prasanjit Das' },
    { roll: '136', classId: 'class-11-arts', expectedName: 'Anupam Biswas', listName: 'Anupam Biswas' },
    { roll: '138', classId: 'class-11-arts', expectedName: 'Amiel Rudra Paul', listName: 'Amiel Rudra Paul (listed as Ankita Das Male 17-Aug-2009)' },
    { roll: '139', classId: 'class-11-arts', expectedName: 'Nitesh Paul', listName: 'Nitesh Paul' },
    { roll: '21', classId: 'class-11-arts', expectedName: 'Shovanjit Sarkar', listName: 'Shovajit Sarkar' },
    { roll: '26', classId: 'class-11-arts', expectedName: 'Riya Sarkar', listName: 'Riya Sarkar' },
    { roll: '32', classId: 'class-11-arts', expectedName: 'Bipash Das', listName: 'Bipash Das' },
    { roll: '60', classId: 'class-11-arts', expectedName: 'Supriya Sarkar', listName: 'Supriya Sarkar' },
    { roll: '121', classId: 'class-11-arts', expectedName: 'Piyash Debnath', listName: 'Piyash Debnath' },
    { roll: '135', classId: 'class-11-arts', expectedName: 'Prashanta Paul', listName: 'Prasanta Paul' },
    { roll: '159', classId: 'class-11-arts', expectedName: 'Tamal Das', listName: 'Tamal Das' },
    { roll: '06', classId: 'class-11-arts', expectedName: 'Kaushik Debnath', listName: 'Koushik Debnath' },
    { roll: '07', classId: 'class-11-arts', expectedName: 'Ruhan Das', listName: 'Ruhan Das' },
    { roll: '15', classId: 'class-11-arts', expectedName: 'Ankita Das', listName: 'Ankita Das' },
    { roll: '24', classId: 'class-11-arts', expectedName: 'Reshmi Das', listName: 'Reshmi Das' },
    { roll: '43', classId: 'class-11-arts', expectedName: 'Anamika Das', listName: 'Anamika Das (DOB: 18/08/2009)' },
    { roll: '123', classId: 'class-11-arts', expectedName: 'Titash Majumder', listName: 'Titash Majumdar' },
    { roll: '140', classId: 'class-11-arts', expectedName: 'Abhijit Debnath', listName: 'Abhijit Debnath' },
    { roll: '05', classId: 'class-11-arts', expectedName: 'Ishmit Biswas', listName: 'Ishmit Biswas' },
    { roll: '25', classId: 'class-11-arts', expectedName: 'Jaya Das', listName: 'Jaya Das' },
    { roll: '34', classId: 'class-11-arts', expectedName: 'Rajdeep Das', listName: 'Rajdweep Das' },
    { roll: '36', classId: 'class-11-arts', expectedName: 'Boishli Das', listName: 'Bristi Das' },
    { roll: '17', classId: 'class-11-arts', expectedName: 'Riktika Sarkar', listName: 'Riktika Sarkar' },
    { roll: '118', classId: 'class-11-arts', expectedName: 'Susmita Das', listName: 'Susmita Das' },
    { roll: '04', classId: 'class-11-arts', expectedName: 'Rupa Acharjee', listName: 'Rupa Acharjee' },
    { roll: '148', classId: 'class-11-arts', expectedName: 'Hrithik Modak', listName: 'Hrithik Modak' }
  ];

  // Sector 2 explicit mapping (40 students)
  const sector2Explicit = [
    { roll: '10', classId: 'class-11-arts', expectedName: 'Tanip Nama', listName: 'Tanip Nama' },
    { roll: '20', classId: 'class-11-arts', expectedName: 'Sandip Debnath', listName: 'Sandip Debnath' },
    { roll: '48', classId: 'class-11-arts', expectedName: 'Biswajit Das', listName: 'Biswajit Das' },
    { roll: '67', classId: 'class-11-arts', expectedName: 'Papiya Nama Sudra', listName: 'Papiya Nama Sudra' },
    { roll: '133', classId: 'class-11-arts', expectedName: 'Sourav Das', listName: 'Sourav Das' },
    { roll: '162', classId: 'class-11-arts', expectedName: 'Nayan Chowdhury', listName: 'Nayan Chowdhury' },
    { roll: '163', classId: 'class-11-arts', expectedName: 'Ankita Biswas', listName: 'Ankita Biswas' },
    { roll: '16', classId: 'class-11-arts', expectedName: 'Lipi Biswas', listName: 'Lipi Biswas' },
    { roll: '64', classId: 'class-11-arts', expectedName: 'Sanjoy Mallik', listName: 'Sanjoy Mallik' },
    { roll: '68', classId: 'class-11-arts', expectedName: 'Susmita Saha', listName: 'Susmita Saha' },
    { roll: '70', classId: 'class-11-arts', expectedName: 'Rima Debnath', listName: 'Rima Debnath' },
    { roll: '120', classId: 'class-11-arts', expectedName: 'Niharika Biswas', listName: 'Niharika Biswas' },
    { roll: '134', classId: 'class-11-arts', expectedName: 'Rupan Sarkar', listName: 'Rupan Sarkar' },
    { roll: '02', classId: 'class-11-arts', expectedName: 'Pritush Das', listName: 'Pritush Das' },
    { roll: '09', classId: 'class-11-arts', expectedName: 'Dhiman Das', listName: 'Dhiman Das' },
    { roll: '13', classId: 'class-11-arts', expectedName: 'Sujan Modak', listName: 'Sujan Modak' },
    { roll: '18', classId: 'class-11-arts', expectedName: 'Adipta Das', listName: 'Adipta Das' },
    { roll: '19', classId: 'class-11-arts', expectedName: 'Dipanjan Debnath', listName: 'Dipanjan Debnath' },
    { roll: '44', classId: 'class-11-arts', expectedName: 'Abhijit Das', listName: 'Abhijit Das' },
    { roll: '65', classId: 'class-11-arts', expectedName: 'Ruma Das', listName: 'Ruma Das' },
    { roll: '78', classId: 'class-11-arts', expectedName: 'Prasenjit Sarkar', listName: 'Prasenjit Sarkar' },
    { roll: '87', classId: 'class-11-arts', expectedName: 'Jhumur Biswas', listName: 'Jhumur Biswas' },
    { roll: '28', classId: 'class-11-arts', expectedName: 'Jhuthika Nama', listName: 'Jhutika Nama' },
    { roll: '108', classId: 'class-11-arts', expectedName: 'Susmita Biswas', listName: 'Susmita Biswas' },
    { roll: '111', classId: 'class-11-arts', expectedName: 'Dipayan Debnath', listName: 'Dipayan Debnath' },
    { roll: '158', classId: 'class-11-arts', expectedName: 'Jiban Biswas', listName: 'Jiban Biswas' },
    { roll: '01', classId: 'class-11-arts', expectedName: 'Deb Biswas', listName: 'Deb Biswas' },
    { roll: '22', classId: 'class-11-arts', expectedName: 'Bipul Debnath', listName: 'Bipul Debnath' },
    { roll: '23', classId: 'class-11-arts', expectedName: 'Anamika Biswas', listName: 'Anamika Biswas' },
    { roll: '40', classId: 'class-11-arts', expectedName: 'Susmita Debnath', listName: 'Susmita Deb Nath' },
    { roll: '59', classId: 'class-11-arts', expectedName: 'Anamika Das', listName: 'Anamika Das (DOB: 08/05/2010)' },
    { roll: '66', classId: 'class-11-arts', expectedName: 'Joydipa Ghosh', listName: 'Joydipa Ghosh' },
    { roll: '71', classId: 'class-11-arts', expectedName: 'Jwel Debnath', listName: 'Jwel Debnath' },
    { roll: '92', classId: 'class-11-arts', expectedName: 'Arpita Biswas', listName: 'Arpita Biswas' },
    { roll: '107', classId: 'class-11-arts', expectedName: 'Dipika Biswas', listName: 'Dipika Biswas' },
    { roll: '116', classId: 'class-11-arts', expectedName: 'Vijala Barma', listName: 'Ujjala Barma' },
    { roll: '05', classId: 'class-11-sci', expectedName: 'Rajdeep Chandra', listName: 'Rajdeep Chandra' },
    { roll: '11', classId: 'class-11-arts', expectedName: 'Trishana Biswas', listName: 'Trishana Biswas' },
    { roll: '166', classId: 'class-11-arts', expectedName: 'Shristi Ghosh', listName: 'Shristi Ghosh' },
    { roll: '06', classId: 'class-11-sci', expectedName: 'Parmita Das', listName: 'Paramita Das' }
  ];

  console.log(`Verifying Sector 1 list (${sector1Explicit.length} students)...`);
  for (const item of sector1Explicit) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    if (!s) {
      console.error(`FAILED to find Sector 1 student Roll ${item.roll} in ${item.classId}`);
    } else {
      console.log(`[OK] Sec 1: Roll ${s.roll} (${s.classId}) - ${s.name} (Matched with "${item.listName}")`);
    }
  }

  console.log(`\nVerifying Sector 2 list (${sector2Explicit.length} students)...`);
  for (const item of sector2Explicit) {
    const s = await Student.findOne({ classId: item.classId, roll: item.roll });
    if (!s) {
      console.error(`FAILED to find Sector 2 student Roll ${item.roll} in ${item.classId}`);
    } else {
      console.log(`[OK] Sec 2: Roll ${s.roll} (${s.classId}) - ${s.name} (Matched with "${item.listName}")`);
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
