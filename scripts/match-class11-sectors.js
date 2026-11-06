import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sector1List = [
  { name: 'Subhrajit Das', class: 'XI', gender: 'Male', dob: '24-Mar-2010', aadhaar: '703437986349' },
  { name: 'Arghadeep Halder', class: 'XI', gender: 'Male', dob: '06-Oct-2009', aadhaar: '247714564712' },
  { name: 'Pritam Sarkar', class: 'XI', gender: 'Male', dob: '02-Nov-2009', aadhaar: '990142339734' },
  { name: 'Sukanta Das', class: 'XI', gender: 'Male', dob: '23-Jul-2009', aadhaar: '311732430992' },
  { name: 'Akhil Sarkar', class: 'XI', gender: 'Male', dob: '07-Nov-2008', aadhaar: '874579241446' },
  { name: 'Tanmay Sarkar', class: 'XI', gender: 'Male', dob: '16-Mar-2010', aadhaar: '451218716188' },
  { name: 'Kishan Sarkar', class: 'XI', gender: 'Male', dob: '31-Aug-2009', aadhaar: '956819143490' },
  { name: 'Joy Sarkar', class: 'XI', gender: 'Male', dob: '08-Sep-2009', aadhaar: '266147360706' },
  { name: 'Sagar Das', class: 'XI', gender: 'Male', dob: '28-Sep-2009', aadhaar: '474015455503' },
  { name: 'Subankar Sarkar', class: 'XI', gender: 'Male', dob: '13-Apr-2010', aadhaar: '304957529986' },
  { name: 'Pritam Baishya', class: 'XI', gender: 'Male', dob: '13-Aug-2009', aadhaar: '874968745131' },
  { name: 'Ankita Das', class: 'XI', gender: 'Male', dob: '24-Aug-2009', aadhaar: '803172261958' },
  { name: 'Durjoy Biswas', class: 'XI', gender: 'Male', dob: '15-Apr-2009', aadhaar: '769287470414' },
  { name: 'Rajesh Das', class: 'XI', gender: 'Male', dob: '01-Jan-2010', aadhaar: '952056406916' },
  { name: 'Prasanjit Das', class: 'XI', gender: 'Male', dob: '30-Dec-2009', aadhaar: '812462034311' },
  { name: 'Anupam Biswas', class: 'XI', gender: 'Male', dob: '15-May-2010', aadhaar: '443099036521' },
  { name: 'Ankita Das', class: 'XI', gender: 'Male', dob: '17-Aug-2009', aadhaar: '715936983350' },
  { name: 'Nitesh Paul', class: 'XI', gender: 'Male', dob: '11-Jan-2010', aadhaar: '759232408339' },
  { name: 'Shovajit Sarkar', class: 'XI', gender: 'Male', dob: '03-Feb-2010', aadhaar: '969220016667' },
  { name: 'Riya Sarkar', class: 'XI', gender: 'Female', dob: '05-Mar-2010', aadhaar: '688062684036' },
  { name: 'Bipash Das', class: 'XI', gender: 'Male', dob: '08-Dec-2009', aadhaar: '725912386256' },
  { name: 'Supriya Sarkar', class: 'XI', gender: 'Female', dob: '06-Apr-2010', aadhaar: '447417599880' },
  { name: 'Piyash Debnath', class: 'XI', gender: 'Male', dob: '21-Dec-2009', aadhaar: '941577071046' },
  { name: 'Prasanta Paul', class: 'XI', gender: 'Male', dob: '06-Jan-2010', aadhaar: '578489301229' },
  { name: 'Tamal Das', class: 'XI', gender: 'Male', dob: '05-Aug-2010', aadhaar: '216748513221' },
  { name: 'Koushik Debnath', class: 'XI', gender: 'Male', dob: '03-Sep-2009', aadhaar: '540805661976' },
  { name: 'Ruhan Das', class: 'XI', gender: 'Male', dob: '01-Mar-2010', aadhaar: '779893053475' },
  { name: 'Ankita Das', class: 'XI', gender: 'Female', dob: '22-Jul-2010', aadhaar: '565976215366' },
  { name: 'Reshmi Das', class: 'XI', gender: 'Female', dob: '15-Jan-2010', aadhaar: '959590885252' },
  { name: 'Anamika Das', class: 'XI', gender: 'Female', dob: '18-Aug-2009', aadhaar: '558265396070' },
  { name: 'Titash Majumdar', class: 'XI', gender: 'Male', dob: '23-Jun-2010', aadhaar: '382012389180' },
  { name: 'Abhijit Debnath', class: 'XI', gender: 'Male', dob: '12-Dec-2009', aadhaar: '487071977019' },
  { name: 'Ishmit Biswas', class: 'XI', gender: 'Male', dob: '10-Feb-2010', aadhaar: '579740166515' },
  { name: 'Jaya Das', class: 'XI', gender: 'Female', dob: '13-Apr-2010', aadhaar: '421126805869' },
  { name: 'Rajdweep Das', class: 'XI', gender: 'Male', dob: '05-Nov-2009', aadhaar: '660554388515' },
  { name: 'Bristi Das', class: 'XI', gender: 'Female', dob: '08-Oct-2010', aadhaar: '956264703201' },
  { name: 'Riktika Sarkar', class: 'XI', gender: 'Female', dob: '15-Sep-2010', aadhaar: '934495734833' },
  { name: 'Susmita Das', class: 'XI', gender: 'Female', dob: '14-Mar-2010', aadhaar: '286980268203' },
  { name: 'Rupa Acharjee', class: 'XI', gender: 'Female', dob: '19-Aug-2009', aadhaar: '742464715966' },
  { name: 'Hrithik Modak', class: 'XI', gender: 'Male', dob: '31-Mar-2010', aadhaar: '734751227974' }
];

const sector2List = [
  { name: 'Tanip Nama', class: 'XI', gender: 'Male', dob: '23-Mar-2010', aadhaar: '459066344347' },
  { name: 'Sandip Debnath', class: 'XI', gender: 'Male', dob: '02-Jun-2010', aadhaar: '840001634573' },
  { name: 'Biswajit Das', class: 'XI', gender: 'Male', dob: '17-Sep-2009', aadhaar: '700986453353' },
  { name: 'Papiya Nama Sudra', class: 'XI', gender: 'Female', dob: '03-Aug-2010', aadhaar: '747723801811' },
  { name: 'Sourav Das', class: 'XI', gender: 'Male', dob: '06-Feb-2010', aadhaar: '540140872751' },
  { name: 'Nayan Chowdhury', class: 'XI', gender: 'Male', dob: '02-Jun-2008', aadhaar: '986142643352' },
  { name: 'Ankita Biswas', class: 'XI', gender: 'Female', dob: '26-Jun-2009', aadhaar: '451280573870' },
  { name: 'Lipi Biswas', class: 'XI', gender: 'Female', dob: '09-Sep-2009', aadhaar: '863538390235' },
  { name: 'Sanjoy Mallik', class: 'XI', gender: 'Male', dob: '15-Feb-2009', aadhaar: '330382317692' },
  { name: 'Susmita Saha', class: 'XI', gender: 'Female', dob: '12-May-2010', aadhaar: '966987241370' },
  { name: 'Rima Debnath', class: 'XI', gender: 'Female', dob: '22-Nov-2009', aadhaar: '203687303297' },
  { name: 'Niharika Biswas', class: 'XI', gender: 'Female', dob: '27-Feb-2010', aadhaar: '952802603735' },
  { name: 'Rupan Sarkar', class: 'XI', gender: 'Male', dob: '10-Nov-2009', aadhaar: '389343359048' },
  { name: 'Pritush Das', class: 'XI', gender: 'Male', dob: '26-Sep-2009', aadhaar: '867919802863' },
  { name: 'Dhiman Das', class: 'XI', gender: 'Male', dob: '29-Jun-2009', aadhaar: '549451457106' },
  { name: 'Sujan Modak', class: 'XI', gender: 'Male', dob: '03-Dec-2009', aadhaar: '516559394113' },
  { name: 'Adipta Das', class: 'XI', gender: 'Male', dob: '11-Jun-2009', aadhaar: '760121993703' },
  { name: 'Dipanjan Debnath', class: 'XI', gender: 'Male', dob: '18-Jan-2010', aadhaar: '992565523255' },
  { name: 'Abhijit Das', class: 'XI', gender: 'Male', dob: '26-Apr-2010', aadhaar: '584851487537' },
  { name: 'Ruma Das', class: 'XI', gender: 'Female', dob: '02-May-2010', aadhaar: '509553554563' },
  { name: 'Prasenjit Sarkar', class: 'XI', gender: 'Male', dob: '01-Aug-2010', aadhaar: '813995195178' },
  { name: 'Jhumur Biswas', class: 'XI', gender: 'Female', dob: '02-Nov-2009', aadhaar: '209334290170' },
  { name: 'Jhutika Nama', class: 'XI', gender: 'Female', dob: '30-May-2010', aadhaar: '508262618004' },
  { name: 'Susmita Biswas', class: 'XI', gender: 'Female', dob: '23-Oct-2009', aadhaar: '463670533847' },
  { name: 'Dipayan Debnath', class: 'XI', gender: 'Male', dob: '07-Jun-2010', aadhaar: '554830639864' },
  { name: 'Jiban Biswas', class: 'XI', gender: 'Male', dob: '25-Jan-2009', aadhaar: '917076449377' },
  { name: 'Deb Biswas', class: 'XI', gender: 'Male', dob: '15-Apr-2010', aadhaar: '414315612000' },
  { name: 'Bipul Debnath', class: 'XI', gender: 'Male', dob: '26-Sep-2009', aadhaar: '417076817402' },
  { name: 'Anamika Biswas', class: 'XI', gender: 'Female', dob: '16-Sep-2010', aadhaar: '681086039453' },
  { name: 'Susmita Deb Nath', class: 'XI', gender: 'Female', dob: '18-Jan-2010', aadhaar: '625876300762' },
  { name: 'Anamika Das', class: 'XI', gender: 'Female', dob: '18-Aug-2009', aadhaar: '558265396070' },
  { name: 'Joydipa Ghosh', class: 'XI', gender: 'Female', dob: '14-Aug-2009', aadhaar: '818066103349' },
  { name: 'Jwel Debnath', class: 'XI', gender: 'Female', dob: '14-Mar-2010', aadhaar: '912610227276' },
  { name: 'Arpita Biswas', class: 'XI', gender: 'Female', dob: '05-Aug-2009', aadhaar: '621855843664' },
  { name: 'Dipika Biswas', class: 'XI', gender: 'Female', dob: '16-Jan-2010', aadhaar: '325397012419' },
  { name: 'Ujjala Barma', class: 'XI', gender: 'Female', dob: '16-Feb-2010', aadhaar: '376061060648' },
  { name: 'Rajdeep Chandra', class: 'XI', gender: 'Male', dob: '14-Sep-2010', aadhaar: '944686890759' },
  { name: 'Trishana Biswas', class: 'XI', gender: 'Female', dob: '28-May-2010', aadhaar: '556211175060' },
  { name: 'Shristi Ghosh', class: 'XI', gender: 'Male', dob: '26-Jan-2010', aadhaar: '602891561286' },
  { name: 'Paramita Das', class: 'XI', gender: 'Female', dob: '25-Jun-2010', aadhaar: '463596941743' }
];

const cleanAadhaar = (a) => (a || '').replace(/\D/g, '');
const normalizeName = (n) => (n || '').toLowerCase().replace(/[^a-z]/g, '');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const dbStudents = await Student.find({ classId: /11/i }).sort({ classId: 1, rollNumber: 1 });
  console.log(`Total Class 11 students in DB: ${dbStudents.length}`);

  const byAadhaar = new Map();
  const byName = new Map();
  for (const s of dbStudents) {
    const a = cleanAadhaar(s.aadhaar);
    if (a) byAadhaar.set(a, s);
    const n = normalizeName(s.name);
    if (!byName.has(n)) byName.set(n, []);
    byName.get(n).push(s);
  }

  const matchGroup = (list, secName) => {
    let matchedAadhaar = 0;
    let matchedName = 0;
    let unmatched = 0;
    const matchedStudents = [];
    const unmatchedItems = [];

    for (const item of list) {
      const aClean = cleanAadhaar(item.aadhaar);
      const nClean = normalizeName(item.name);

      let s = byAadhaar.get(aClean);
      let mType = 'Aadhaar';
      if (!s) {
        const cands = byName.get(nClean) || [];
        s = cands[0];
        mType = 'Name';
      }

      if (s) {
        if (mType === 'Aadhaar') matchedAadhaar++;
        else matchedName++;
        matchedStudents.push({
          input: item,
          student: s,
          mType
        });
      } else {
        unmatched++;
        unmatchedItems.push(item);
      }
    }

    return { matchedAadhaar, matchedName, unmatched, matchedStudents, unmatchedItems };
  };

  const res1 = matchGroup(sector1List, 'Sector 1');
  const res2 = matchGroup(sector2List, 'Sector 2');

  console.log(`\nSector 1 (Class XI): Matched Aadhaar = ${res1.matchedAadhaar}, Matched Name = ${res1.matchedName}, Unmatched = ${res1.unmatched}`);
  if (res1.unmatchedItems.length > 0) console.log('Unmatched in Sector 1:', res1.unmatchedItems);

  console.log(`\nSector 2 (Class XI): Matched Aadhaar = ${res2.matchedAadhaar}, Matched Name = ${res2.matchedName}, Unmatched = ${res2.unmatched}`);
  if (res2.unmatchedItems.length > 0) console.log('Unmatched in Sector 2:', res2.unmatchedItems);

  // Check streams of matched students
  const s1Arts = res1.matchedStudents.filter(m => m.student.classId.includes('arts')).length;
  const s1Sci = res1.matchedStudents.filter(m => m.student.classId.includes('sci')).length;
  const s2Arts = res2.matchedStudents.filter(m => m.student.classId.includes('arts')).length;
  const s2Sci = res2.matchedStudents.filter(m => m.student.classId.includes('sci')).length;

  console.log(`\nSector 1 stream breakdown: Arts = ${s1Arts}, Sci = ${s1Sci}`);
  console.log(`Sector 2 stream breakdown: Arts = ${s2Arts}, Sci = ${s2Sci}`);

  // Check duplicate students between Sector 1 and Sector 2
  const s1Ids = new Set(res1.matchedStudents.map(m => m.student._id.toString()));
  const s2Ids = new Set(res2.matchedStudents.map(m => m.student._id.toString()));
  const overlap = [...s1Ids].filter(id => s2Ids.has(id));
  if (overlap.length > 0) {
    console.log(`\nOVERLAP between Sector 1 and Sector 2 (${overlap.length} students):`);
    overlap.forEach(id => {
      const s = dbStudents.find(st => st._id.toString() === id);
      console.log(`  Roll ${s.roll} (${s.classId}): ${s.name} | Aadhaar: ${s.aadhaar}`);
    });
  }

  // Check how many students in Class 11 have IT/ITeS currently vs these 80
  const isIT = (sub) => /^(IT|ITeS|IT\/ITeS|IT & ITeS|Information Technology)$/i.test((sub || '').trim());
  const currentITStudents = dbStudents.filter(s => (s.subjects || []).some(isIT));
  console.log(`\nCurrent Class 11 students with IT in DB: ${currentITStudents.length} (Arts: ${currentITStudents.filter(s=>s.classId.includes('arts')).length}, Sci: ${currentITStudents.filter(s=>s.classId.includes('sci')).length})`);

  // Check students with IT in DB but not in Sector 1 or Sector 2
  const assignedIds = new Set([...s1Ids, ...s2Ids]);
  const itNotAssigned = currentITStudents.filter(s => !assignedIds.has(s._id.toString()));
  console.log(`\nClass 11 students with IT in DB but NOT in user's Sector 1 or Sector 2 lists (${itNotAssigned.length}):`);
  itNotAssigned.forEach(s => {
    console.log(`  Roll ${s.roll} (${s.classId}): ${s.name} | Aadhaar: ${s.aadhaar} | DOB: ${s.dob} | Subjs: [${s.subjects.join(', ')}]`);
  });

  // Check students in Sector 1 or Sector 2 that do NOT have IT currently
  const missingIT = [...res1.matchedStudents, ...res2.matchedStudents].filter(m => !(m.student.subjects || []).some(isIT));
  console.log(`\nMatched students that DO NOT have IT in DB currently (${missingIT.length}):`);
  missingIT.forEach(m => {
    console.log(`  Roll ${m.student.roll} (${m.student.classId}): ${m.student.name} | Subjs: [${m.student.subjects.join(', ')}]`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
