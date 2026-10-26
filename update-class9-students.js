import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Updates mapped by roll number for Class IX students
const updatesByRoll = {
  1: {
    name: 'Akash Das',
    dob: '01/09/2011',
    phone: '9612068080',
    mother: 'MANIKA DAS',
    father: 'SUSHIL DAS',
    guardian: 'SUSHIL DAS',
    penNumber: '21985592225',
    apaarId: ''
  },
  2: {
    name: 'Akash Debnath',
    dob: '19/07/2012',
    phone: '8974354695',
    mother: 'RUPALI DEBNATH',
    father: 'GOPI DEBNATH',
    guardian: 'GOPI DEBNATH',
    penNumber: '21853645262',
    apaarId: '883497791378'
  },
  3: {
    name: 'Alomoy Sarkar',
    dob: '07/04/2013',
    phone: '8787833044',
    mother: 'JOYA BISWAS SARKAR',
    father: 'SANJOY KUMAR SARKAR',
    guardian: 'SANJOY KUMAR SARKAR',
    penNumber: '22424293827',
    apaarId: '186455417337'
  },
  4: {
    name: 'Ananya Biswas',
    dob: '25/10/2011',
    phone: '9366141994',
    mother: 'BINA RANI SARKAR BISWAS',
    father: 'SUJIT BISWAS',
    guardian: 'SUJIT BISWAS',
    penNumber: '21923293421',
    apaarId: '351403422049'
  },
  5: {
    name: 'Anikesh Roy',
    dob: '30/08/2012',
    phone: '9862396326',
    mother: 'ASHA ROY',
    father: 'ADHIR ROY',
    guardian: 'ADHIR ROY',
    penNumber: '22745733574',
    apaarId: '398349079689'
  },
  6: {
    name: 'Ankita Biswas',
    dob: '10/12/2011',
    phone: '6009897403',
    mother: 'BINA SARKAR BISWAS',
    father: 'RAICHAN BISWAS',
    guardian: 'RAICHAN BISWAS',
    penNumber: '22187133898',
    apaarId: '611973325142'
  },
  7: {
    name: 'Ankita Rani Sarkar',
    dob: '28/11/2011',
    phone: '6009682480',
    mother: 'KARUNA BALA SARKAR',
    father: 'SURJYAMAN SARKAR',
    guardian: 'SURJYAMAN SARKAR',
    penNumber: '22170024421',
    apaarId: '414894665077'
  },
  8: {
    name: 'Ankurjit Das',
    dob: '02/08/2012',
    phone: '9863182583',
    mother: 'DIPIKA DAS',
    father: 'AMARJIT DAS',
    guardian: 'AMARJIT DAS',
    penNumber: '22074472818',
    apaarId: '564444747211'
  },
  9: {
    name: 'Anmita Das',
    dob: '08/07/2012',
    phone: '7005319867',
    mother: 'SANGITA DAS',
    father: 'ARUN DAS',
    guardian: 'ARUN DAS',
    penNumber: '22210659385',
    apaarId: '284502135444'
  },
  10: {
    name: 'Arpan Debnath',
    dob: '31/10/2011',
    phone: '7005742281',
    mother: 'PRATIMA DEBNATH',
    father: 'ARUN DEBNATH',
    guardian: 'ARUN DEBNATH',
    penNumber: '22979140048',
    apaarId: '420082649577'
  },
  11: {
    name: 'Arpita Das',
    dob: '05/10/2011',
    phone: '8974560959',
    mother: 'GOURI DAS',
    father: 'DIPAK DAS',
    guardian: 'DIPAK DAS',
    penNumber: '21882155132',
    apaarId: '104833309225'
  },
  12: {
    name: 'Baishakhi Das',
    dob: '10/03/2012',
    phone: '8257981745',
    mother: 'BASANI DAS',
    father: 'ABHISANTA DAS',
    guardian: 'ABHISANTA DAS',
    penNumber: '22043625754',
    apaarId: '669673349397'
  },
  13: {
    name: 'Barnali Debnath',
    dob: '29/11/2011',
    phone: '6909980100',
    mother: 'KARUNA DEBNATH',
    father: 'BRAJAMOHAN DEBNATH',
    guardian: 'BRAJAMOHAN DEBNATH',
    penNumber: '22008632511',
    apaarId: '973674134201'
  },
  14: {
    name: 'Barsha Sarkar',
    dob: '22/08/2011',
    phone: '9366683730',
    mother: 'RUMA MALLIK SARKAR',
    father: 'MITAN SARKAR',
    guardian: 'MITAN SARKAR',
    penNumber: '21950397870',
    apaarId: '793140609053'
  },
  15: {
    name: 'Bijoy Biswas',
    dob: '18/05/2011',
    phone: '7005568930',
    mother: 'SUPRIYA SARKAR BISWAS',
    father: 'PRADIP BISWAS',
    guardian: 'PRADIP BISWAS',
    penNumber: '21899215658',
    apaarId: '909456337615'
  },
  16: {
    name: 'Binoy Das',
    dob: '17/03/2012',
    phone: '8413815753',
    mother: 'HELAN RANI DAS',
    father: 'BAISHNAB DAS',
    guardian: 'BAISHNAB DAS',
    penNumber: '21861629230',
    apaarId: '587469269889'
  },
  17: {
    name: 'Bipasa Debnath',
    dob: '06/03/2012',
    phone: '7629962653',
    mother: 'AJANTA DEBNATH',
    father: 'SUKUMAR DEBNATH',
    guardian: 'SUKUMAR DEBNATH',
    penNumber: '22167014798',
    apaarId: '855503589841'
  },
  18: {
    name: 'Bishal Biswas',
    dob: '01/10/2011',
    phone: '9612828656',
    mother: 'SHILPI BISWAS',
    father: 'BHAJAN BISWAS',
    guardian: 'BHAJAN BISWAS',
    penNumber: '21856138349',
    apaarId: '314951351605'
  },
  19: {
    name: 'Debasree Biswas',
    dob: '17/01/2012',
    phone: '8257981745',
    mother: 'ANAMIKA BISWAS',
    father: 'SANKAR BISWAS',
    guardian: 'SANKAR BISWAS',
    penNumber: '21903036984',
    apaarId: '479959480716'
  },
  20: {
    name: 'Debisha Nama',
    dob: '14/02/2012',
    phone: '9612414722',
    mother: 'SHANTA NAMA',
    father: 'SHANKAR NAMA',
    guardian: 'SHANKAR NAMA',
    penNumber: '21831759145',
    apaarId: '967828059662'
  },
  21: {
    name: 'Debajit Das',
    dob: '10/04/2012',
    phone: '9612958439',
    mother: 'SULEKHS DAS',
    father: 'DIPENDRA DAS',
    guardian: 'DIPENDRA DAS',
    penNumber: '22377503856',
    apaarId: '991560252345'
  },
  22: {
    name: 'Diptanu Nama Das',
    dob: '02/08/2012',
    phone: '9863217388',
    mother: 'MISTU NAMA DAS',
    father: 'RAJKUMAR NAMA DAS',
    guardian: 'RAJKUMAR NAMA DAS',
    penNumber: '21873732748',
    apaarId: '356201348861'
  },
  23: {
    name: 'Eshan Chowdhury',
    dob: '28/06/2011',
    phone: '8974680895',
    mother: 'BINA RANI ROY CHOUDHURY',
    father: 'RANJIT CHOUDHURY',
    guardian: 'RANJIT CHOUDHURY',
    penNumber: '22070998618',
    apaarId: ''
  },
  24: {
    name: 'Hrittika Sarkar',
    dob: '18/10/2011',
    phone: '8974110369',
    mother: 'SOMA SARKAR',
    father: 'GOPAL SARKAR',
    guardian: 'GOPAL SARKAR',
    penNumber: '21989208614',
    apaarId: '959345140293'
  },
  25: {
    name: 'Hriday Das',
    dob: '29/03/2012',
    phone: '8414846758',
    mother: 'KABITA BISWAS',
    father: 'UDHABH DAS',
    guardian: 'UDHABH DAS',
    penNumber: '22306493425',
    apaarId: '289719646084'
  },
  26: {
    name: 'Jayasree Mandal',
    dob: '25/07/2012',
    phone: '6033199217',
    mother: 'SANCHITA SUTRADHAR MANDAL',
    father: 'MAHADEB MANDAL',
    guardian: 'MAHADEB MANDAL',
    penNumber: '22550918507',
    apaarId: '552729180270'
  },
  27: {
    name: 'Jeet Deb',
    dob: '09/02/2012',
    phone: '8974759951',
    mother: 'SWAPNA GUHA',
    father: 'JIBAN DEB',
    guardian: 'JIBAN DEB',
    penNumber: '22226031625',
    apaarId: '326895741347'
  },
  28: {
    name: 'Kuyel Nama',
    dob: '22/05/2011',
    phone: '9366526137',
    mother: 'ANITA NAMA',
    father: 'MANTU NAMA',
    guardian: 'MANTU NAMA',
    penNumber: '22122285355',
    apaarId: '408136049422'
  },
  29: {
    name: 'Lija Deb',
    dob: '21/02/2012',
    phone: '8413891721',
    mother: 'NAMITA MANDAL DEB',
    father: 'SUKANTA DEB',
    guardian: 'SUKANTA DEB',
    penNumber: '21998318772',
    apaarId: '284272082213'
  },
  30: {
    name: 'Manika Biswas',
    dob: '26/12/2011',
    phone: '8837270164',
    mother: 'SANGITA BISWAS',
    father: 'GOPAL BISWAS',
    guardian: 'GOPAL BISWAS',
    penNumber: '22207306904',
    apaarId: '142204134306'
  },
  31: {
    name: 'Maanvi Biswas',
    dob: '25/01/2012',
    phone: '9612825446',
    mother: 'MANIKA SARKAR BISWAS',
    father: 'BAKUL BISWAS',
    guardian: 'BAKUL BISWAS',
    penNumber: '22069090589',
    apaarId: '602451085558'
  },
  32: {
    name: 'Moon Biswas',
    dob: '08/05/2012',
    phone: '9077224999',
    mother: 'SHIPRA SARKAR BISWAS',
    father: 'RAMA NANDA BISWAS',
    guardian: 'RAMA NANDA BISWAS',
    penNumber: '22053865919',
    apaarId: '796239173824'
  },
  33: {
    name: 'Moon Malakar',
    dob: '01/07/2011',
    phone: '9612813472',
    mother: 'APARNA MALAKAR',
    father: 'JIBAN MALAKAR',
    guardian: 'JIBAN MALAKAR',
    penNumber: '22040588165',
    apaarId: '808752232992'
  },
  34: {
    name: 'Papiya Nama',
    dob: '07/05/2012',
    phone: '8974252845',
    mother: 'KAJAL RANI BISWAS',
    father: 'RANJIT NAMA',
    guardian: 'RANJIT NAMA',
    penNumber: '21915903963',
    apaarId: ''
  },
  35: {
    name: 'Parmita Das',
    dob: '02/02/2012',
    phone: '9612823869',
    mother: 'SOMA PAUL DAS',
    father: 'PARITOSH DAS',
    guardian: 'PARITOSH DAS',
    penNumber: '21850603328',
    apaarId: '303185256059'
  },
  36: {
    name: 'Payel Das',
    dob: '22/08/2012',
    phone: '8415897650',
    mother: 'MONA BALA DAS',
    father: 'TINKU DAS',
    guardian: 'TINKU DAS',
    penNumber: '22285695728',
    apaarId: '473743968202'
  },
  37: {
    name: 'Priti Debnath',
    dob: '13/10/2011',
    phone: '7630893186',
    mother: 'GITA DEBNATH',
    father: 'SUKANTA DEBNATH',
    guardian: 'SUKANTA DEBNATH',
    penNumber: '22864167920',
    apaarId: '815240857962'
  },
  38: {
    name: 'Rajarshi Biswas',
    dob: '12/04/2012',
    phone: '8794059952',
    mother: 'TINKU BHOWMIK BISWAS',
    father: 'RAJESH BISWAS',
    guardian: 'RAJESH BISWAS',
    penNumber: '21927029759',
    apaarId: '966117702460'
  },
  39: {
    name: 'Rima Sarkar',
    dob: '07/11/2011',
    phone: '9089320486',
    mother: 'RATNA NAMA SARKAR',
    father: 'GOUTAM SARKAR',
    guardian: 'GOUTAM SARKAR',
    penNumber: '21981411067',
    apaarId: '626046321813'
  },
  40: {
    name: 'Ripa Sarkar',
    dob: '10/09/2011',
    phone: '8974866525',
    mother: 'SARATHI SARKAR',
    father: 'MANORANJAN SARKAR',
    guardian: 'MANORANJAN SARKAR',
    penNumber: '22242553823',
    apaarId: '951696583173'
  },
  41: {
    name: 'Ritam Das',
    dob: '11/01/2012',
    phone: '8131078254',
    mother: 'SHILPI RANI PAUL DAS',
    father: 'LITAN DAS',
    guardian: 'LITAN DAS',
    penNumber: '22399702492',
    apaarId: '555177108362'
  },
  42: {
    name: 'Riya Biswas',
    dob: '05/02/2012',
    phone: '8787747058',
    mother: 'KIRAN MALAKAR BISWAS',
    father: 'BIMAL BISWAS',
    guardian: 'BIMAL BISWAS',
    penNumber: '21892690501',
    apaarId: '468757540001'
  },
  43: {
    name: 'Riya Das',
    dob: '28/10/2011',
    phone: '8798145436',
    mother: 'RIMA DAS',
    father: 'SUSHANTA DAS',
    guardian: 'SUSHANTA DAS',
    penNumber: '22001482070',
    apaarId: '292643686783'
  },
  44: {
    name: 'Riya Deb Roy',
    dob: '19/03/2012',
    phone: '9436918282',
    mother: 'KAJAL DEBROY',
    father: 'DIPAK DEBROY',
    guardian: 'DIPAK DEBROY',
    penNumber: '21831594278',
    apaarId: '127327416637'
  },
  45: {
    name: 'Riya Debnath',
    dob: '26/01/2012',
    phone: '8787536270',
    mother: 'NAMITA DEBNATH',
    father: 'PRADIP DEBNATH',
    guardian: 'PRADIP DEBNATH',
    penNumber: '21950454657',
    apaarId: '393362370320'
  },
  46: {
    name: 'Rudra Nandi',
    dob: '25/03/2012',
    phone: '6909413062',
    mother: 'PURNIMA DAS NANDI',
    father: 'SEBAL NANDI',
    guardian: 'SEBAL NANDI',
    penNumber: '21907299636',
    apaarId: '712021617024'
  },
  47: {
    name: 'Ruhan Biswas',
    dob: '21/09/2011',
    phone: '8787565856',
    mother: 'REKHA SARKAR',
    father: 'SUBHASH BISWAS',
    guardian: 'SUBHASH BISWAS',
    penNumber: '22051554252',
    apaarId: '502415695335'
  },
  48: {
    name: 'Rupa Sarkar',
    dob: '05/09/2012',
    phone: '8732824576',
    mother: 'SARATHI SARKAR',
    father: 'INDRAJIT SARKAR',
    guardian: 'INDRAJIT SARKAR',
    penNumber: '22315560076',
    apaarId: '297989868277'
  },
  49: {
    name: 'Sagar Debnath',
    dob: '06/09/2011',
    phone: '7630939574',
    mother: 'MALLIKA DERBNATH',
    father: 'PRANTOSH DEBNATH',
    guardian: 'PRANTOSH DEBNATH',
    penNumber: '22528514039',
    apaarId: '110686317129'
  },
  50: {
    name: 'Sajen Biswas',
    dob: '05/06/2011',
    phone: '9366536519',
    mother: 'SARASWATI BISWAS',
    father: 'BADAL BISWAS',
    guardian: 'BADAL BISWAS',
    penNumber: '21898705027',
    apaarId: '814143668736'
  },
  51: {
    name: 'Sajib Biswas',
    dob: '24/04/2009',
    phone: '6009604831',
    mother: 'MANASHA BISWAS',
    father: 'PARESH BISWAS',
    guardian: 'PARESH BISWAS',
    penNumber: '22124719420',
    apaarId: '983524535288'
  },
  52: {
    name: 'Sampa Shil',
    dob: '17/10/2012',
    phone: '9363282213',
    mother: 'RANJANA SHIL',
    father: 'SUDHIR SHIL',
    guardian: 'SUDHIR SHIL',
    penNumber: '22150002047',
    apaarId: '286720614343'
  },
  53: {
    name: 'Sandip Gope',
    dob: '29/08/2011',
    phone: '8837052277',
    mother: 'ARCHANA GOPE',
    father: 'PRADIP GOPE',
    guardian: 'PRADIP GOPE',
    penNumber: '22538758339',
    apaarId: '390851226220'
  },
  54: {
    name: 'Sandipan Paul',
    dob: '19/11/2011',
    phone: '8974863642',
    mother: 'RAKHI PAUL',
    father: 'SATISH PAUL',
    guardian: 'SATISH PAUL',
    penNumber: '21947273944',
    apaarId: '758111526446'
  },
  57: {
    name: 'Sekhar Sarkar',
    dob: '14/04/2012',
    phone: '9089271165',
    mother: 'RINA SARKAR',
    father: 'SHEFAL SARKAR',
    guardian: 'SHEFAL SARKAR',
    penNumber: '21946487853',
    apaarId: ''
  },
  58: {
    name: 'Shatarupa Das',
    dob: '28/12/2011',
    phone: '7005236464',
    mother: 'SHIPRA DAS',
    father: 'TUTAN LAL DAS',
    guardian: 'TUTAN LAL DAS',
    penNumber: '22866470096',
    apaarId: ''
  },
  59: {
    name: 'Shreyasi Biswas',
    dob: '01/02/2012',
    phone: '8119994406',
    mother: 'NAMITA DAS BISWAS',
    father: 'NIKHIL BISWAS',
    guardian: 'NIKHIL BISWAS',
    penNumber: '22564422307',
    apaarId: '902122797118'
  },
  60: {
    name: 'Sneha Das',
    dob: '14/09/2011',
    phone: '9862986272',
    mother: 'TUNU DAS',
    father: 'SADHAN DAS',
    guardian: 'SADHAN DAS',
    penNumber: '21931827317',
    apaarId: '149385719419'
  },
  61: {
    name: 'Soumalya Das',
    dob: '06/06/2011',
    phone: '7909265266',
    mother: 'SUMIKA DAS',
    father: 'SUKANTA DAS',
    guardian: 'SUKANTA DAS',
    penNumber: '21867863837',
    apaarId: '873475530754'
  },
  62: {
    name: 'Sneha Debnath',
    dob: '26/08/2011',
    phone: '9862776356',
    mother: 'SANGHITA DEBNATH',
    father: 'NISHI KUMAR DEBNATH',
    guardian: 'NISHI KUMAR DEBNATH',
    penNumber: '22240821597',
    apaarId: '695255034545'
  },
  63: {
    name: 'Subrata Debnath',
    dob: '16/04/2012',
    phone: '7005226429',
    mother: 'KAJAL DEBNATH',
    father: 'BISWAJIT DEBNATH',
    guardian: 'BISWAJIT DEBNATH',
    penNumber: '22980409217',
    apaarId: '639401045913'
  },
  64: {
    name: 'Supradip Das',
    dob: '16/10/2011',
    phone: '8257034223',
    mother: 'SARANA RANI DAS',
    father: 'AJIT KUMAR DAS',
    guardian: 'AJIT KUMAR DAS',
    penNumber: '22063824679',
    apaarId: '740497080367'
  },
  65: {
    name: 'Supriya Debnath',
    dob: '30/01/2012',
    phone: '7640859354',
    mother: 'SWAPANA DEBNATH',
    father: 'BISWAJIT DEBNATH',
    guardian: 'BISWAJIT DEBNATH',
    penNumber: '22153352481',
    apaarId: '994859904653'
  },
  66: {
    name: 'Taniya Biswas',
    dob: '05/08/2012',
    phone: '8974375245',
    mother: 'SUPRIYA BISWAS NANDI',
    father: 'RAKESH BISWAS',
    guardian: 'RAKESH BISWAS',
    penNumber: '21982973614',
    apaarId: '784500769129'
  },
  67: {
    name: 'Tanushri Biswas',
    dob: '14/10/2011',
    phone: '9862136468',
    mother: 'RINA SARKAR BISWAS',
    father: 'SANJITBISWAS',
    guardian: 'SANJITBISWAS',
    penNumber: '21882355879',
    apaarId: '684990529131'
  },
  68: {
    name: 'Tapas Das',
    dob: '03/11/2011',
    phone: '9366835003',
    mother: 'ARCHITA DAS',
    father: 'DIPAK DAS',
    guardian: 'DIPAK DAS',
    penNumber: '22148770869',
    apaarId: ''
  },
  69: {
    name: 'Trisha Das',
    dob: '08/10/2011',
    phone: '8974654954',
    mother: 'SANGITA DAS',
    father: 'PRADIP LAL DAS',
    guardian: 'PRADIP LAL DAS',
    penNumber: '21963569297',
    apaarId: '413384250592'
  }
};

async function updateClass9() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const existingStudents = await Student.find({ classId: 'class-9' }).sort({ rollNumber: 1 });
    console.log(`Found ${existingStudents.length} existing students in Class IX.`);

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
        console.log(`[UPDATED] Roll ${st.roll} (${st.name}) - PEN: ${st.penNumber}, APAAR: ${st.apaarId || 'N/A'}, Phone: ${st.phone}, DOB: ${st.dob}`);
      } else {
        untouchedCount++;
        console.log(`[KEPT AS IS] Roll ${st.roll} (${st.name}) - Kept unchanged.`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} students in Class IX.`);
    console.log(`Kept ${untouchedCount} students as they are without change.`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class IX students:', err);
    process.exit(1);
  }
}

updateClass9();
