import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const rawClass6Data = [
  { roll: 1, name: 'Arjita Das', dob: '02/01/2015', phone: '8974466019', mother: 'KRISHNA RANI DAS', father: 'AJOY DAS', guardian: 'AJOY DAS', penNumber: '21921734264', apaarId: '848550333051', gender: 'Girl' },
  { roll: 2, name: 'Abhijit Nama', dob: '01/04/2015', phone: '6033199213', mother: 'MANIKA BISWAS', father: 'KRISHNADHAN NAMA', guardian: 'KRISHNADHAN NAMA', penNumber: '21952493321', apaarId: '843250045041', gender: 'Boy' },
  { roll: 3, name: 'Akash Nandi', dob: '20/08/2015', phone: '6009922089', mother: 'PURNIMA DAS NANDI', father: 'SEBAL NANDI', guardian: 'SEBAL NANDI', penNumber: '21930439923', apaarId: '721668943944', gender: 'Boy' },
  { roll: 4, name: 'Anushka Sarkar', dob: '25/02/2015', phone: '9089829128', mother: 'ANURUPA SARKAR', father: 'DULAL SARKAR', guardian: 'DULAL SARKAR', penNumber: '22112101763', apaarId: '227283681248', gender: 'Girl' },
  { roll: 5, name: 'Anushka Biswas', dob: '23/10/2015', phone: '9774110584', mother: 'RIMA SARKAR BISWAS', father: 'BIMAL BISWAS', guardian: 'BIMAL BISWAS', penNumber: '22173207668', apaarId: '184042115035', gender: 'Girl' },
  { roll: 6, name: 'Anusri Das', dob: '', phone: '', mother: '', father: '', guardian: '', penNumber: '', apaarId: '', gender: 'Girl' },
  { roll: 7, name: 'Arohi Biswas', dob: '26/01/2016', phone: '6909955982', mother: 'CHUMKI BISWAS', father: 'SANKAR BISWAS', guardian: 'SANKAR BISWAS', penNumber: '22114677994', apaarId: '621606149323', gender: 'Girl' },
  { roll: 8, name: 'Ayush Das', dob: '', phone: '', mother: '', father: '', guardian: '', penNumber: '', gender: 'Boy' },
  { roll: 9, name: 'Bishal Biswas', dob: '01/05/2015', phone: '6009897403', mother: 'BINA SARKAR BISWAS', father: 'RAICHAN BISWAS', guardian: 'RAICHAN BISWAS', penNumber: '21994957896', apaarId: '124931299084', gender: 'Boy' },
  { roll: 10, name: 'Deep Tanay Sarkar', dob: '30/03/2015', phone: '7005913051', mother: 'PINKI GHOSH SARKAR', father: 'ABHIJIT SARKAR', guardian: 'ABHIJIT SARKAR', penNumber: '22427162005', apaarId: '749332705690', gender: 'Boy' },
  { roll: 11, name: 'Diya Nama', dob: '06/08/2015', phone: '9862476500', mother: 'MOUSUMI SARKAR NAMA', father: 'BISNU NAMA', guardian: 'BISNU NAMA', penNumber: '22262101620', apaarId: '905680381657', gender: 'Girl' },
  { roll: 12, name: 'Diya Sarkar', dob: '15/02/2015', phone: '9366726497', mother: 'SHIPRA RANI SARKAR', father: 'CHITTARANJAN SARKAR', guardian: 'CHITTARANJAN SARKAR', penNumber: '21992654197', apaarId: '396442502769', gender: 'Girl' },
  { roll: 13, name: 'Ishan Das', dob: '20/10/2014', phone: '6033364783', mother: 'BABI DAS', father: 'LITAN DAS', guardian: 'LITAN DAS', penNumber: '22581779416', apaarId: '548177049567', gender: 'Boy' },
  { roll: 14, name: 'Ishani Shil', dob: '26/03/2015', phone: '9436594868', mother: 'KAKALI SHIL', father: 'SUSHIL CHANDRA SHIL', guardian: 'SUSHIL CHANDRA SHIL', penNumber: '22538727987', apaarId: '697842181267', gender: 'Girl' },
  { roll: 15, name: 'Ishita Das', dob: '11/01/2015', phone: '9863878916', mother: 'SEBIKA DEB DAS', father: 'SHYAMAL DAS', guardian: 'SHYAMAL DAS', penNumber: '22469634097', apaarId: '390962878166', gender: 'Girl' },
  { roll: 16, name: 'Ishmita Biswas', dob: '05/11/2015', phone: '9612348414', mother: 'DIPTI BISWAS', father: 'TAPAN BISWAS', guardian: 'TAPAN BISWAS', penNumber: '21963422858', apaarId: '980988981520', gender: 'Girl' },
  { roll: 17, name: 'Mansi Das', dob: '30/11/2014', phone: '6009367175', mother: 'KANIKA DAS', father: 'SAJAL DAS', guardian: 'SAJAL DAS', penNumber: '22044150335', apaarId: '927233770926', gender: 'Girl' },
  { roll: 18, name: 'Mitrika Debnath', dob: '18/11/2015', phone: '8974353840', mother: 'MOUSUMI BALA DEBNATH', father: 'ISWAR DEBNATH', guardian: 'ISWAR DEBNATH', penNumber: '22145676254', apaarId: '558926293600', gender: 'Boy' },
  { roll: 19, name: 'Nandita Shil', dob: '15/04/2015', phone: '9366130158', mother: 'SMRITI RANI SHIL', father: 'NIRMAL SHIL', guardian: 'NIRMAL SHIL', penNumber: '22160956144', apaarId: '787373833060', gender: 'Girl' },
  { roll: 20, name: 'Nayan Das', dob: '17/12/2014', phone: '9366465718', mother: 'MADHUMITA DAS', father: 'NANTU DAS', guardian: 'NANTU DAS', penNumber: '22618451888', apaarId: '893666876014', gender: 'Boy' },
  { roll: 21, name: 'Nayanika Das', dob: '07/02/2015', phone: '9089934564', mother: 'MAMPI MITRA', father: 'SURAJIT DAS', guardian: 'SURAJIT DAS', penNumber: '23074065945', apaarId: '722313844449', gender: 'Girl' },
  { roll: 22, name: 'Nilam Dey', dob: '06/06/2015', phone: '8471849636', mother: 'JABA DEY', father: 'MANJIT DEY', guardian: 'MANJIT DEY', penNumber: '22350721372', apaarId: '', gender: 'Boy' },
  { roll: 23, name: 'Paramita Das', dob: '06/01/2016', phone: '8415085833', mother: 'PURNIMA BISWAS DAS', father: 'SARAJIT DAS', guardian: 'SARAJIT DAS', penNumber: '22219250935', apaarId: '607228322040', gender: 'Girl' },
  { roll: 24, name: 'Priyotosh Paul', dob: '16/11/2015', phone: '8837259725', mother: 'SHIBANI DAS PAUL', father: 'PANKAJ PAUL', guardian: 'PANKAJ PAUL', penNumber: '22410235508', apaarId: '324999286720', gender: 'Boy' },
  { roll: 25, name: 'Pushpita Debnath', dob: '03/02/2016', phone: '9366882130', mother: 'RUPALI DEBNATH', father: 'GOPI DEBNATH', guardian: 'GOPI DEBNATH', penNumber: '22504270813', apaarId: '276084448323', gender: 'Girl' },
  { roll: 26, name: 'Rahit Das', dob: '19/08/2015', phone: '9774928865', mother: 'LAXMI DASGUPTA DAS', father: 'SUBHASH CHANDRA DAS', guardian: 'SUBHASH CHANDRA DAS', penNumber: '22105500283', apaarId: '229537291504', gender: 'Boy' },
  { roll: 27, name: 'Rajdeep Debnath', dob: '12/11/2015', phone: '8787562601', mother: 'MOUMITA DEBNATH', father: 'RAMDHAN DEBNATH', guardian: 'RAMDHAN DEBNATH', penNumber: '22424955551', apaarId: '295150145635', gender: 'Boy' },
  { roll: 28, name: 'Riya Das', dob: '24/08/2015', phone: '9402576028', mother: 'SUMITRA RANI DAS', father: 'MANTU DAS', guardian: 'MANTU DAS', penNumber: '21858166436', apaarId: '360811639694', gender: 'Girl' },
  { roll: 29, name: 'Sagnik Das', dob: '13/01/2015', phone: '7630939574', mother: 'SUPRAVA SARKAR DAS', father: 'TAPAS DAS', guardian: 'TAPAS DAS', penNumber: '22365544742', apaarId: '123429317746', gender: 'Boy' },
  { roll: 30, name: 'Santanu Sarkar', dob: '04/07/2015', phone: '6009586735', mother: 'ANJANA SARKAR', father: 'YABARAJ SARKAR', guardian: 'YABARAJ SARKAR', penNumber: '22435064998', apaarId: '120110672609', gender: 'Boy' },
  { roll: 31, name: 'Sayantika Sarkar', dob: '09/02/2015', phone: '9436929544', mother: 'JHUMA BISWAS SARKAR', father: 'SHYAMAL SARKAR', guardian: 'SHYAMAL SARKAR', penNumber: '22303985920', apaarId: '291845526676', gender: 'Girl' },
  { roll: 32, name: 'Subhajit Nama', dob: '23/05/2015', phone: '6009270146', mother: 'SATYA BATI NAMA', father: 'RADHA RANJAN NAMA', guardian: 'RADHA RANJAN NAMA', penNumber: '22081368037', apaarId: '144532266853', gender: 'Boy' },
  { roll: 33, name: 'Subhamoy Biswas', dob: '27/06/2015', phone: '8974640304', mother: 'BINA BISWAS', father: 'SWAPAN BISWAS', guardian: 'SWAPAN BISWAS', penNumber: '21996782827', apaarId: '152678035203', gender: 'Boy' },
  { roll: 34, name: 'Subhankar Biswas', dob: '04/06/2015', phone: '9863210344', mother: 'SUCHITRA BISWAS', father: 'ARUN BISWAS', guardian: 'ARUN BISWAS', penNumber: '22242730851', apaarId: '935089302555', gender: 'Boy' },
  { roll: 35, name: 'Subajit Debnath', dob: '27/04/2015', phone: '9383267804', mother: 'SWAPNA DEBNATH', father: 'KAJAL DEBNATH', guardian: 'KAJAL DEBNATH', penNumber: '21908963439', apaarId: '', gender: 'Boy' },
  { roll: 36, name: 'Sudip Mallik', dob: '15/03/2015', phone: '9089598486', mother: 'SUKLA SARKAR', father: 'NARUTTAM MALLIK', guardian: 'NARUTTAM MALLIK', penNumber: '21967542934', apaarId: '250704113436', gender: 'Boy' },
  { roll: 37, name: 'Sujoy Nama', dob: '', phone: '', mother: '', father: '', guardian: '', penNumber: '', apaarId: '', gender: 'Boy' },
  { roll: 38, name: 'Sumit Das', dob: '18/05/2015', phone: '6009234794', mother: 'CHAMPA DAS', father: 'SANTU DAS', guardian: 'SANTU DAS', penNumber: '21967003622', apaarId: '701685771581', gender: 'Boy' },
  { roll: 39, name: 'Suparna Debnath', dob: '11/04/2015', phone: '8787510744', mother: 'SUCHITRA DEBNATH', father: 'ANUP KUMAR DEBNATH', guardian: 'ANUP KUMAR DEBNATH', penNumber: '21954059860', apaarId: '602213577679', gender: 'Girl' },
  { roll: 40, name: 'Swarup Das', dob: '06/10/2015', phone: '9863949944', mother: 'RENUKA DAS', father: 'NIRANJAN DAS', guardian: 'NIRANJAN DAS', penNumber: '21883566352', apaarId: '775621212309', gender: 'Boy' },
  { roll: 41, name: 'Tanoy Debnath', dob: '04/03/2015', phone: '7628025617', mother: 'SUPARNA DEBNATH', father: 'BISHNU DEBNATH', guardian: 'BISHNU DEBNATH', penNumber: '22246075888', apaarId: '671581392404', gender: 'Boy' },
  { roll: 42, name: 'Tanusri Das', dob: '31/08/2014', phone: '9612705798', mother: 'RADHA RANI DAS', father: 'DILIP DAS', guardian: 'DILIP DAS', penNumber: '22084279362', apaarId: '748231785485', gender: 'Girl' },
  { roll: 43, name: 'Tiasha Debnath', dob: '26/02/2015', phone: '7005945723', mother: 'MOUMITA DEBNATH', father: 'TITAN DEBNATH', guardian: 'TITAN DEBNATH', penNumber: '21895528563', apaarId: '818457670197', gender: 'Girl' },
  { roll: 44, name: 'Trisha Das', dob: '13/12/2014', phone: '6909980121', mother: 'SMRITI DAS', father: 'TAPAS DAS', guardian: 'TAPAS DAS', penNumber: '21856706977', apaarId: '410330322507', gender: 'Girl' },
  { roll: 45, name: 'Trishana Debnath', dob: '13/08/2014', phone: '9233815711', mother: 'JYOTSNA DEBNATH', father: 'SANKAR DEBNATH', guardian: 'SANKAR DEBNATH', penNumber: '22317530038', apaarId: '849193295971', gender: 'Girl' },
  { roll: 46, name: 'Ujjal Ghosh', dob: '11/10/2015', phone: '8731896759', mother: 'BAPPI GHOSH', father: 'UTTAM GHOSH', guardian: 'UTTAM GHOSH', penNumber: '21952415608', apaarId: '165519340328', gender: 'Boy' },
  { roll: 47, name: 'Urmila Nama Das', dob: '30/04/2015', phone: '9612352201', mother: 'JHUMA BISWAS NAMA DAS', father: 'UTTAM KUMAR NAMA DAS', guardian: 'UTTAM KUMAR NAMA DAS', penNumber: '22495265069', apaarId: '844769592848', gender: 'Girl' },
  { roll: 48, name: 'Diya Das', dob: '08/04/2015', phone: '9863182836', mother: 'DIPIKA DAS', father: 'AMARJIT DAS', guardian: 'AMARJIT DAS', penNumber: '21966346033', apaarId: '', gender: 'Girl' },
  { roll: 49, name: 'Rakhi Debnath', dob: '29/08/2015', phone: '9366145918', mother: 'NAMITA DAS DEBNATH', father: 'KAMAL DEBNATH', guardian: 'KAMAL DEBNATH', penNumber: '22479936926', apaarId: '856396954803', gender: 'Girl' },
  { roll: 50, name: 'Akshita Sarkar', dob: '', phone: '', mother: '', father: '', guardian: '', penNumber: '', apaarId: '', gender: 'Girl' }
];

// Realistic base attendance percentages
const attendancePcts = [
  96, 92, 95, 94, 97, 91, 95, 93, 98, 90,
  94, 96, 92, 95, 93, 97, 91, 94, 96, 92,
  95, 93, 98, 94, 96, 91, 95, 92, 97, 93,
  95, 92, 96, 94, 97, 91, 95, 93, 96, 92,
  94, 97, 93, 95, 92, 96, 94, 95, 93, 96
];

async function seedStudents() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(` Connected to MongoDB Atlas: "${mongoose.connection.name}"`);

    // Remove existing Class 6 records to ensure clean sync
    const deleted = await Student.deleteMany({ classId: 'class-6' });
    console.log(` Removed ${deleted.deletedCount} existing records for Class VI.`);

    const studentsToInsert = rawClass6Data.map((st, index) => {
      const rollPadded = String(st.roll).padStart(2, '0');
      const studentId = `PMS-26-06-${rollPadded}`;
      const pct = attendancePcts[index] || 95;

      return {
        studentId,
        roll: rollPadded,
        rollNumber: st.roll,
        name: st.name,
        classId: 'class-6',
        className: 'Class VI',
        gender: st.gender,
        guardian: st.guardian || '',
        father: st.father || '',
        mother: st.mother || '',
        dob: st.dob || '',
        phone: st.phone || '',
        penNumber: st.penNumber || '',
        apaarId: st.apaarId || '',
        attendance: `${pct}%`,
        status: 'Enrolled',
        academicYear: '2026-2027',
        monthlyAttendance: {
          '2026-10': {
            workingDays: 24,
            presentDays: Math.round((24 * pct) / 100),
            notes: 'Regular attendance'
          }
        }
      };
    });

    const result = await Student.insertMany(studentsToInsert);
    console.log(` Successfully inserted ${result.length} students into DB for Class VI in roll no wise!`);

    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected cleanly. Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding students:', error);
    process.exit(1);
  }
}

seedStudents();
