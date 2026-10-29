import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const rawSpreadsheetData = [
  { roll: 1, name: "Abhijit Singha Roy", father: "Biswajit Singha Roy", mother: "Dulan Deb (Singha Roy)", dob: "12-10-2011", admissionNo: "60/2022", caste: "Gen", aadhaar: "", phone: "", address: "" },
  { roll: 2, name: "Achintya Das", father: "Hiralal Das", mother: "Rinku Das", dob: "29-10-2010", admissionNo: "08/2022", caste: "SC", aadhaar: "254921395154", phone: "7085580289", address: "Moharcherra" },
  { roll: 3, name: "Aditya Biswas", father: "Amarchan Biswas", mother: "Namita Sarkar (Biswas)", dob: "23-09-2010", admissionNo: "37/2022", caste: "SC", aadhaar: "246752545084", phone: "8132080629", address: "Moharcherra" },
  { roll: 4, name: "Agrajit Ghosh", father: "Sukhamoy Ghosh", mother: "Manju Ghosh", dob: "09-11-2010", admissionNo: "45/2022", caste: "OBC", aadhaar: "584616958075", phone: "6009420335", address: "Moharcherra" },
  { roll: 5, name: "Ahili Das", father: "Sonamohan Das", mother: "Sunita Das", dob: "05-05-2011", admissionNo: "07/2025", caste: "SC", aadhaar: "638466807755", phone: "9836296659", address: "Kamalnagar" },
  { roll: 6, name: "Ajoy Biswas", father: "Arun Biswas", mother: "Sabitri Sarkar Biswas", dob: "22-09-2010", admissionNo: "33/2022", caste: "SC", aadhaar: "218781810929", phone: "9612984882", address: "Moharcherra" },
  { roll: 7, name: "Anima Das", father: "Adhirdal Das", mother: "Pradima Rani Das", dob: "21-09-2010", admissionNo: "58/2022", caste: "SC", aadhaar: "926872306397", phone: "6033435705", address: "Moharcherra" },
  { roll: 8, name: "Anishka Biswas", father: "Uttam Biswas", mother: "Sefali Halder (Biswas)", dob: "09-09-2010", admissionNo: "55/2022", caste: "SC", aadhaar: "291922155442", phone: "9083746204", address: "Uttar Kamalnagar, Kalyanpur" },
  { roll: 9, name: "Ankur Deb", father: "Manik Deb", mother: "Rita Deb", dob: "14-08-2010", admissionNo: "26/2022", caste: "Gen", aadhaar: "494094942491", phone: "9293043451", address: "Kamalnagar" },
  { roll: 10, name: "Anujit Das", father: "Krishnadhan Das", mother: "Vijala Das", dob: "21-04-2010", admissionNo: "29/2022", caste: "SC", aadhaar: "391053603827", phone: "", address: "Moharcherra" },
  { roll: 11, name: "Aparna Das", father: "Sankar Das", mother: "Laxmi Rani Das", dob: "14-10-2010", admissionNo: "11/2025", caste: "SC", aadhaar: "948940173862", phone: "8414854959", address: "Nagarpur, TLM" },
  { roll: 12, name: "Apurba Das", father: "Abhijit Das", mother: "Alpana Das", dob: "26-02-2011", admissionNo: "31/2022", caste: "SC", aadhaar: "409916654594", phone: "7085574099", address: "Moharcherra" },
  { roll: 13, name: "Archita Das", father: "Ashok Das", mother: "Rama Rani Das", dob: "15-12-2010", admissionNo: "04/2025", caste: "SC", aadhaar: "654986193797", phone: "9612879187", address: "Kamalnagar" },
  { roll: 14, name: "Arup Biswas", father: "Ajit Biswas", mother: "Sama Rani Shil (Biswas)", dob: "19-04-2011", admissionNo: "07/2022", caste: "SC", aadhaar: "650098953945", phone: "", address: "Kamalnagar" },
  { roll: 15, name: "Ashish Debnath", father: "Late Amrit Debnath", mother: "Radha Rani Debnath", dob: "08-05-2011", admissionNo: "21/2022", caste: "OBC", aadhaar: "288871730867", phone: "6033403110", address: "Moharcherra" },
  { roll: 16, name: "Ayush Das", father: "Sukhen Das", mother: "Rina Das", dob: "25-02-2011", admissionNo: "61/2022", caste: "SC", aadhaar: "714888387750", phone: "9612101283", address: "Moharcherra" },
  { roll: 17, name: "Barsha Das", father: "Ajit Das", mother: "Aparna Das", dob: "29-03-2011", admissionNo: "14/2022", caste: "SC", aadhaar: "303527436776", phone: "8413073740", address: "Moharcherra" },
  { roll: 18, name: "Bishal Das", father: "Bikash Ch. Das", mother: "Rupali Das", dob: "25-05-2010", admissionNo: "13/2022", caste: "SC", aadhaar: "704386794934", phone: "7085185950", address: "Moharcherra" },
  { roll: 19, name: "Deepshikha Das", father: "Bijoy Das", mother: "Rubi Rani Das", dob: "18-09-2010", admissionNo: "01/2022", caste: "SC", aadhaar: "814281625356", phone: "8131076937", address: "Moharcherra" },
  { roll: 20, name: "Dipa Biswas", father: "Khokan Biswas", mother: "Nanda Rani Sarkar (Biswas)", dob: "20-03-2010", admissionNo: "27/2022", caste: "SC", aadhaar: "437428609335", phone: "9862393685", address: "Kamalnagar" },
  { roll: 21, name: "Dipa Roy", father: "Kalicharan Roy", mother: "Sabita Sarkar (Roy)", dob: "10-11-2010", admissionNo: "48/2022", caste: "SC", aadhaar: "202467372957", phone: "6009636774", address: "Moharcherra" },
  { roll: 22, name: "Dipali Sarkar", father: "Sushanta Sarkar", mother: "Shanti Sarkar", dob: "20-06-2009", admissionNo: "22/2025", caste: "SC", aadhaar: "969391582482", phone: "8730875919", address: "Moharcherra" },
  { roll: 23, name: "Dipesh Modak", father: "Dipak Modak", mother: "Shilpi Rani Deb (Modak)", dob: "20-11-2010", admissionNo: "40/2022", caste: "OBC", aadhaar: "442654916704", phone: "8131925285", address: "Kamalnagar" },
  { roll: 24, name: "Dipika Nandi", father: "Dipak Nandi", mother: "Banti Deb (Nandi)", dob: "26-12-2010", admissionNo: "04/2022", caste: "SC", aadhaar: "906144681811", phone: "9366456683", address: "Moharcherra" },
  { roll: 25, name: "Diya Das", father: "Dayananda Das", mother: "Srimati Das", dob: "28-09-2010", admissionNo: "02/2025", caste: "SC", aadhaar: "388381269642", phone: "9863617342", address: "Kamalnagar" },
  { roll: 26, name: "Grenelia Debbarma", father: "Arjun Debbarma", mother: "Prijina Debbarma", dob: "24-09-2011", admissionNo: "08/2025", caste: "ST", aadhaar: "235903858660", phone: "6909069892", address: "Debendra Sardar Para, TLM" },
  { roll: 27, name: "Goutam Debnath", father: "Upendra Debnath", mother: "Nirmala Debnath", dob: "22-06-2011", admissionNo: "18/2025", caste: "OBC", aadhaar: "484333391896", phone: "8974110498", address: "Uttar Kamalnagar" },
  { roll: 28, name: "Hriday Debnath", father: "Pradip Debnath", mother: "Jhuma Debnath", dob: "25-12-2010", admissionNo: "57/2022", caste: "OBC", aadhaar: "772064524659", phone: "7640974747", address: "Moharcherra" },
  { roll: 29, name: "Jayanta Sarkar", father: "Krishnadhan Sarkar", mother: "Champa Sarkar", dob: "11-04-2010", admissionNo: "52/2022", caste: "SC", aadhaar: "536704533983", phone: "9615792087", address: "Kamalnagar" },
  { roll: 30, name: "Jayashree Biswas", father: "Laxman Biswas", mother: "Putul Rani Biswas", dob: "31-01-2011", admissionNo: "10/2025", caste: "SC", aadhaar: "226587438766", phone: "9436490592", address: "Kamalnagar, KLP" },
  { roll: 31, name: "Joy Debnath", father: "Uttam Debnath", mother: "Jhuma Debnath", dob: "24-08-2011", admissionNo: "16/2025", caste: "OBC", aadhaar: "772177202546", phone: "9863815721", address: "Uttar Kamalnagar" },
  { roll: 32, name: "Joydip Das", father: "Satya Ranjan Das", mother: "Suchitra Das", dob: "10-09-2010", admissionNo: "05/2022", caste: "SC", aadhaar: "994529589956", phone: "7085318960", address: "Moharcherra" },
  { roll: 33, name: "Kartik Das", father: "Sanjoy Das", mother: "Arpita Das", dob: "28-10-2010", admissionNo: "22/2022", caste: "SC", aadhaar: "424831998439", phone: "7005857042", address: "Moharcherra" },
  { roll: 34, name: "Mallika Das", father: "Nantu Das", mother: "Dipali Bala Das", dob: "20-05-2009", admissionNo: "30/2022", caste: "SC", aadhaar: "", phone: "9362986272", address: "Kamalnagar" },
  { roll: 35, name: "Mandira Debnath", father: "Subodh Debnath", mother: "Manika Debnath", dob: "11-01-2011", admissionNo: "63/2022", caste: "OBC", aadhaar: "911670107302", phone: "9863784835", address: "Kamalnagar" },
  { roll: 36, name: "Manisa Das", father: "Pintu Das", mother: "Anima Das", dob: "18-02-2011", admissionNo: "14/2025", caste: "SC", aadhaar: "433962408950", phone: "9863831547", address: "Kamalnagar, KLP" },
  { roll: 37, name: "Mitu Das", father: "Dilip Das", mother: "Anjana Das", dob: "18-12-2010", admissionNo: "10/2022", caste: "SC", aadhaar: "883990069913", phone: "7085852448", address: "Moharcherra" },
  { roll: 38, name: "Moutushi Debnath", father: "Mintu Debnath", mother: "Anita Debnath", dob: "17-11-2010", admissionNo: "39/2022", caste: "OBC", aadhaar: "524030267703", phone: "8787747807", address: "Kamalnagar" },
  { roll: 39, name: "Mukta Rani Sarkar", father: "Biswajit Sarkar", mother: "Dipali Sarkar", dob: "10-06-2009", admissionNo: "53/2022", caste: "SC", aadhaar: "468107421447", phone: "9366916029", address: "Kamalnagar" },
  { roll: 40, name: "Niha Nama", father: "Hirendra Nama", mother: "Sabitri Nama", dob: "12-06-2010", admissionNo: "35/2022", caste: "SC", aadhaar: "311202317462", phone: "8798361523", address: "Moharcherra" },
  { roll: 41, name: "Papiya Modak", father: "Ranjan Modak", mother: "Mukta Modak", dob: "07-07-2011", admissionNo: "15/2025", caste: "OBC", aadhaar: "897198763431", phone: "7005351208", address: "Kamalnagar, KLP" },
  { roll: 42, name: "Papiya Nama", father: "Sadhan Nama", mother: "Sumitra Nama", dob: "26-10-2010", admissionNo: "09/2022", caste: "SC", aadhaar: "451549500741", phone: "9612580713", address: "Moharcherra" },
  { roll: 43, name: "Paromita Das", father: "Parimal Das", mother: "Laxmi Bala Bhowmik (Das)", dob: "27-06-2011", admissionNo: "03/2025", caste: "SC", aadhaar: "930615669547", phone: "8787520212", address: "Kamalnagar, KLP" },
  { roll: 44, name: "Piu Deb", father: "Pijush Deb", mother: "Soma Deb", dob: "29-10-2010", admissionNo: "18/2022", caste: "Gen", aadhaar: "895318171125", phone: "9612053491", address: "Kamalnagar, KLP" },
  { roll: 45, name: "Prakash Das", father: "Paplu Das", mother: "Ranubala Sarkar Das", dob: "03-03-2011", admissionNo: "19/2025", caste: "SC", aadhaar: "720043750632", phone: "9863196516", address: "Kamalnagar, KLP" },
  { roll: 46, name: "Prasanta Das", father: "Dulal Das", mother: "Shipra Rani Das", dob: "27-10-2010", admissionNo: "46/2022", caste: "SC", aadhaar: "596045353330", phone: "8787525480", address: "Moharcherra" },
  { roll: 47, name: "Pritam Debnath", father: "Partha Debnath", mother: "Mamatamayee Debnath", dob: "19-01-2011", admissionNo: "23/2022", caste: "OBC", aadhaar: "938193792893", phone: "9089671806", address: "Moharcherra" },
  { roll: 48, name: "Puja Das", father: "Dilip Das", mother: "Dipali Das", dob: "25-05-2011", admissionNo: "16/2022", caste: "SC", aadhaar: "984479488514", phone: "8414844582", address: "Moharcherra" },
  { roll: 49, name: "Puja Sarkar", father: "Goutam Sarkar", mother: "Kalpana Nama Sarkar", dob: "23-10-2010", admissionNo: "49/2022", caste: "SC", aadhaar: "858827602303", phone: "7005452908", address: "Moharcherra" },
  { roll: 50, name: "Purnima Ghosh", father: "Debashish Ghosh", mother: "Anjali Deb (Ghosh)", dob: "18-02-2011", admissionNo: "36/2022", caste: "OBC", aadhaar: "931247306404", phone: "8974505125", address: "" },
  { roll: 51, name: "Rahul Biswas", father: "Dulal Biswas", mother: "Aramati Das (Biswas)", dob: "10-06-2011", admissionNo: "11/2022", caste: "SC", aadhaar: "497656540001", phone: "7629005494", address: "Moharcherra" },
  { roll: 52, name: "Rakhi Ghosh", father: "Chandra Shekhar Ghosh", mother: "Ratna Bala Giri Ghosh", dob: "13-08-2011", admissionNo: "53/2022", caste: "OBC", aadhaar: "474011434735", phone: "9866534781", address: "Moharcherra" },
  { roll: 53, name: "Rima Biswas", father: "Rabindra Biswas", mother: "Ruma Biswas", dob: "04-04-2011", admissionNo: "20/2025", caste: "SC", aadhaar: "449937597281", phone: "8131074694", address: "Champlai, TLM" },
  { roll: 54, name: "Rima Debnath", father: "Parimal Debnath", mother: "Rina Debnath", dob: "30-09-2010", admissionNo: "34/2022", caste: "OBC", aadhaar: "348454840285", phone: "8787492352", address: "Moharcherra" },
  { roll: 55, name: "Ripa Das", father: "Shanta Kumar Das", mother: "Rinki Das", dob: "23-09-2010", admissionNo: "17/2025", caste: "SC", aadhaar: "850074873058", phone: "8131067156", address: "Kamalnagar, KLP" },
  { roll: 56, name: "Ripan Halder", father: "Radan Halder", mother: "Malati Halder", dob: "05-01-2011", admissionNo: "24/2022", caste: "SC", aadhaar: "312844323091", phone: "9862517246", address: "Moharcherra" },
  { roll: 57, name: "Ritesh Biswas", father: "Ranjit Biswas", mother: "Supriti Biswas", dob: "08-09-2010", admissionNo: "17/2022", caste: "SC", aadhaar: "965529069524", phone: "9089030566", address: "Moharcherra" },
  { roll: 58, name: "Rohit Das", father: "Sanjit Das", mother: "Rekha Das", dob: "02-11-2010", admissionNo: "19/2022", caste: "SC", aadhaar: "333950555737", phone: "8837388270", address: "Moharcherra" },
  { roll: 59, name: "Rupali Sarkar", father: "Tarani Sarkar", mother: "Bakul Sarkar", dob: "18-01-2011", admissionNo: "42/2022", caste: "SC", aadhaar: "497213328782", phone: "9366912079", address: "Kamalnagar, KLP" },
  { roll: 60, name: "Sanjib Sarkar", father: "Narottam Sarkar", mother: "Pratima Sarkar", dob: "07-05-2011", admissionNo: "01/2023", caste: "SC", aadhaar: "218830044410", phone: "8787806059", address: "Moharcherra" },
  { roll: 61, name: "Sarajit Sarkar", father: "Sujit Sarkar", mother: "Soma Rani Sarkar", dob: "24-10-2010", admissionNo: "38/2022", caste: "SC", aadhaar: "805301276112", phone: "9080770060", address: "Kamalnagar, KLP" },
  { roll: 62, name: "Shantanu Das", father: "", mother: "", dob: "", admissionNo: "", caste: "", aadhaar: "", phone: "", address: "" },
  { roll: 63, name: "Shrabanti Nama", father: "Ratan Nama", mother: "Malati Biswas (Nama)", dob: "24-05-2011", admissionNo: "12/2022", caste: "SC", aadhaar: "374427209034", phone: "9362676368", address: "Moharcherra" },
  { roll: 64, name: "Sonali Sarkar", father: "Tapan Sarkar", mother: "Sujata Nama (Sarkar)", dob: "27-04-2011", admissionNo: "01/2025", caste: "SC", aadhaar: "642127439566", phone: "9366492110", address: "Kamalnagar" },
  { roll: 65, name: "Subhajit Das", father: "Biswajit Das", mother: "Pinki Majumder Das", dob: "19-11-2010", admissionNo: "47/2022", caste: "SC", aadhaar: "642358720042", phone: "9233626821", address: "Moharcherra" },
  { roll: 66, name: "Subhajit Das", father: "Premjit Das", mother: "Jamuna Das", dob: "05-02-2011", admissionNo: "51/2022", caste: "SC", aadhaar: "208375082660", phone: "8131845149", address: "Moharcherra" },
  { roll: 67, name: "Subhajit Debnath", father: "Litan Debnath", mother: "Rekha Debnath", dob: "10-04-2011", admissionNo: "32/2022", caste: "OBC", aadhaar: "591897280665", phone: "8119084674", address: "Moharcherra" },
  { roll: 68, name: "Subrajit Das", father: "Paritosh Das", mother: "Soma Biswas (Das)", dob: "14-12-2010", admissionNo: "20/2022", caste: "SC", aadhaar: "702723371599", phone: "9862621993", address: "Moharcherra" },
  { roll: 69, name: "Subrata Das", father: "Babul Das", mother: "Shikha Rani Das", dob: "09-12-2010", admissionNo: "03/2022", caste: "SC", aadhaar: "503827788125", phone: "8798423604", address: "Moharcherra" },
  { roll: 70, name: "Sudip Das", father: "Kajal Das", mother: "Tapasi Das", dob: "20-04-2010", admissionNo: "28/2022", caste: "SC", aadhaar: "499517645658", phone: "6909273857", address: "Kamalnagar, KLP" },
  { roll: 71, name: "Sudipta Das", father: "Litan Das", mother: "Soma Sarkar Das", dob: "16-04-2010", admissionNo: "02/2022", caste: "SC", aadhaar: "983801685010", phone: "9366891206", address: "Kamalnagar, KLP" },
  { roll: 72, name: "Sukamal Das", father: "Subhash Das", mother: "Anjana Das", dob: "12-11-2009", admissionNo: "44/2022", caste: "SC", aadhaar: "755224308020", phone: "6009855422", address: "Kamalnagar, KLP" },
  { roll: 73, name: "Sukla Biswas", father: "Uttam Biswas", mother: "Puspa Rani Das (Biswas)", dob: "26-02-2011", admissionNo: "09/2025", caste: "SC", aadhaar: "755472737327", phone: "8366457917", address: "Kamalnagar, KLP" },
  { roll: 74, name: "Suman Biswas", father: "Sunil Biswas", mother: "Shika Sarkar (Biswas)", dob: "28-01-2011", admissionNo: "54/2022", caste: "SC", aadhaar: "652056612064", phone: "", address: "Kamalnagar, KLP" },
  { roll: 75, name: "Susmita Debnath", father: "Arjun Debnath", mother: "Prianati Debnath", dob: "14-09-2011", admissionNo: "12/2025", caste: "OBC", aadhaar: "278188575970", phone: "6009794058", address: "Champlai, TLM" },
  { roll: 76, name: "Susmita Gope", father: "Pradip Gope", mother: "Archana Gope", dob: "04-08-2010", admissionNo: "41/2022", caste: "OBC", aadhaar: "262540858857", phone: "8798793919", address: "Moharcherra" },
  { roll: 77, name: "Taniya Biswas", father: "P. Shrinibash Biswas", mother: "Rinku Sarkar Biswas", dob: "14-02-2011", admissionNo: "15/2022", caste: "SC", aadhaar: "932110800484", phone: "9862260083", address: "Kamalnagar, KLP" },
  { roll: 78, name: "Taniya Sarkar", father: "Manoranjan Sarkar", mother: "Mistu Das (Sarkar)", dob: "25-05-2011", admissionNo: "05/2025", caste: "SC", aadhaar: "", phone: "9366026749", address: "Moharcherra, TLM" },
  { roll: 79, name: "Trisha Nama", father: "Biswajit Nama", mother: "Lalita Nama", dob: "24-09-2010", admissionNo: "13/2025", caste: "SC", aadhaar: "581318993024", phone: "8787660544", address: "Champlai, TLM" },
  { roll: 80, name: "Trisanjit Das", father: "Indrajit Das", mother: "Shilpi Das", dob: "26-08-2010", admissionNo: "50/2022", caste: "SC", aadhaar: "533862355757", phone: "8837253806", address: "Moharcherra" },
  { roll: 81, name: "Udai Biswas", father: "Amrit Biswas", mother: "Jhulan Sarkar (Biswas)", dob: "03-06-2011", admissionNo: "25/2022", caste: "SC", aadhaar: "979527789353", phone: "9863221944", address: "Moharcherra" }
];

async function applyClass10Updates() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    let updatedCount = 0;
    for (const item of rawSpreadsheetData) {
      const rollNum = item.roll;
      const rollStr = String(rollNum).padStart(2, '0');
      const studentId = `PMS-26-10-${rollStr}`;

      let student = await Student.findOne({ classId: 'class-10', rollNumber: rollNum });
      if (!student) {
        student = await Student.findOne({ studentId });
      }

      if (!student) {
        student = new Student({
          studentId,
          roll: rollStr,
          rollNumber: rollNum,
          name: item.name,
          classId: 'class-10',
          className: 'Class X',
          gender: 'Boy',
          academicYear: '2026-2027',
          status: 'Enrolled'
        });
      }

      // Update fields with spreadsheet data (preserving non-empty existing DB values if spreadsheet is blank)
      if (item.name) student.name = item.name;
      if (item.father) student.father = item.father;
      if (item.mother) student.mother = item.mother;
      student.guardian = student.father || student.mother || student.guardian || '';
      if (item.dob) student.dob = item.dob;
      if (item.admissionNo) student.admissionNo = item.admissionNo;
      if (item.caste) student.caste = item.caste;
      if (item.aadhaar) student.aadhaar = item.aadhaar;
      if (item.phone) student.phone = item.phone;
      if (item.address) student.address = item.address;

      await student.save();
      updatedCount++;
      console.log(`[UPDATED] Roll ${rollStr}: ${student.name.padEnd(20, ' ')} | Adm: ${(student.admissionNo || '-').padEnd(8, ' ')} | Caste: ${(student.caste || '-').padEnd(5, ' ')} | Aadhaar: ${(student.aadhaar || '-').padEnd(14, ' ')} | Ph: ${student.phone || '-'}`);
    }

    console.log(`\nSuccessfully applied updates to all ${updatedCount} Class X students.`);
    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error applying Class 10 updates:', err);
    process.exit(1);
  }
}

applyClass10Updates();
