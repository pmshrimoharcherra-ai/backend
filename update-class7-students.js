import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Updates mapped by roll number for Class VII students
const updatesByRoll = {
  1: {
    name: 'Aaky Nama',
    dob: '12/06/2014',
    phone: '6909035065',
    mother: 'SUKLA MAJUMDER',
    father: 'BIKASH NAMA',
    guardian: 'BIKASH NAMA',
    penNumber: '22042445927',
    apaarId: '575396574116'
  },
  2: {
    name: 'Ajoy Biswas',
    dob: '21/02/2013',
    phone: '7005568930',
    mother: 'SUPRIYA SARKAR BISWAS',
    father: 'PRADIP BISWAS',
    guardian: 'PRADIP BISWAS',
    penNumber: '22479359993',
    apaarId: '677459721143'
  },
  3: {
    name: 'Akash Biswas',
    dob: '30/03/2014',
    phone: '9366433541',
    mother: 'PUTUL BISWAS',
    father: 'HACHU BISWAS',
    guardian: 'HACHU BISWAS',
    penNumber: '22356658512',
    apaarId: '167578800405'
  },
  4: {
    name: 'Akash Ghosh',
    dob: '14/11/2013',
    phone: '9089147241',
    mother: 'BEAUTY GHOSH',
    father: 'SANJOY GHOSH',
    guardian: 'SANJOY GHOSH',
    penNumber: '22206991757',
    apaarId: '777899235357'
  },
  5: {
    name: 'Amrita Das',
    dob: '10/10/2013',
    phone: '9612264877',
    mother: 'ANIMA DAS',
    father: 'RAKHAL DAS',
    guardian: 'RAKHAL DAS',
    penNumber: '22204025514',
    apaarId: '606430679192'
  },
  6: {
    name: 'Anal Das',
    dob: '17/12/2013',
    phone: '7005580366',
    mother: 'SANGITA DAS',
    father: 'ARUN DAS',
    guardian: 'ARUN DAS',
    penNumber: '21981861789',
    apaarId: '812768134465'
  },
  7: {
    name: 'Ashish Das',
    dob: '24/11/2013',
    phone: '9999999999',
    mother: 'RIMA DAS',
    father: 'SUSHANTA DAS',
    guardian: 'SUSHANTA DAS',
    penNumber: '21870752707',
    apaarId: 'Not Available'
  },
  8: {
    name: 'Asmi Biswas',
    dob: '05/10/2014',
    phone: '9366249129',
    mother: 'PINKI BISWAS',
    father: 'JAYANTA BISWAS',
    guardian: 'JAYANTA BISWAS',
    penNumber: '21919094537',
    apaarId: '357235009732'
  },
  9: {
    name: 'Ayush Biswas',
    dob: '28/06/2014',
    phone: '9862188596',
    mother: 'MAMPI DAS BISWAS',
    father: 'BISWAJIT BISWAS',
    guardian: 'BISWAJIT BISWAS',
    penNumber: '21868276918',
    apaarId: '887703514253'
  },
  10: {
    name: 'Ayush Chakraborty',
    dob: '19/05/2014',
    phone: '9999999999',
    mother: 'JHUMA CHAKRABORTY',
    father: 'ABHAY CHAKRABORTY',
    guardian: 'ABHAY CHAKRABORTY',
    penNumber: '22517281400',
    apaarId: 'Not Available'
  },
  11: {
    name: 'Bapi Das',
    dob: '17/10/2013',
    phone: '9612501960',
    mother: 'MAMPI DAS',
    father: 'MITAN DAS',
    guardian: 'MITAN DAS',
    penNumber: '22504982590',
    apaarId: '115161560221'
  },
  12: {
    name: 'Beauti Debnath',
    dob: '23/09/2013',
    phone: '7005389187',
    mother: 'SARASWATI DEBNATH',
    father: 'BISWAJIT DEBNATH',
    guardian: 'BISWAJIT DEBNATH',
    penNumber: '21843696397',
    apaarId: '288462476233'
  },
  13: {
    name: 'Bidyut Sarkar',
    dob: '02/07/2013',
    phone: '9233810625',
    mother: 'JAYA SARKAR',
    father: 'THAKURDHAN SARKAR',
    guardian: 'THAKURDHAN SARKAR',
    penNumber: '21959308332',
    apaarId: '105380069703'
  },
  14: {
    name: 'Biprajit Das',
    dob: '24/12/2013',
    phone: '7005000096',
    mother: 'SUKESHI DATTA DAS',
    father: 'BIKASH DAS',
    guardian: 'BIKASH DAS',
    penNumber: '22075068800',
    apaarId: '251476119403'
  },
  15: {
    name: 'Biraj Biswas',
    dob: '16/07/2014',
    phone: '8787818477',
    mother: 'MAMPI BISWAS',
    father: 'GOBINDA BISWAS',
    guardian: 'GOBINDA BISWAS',
    penNumber: '22309401622',
    apaarId: '593663389892'
  },
  16: {
    name: 'Biswajit Biswas',
    dob: '04/04/2014',
    phone: '9862084470',
    mother: 'BULTI BISWAS',
    father: 'TAPAN BISWAS',
    guardian: 'TAPAN BISWAS',
    penNumber: '22442020798',
    apaarId: '469823965223'
  },
  17: {
    name: 'Chinmoy Das',
    dob: '26/10/2013',
    phone: '9366891206',
    mother: 'SOMA SARKAR DAS',
    father: 'LITAN DAS',
    guardian: 'LITAN DAS',
    penNumber: '23071758159',
    apaarId: '876869307214'
  },
  18: {
    name: 'Debraj Debnath',
    dob: '16/11/2014',
    phone: '8787414025',
    mother: 'SUSHAMA BALA DEBNATH',
    father: 'DINABANDHU DEBNATH',
    guardian: 'DINABANDHU DEBNATH',
    penNumber: '22006077600',
    apaarId: '784460124177'
  },
  19: {
    name: 'Deya Das',
    dob: '06/07/2013',
    phone: '9612137279',
    mother: 'PURNIMA DAS',
    father: 'UTTAM DAS',
    guardian: 'UTTAM DAS',
    penNumber: '22230157093',
    apaarId: '636263882119'
  },
  20: {
    name: 'Dipak Biswas',
    dob: '18/04/2014',
    phone: '7085694829',
    mother: 'REBA RANI DAS',
    father: 'DILIP BISWAS',
    guardian: 'DILIP BISWAS',
    penNumber: '22015253025',
    apaarId: 'Not Available'
  },
  21: {
    name: 'Diptanu Debnath',
    dob: '25/05/2014',
    phone: '9866837748',
    mother: 'CHAMPA DEBNATH',
    father: 'BISWAJIT DEBNATH',
    guardian: 'BISWAJIT DEBNATH',
    penNumber: '21953680370',
    apaarId: '752361236182'
  },
  22: {
    name: 'Diya Das',
    dob: '21/06/2013',
    phone: '8119911217',
    mother: 'ANJANA DAS',
    father: 'BIBEKANANDA DAS',
    guardian: 'BIBEKANANDA DAS',
    penNumber: '21939664822',
    apaarId: '366438082739'
  },
  23: {
    name: 'Diya Gope',
    dob: '27/11/2013',
    phone: '9378023571',
    mother: 'RUPALI GOPE',
    father: 'SUJIT GOPE',
    guardian: 'SUJIT GOPE',
    penNumber: '21994409042',
    apaarId: '437390537420'
  },
  24: {
    name: 'Dristi Biswas',
    dob: '17/10/2013',
    phone: '9362741823',
    mother: 'DIPALI BISWAS',
    father: 'RAIMOHAN BISWAS',
    guardian: 'RAIMOHAN BISWAS',
    penNumber: '23471023885',
    apaarId: '939551635226'
  },
  25: {
    name: 'Himan Debnath',
    dob: '07/09/2014',
    phone: '8787459779',
    mother: 'JHUMA DEBNATH',
    father: 'GOUR DEBNATH',
    guardian: 'GOUR DEBNATH',
    penNumber: '22262396922',
    apaarId: 'Not Available'
  },
  26: {
    name: 'Ishan Sarkar',
    dob: '19/07/2014',
    phone: '9066371165',
    mother: 'MISTU SARKAR',
    father: 'MANORANJAN SARKAR',
    guardian: 'MANORANJAN SARKAR',
    penNumber: '21910589564',
    apaarId: '493205987494'
  },
  27: {
    name: 'Jay Biswas',
    dob: '14/09/2013',
    phone: '9233043763',
    mother: 'KALPANA ROY BISWAS',
    father: 'DILIP BISWAS',
    guardian: 'DILIP BISWAS',
    penNumber: '22080883216',
    apaarId: 'Not Available'
  },
  28: {
    name: 'Joy Nama',
    dob: '01/03/2014',
    phone: '9863772794',
    mother: 'APU DAS NAMA',
    father: 'JIBAN NAMA',
    guardian: 'JIBAN NAMA',
    penNumber: '22017828316',
    apaarId: '385426393553'
  },
  29: {
    name: 'Joydeep Barai',
    dob: '11/06/2014',
    phone: '8787359763',
    mother: 'REKHA BISWAS',
    father: 'BIDHAN BARAI',
    guardian: 'BIDHAN BARAI',
    penNumber: '22595799693',
    apaarId: '153230810639'
  },
  30: {
    name: 'Kabita Haldar',
    dob: '26/02/2014',
    phone: '9089714288',
    mother: 'BINA RANI NAMA DAS HALDAR',
    father: 'KRISHNADHAN HALDAR',
    guardian: 'KRISHNADHAN HALDAR',
    penNumber: '22034229363',
    apaarId: '125263179458'
  },
  31: {
    name: 'Krishna Debnath',
    dob: '25/03/2014',
    phone: '9485454445',
    mother: 'MANIKA DEBNATH',
    father: 'SUBUDH DEBNATH',
    guardian: 'SUBUDH DEBNATH',
    penNumber: '22410409010',
    apaarId: '350037158513'
  },
  32: {
    name: 'Krittika Das',
    dob: '16/10/2013',
    phone: '6009054934',
    mother: 'LAXMI RANI DAS',
    father: 'KAJAL KUMAR DAS',
    guardian: 'KAJAL KUMAR DAS',
    penNumber: '22277270319',
    apaarId: '551168983924'
  },
  33: {
    name: 'Manish Sarkar',
    dob: '23/09/2014',
    phone: '7008537785',
    mother: 'BULTI BISWAS SARKAR',
    father: 'MANIK SARKAR',
    guardian: 'MANIK SARKAR',
    penNumber: '21853101198',
    apaarId: '234340205240'
  },
  34: {
    name: 'Manjit Mandal',
    dob: '04/08/2014',
    phone: '6909092204',
    mother: 'BIPULA MANDAL',
    father: 'MANGAL MANDAL',
    guardian: 'MANGAL MANDAL',
    penNumber: '22045268985',
    apaarId: 'Not Available'
  },
  35: {
    name: 'Moumita Debnath',
    dob: '06/05/2015',
    phone: '9366244768',
    mother: 'TAPASHI DEBNATH',
    father: 'RAKHAL DEBNATH',
    guardian: 'RAKHAL DEBNATH',
    penNumber: '22494135619',
    apaarId: '422943480569'
  },
  36: {
    name: 'Mukta Ghosh',
    dob: '13/04/2014',
    phone: '9362939617',
    mother: 'PUJA GHOSH',
    father: 'MANORANJAN GHOSH',
    guardian: 'MANORANJAN GHOSH',
    penNumber: '22273236941',
    apaarId: 'Not Available'
  },
  // Roll 37: Paprita Biswas -> Not in UDISE extract, kept untouched
  38: {
    name: 'Priya Das',
    dob: '06/08/2014',
    phone: '8415991562',
    mother: 'BINA DAS',
    father: 'RATAN DAS',
    guardian: 'RATAN DAS',
    penNumber: '22397929166',
    apaarId: 'Not Available'
  },
  39: {
    name: 'Priangshu Das',
    dob: '11/08/2014',
    phone: '8413998237',
    mother: 'BISAKHA DAS',
    father: 'DIPAK DAS',
    guardian: 'DIPAK DAS',
    penNumber: '22366263730',
    apaarId: '344062259703'
  },
  40: {
    name: 'Pritama Debnath',
    dob: '04/05/2014',
    phone: '9863619281',
    mother: 'GITA DEBNATH',
    father: 'GOBINDA DEBNATH',
    guardian: 'GOBINDA DEBNATH',
    penNumber: '21919171821',
    apaarId: 'Not Available'
  },
  41: {
    name: 'Purnima Biswas',
    dob: '06/11/2014',
    phone: '9362053852',
    mother: 'ARCHNA NAMA',
    father: 'CENTU BISWAS',
    guardian: 'CENTU BISWAS',
    penNumber: '22369919210',
    apaarId: '441465025735'
  },
  42: {
    name: 'Ranbir Nama',
    dob: '15/10/2013',
    phone: '8119063922',
    mother: 'PAMPA NAMA',
    father: 'BIJOY NAMA',
    guardian: 'BIJOY NAMA',
    penNumber: '22547366923',
    apaarId: 'Not Available'
  },
  43: {
    name: 'Ruma Das',
    dob: '26/02/2014',
    phone: '9362676360',
    mother: 'MANTI MANDAL DAS',
    father: 'DULAL DAS',
    guardian: 'DULAL DAS',
    penNumber: '21960603736',
    apaarId: '504834104109'
  },
  44: {
    name: 'Samajit Suklabaidya',
    dob: '13/07/2014',
    phone: '6009529742',
    mother: 'UMA DEBNATH SUKLABAIDYA',
    father: 'SUSEN SUKLABAIDYA',
    guardian: 'SUSEN SUKLABAIDYA',
    penNumber: '22182326694',
    apaarId: 'Not Available'
  },
  45: {
    name: 'Sangita Gope',
    dob: '21/12/2013',
    phone: '8732806437',
    mother: 'RAMA GOPE',
    father: 'PINTU GOPE',
    guardian: 'PINTU GOPE',
    penNumber: '21945917648',
    apaarId: '881034194973'
  },
  46: {
    name: 'Sauham Chakraborty',
    dob: '18/02/2014',
    phone: '9366446560',
    mother: 'BEAUTI CHAKRABORTY',
    father: 'SANJOY CHAKRABORTY',
    guardian: 'SANJOY CHAKRABORTY',
    penNumber: '21875450938',
    apaarId: '675748031205'
  },
  47: {
    name: 'Sayantika Sarkar',
    dob: '23/09/2014',
    phone: '9999999999',
    mother: 'PUTAL SARKAR',
    father: 'UTTAM SARKAR',
    guardian: 'UTTAM SARKAR',
    penNumber: '22280231154',
    apaarId: 'Not Available'
  },
  48: {
    name: 'Shantu Nama Sudra',
    dob: '15/03/2014',
    phone: '9233111793',
    mother: 'SANDHYA NAMASUDRA',
    father: 'SANATAN NAMASUDRA',
    guardian: 'SANATAN NAMASUDRA',
    penNumber: '22334767725',
    apaarId: '706583353345'
  },
  49: {
    name: 'Sarmista Biswas',
    dob: '20/12/2014',
    phone: '8974261872',
    mother: 'SARASWATI DAS',
    father: 'PRAMATOSH BISWAS',
    guardian: 'PRAMATOSH BISWAS',
    penNumber: '21880088584',
    apaarId: 'Not Available'
  },
  50: {
    name: 'Shikha Roy',
    dob: '26/06/2014',
    phone: '6009636774',
    mother: 'SABITA SARKAR ROY',
    father: 'KALICHARAN ROY',
    guardian: 'KALICHARAN ROY',
    penNumber: '22306205570',
    apaarId: '878271360817'
  },
  51: {
    name: 'Sneha Biswas',
    dob: '06/03/2014',
    phone: '9863221944',
    mother: 'JHULAN SARKAR BISWAS',
    father: 'AMRIT BISWAS',
    guardian: 'AMRIT BISWAS',
    penNumber: '22459786864',
    apaarId: '349625780179'
  },
  52: {
    name: 'Sneha Das',
    dob: '22/06/2013',
    phone: '6033364783',
    mother: 'BOBY DAS',
    father: 'LITAN DAS',
    guardian: 'LITAN DAS',
    penNumber: '21989670009',
    apaarId: '688691481182'
  },
  53: {
    name: 'Sneha Debnath',
    dob: '22/06/2014',
    phone: '7005906772',
    mother: 'SABITA DEBNATH',
    father: 'SWAPAN DEBNATH',
    guardian: 'SWAPAN DEBNATH',
    penNumber: '22585243035',
    apaarId: '782848165331'
  },
  54: {
    name: 'Sneha Gope',
    dob: '03/06/2014',
    phone: '9999999999',
    mother: 'SUTAPA GHOSH GOPE',
    father: 'JIBAN GOPE',
    guardian: 'JIBAN GOPE',
    penNumber: '21856354080',
    apaarId: 'Not Available'
  },
  55: {
    name: 'Sonaksi Debnath',
    dob: '19/07/2014',
    phone: '8787492352',
    mother: 'RINA DEBNATH',
    father: 'PARIMAL DEBNATH',
    guardian: 'PARIMAL DEBNATH',
    penNumber: '21837756362',
    apaarId: 'Not Available'
  },
  56: {
    name: 'Sonali Debnath',
    dob: '08/12/2013',
    phone: '9366137083',
    mother: 'RINKU DEBNATH',
    father: 'MADHUSUDHAN DEBNATH',
    guardian: 'MADHUSUDHAN DEBNATH',
    penNumber: '22225382425',
    apaarId: '394515114241'
  },
  57: {
    name: 'Subrata Biswas',
    dob: '04/07/2014',
    phone: '8119848861',
    mother: 'SHIKHA BISWAS',
    father: 'SUNIL BISWAS',
    guardian: 'SUNIL BISWAS',
    penNumber: '21874401013',
    apaarId: '333977515497'
  },
  58: {
    name: 'Sabuj Das',
    dob: '23/10/2013',
    phone: '9362053880',
    mother: 'BULTI BISWAS DAS',
    father: 'BISWANATH DAS',
    guardian: 'BISWANATH DAS',
    penNumber: '22392245520',
    apaarId: '674611579333'
  },
  59: {
    name: 'Sujoy Nama',
    dob: '22/12/2013',
    phone: '7005462798',
    mother: 'SRIMATI BISWAS NAMA',
    father: 'RATAN NAMA',
    guardian: 'RATAN NAMA',
    penNumber: '21879267900',
    apaarId: '759473967557'
  },
  60: {
    name: 'Sumitra Nama Das',
    dob: '09/03/2014',
    phone: '9378058136',
    mother: 'RINA BISWAS NAMA DAS',
    father: 'BIKASH NAMA DAS',
    guardian: 'BIKASH NAMA DAS',
    penNumber: '22014459226',
    apaarId: '970645020671'
  },
  61: {
    name: 'Suparna Debnath',
    dob: '04/03/2014',
    phone: '7085319485',
    mother: 'SOMALI DEBNATH',
    father: 'SUNIL DEBNATH',
    guardian: 'SUNIL DEBNATH',
    penNumber: '21908557027',
    apaarId: '293281766714'
  },
  62: {
    name: 'Tithi Nama',
    dob: '24/02/2014',
    phone: '9366526137',
    mother: 'ANITA NAMA',
    father: 'MANTU NAMA',
    guardian: 'MANTU NAMA',
    penNumber: '22576896821',
    apaarId: '613870855026'
  },
  63: {
    name: 'Tiya Debnath',
    dob: '28/02/2014',
    phone: '8729890758',
    mother: 'USHA RANI DEBNATH',
    father: 'SATYAJIT DEBNHATH',
    guardian: 'SATYAJIT DEBNHATH',
    penNumber: '23200595252',
    apaarId: '765743129170'
  },
  64: {
    name: 'Uday Debnath',
    dob: '21/11/2014',
    phone: '8974829005',
    mother: 'RUPALI DEBNATH',
    father: 'UTTAM DEBNATH',
    guardian: 'UTTAM DEBNATH',
    penNumber: '22262682883',
    apaarId: '279398300024'
  },
  65: {
    name: 'Uttarayan Paul',
    dob: '15/08/2013',
    phone: '8119994202',
    mother: 'SIPRA PAUL',
    father: 'UTTAM PAUL',
    guardian: 'UTTAM PAUL',
    penNumber: '21878879166',
    apaarId: '922084458556'
  },
  66: {
    name: 'Supriya Sarkar',
    dob: '25/12/2013',
    phone: '8730825647',
    mother: 'DIPALI SARKAR',
    father: 'BISWAJIT SARKAR',
    guardian: 'BISWAJIT SARKAR',
    penNumber: '21905003438',
    apaarId: '133954751421'
  }
};

async function updateClass7() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const existingStudents = await Student.find({ classId: 'class-7' }).sort({ rollNumber: 1 });
    console.log(`Found ${existingStudents.length} existing students in Class VII.`);

    let updatedCount = 0;
    let untouchedCount = 0;

    for (const st of existingStudents) {
      const rollNum = parseInt(st.roll, 10);
      const updateData = updatesByRoll[rollNum];

      if (updateData) {
        st.name = updateData.name;
        st.dob = updateData.dob;
        st.phone = updateData.phone;
        st.mother = updateData.mother;
        st.father = updateData.father;
        st.guardian = updateData.guardian;
        st.penNumber = updateData.penNumber;
        st.apaarId = updateData.apaarId;
        await st.save();
        updatedCount++;
        console.log(`[UPDATED] Roll ${st.roll} (${st.name}) - PEN: ${st.penNumber}, APAAR: ${st.apaarId}, Phone: ${st.phone}, DOB: ${st.dob}`);
      } else {
        untouchedCount++;
        console.log(`[KEPT AS IS] Roll ${st.roll} (${st.name}) - No UDISE update provided (missed student kept unchanged).`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} students in Class VII.`);
    console.log(`Kept ${untouchedCount} students as they are without change.`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class VII students:', err);
    process.exit(1);
  }
}

updateClass7();
