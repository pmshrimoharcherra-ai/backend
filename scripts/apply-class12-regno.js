import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/Student.js';

dotenv.config();

const rawData = `
Abhijit Biswas	Sajal Biswas	Archana Biswas	31202508101
Abhijit Das	Amaresh Das	Rina Das	31202507984
Ajit Sarkar	Madan Sarkar	Bina Sarkar	31202508096
Akash Das	Nityananda Das	Suchitrabala Das	31202507919
Alak Das	Abinash Chandra Das	Bina Das	31202508149
Alok Sarkar	Subhash Sarkar	Parbati Sarkar	31202508043
Alpana Das	Dilip Das	Anjana Das	32202508117
Anamika Biswas	Satya Raj Biswas	Mamata Biswas	32202508152
Angkita Barma	Narendra Barma	Ninu Bala Barma	32202507888
Ankit Das	Adhindra Das	Rita Das	31202507318
Ankita Das	Raj Kumar Das	Riva Das	32202508084
Ankita Sarkar	Khokan Sarkar	Kabila Majumder Sarkar	32202507916
Antara Sarkar	Bikash Sarkar	Rinku Sarkar	32202507322
Anupa Ghosh	Banchit Ghosh	Santana Ghosh	32202500436
Anupriya Das	Swapan Das	Namita Das	32202507828
Anupriya Debnath	Shridam Debnath	Joshoda Debnath	32202508135
Anusmita Sharma	Pradip Sharma	Manika Debnath Sharma	32202508083
Arjita Malakar	Subhash Malakar	Tarumala Biswas Malakar	32202507893
Arpita Debnath	Nishi Kumar Debnath	Sanghita Debnath	32202508128
Arup Biswas	Adhir Biswas	Shipra Biswas	31202507308
Ashim Das	Haralal Das	Jayanti Das	31202507970
Bhowmik (first name unclear)	Ashish Bhowmik	Rita Sarkar Bhowmik	31202507900
Babadosh Biswas	Tarun Biswas	Supriya Biswas	31202418940
Barsha Das	Sukumal Das	Bishakha Rani Sarkar Das	32202508089
Bibek Acharjee	Bijan Acharjee	Gitasrai Mallik Acharjee	31202508089
Baidyasree Das	Bikash Das	Titu Rani Das	32202508093
Bijoy Malakar	Gimal Malakar	Milan Malakar Das	31202507896
Bina Das	Late Swapan Chandra Das	Gonga Das	32202507305
Brishti Barman	Basudeb Barman	Shilpi Barman	32202500435
Chinanjit Barma	Sushanta Barma	Fulmati Barma	31202500562
Deep Saha	Bemu Saha	Namita Rudrapaul Saha	31202507324
Deeya Biswas	Shanti Biswas	Mina Biswas	32202507979
Dipa Biswas	Dilip Biswas	Reba Rani Das Biswas	32202508091
Dita Biswas	Sarkare Biswas	Ujala Sarkar Biswas	32202507042
Dita Sarkar	Matilal Sarkar	Jharna Sarkar	32202507915
Gopal Gope	Pintu Gope	Rama Gope	31202508122
Priya Nandi	Sujit Nandi	Pinki Nandi	32202508147
Gourav Das	Bijoy Das	Renuka Bala Das	31202500431
Himani Debnath	Late Rajmohan Debnath	Late Prabhati Debnath	32202508098
Hrilika Das	Premjit Das	Jamuna Das	32202508150
Jayashree Gope	Indrajit Gope	Jharna Gope	32202508092
Jayashree Debnath	Shyamal Debnath	Sabita Debnath	32202508190
Jhuma Sarkar	Raj Kumar Sarkar	Namita Sarkar	32202507366
Joy Biswas	Nirapad Biswas	Bandana Biswas	31202508105
Joy Das	Sanjoy Das	Dipali Das	31202507321
Joydip Dhar	Dilip Dhar	Pranati Datta Dhar	31202508214
Joydeep Mandal	Mahadeb Mandal	Sanhita Sutradhar Mandal	32202416743
Jyotsna Debnath	Nanto Debnath	Sandhya Debnath	32202508106
Jual Das	Jantosh Das	Sabita Das	32202507317
Jujel Biswas	Chandan Biswas	Sefali Namadas Biswas	32202507335
Jwel Sarkar	Chitta Ranjan Sarkar	Shipra Rani Sarkar	32202508159
Kishan Das	Bidhan Chandra Das	Ratna Das	31202508131
Krish Kumar Nama	Kamal Kumar Nama	Kakali Bhowmik Nama	31202508085
Krishnadhan Biswas	Sarti Biswas	Dipali Biswas	31202507982
Krishnendu Sarkar	Krishna Dhan Sarkar	Sabita Sarkar	31202508142
Manchi Biswas	Pradip Biswas	Manika Biswas	32202507304
Mandhira Das	Bidhan Das	Sabita Das	32202508119
Mandhira Debnath	Gopal Debnath	Pratima Debnath	32202508110
Mandira Das	Ratan Kumar Das	Anjali Das	32202508109
Manisha Sarkar	Pradip Sarkar	Anjana Das Sarkar	32202507698
Minakhi Nama	Indrajit Nama	Archana Sarkar Nama	32202507995
Minati Das	Sarajit Das	Mira Das	32202507974
Minta Biswas	Hara Krishna Biswas	Rupali Sarkar Biswas	32202508141
Munai Sarkar	Niranjan Sarkar	Shikha Biswas Sarkar	32202507311
Nandita Debnath	Sudhanshu Debnath	Surashini Debnath	32202508100
Nandita Sarkar	Mahesh Sarkar	Suma Paul Sarkar	32202507912
Nayan Nandi	Sujit Nandi	Pinki Nandi	31202508094
Nayan Sannyasi	Ranjit Sannyasi	Minati Sannyasi	31202507330
Nayan Sarkar	Nirdhan Sarkar	Anima Sarkar	31202500429
Nikita Biswas	Chandan Biswas	Soma Biswas	32202507310
Nikita Das	Rakhal Chandra Das	Late Aruna Das	32202507314
Niloy Debnath	Pranesh Debnath	Rita Debnath	31202508108
Papiya Datta	Biswajit Datta	Juni Datta	32202507977
Papiya Sarkar	Biswajit Sarkar	Ninu Bala Sarkar	32202507282
Papiya Das	Sanjit Das	Rupashi Das	32202533925
Payel Nama Das	Nitul Nama Das	Malati Sarkar Nama Das	32202507265
Dinak Majumder	Pintu Majumder	Anamika Choudhury Majumder	31202507903
Pipasha Biswas	Thakur Chan Biswas	Sefali Biswas	32202507308
Pranjit Das	Parimal Das	Sumitra Das	31202508140
Prasenjit Biswas	Swapan Biswas	Bina Biswas	31202532102
Pritam Sarkar	Nanuttam Sarkar	Malina Das Sarkar	31202508116
Priti Das	Jiban Das	Pratima Das	32202508125
Priyanka Biswas	Biswajit Biswas	Parbati Nama Biswas	32202507889
Priyanka Das	Hara Kumar Das	Aroti Das	32202507975
Priyanka Debnath	Ashish Debnath	Mahamaya Debnath	32202500437
Puja Nama	Nitu Nama	Namita Nama	32202508127
Puja Paul	Tapan Paul	Parma Deb Paul	32202500432
Puja Rani Paul	Babul Paul	Lalita Barman Paul	32202500433
Purnima Das	Jiban Das	Maya Rani Das	32202507839
Rahul Biswas	Rajmohan Biswas	Rakhi Choudhury Biswas	31202507316
Rahul Biswas	Gopal Biswas	Karuna Biswas	31202507319
Rahul Das	Rakhal Chandra Das	Mallika Das	32202533924
Rahul Sarkar	Radhish Sarkar	Sabari Sarkar	31202507992
Reshmi Debnath	Ratan Debnath	Manti Debnath	32202418917
Rikesh Das	Late Ajit Das	Ranibala Das	31202508104
Rima Rani Das	Birchandra Das	Purnalaxmi Das	32202508143
Ripan Biswas	Ajit Biswas	Memata Namasudra Biswas	31202508124
Ripan Deb	Goutam Deb	Barna Deb	31202500563
Riya Das	Ranjan Das	Nayan Rani Das	32202507980
Riya Nama	Radan Nama	Srimati Biswas Nama	32202508129
Rupak Biswas	Gourchan Biswas	Ruma Biswas	31202507309
Rupesh Sarkar	Jadab Sarkar	Soma Das Sarkar	31202508132
Sabuj Sarkar	Sujit Sarkar	Suniya Biswas Sarkar	31202507334
Sagar Das	Sajal Das	Sukla Mandal Das	31202507312
Sagarika Biswas	Chitta Ranjan Biswas	Mani Bala Biswas	32202508112
Sagarika Das	Animesh Das	Uma Sarkar Das	32202508144
Samarjit Chowdhury	Samir Chowdhury	Sukla Chowdhury	31202508148
Sandipa Das	Pradip Kumar Das	Soma Rani Das	32202507320
Sandipa Das	Adhir Das	Shilpi Das	32202507326
Sani Nandi	Subal Nandi	Malina Nandi	32202533917
Sanajit Das	Abinash Das	Rinku Das	31202507906
Sayan Biswas	Mithan Biswas	Manika Sarkar Biswas	31202507967
Sayan Roy	Swapan Kumar Roy	Bulti Deb Roy	31202508192
Sayan Shil	Manipada Shil	Saraswati Shil	32202514221
Shayan Deb	Dilip Narayan Deb	Laxmi Deb	32202508134
Shilpi Das	Kalicharan Das	Arati Das	32202533912
Smitika Sukla Das	Haradhan Sukla Das	Shulan Rani Das	32802515571
Sonali Das	Bishu Das	Jhuma Das	32202508090
Sonia Das	Sanjoy Das	Mithila Das	32202507909
Sourabh Mandal	Nitimal Mandal	Sephali Das Mandal	32202508146
Sriparna Paul	Sujit Paul	Basanti Sarkar Paul	32202500564
Subhajit Das	Shital Das	Saraswati Das	31202508097
Subhajit Das	Nirmal Das	Sumitra Das	31202533918
Subhajit Shil	Narayan Shil	Malina Shil	31202500430
Subham Das	Sarkar Das	Kalpana Das	31202508121
Subham Das	Ananta Das	Chompa Sarkar Das	31202508087
Sudipta Das	Sajal Das	Drupadi Das	32202508113
Suhel Das	Indrajit Das	Chaya Das	31202418779
Sukhla Barma	Jageshwar Barma	Jharna Barma	32202500434
Sukrita Debnath	Benu Debnath	Archana Barman Debnath	32202508108
Sumit Biswas	Amarjit Biswas	Radha Biswas	32202508095
Sunali Biswas	Brajendra Biswas	Sabita Biswas	32202507315
Suparna Debnath	Manoranjan Debnath	Swapna Debnath	32202508109
Supriya Das	Pradip Das	Swapna Das	32202508136
Susmita Biswas	Gutam Biswas	Pushpa Biswas	32202508099
Susmita Das	Goutam Lal Das	Sabita Das	32202508120
Swarupa Das	Kamal Das	Ranjana Das	32202507989
Swastika Das	Indrajit Das	Shilpi Rani Das	32202508111
Tanushree Das	Nirmal Das	Rinki Das	32202508139
Tapas Biswas	Dohal Biswas	Sumitra Biswas	31202508123
Tina Sarkar	Biresh Sarkar	Mina Sarkar	32202507389
Trishna Sarkar	Khetish Sarkar	Chandana Sarkar	32202507466
Tushar Biswas	Tulsi Biswas	Kamala Biswas	31202507968
Udai Biswas	Changopal Biswas	Maldati Biswas	31202507325
`;

// Explicit manual overrides for the 5 spelling variations so matching is 100% exact
const explicitMap = {
  'Baidyasree Das': { roll: '15', name: 'Bidyasree Das' },
  'Dita Biswas': { roll: '71', name: 'Diya Biswas' },
  'Jujel Biswas': { roll: '80', name: 'Juyel Biswas' },
  'Smitika Sukla Das': { roll: '117', name: 'Shritika Sukla Das' },
  'Udai Biswas': { roll: '82', name: 'Uday Biswas' }
};

async function executeClass12RegUpdate() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://schoolerp:Mohar2026@cluster0.wajxav6.mongodb.net/school_erp';
  await mongoose.connect(uri);
  const db = mongoose.connection;
  const StudentCol = db.collection('students');

  const c12Students = await StudentCol.find({ classId: { $in: ['class-12-arts', 'class-12-sci'] } }).toArray();
  const inputRows = rawData.trim().split('\n').filter(Boolean).map((line, idx) => {
    const [name, father, mother, regNo] = line.split('\t').map(s => s.trim());
    return { idx: idx + 1, name, father, mother, regNo };
  });

  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  let updatedCount = 0;
  const auditLog = [];

  for (const row of inputRows) {
    let target = null;

    if (explicitMap[row.name]) {
      const exp = explicitMap[row.name];
      target = c12Students.find(s => s.roll === exp.roll && s.name === exp.name);
    }

    if (!target) {
      const rowNameNorm = norm(row.name);
      const candidates = c12Students.filter(s => norm(s.name) === rowNameNorm);
      if (candidates.length === 1) {
        target = candidates[0];
      } else if (candidates.length > 1) {
        const rowFatherNorm = norm(row.father);
        const rowMotherNorm = norm(row.mother);
        target = candidates.find(s =>
          (rowFatherNorm && norm(s.father).includes(rowFatherNorm.slice(0, 4))) ||
          (rowMotherNorm && norm(s.mother).includes(rowMotherNorm.slice(0, 4)))
        );
      }
    }

    if (!target) {
      // Fuzzy fallback
      const rowNameNorm = norm(row.name);
      const rowFatherNorm = norm(row.father);
      const rowMotherNorm = norm(row.mother);

      let bestScore = 0;
      for (const s of c12Students) {
        let score = 0;
        const dbNameNorm = norm(s.name);
        const dbFatherNorm = norm(s.father);
        const dbMotherNorm = norm(s.mother);

        if (dbNameNorm === rowNameNorm) score += 50;
        else if (dbNameNorm.includes(rowNameNorm) || rowNameNorm.includes(dbNameNorm)) score += 35;
        else if (rowNameNorm.slice(0, 4) === dbNameNorm.slice(0, 4)) score += 20;

        if (dbFatherNorm && rowFatherNorm) {
          if (dbFatherNorm === rowFatherNorm) score += 30;
          else if (dbFatherNorm.includes(rowFatherNorm) || rowFatherNorm.includes(dbFatherNorm)) score += 25;
          else if (rowFatherNorm.slice(0, 4) === dbFatherNorm.slice(0, 4)) score += 15;
        }

        if (dbMotherNorm && rowMotherNorm) {
          if (dbMotherNorm === rowMotherNorm) score += 20;
          else if (dbMotherNorm.includes(rowMotherNorm) || rowMotherNorm.includes(dbMotherNorm)) score += 15;
          else if (rowMotherNorm.slice(0, 4) === dbMotherNorm.slice(0, 4)) score += 10;
        }

        if (score > bestScore) {
          bestScore = score;
          target = s;
        }
      }
    }

    if (!target) {
      console.error(`Could not match: ${row.name}`);
      continue;
    }

    // Update in database: set registrationNo
    await StudentCol.updateOne(
      { _id: target._id },
      {
        $set: {
          registrationNo: row.regNo,
          updatedAt: new Date()
        }
      }
    );

    updatedCount++;
    auditLog.push({
      roll: target.roll,
      studentName: target.name,
      inputName: row.name,
      enrollmentNo: target.enrollmentNo,
      registrationNo: row.regNo
    });
  }

  console.log(`Successfully updated ${updatedCount} / ${inputRows.length} Class 12 students with registrationNo!`);
  console.log('Sample audit records:');
  console.log(auditLog.slice(0, 8));

  // Verify that all 144 students now have registrationNo set
  const withReg = await StudentCol.countDocuments({
    classId: { $in: ['class-12-arts', 'class-12-sci'] },
    registrationNo: { $exists: true, $ne: '' }
  });
  console.log(`Class 12 students with registrationNo: ${withReg} / ${c12Students.length}`);

  await mongoose.disconnect();
}

executeClass12RegUpdate().catch(console.error);
