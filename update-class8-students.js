import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Updates mapped by roll number for Class VIII students
const updatesByRoll = {
  1: {
    name: 'Abinash Paul',
    dob: '04/09/2012',
    phone: '8837259725',
    mother: 'SHIBANI DAS PAUL',
    father: 'PANKAJ PAUL',
    guardian: 'PANKAJ PAUL',
    penNumber: '21944219201',
    apaarId: '211045455591'
  },
  2: {
    name: 'Anamika Debnath',
    dob: '26/01/2013',
    phone: '9612705851',
    mother: 'SHIPRA DEBNATH',
    father: 'HEMANSHU DEBNATH',
    guardian: 'HEMANSHU DEBNATH',
    penNumber: '22366237327',
    apaarId: '107622261375'
  },
  3: {
    name: 'Aparna Das',
    dob: '26/08/2012',
    phone: '8837465239',
    mother: 'SUPRIYA BISWAS DAS',
    father: 'SUKHLAL DAS',
    guardian: 'SUKHLAL DAS',
    penNumber: '21897221361',
    apaarId: '339893299273'
  },
  4: {
    name: 'Aparna Debnath',
    dob: '04/02/2013',
    phone: '9862554797',
    mother: 'SWAPNA DEBNATH',
    father: 'MANORANJAN DEBNATH',
    guardian: 'MANORANJAN DEBNATH',
    penNumber: '21992924641',
    apaarId: '183017012148'
  },
  5: {
    name: 'Arpita Das',
    dob: '18/11/2012',
    phone: '8413987194',
    mother: 'SRIMATI BAISHYA',
    father: 'DIPAK DAS',
    guardian: 'DIPAK DAS',
    penNumber: '22567304621',
    apaarId: '308713490007'
  },
  6: {
    name: 'Arpita Das',
    dob: '04/04/2013',
    phone: '9862522022',
    mother: 'APARNA DAS',
    father: 'PITAN DAS',
    guardian: 'PITAN DAS',
    penNumber: '21923150060',
    apaarId: '164569624989'
  },
  7: {
    name: 'Avoy Das',
    dob: '04/11/2012',
    phone: '7630838617',
    mother: 'RIBA DAS',
    father: 'RAJKUMAR DAS',
    guardian: 'RAJKUMAR DAS',
    penNumber: '21977652482',
    apaarId: '874969769190'
  },
  8: {
    name: 'Ayush Biswas',
    dob: '16/09/2012',
    phone: '8974760045',
    mother: 'LAXMI BISWAS',
    father: 'PARIMAL CHANDRA BISWAS',
    guardian: 'PARIMAL CHANDRA BISWAS',
    penNumber: '22382653565',
    apaarId: '234528929540'
  },
  9: {
    name: 'Baishakhi Debnath',
    dob: '15/04/2013',
    phone: '8974149277',
    mother: 'SOMA SHIL DEBNATH',
    father: 'RANJIT DEBNATH',
    guardian: 'RANJIT DEBNATH',
    penNumber: '22160401195',
    apaarId: '378745778922'
  },
  10: {
    name: 'Barsha Das',
    dob: '02/06/2012',
    phone: '8798922688',
    mother: 'BHAGABATI DAS',
    father: 'NANDALAL DAS',
    guardian: 'NANDALAL DAS',
    penNumber: '21867791726',
    apaarId: '722531046171'
  },
  11: {
    name: 'Barsha Nama',
    dob: '13/08/2012',
    phone: '6033199213',
    mother: 'MANIKA BISWAS NAMA',
    father: 'KRISHNA DHAN NAMA',
    guardian: 'KRISHNA DHAN NAMA',
    penNumber: '22017802024',
    apaarId: '415092644437'
  },
  12: {
    name: 'Bindiya Dhar',
    dob: '17/08/2013',
    phone: '8974354756',
    mother: 'SUCHITRA DHAR',
    father: 'BABAN DHAR',
    guardian: 'BABAN DHAR',
    penNumber: '22523086950',
    apaarId: '939145155131'
  },
  13: {
    name: 'Binoy Das',
    dob: '05/07/2013',
    phone: '7630839065',
    mother: 'SADHANA BISWAS DAS',
    father: 'BARUN CH DAS',
    guardian: 'BARUN CH DAS',
    penNumber: '21889619784',
    apaarId: '728307660840'
  },
  14: {
    name: 'Bipasa Sarkar',
    dob: '22/04/2013',
    phone: '9612496235',
    mother: 'MALINA DAS SARKAR',
    father: 'NAROTTAM SARKAR',
    guardian: 'NAROTTAM SARKAR',
    penNumber: '22075236023',
    apaarId: '441382888221'
  },
  15: {
    name: 'Biraj Sarkar',
    dob: '16/06/2013',
    phone: '9089402818',
    mother: 'MANISHA DAS SARKAR',
    father: 'MANORANJAN SARKAR',
    guardian: 'MANORANJAN SARKAR',
    penNumber: '22073269045',
    apaarId: '978685009759'
  },
  16: {
    name: 'Chuhina Das',
    dob: '13/08/2012',
    phone: '9089959549',
    mother: 'JAMUNA DAS',
    father: 'GURUPAD DAS',
    guardian: 'GURUPAD DAS',
    penNumber: '22374089892',
    apaarId: '227995689595'
  },
  17: {
    name: 'Debajit Biswas',
    dob: '13/05/2013',
    phone: '6009835076',
    mother: 'DIPALI DAS BISWAS',
    father: 'PARESH CH BISWAS',
    guardian: 'PARESH CH BISWAS',
    penNumber: '22298046199',
    apaarId: '445669376140'
  },
  18: {
    name: 'Debajeet Roy',
    dob: '22/12/2012',
    phone: '9089641375',
    mother: 'SHILA DAS ROY',
    father: 'NIROD ROY',
    guardian: 'NIROD ROY',
    penNumber: '22958149528',
    apaarId: '325227325286'
  },
  19: {
    name: 'Debalina Das',
    dob: '10/02/2012',
    phone: '9862456420',
    mother: 'BABLI DAS',
    father: 'INDRAJIT DAS',
    guardian: 'INDRAJIT DAS',
    penNumber: '22035298442',
    apaarId: '388656610310'
  },
  20: {
    name: 'Debasish Ghosh',
    dob: '17/10/2012',
    phone: '9436941689',
    mother: 'NAMITA GHOSH',
    father: 'JUGAL GHOSH',
    guardian: 'JUGAL GHOSH',
    penNumber: '22097409395',
    apaarId: '567960171696'
  },
  21: {
    name: 'Debhasmita Nama',
    dob: '20/09/2013',
    phone: '8729857150',
    mother: 'BEAUTY DAS NAMA',
    father: 'SANJOY NAMA',
    guardian: 'SANJOY NAMA',
    penNumber: '22361210081',
    apaarId: '965900650672'
  },
  22: {
    name: 'Debajit Das',
    dob: '04/04/2013',
    phone: '9862522042',
    mother: 'APARNA DAS',
    father: 'PITAN DAS',
    guardian: 'PITAN DAS',
    penNumber: '22216034988',
    apaarId: '391743953692'
  },
  23: {
    name: 'Deepsi Das',
    dob: '24/01/2013',
    phone: '6909519206',
    mother: 'REBA RANI PAUL DAS',
    father: 'SAJAL DAS',
    guardian: 'SAJAL DAS',
    penNumber: '22944704203',
    apaarId: '325208478178'
  },
  24: {
    name: 'Dipa Chakraborti',
    dob: '09/07/2013',
    phone: '9383267576',
    mother: 'JHUMA CHAKRABORTY',
    father: 'DILIP CHAKRABORTY',
    guardian: 'DILIP CHAKRABORTY',
    penNumber: '22209067089',
    apaarId: '985120924415'
  },
  25: {
    name: 'Dipa Das',
    dob: '10/05/2013',
    phone: '8415991562',
    mother: 'BINA DAS',
    father: 'RATAN DAS',
    guardian: 'RATAN DAS',
    penNumber: '21934148363',
    apaarId: '474973716361'
  },
  26: {
    name: 'Dipika Biswas',
    dob: '27/03/2013',
    phone: '9862635930',
    mother: 'BASANA BISWAS',
    father: 'DIPAK BISWAS',
    guardian: 'DIPAK BISWAS',
    penNumber: '21934083360',
    apaarId: '688264252921'
  },
  27: {
    name: 'Diya Debnath',
    dob: '15/11/2013',
    phone: '8414838330',
    mother: 'RUMA DEBNATH',
    father: 'JIBAN DEBNATH',
    guardian: 'JIBAN DEBNATH',
    penNumber: '22429560455',
    apaarId: '491897680993'
  },
  28: {
    name: 'Diya Sarkar',
    dob: '14/10/2012',
    phone: '8132826331',
    mother: 'SHIBANI SARKAR',
    father: 'RANJIT SARKAR',
    guardian: 'RANJIT SARKAR',
    penNumber: '22046920056',
    apaarId: '116572908852'
  },
  29: {
    name: 'Gourab Debnath',
    dob: '19/05/2013',
    phone: '9863571483',
    mother: 'SUPRIYA NATH DEBNATH',
    father: 'GOUTAM DEBNATH',
    guardian: 'GOUTAM DEBNATH',
    penNumber: '21920041527',
    apaarId: '464199465532'
  },
  // Roll 30: Hriday Mandal -> Transferred (TC Issued), kept untouched
  31: {
    name: 'Hritik Biswas',
    dob: '03/12/2012',
    phone: '9378022065',
    mother: 'ADARI BISWAS',
    father: 'RAJMOHAN BISWAS',
    guardian: 'RAJMOHAN BISWAS',
    penNumber: '22002244624',
    apaarId: '611969077106'
  },
  32: {
    name: 'Jishan Debnath',
    dob: '08/08/2013',
    phone: '9366566790',
    mother: 'SWAPNA RANI DEBNATH',
    father: 'NISHI KANTA DEBNATH',
    guardian: 'NISHI KANTA DEBNATH',
    penNumber: '22125856671',
    apaarId: '573185269005'
  },
  33: {
    name: 'Joy Sarkar',
    dob: '18/08/2012',
    phone: '9366642139',
    mother: 'JHARNA SARKAR',
    father: 'NIRMAL SARKAR',
    guardian: 'NIRMAL SARKAR',
    penNumber: '21949442766',
    apaarId: '383997274632'
  },
  34: {
    name: 'Joydeep Das',
    dob: '12/07/2013',
    phone: '9436495308',
    mother: 'PURNA BALA NAMA DAS',
    father: 'JADAB DAS',
    guardian: 'JADAB DAS',
    penNumber: '22000527983',
    apaarId: '353515218498'
  },
  35: {
    name: 'Kohinur Biswas',
    dob: '18/04/2013',
    phone: '8974925376',
    mother: 'REKHA NAMA SUDRA BISWAS',
    father: 'KHOKAN DAS',
    guardian: 'KHOKAN DAS',
    penNumber: '22129039265',
    apaarId: 'Not Available'
  },
  36: {
    name: 'Kushan Ghosh',
    dob: '13/11/2012',
    phone: '9612116436',
    mother: 'RITA GOPE GHOSH',
    father: 'MONORANJAN GHOSH',
    guardian: 'MONORANJAN GHOSH',
    penNumber: '21919941889',
    apaarId: '174150151963'
  },
  37: {
    name: 'Lovely Haldar',
    dob: '16/02/2013',
    phone: '8974250662',
    mother: 'LIPIKA SARKAR HALDAR',
    father: 'LUTAN HALDAR',
    guardian: 'LUTAN HALDAR',
    penNumber: '22310289993',
    apaarId: '190711724095'
  },
  38: {
    name: 'Megha Biswas',
    dob: '05/09/2012',
    phone: '9366613667',
    mother: 'SEBIKA ROY BISWAS',
    father: 'SRIKANTA BISWAS',
    guardian: 'SRIKANTA BISWAS',
    penNumber: '21961876196',
    apaarId: '508523881484'
  },
  39: {
    name: 'Nandita Das',
    dob: '21/05/2013',
    phone: '7630909504',
    mother: 'NAMITA DAS',
    father: 'PARITOSH DAS',
    guardian: 'PARITOSH DAS',
    penNumber: '22100262844',
    apaarId: '376056216547'
  },
  40: {
    name: 'Nandita Debnath',
    dob: '22/05/2013',
    phone: '9366244768',
    mother: 'TAPASHI DEBNATH',
    father: 'RAKHAL DEBNATH',
    guardian: 'RAKHAL DEBNATH',
    penNumber: '22058264797',
    apaarId: '376111775362'
  },
  41: {
    name: 'Pabitra Das',
    dob: '19/11/2012',
    phone: '9089182250',
    mother: 'MANIKA BISWAS DAS',
    father: 'PRANTOSH DAS',
    guardian: 'PRANTOSH DAS',
    penNumber: '22082642564',
    apaarId: '113424838695'
  },
  42: {
    name: 'Pritam Debnath',
    dob: '04/10/2013',
    phone: '9862931661',
    mother: 'RIMPI DEBANTH',
    father: 'PARITOSH DEBNATH',
    guardian: 'PARITOSH DEBNATH',
    penNumber: '21914641154',
    apaarId: '197069663267'
  },
  43: {
    name: 'Priyanka Sarkar',
    dob: '27/12/2012',
    phone: '6009495721',
    mother: 'MANI BISWAS SARKAR',
    father: 'KANU SARKAR',
    guardian: 'KANU SARKAR',
    penNumber: '21879485461',
    apaarId: 'Not Available'
  },
  44: {
    name: 'Puja Debnath',
    dob: '29/05/2013',
    phone: '7640908410',
    mother: 'JHARNA DEBNATH',
    father: 'KARTIK DEBNATH',
    guardian: 'KARTIK DEBNATH',
    penNumber: '21840538581',
    apaarId: '881684840191'
  },
  45: {
    name: 'Purnajit Biswas',
    dob: '17/02/2013',
    phone: '9378024974',
    mother: 'ARCHANA BISWAS',
    father: 'PRADIP BISWAS',
    guardian: 'PRADIP BISWAS',
    penNumber: '22226021149',
    apaarId: '433348809789'
  },
  46: {
    name: 'Rajdeep Mallik',
    dob: '22/07/2013',
    phone: '9077751670',
    mother: 'MANTI MALLIK',
    father: 'BABUL MALLIK',
    guardian: 'BABUL MALLIK',
    penNumber: '22127275642',
    apaarId: '263621118620'
  },
  47: {
    name: 'Rajesh Debnath',
    dob: '05/09/2012',
    phone: '6033352404',
    mother: 'TAPASHI DEBNATH',
    father: 'KARTIK DEBNATH',
    guardian: 'KARTIK DEBNATH',
    penNumber: '21884139852',
    apaarId: '837929704423'
  },
  48: {
    name: 'Reshmi Das',
    dob: '27/07/2012',
    phone: '6009128561',
    mother: 'RUBI RANI DAS',
    father: 'SUDIP DAS',
    guardian: 'SUDIP DAS',
    penNumber: '22523263968',
    apaarId: '421505980816'
  },
  49: {
    name: 'Riya Das',
    dob: '29/05/2013',
    phone: '8974610874',
    mother: 'MAMATA RANI DAS',
    father: 'KAJAL DAS',
    guardian: 'KAJAL DAS',
    penNumber: '22140407664',
    apaarId: '521093796979'
  },
  50: {
    name: 'Riya Nama Sudra',
    dob: '16/02/2013',
    phone: '8787700858',
    mother: 'SABITA BISWAS NAMASUDRA',
    father: 'MITAN NAMASUDRA',
    guardian: 'MITAN NAMASUDRA',
    penNumber: '22037051592',
    apaarId: '499502664585'
  },
  51: {
    name: 'Sagarika Nandi',
    dob: '20/12/2012',
    phone: '6009101276',
    mother: 'SWAPNA NANDI',
    father: 'MITAN NANDI',
    guardian: 'MITAN NANDI',
    penNumber: '22263540350',
    apaarId: '207602670614'
  },
  52: {
    name: 'Santuno Das',
    dob: '30/04/2012',
    phone: '9378025011',
    mother: 'SAJALI SARKAR DAS',
    father: 'DULAL DAS',
    guardian: 'DULAL DAS',
    penNumber: '22332326268',
    apaarId: '464720766607'
  },
  53: {
    name: 'Shiyoli Biswas',
    dob: '29/08/2012',
    phone: '8974505465',
    mother: 'SUMITRA BISWAS',
    father: 'ANIL BISWAS',
    guardian: 'ANIL BISWAS',
    penNumber: '22097053313',
    apaarId: '187641708425'
  },
  54: {
    name: 'Shubashree Biswas',
    dob: '22/01/2013',
    phone: '9863771936',
    mother: 'SATABDI NAMA BISWAS',
    father: 'SANJIT BISWAS',
    guardian: 'SANJIT BISWAS',
    penNumber: '22022320092',
    apaarId: '341569038760'
  },
  55: {
    name: 'Shubham Debnath',
    dob: '01/09/2012',
    phone: '6009697207',
    mother: 'PARBATI DEBNATH',
    father: 'SUBHASH DEBNATH',
    guardian: 'SUBHASH DEBNATH',
    penNumber: '21871786087',
    apaarId: '211490362267'
  },
  56: {
    name: 'Sneha Sarkar',
    dob: '15/08/2012',
    phone: '8787409032',
    mother: 'FULAN SARKAR',
    father: 'SAJIT SARKAR',
    guardian: 'SAJIT SARKAR',
    penNumber: '21931574154',
    apaarId: '252349991882'
  },
  57: {
    name: 'Sneha Debnath',
    dob: '30/04/2013',
    phone: '6033227806',
    mother: 'SUKRITI DEBNATH',
    father: 'BHRIGU MONI DEBNATH',
    guardian: 'BHRIGU MONI DEBNATH',
    penNumber: '22101179656',
    apaarId: '569015635150'
  },
  58: {
    name: 'Sonali Das',
    dob: '02/08/2012',
    phone: '8014462799',
    mother: 'MADHABI SARKAR DAS',
    father: 'SUJIT DAS',
    guardian: 'SUJIT DAS',
    penNumber: '22322914006',
    apaarId: '338749108642'
  },
  59: {
    name: 'Sovasree Das',
    dob: '30/01/2013',
    phone: '8731030733',
    mother: 'SANGITA DAS',
    father: 'TAPASH DAS',
    guardian: 'TAPASH DAS',
    penNumber: '22421202339',
    apaarId: 'Not Available'
  },
  60: {
    name: 'Subhasree Debnath',
    dob: '18/09/2012',
    phone: '9730285796',
    mother: 'GITA DEBNATH',
    father: 'RAJU DEBNATH',
    guardian: 'RAJU DEBNATH',
    penNumber: '22301110423',
    apaarId: '828046006405'
  },
  61: {
    name: 'Suhani Debnath',
    dob: '29/03/2013',
    phone: '8798234783',
    mother: 'NAMITA DAS DEBNATH',
    father: 'KAMAL DEBNATH',
    guardian: 'KAMAL DEBNATH',
    penNumber: '21868527642',
    apaarId: '828321784329'
  },
  62: {
    name: 'Suparna Debnath',
    dob: '24/10/2012',
    phone: '9862871105',
    mother: 'APANRA DEBNATH',
    father: 'SUJIT DEBNATH',
    guardian: 'SUJIT DEBNATH',
    penNumber: '21848167376',
    apaarId: '822799933462'
  },
  63: {
    name: 'Swarna Biswas',
    dob: '21/11/2012',
    phone: '8974973626',
    mother: 'MALINA SINGH BISWAS',
    father: 'SADHAN BISWAS',
    guardian: 'SADHAN BISWAS',
    penNumber: '21909475568',
    apaarId: '399930468004'
  },
  // Roll 64: Taniya Nama -> Transferred (TC Issued), kept untouched
  65: {
    name: 'Tanmay Das',
    dob: '15/12/2012',
    phone: '9089220190',
    mother: 'NAMITA DAS',
    father: 'LAXMAN DAS',
    guardian: 'LAXMAN DAS',
    penNumber: '22090296127',
    apaarId: '533232206491'
  },
  66: {
    name: 'Tanusree Sarkar',
    dob: '03/04/2013',
    phone: '9089843034',
    mother: 'PARBATI SARKAR',
    father: 'SUSHIL SARKAR',
    guardian: 'SUSHIL SARKAR',
    penNumber: '22380465410',
    apaarId: '556704538023'
  },
  67: {
    name: 'Tripti Das',
    dob: '22/12/2012',
    phone: '8974297343',
    mother: 'BABLI SARKAR DAS',
    father: 'PINKU LAL DAS',
    guardian: 'PINKU LAL DAS',
    penNumber: '21985602725',
    apaarId: '298017707876'
  },
  68: {
    name: 'Urmila Debnath',
    dob: '28/12/2012',
    phone: '9077162554',
    mother: 'JASODA DEBNATH',
    father: 'SRIDAM DEBNATH',
    guardian: 'SRIDAM DEBNATH',
    penNumber: '21834874428',
    apaarId: '521839426048'
  },
  69: {
    name: 'Amarjit Das',
    dob: '08/02/2013',
    phone: '8974589593',
    mother: 'KUNTI RANI SARKAR',
    father: 'TAPAN CHANDRA SARKAR',
    guardian: 'TAPAN CHANDRA SARKAR',
    penNumber: '21863994412',
    apaarId: '424010548020'
  },
  70: {
    name: 'Papiya Debnath',
    dob: '05/07/2012',
    phone: '8794956501',
    mother: 'BABITA DEBNATH',
    father: 'PARTHAJIT DEBNATH',
    guardian: 'PARTHAJIT DEBNATH',
    penNumber: '22883250456',
    apaarId: '492985272384'
  },
  71: {
    name: 'Rudra Das',
    dob: '27/12/2011',
    phone: '9862702048',
    mother: 'SUPRIYA DAS',
    father: 'SHEFAL DAS',
    guardian: 'SHEFAL DAS',
    penNumber: '22531362790',
    apaarId: '349925052974'
  }
};

async function updateClass8() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const existingStudents = await Student.find({ classId: 'class-8' }).sort({ rollNumber: 1 });
    console.log(`Found ${existingStudents.length} existing students in Class VIII.`);

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
        console.log(`[KEPT AS IS] Roll ${st.roll} (${st.name}) - No UDISE update provided (missed / TC student kept unchanged).`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} students in Class VIII.`);
    console.log(`Kept ${untouchedCount} students as they are without change.`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class VIII students:', err);
    process.exit(1);
  }
}

updateClass8();
