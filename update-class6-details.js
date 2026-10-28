import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

export const class6Data = [
  {
    roll: 1,
    name: 'Anjita Das',
    caste: 'SC',
    father: 'Ajoy Das',
    mother: 'Krishna Rani Das',
    guardian: 'Ajoy Das',
    dob: '02/01/2015',
    admissionDate: '02/04/2026',
    admissionNo: '01',
    address: 'Moharchera',
    aadhaar: '5729 3588 8580',
    gender: 'Girl'
  },
  {
    roll: 2,
    name: 'Abhijit Nama',
    caste: 'SC',
    father: 'Krishnadhan Nama',
    mother: 'Manika Biswas (Nama)',
    guardian: 'Krishnadhan Nama',
    dob: '01/04/2015',
    admissionDate: '04/04/2026',
    admissionNo: '07',
    address: 'Moharchera',
    aadhaar: '4171 0839 5488',
    gender: 'Boy'
  },
  {
    roll: 3,
    name: 'Akash Nandi',
    caste: 'SC',
    father: 'Sebal Nandi',
    mother: 'Purnima Das (Nandi)',
    guardian: 'Sebal Nandi',
    dob: '20/08/2015',
    admissionDate: '09/04/2026',
    admissionNo: '36',
    address: 'Moharchera',
    aadhaar: '4015 5920 0416',
    gender: 'Boy'
  },
  {
    roll: 4,
    name: 'Anushka Sarkar',
    caste: 'SC',
    father: 'Dulal Sarkar',
    mother: 'Anurupa Sarkar',
    guardian: 'Dulal Sarkar',
    dob: '25/02/2015',
    admissionDate: '07/04/2026',
    admissionNo: '26',
    address: 'Moharchera',
    aadhaar: '7616 9376 2323',
    gender: 'Girl'
  },
  {
    roll: 5,
    name: 'Anushka Biswas',
    caste: 'UR',
    father: 'Bimal Biswas',
    mother: 'Rima Sarkar',
    guardian: 'Bimal Biswas',
    dob: '23/10/2015',
    admissionDate: '06/04/2026',
    admissionNo: '16',
    address: 'Moharchera',
    aadhaar: '4579 1793 8967',
    gender: 'Girl'
  },
  {
    roll: 6,
    name: 'Anusri Das',
    caste: 'SC',
    father: 'Bikash Chandra Das',
    mother: 'Titu Rani Das',
    guardian: 'Bikash Chandra Das',
    dob: '07/08/2015',
    admissionDate: '04/04/2026',
    admissionNo: '08',
    address: 'Moharchera',
    aadhaar: '7978 7582 6089',
    gender: 'Girl'
  },
  {
    roll: 7,
    name: 'Arohi Biswas',
    caste: 'SC',
    father: 'Sankar Biswas',
    mother: 'Chumki Biswas',
    guardian: 'Sankar Biswas',
    dob: '26/01/2016',
    admissionDate: '06/04/2026',
    admissionNo: '21',
    address: 'Moharchera',
    aadhaar: '7202 1680 2161',
    gender: 'Girl'
  },
  {
    roll: 8,
    name: 'Ayush Das',
    caste: 'SC',
    father: 'Sajal Das',
    mother: 'Reba Rani Paul (Das)',
    guardian: 'Sajal Das',
    dob: '21/06/2015',
    admissionDate: '06/04/2026',
    admissionNo: '17',
    address: 'Moharchera',
    aadhaar: '9862 9144 4917',
    gender: 'Boy'
  },
  {
    roll: 9,
    name: 'Bishal Biswas',
    caste: 'SC',
    father: 'Raichan Biswas',
    mother: 'Bina Sarkar (Biswas)',
    guardian: 'Raichan Biswas',
    dob: '01/05/2015',
    admissionDate: '06/04/2026',
    admissionNo: '18',
    address: 'Moharchera',
    aadhaar: '8063 3012 5087',
    gender: 'Boy'
  },
  {
    roll: 10,
    name: 'Deep Tanay Sarkar',
    caste: 'SC',
    father: 'Abhijit Sarkar',
    mother: 'Pinki Ghosh Sarkar',
    guardian: 'Abhijit Sarkar',
    dob: '30/03/2015',
    admissionDate: '02/04/2026',
    admissionNo: '02',
    address: 'Moharchera',
    aadhaar: '6810 2301 2354',
    gender: 'Boy'
  },
  {
    roll: 11,
    name: 'Diya Nama',
    caste: 'SC',
    father: 'Bishnu Nama',
    mother: 'Mousumi Sarkar (Nama)',
    guardian: 'Bishnu Nama',
    dob: '06/08/2015',
    admissionDate: '07/04/2026',
    admissionNo: '30',
    address: 'Moharchera',
    aadhaar: '2789 9330 0235',
    gender: 'Girl'
  },
  {
    roll: 12,
    name: 'Diya Sarkar',
    caste: 'SC',
    father: 'Chitta Ranjan Sarkar',
    mother: 'Shipra Rani Sarkar',
    guardian: 'Chitta Ranjan Sarkar',
    dob: '15/02/2015',
    admissionDate: '10/04/2026',
    admissionNo: '42',
    address: 'Uttar Kamalnagar',
    aadhaar: '7722 8358 9358',
    gender: 'Girl'
  },
  {
    roll: 13,
    name: 'Ishan Das',
    caste: 'SC',
    father: 'Litan Das',
    mother: 'Babi Das',
    guardian: 'Litan Das',
    dob: '20/10/2014',
    admissionDate: '08/04/2026',
    admissionNo: '34',
    address: 'Kamalnagar, KLP',
    aadhaar: '3767 9663 6082',
    gender: 'Boy'
  },
  {
    roll: 14,
    name: 'Ishani Shil',
    caste: 'OBC',
    father: 'Sushil Ch. Shil',
    mother: 'Kakali Shil',
    guardian: 'Sushil Ch. Shil',
    dob: '26/03/2015',
    admissionDate: '07/04/2026',
    admissionNo: '29',
    address: 'Moharchera, TLM',
    aadhaar: '6840 0954 5977',
    gender: 'Girl'
  },
  {
    roll: 15,
    name: 'Ishita Das',
    caste: 'SC',
    father: 'Shyamal Das',
    mother: 'Sebika Deb (Das)',
    guardian: 'Shyamal Das',
    dob: '11/01/2015',
    admissionDate: '10/04/2026',
    admissionNo: '38',
    address: 'Moharchera, Laltika',
    aadhaar: '7927 1386 5956',
    gender: 'Girl'
  },
  {
    roll: 16,
    name: 'Ishmita Biswas',
    caste: 'SC',
    father: 'Tapan Biswas',
    mother: 'Dipti Biswas',
    guardian: 'Tapan Biswas',
    dob: '05/11/2015',
    admissionDate: '04/04/2026',
    admissionNo: '12',
    address: 'Moharchera',
    aadhaar: '3256 6005 2125',
    gender: 'Girl'
  },
  {
    roll: 17,
    name: 'Mansi Das',
    caste: 'SC',
    father: 'Sajal Das',
    mother: 'Kanika Das',
    guardian: 'Sajal Das',
    dob: '30/11/2014',
    admissionDate: '10/04/2026',
    admissionNo: '40',
    address: 'Kamalnagar, KLP',
    aadhaar: '9845 8494 0834',
    gender: 'Girl'
  },
  {
    roll: 18,
    name: 'Mitrika Debnath',
    caste: 'OBC',
    father: 'Late Ishwar Debnath',
    mother: 'Mousumi Bala Debnath',
    guardian: 'Mousumi Bala Debnath',
    dob: '18/11/2015',
    admissionDate: '08/04/2026',
    admissionNo: '31',
    address: 'Moharchera',
    aadhaar: '9833 5395 4289',
    gender: 'Girl'
  },
  {
    roll: 19,
    name: 'Nandita Shil',
    caste: 'OBC',
    father: 'Nirmal Shil',
    mother: 'Smriti Rani Shil',
    guardian: 'Nirmal Shil',
    dob: '15/04/2015',
    admissionDate: '10/04/2026',
    admissionNo: '45',
    address: 'Uttar Kamalnagar, KLP',
    aadhaar: '2067 8492 2296',
    gender: 'Girl'
  },
  {
    roll: 20,
    name: 'Nayan Das',
    caste: 'SC',
    father: 'Nantu Das',
    mother: 'Madhumita Das',
    guardian: 'Nantu Das',
    dob: '17/12/2014',
    admissionDate: '06/04/2026',
    admissionNo: '23',
    address: 'Moharchera',
    aadhaar: '5801 3620 5949',
    gender: 'Boy'
  },
  {
    roll: 21,
    name: 'Nayanika Das',
    caste: 'SC',
    father: 'Surajit Das',
    mother: 'Mampi Mitra',
    guardian: 'Surajit Das',
    dob: '07/02/2015',
    admissionDate: '10/04/2026',
    admissionNo: '41',
    address: 'Moharchera',
    aadhaar: '4856 2781 2918',
    gender: 'Girl'
  },
  {
    roll: 22,
    name: 'Nilam Dey',
    caste: 'UR',
    father: 'Manjit Dey',
    mother: 'Jaba Dey',
    guardian: 'Manjit Dey',
    dob: '06/06/2015',
    admissionDate: '07/04/2026',
    admissionNo: '24',
    address: 'Moharchera',
    aadhaar: '',
    gender: 'Girl'
  },
  {
    roll: 23,
    name: 'Paramita Das',
    caste: 'UR',
    father: 'Sarajit Das',
    mother: 'Purnima Biswas (Das)',
    guardian: 'Sarajit Das',
    dob: '06/01/2016',
    admissionDate: '04/04/2026',
    admissionNo: '11',
    address: 'Moharchera',
    aadhaar: '8661 2918 7962',
    gender: 'Girl'
  },
  {
    roll: 24,
    name: 'Priyotosh Paul',
    caste: 'UR',
    father: 'Pankaj Paul',
    mother: 'Shibani Das (Paul)',
    guardian: 'Pankaj Paul',
    dob: '16/11/2015',
    admissionDate: '04/04/2026',
    admissionNo: '04',
    address: 'Moharchera',
    aadhaar: '9898 6954 2648',
    gender: 'Boy'
  },
  {
    roll: 25,
    name: 'Pushpita Debnath',
    caste: 'OBC',
    father: 'Gopi Debnath',
    mother: 'Rupali Debnath',
    guardian: 'Gopi Debnath',
    dob: '03/02/2016',
    admissionDate: '16/04/2026',
    admissionNo: '47',
    address: 'Uttar Kamalnagar, KLP',
    aadhaar: '7466 3457 1505',
    gender: 'Girl'
  },
  {
    roll: 26,
    name: 'Rohit Das',
    caste: 'SC',
    father: 'Subhash Ch. Das',
    mother: 'Laxmi Das Gupta (Das)',
    guardian: 'Subhash Ch. Das',
    dob: '19/08/2015',
    admissionDate: '04/04/2026',
    admissionNo: '10',
    address: 'Moharchera',
    aadhaar: '5653 9027 4529',
    gender: 'Boy'
  },
  {
    roll: 27,
    name: 'Rajdeep Debnath',
    caste: 'OBC',
    father: 'Ramdhan Debnath',
    mother: 'Sangita Debnath',
    guardian: 'Ramdhan Debnath',
    dob: '12/11/2015',
    admissionDate: '04/04/2026',
    admissionNo: '05',
    address: 'Moharchera',
    aadhaar: '7639 6423 1222',
    gender: 'Boy'
  },
  {
    roll: 28,
    name: 'Riya Das',
    caste: 'UR',
    father: 'Mantu Das',
    mother: 'Sumitra Rani Das',
    guardian: 'Mantu Das',
    dob: '24/08/2015',
    admissionDate: '06/04/2026',
    admissionNo: '15',
    address: 'Moharchera',
    aadhaar: '7556 5783 4262',
    gender: 'Girl'
  },
  {
    roll: 29,
    name: 'Sayanik Das',
    caste: 'SC',
    father: 'Tapan Das',
    mother: 'Suparna Sarkar Das',
    guardian: 'Tapan Das',
    dob: '13/11/2015',
    admissionDate: '10/04/2026',
    admissionNo: '39',
    address: 'Moharchera, TLM',
    aadhaar: '5037 3885 1415',
    gender: 'Boy'
  },
  {
    roll: 30,
    name: 'Santanu Sarkar',
    caste: 'SC',
    father: 'Yabaraj Sarkar',
    mother: 'Arjyana Sarkar',
    guardian: 'Yabaraj Sarkar',
    dob: '04/07/2015',
    admissionDate: '10/04/2026',
    admissionNo: '43',
    address: 'Uttar Kamalnagar, KLP',
    aadhaar: '2647 0555 8599',
    gender: 'Boy'
  },
  {
    roll: 31,
    name: 'Sayontika Sarkar',
    caste: 'UR',
    father: 'Shyamal Sarkar',
    mother: 'Jhuma Biswas Sarkar',
    guardian: 'Shyamal Sarkar',
    dob: '09/02/2015',
    admissionDate: '08/04/2026',
    admissionNo: '35',
    address: 'Nayabari, Maiganga',
    aadhaar: '2658 5578 8351',
    gender: 'Girl'
  },
  {
    roll: 32,
    name: 'Subhajit Nama',
    caste: 'SC',
    father: 'Radha Ranjan Nama',
    mother: 'Satyabati Nama',
    guardian: 'Radha Ranjan Nama',
    dob: '23/05/2015',
    admissionDate: '07/04/2026',
    admissionNo: '28',
    address: 'Moharchera',
    aadhaar: '7949 3332 7826',
    gender: 'Boy'
  },
  {
    roll: 33,
    name: 'Subhamoy Biswas',
    caste: 'SC',
    father: 'Swapan Biswas',
    mother: 'Bina Biswas',
    guardian: 'Swapan Biswas',
    dob: '27/06/2015',
    admissionDate: '06/04/2026',
    admissionNo: '22',
    address: 'Moharchera',
    aadhaar: '4764 6030 8894',
    gender: 'Boy'
  },
  {
    roll: 34,
    name: 'Subhankar Biswas',
    caste: 'UR',
    father: 'Arun Biswas',
    mother: 'Suchitra Biswas',
    guardian: 'Arun Biswas',
    dob: '04/06/2015',
    admissionDate: '09/04/2026',
    admissionNo: '37',
    address: 'Moharchera',
    aadhaar: '5050 2643 8431',
    gender: 'Boy'
  },
  {
    roll: 35,
    name: 'Subhajit Debnath',
    caste: 'OBC',
    father: 'Kajal Debnath',
    mother: 'Swapna Debnath',
    guardian: 'Kajal Debnath',
    dob: '27/04/2015',
    admissionDate: '10/04/2026',
    admissionNo: '46',
    address: 'Uttar Kamalnagar, Moharchera',
    aadhaar: '6775 4821 8268',
    gender: 'Boy'
  },
  {
    roll: 36,
    name: 'Sudip Mallik',
    caste: 'SC',
    father: 'Naruttam Mallik',
    mother: 'Sukla Sarkar',
    guardian: 'Naruttam Mallik',
    dob: '15/03/2015',
    admissionDate: '06/04/2026',
    admissionNo: '19',
    address: 'Uttar Kamalnagar',
    aadhaar: '4241 4219 1570',
    gender: 'Boy'
  },
  {
    roll: 37,
    name: 'Sujay Nama',
    caste: 'SC',
    father: 'Jiban Nama',
    mother: 'Apu Das (Nama)',
    guardian: 'Jiban Nama',
    dob: '11/09/2015',
    admissionDate: '04/04/2026',
    admissionNo: '06',
    address: 'Moharchera, TLM',
    aadhaar: '6910 0146 4333',
    gender: 'Boy'
  },
  {
    roll: 38,
    name: 'Sumit Das',
    caste: 'SC',
    father: 'Santu Das',
    mother: 'Champa Das',
    guardian: 'Santu Das',
    dob: '18/05/2015',
    admissionDate: '06/04/2026',
    admissionNo: '14',
    address: 'Kamalnagar, Moharchera',
    aadhaar: '4310 4353 4138',
    gender: 'Boy'
  },
  {
    roll: 39,
    name: 'Suparna Debnath',
    caste: 'UR',
    father: 'Arup Kumar Debnath',
    mother: 'Suchitra Debnath',
    guardian: 'Arup Kumar Debnath',
    dob: '11/04/2015',
    admissionDate: '10/04/2026',
    admissionNo: '44',
    address: 'Uttar Kamalnagar, Moharchera',
    aadhaar: '6780 8669 1607',
    gender: 'Girl'
  },
  {
    roll: 40,
    name: 'Swarup Das',
    caste: 'UR',
    father: 'Niranjan Das',
    mother: 'Renuka Das',
    guardian: 'Niranjan Das',
    dob: '06/10/2015',
    admissionDate: '07/04/2026',
    admissionNo: '25',
    address: 'Moharchera',
    aadhaar: '8278 1176 1540',
    gender: 'Boy'
  },
  {
    roll: 41,
    name: 'Tanoy Debnath',
    caste: 'UR',
    father: 'Bishnu Debnath',
    mother: 'Suparna Debnath',
    guardian: 'Bishnu Debnath',
    dob: '04/03/2015',
    admissionDate: '08/04/2026',
    admissionNo: '32',
    address: 'Moharchera',
    aadhaar: '9799 3144 4865',
    gender: 'Boy'
  },
  {
    roll: 42,
    name: 'Tanushri Das',
    caste: 'SC',
    father: 'Dilip Das',
    mother: 'Radha Rani Das',
    guardian: 'Dilip Das',
    dob: '31/08/2014',
    admissionDate: '06/04/2026',
    admissionNo: '20',
    address: 'Moharchera',
    aadhaar: '5687 8048 4394',
    gender: 'Girl'
  },
  {
    roll: 43,
    name: 'Tiasha Debnath',
    caste: 'OBC',
    father: 'Titon Debnath',
    mother: 'Moumita Debnath',
    guardian: 'Titon Debnath',
    dob: '26/02/2015',
    admissionDate: '06/04/2026',
    admissionNo: '13',
    address: 'Moharchera',
    aadhaar: '8713 6954 0169',
    gender: 'Girl'
  },
  {
    roll: 44,
    name: 'Trisha Das',
    caste: 'SC',
    father: 'Tapas Das',
    mother: 'Smriti Das',
    guardian: 'Tapas Das',
    dob: '13/12/2014',
    admissionDate: '02/04/2026',
    admissionNo: '03',
    address: 'Moharchera',
    aadhaar: '3375 7731 0477',
    gender: 'Girl'
  },
  {
    roll: 45,
    name: 'Trishna Debnath',
    caste: 'OBC',
    father: 'Sankar Debnath',
    mother: 'Jyotsna Debnath',
    guardian: 'Sankar Debnath',
    dob: '13/08/2014',
    admissionDate: '04/04/2026',
    admissionNo: '09',
    address: 'Moharchera',
    aadhaar: '7994 5024 8357',
    gender: 'Girl'
  },
  {
    roll: 46,
    name: 'Ujjal Ghosh',
    caste: 'UR',
    father: 'Uttam Ghosh',
    mother: 'Bappi Ghosh',
    guardian: 'Uttam Ghosh',
    dob: '11/10/2015',
    admissionDate: '08/04/2026',
    admissionNo: '33',
    address: 'Moharchera',
    aadhaar: '8126 1850 1986',
    gender: 'Boy'
  },
  {
    roll: 47,
    name: 'Urmila Nama Das',
    caste: 'UR',
    father: 'Uttam Kumar Nama Das',
    mother: 'Jhuma Biswas (Nama Das)',
    guardian: 'Uttam Kumar Nama Das',
    dob: '30/04/2015',
    admissionDate: '07/04/2026',
    admissionNo: '27',
    address: 'Moharchera',
    aadhaar: '4846 2991 9847',
    gender: 'Girl'
  },
  {
    roll: 48,
    name: 'Diya Das',
    caste: 'UR',
    father: 'Amarjit Das',
    mother: 'Dipika Das',
    guardian: 'Amarjit Das',
    dob: '08/04/2015',
    admissionDate: '18/04/2026',
    admissionNo: '48',
    address: 'Moharchera',
    aadhaar: '6218 6835 8880',
    gender: 'Girl'
  },
  {
    roll: 49,
    name: 'Rakhi Debnath',
    caste: 'OBC',
    father: 'Kamal Debnath',
    mother: 'Namita Das (Debnath)',
    guardian: 'Kamal Debnath',
    dob: '29/08/2015',
    admissionDate: '18/04/2026',
    admissionNo: '49',
    address: 'Moharchera',
    aadhaar: '2770 2953 9572',
    gender: 'Girl'
  },
  {
    roll: 50,
    name: 'Akshita Sarkar',
    caste: 'SC',
    father: 'Gopal Sarkar',
    mother: 'Rupali Das',
    guardian: 'Gopal Sarkar',
    dob: '18/02/2014',
    admissionDate: '17/06/2026',
    admissionNo: '50',
    address: 'Hwaibari, TLM',
    aadhaar: '8161 8480 1820',
    gender: 'Girl'
  }
];

async function updateClass6Details() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const existingStudents = await Student.find({ classId: 'class-6' }).sort({ rollNumber: 1 });
    console.log(`Found ${existingStudents.length} students in Class VI in database.`);

    let updatedCount = 0;

    for (const update of class6Data) {
      const student = existingStudents.find((s) => (s.rollNumber || parseInt(s.roll, 10)) === update.roll);

      if (student) {
        student.name = update.name;
        student.caste = update.caste;
        student.father = update.father;
        student.mother = update.mother;
        student.guardian = update.guardian || update.father;
        student.dob = update.dob;
        student.admissionDate = update.admissionDate;
        student.admissionNo = update.admissionNo;
        student.address = update.address;
        student.aadhaar = update.aadhaar;
        if (update.gender) student.gender = update.gender;

        await student.save();
        updatedCount++;
        console.log(`[UPDATED] Roll ${update.roll.toString().padStart(2, '0')}: ${update.name} | Caste: ${update.caste} | Adm Date: ${update.admissionDate} | Adm No: ${update.admissionNo} | Aadhaar: ${update.aadhaar || 'Pending'}`);
      } else {
        console.warn(`[NOT FOUND] Roll ${update.roll} not found in database.`);
      }
    }

    console.log(`\n================ Summary ================`);
    console.log(`Total Class VI students updated: ${updatedCount} of ${class6Data.length}.`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class VI details:', err);
    process.exit(1);
  }
}

updateClass6Details();
