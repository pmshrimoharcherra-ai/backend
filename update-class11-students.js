import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Updates for Class XI Arts
const updatesArtsByRoll = {
  1: {
    name: 'Deb Biswas',
    dob: '15/04/2010',
    phone: '9863335210',
    mother: 'ANNAPURNA BISWAS',
    father: 'KANU BISWAS',
    guardian: 'KANU BISWAS',
    penNumber: '22324581996',
    apaarId: '439008347962'
  },
  2: {
    name: 'Pritush Das',
    dob: '26/09/2009',
    phone: '9383159814',
    mother: 'BHANUMATI DAS',
    father: 'SAMARESH DAS',
    guardian: 'SAMARESH DAS',
    penNumber: '22159364550',
    apaarId: '609809148508'
  },
  3: {
    name: 'Jwel Deb',
    dob: '14/09/2009',
    phone: '6009536620',
    mother: 'NAMITA MANDAL DEB',
    father: 'SUKANTA DEB',
    guardian: 'SUKANTA DEB',
    penNumber: '21934798846',
    apaarId: '348972358904'
  },
  4: {
    name: 'Rupa Acharjee',
    dob: '19/08/2009',
    phone: '8974640562',
    mother: 'RINA ACHARJEE',
    father: 'GOUTAM ACHARJEE',
    guardian: 'GOUTAM ACHARJEE',
    penNumber: '21863902544',
    apaarId: '178633854037'
  },
  5: {
    name: 'Ishsmit Biswas',
    dob: '10/02/2010',
    phone: '6909979927',
    mother: 'LATA SARKAR BISWAS',
    father: 'UTTAM KUMAR BISWAS',
    guardian: 'UTTAM KUMAR BISWAS',
    penNumber: '22018367195',
    apaarId: '422367165679'
  },
  6: {
    name: 'Kaushik Debnath',
    dob: '03/09/2009',
    phone: '9233111775',
    mother: 'KAKALI DEBNATH',
    father: 'KHOKAN DEBNATH',
    guardian: 'KHOKAN DEBNATH',
    penNumber: '21837811096',
    apaarId: '341549295843'
  },
  7: {
    name: 'Ruhan Das',
    dob: '01/03/2010',
    phone: '9612828991',
    mother: 'MAMATA DAS',
    father: 'SUJIT DAS',
    guardian: 'SUJIT DAS',
    penNumber: '21914795053',
    apaarId: '244794181453'
  },
  8: {
    name: 'Rajib Sarkar',
    dob: '23/01/2010',
    phone: '8787439892',
    mother: 'PRAMILA SARKAR',
    father: 'MAHADEB SARKAR',
    guardian: 'MAHADEB SARKAR',
    penNumber: '22049909946',
    apaarId: '918636540874'
  },
  9: {
    name: 'Dhiman Das',
    dob: '29/06/2009',
    phone: '9436482284',
    mother: 'SWAPNA SARKAR DAS',
    father: 'DHANANJOY DAS',
    guardian: 'DHANANJOY DAS',
    penNumber: '22178784832',
    apaarId: '962560469943'
  },
  10: {
    name: 'Tanip Nama',
    dob: '23/03/2010',
    phone: '9436485337',
    mother: 'SOBHA DAS NAMA',
    father: 'TAPAS NAMA',
    guardian: 'TAPAS NAMA',
    penNumber: '21934276552',
    apaarId: '234539299284'
  },
  11: {
    name: 'Trishana Biswas',
    dob: '28/05/2010',
    phone: '8974973646',
    mother: 'JAGATRANI CHOUDHURY BISWAS',
    father: 'SURESH BISWAS',
    guardian: 'SURESH BISWAS',
    penNumber: '22552047648',
    apaarId: '580168487265'
  },
  12: {
    name: 'Mouhit Das',
    dob: '25/03/2010',
    phone: '8798145190',
    mother: 'SHILPI DAS',
    father: 'NAROTTAM DAS',
    guardian: 'NAROTTAM DAS',
    penNumber: '21871114189',
    apaarId: '962516108424'
  },
  13: {
    name: 'Sujan Modak',
    dob: '03/12/2009',
    phone: '9366194354',
    mother: 'SIMA DEBNATH MODAK',
    father: 'SANJAY MODAK',
    guardian: 'SANJAY MODAK',
    penNumber: '22484946144',
    apaarId: '228079100530'
  },
  14: {
    name: 'Subrajit Das',
    dob: '24/03/2010',
    phone: '7005560682',
    mother: 'SANJU SAHA',
    father: 'LT SUJIT DAS',
    guardian: 'SANJU SAHA',
    penNumber: '22156385202',
    apaarId: '897653797666'
  },
  15: {
    name: 'Ankita Das',
    dob: '23/09/2009',
    phone: '8415943293',
    mother: 'SARASWATI DAS',
    father: 'BAPI RANJAN DAS',
    guardian: 'BAPI RANJAN DAS',
    penNumber: '22287827340',
    apaarId: '468095437410'
  },
  16: {
    name: 'Lipi Biswas',
    dob: '09/09/2009',
    phone: '9485108315',
    mother: 'NIYATI BISWAS',
    father: 'SUKHLAL BISWAS',
    guardian: 'SUKHLAL BISWAS',
    penNumber: '22527713146',
    apaarId: '727221329664'
  },
  17: {
    name: 'Riktika Sarkar',
    dob: '15/09/2010',
    phone: '8794227031',
    mother: 'SHANTI SARKAR',
    father: 'RANU SARKAR',
    guardian: 'RANU SARKAR',
    penNumber: '22262840268',
    apaarId: '809611150249'
  },
  18: {
    name: 'Adipta Das',
    dob: '11/06/2009',
    phone: '9863544600',
    mother: 'ANITA DAS',
    father: 'HARENDRA DAS',
    guardian: 'HARENDRA DAS',
    penNumber: '22435132756',
    apaarId: '896321936451'
  },
  19: {
    name: 'Dipanjan Debnath',
    dob: '18/01/2010',
    phone: '9366621697',
    mother: 'BINA RANI DEBNATH',
    father: 'NIRANJAN DEBNATH',
    guardian: 'NIRANJAN DEBNATH',
    penNumber: '21862876684',
    apaarId: '656786054555'
  },
  20: {
    name: 'Sandip Debnath',
    dob: '02/06/2010',
    phone: '9366533146',
    mother: 'SRIMATI DEBNATH',
    father: 'SHYAMAL DEBNATH',
    guardian: 'SHYAMAL DEBNATH',
    penNumber: '22287505741',
    apaarId: '728305085988'
  },
  21: {
    name: 'Shovajit Sarkar',
    dob: '03/02/2010',
    phone: '9436183861',
    mother: 'JHANNU SARKAR',
    father: 'JHANTU SARKAR',
    guardian: 'JHANTU SARKAR',
    penNumber: '22025179375',
    apaarId: '139142784680'
  },
  22: {
    name: 'Bipul Debnath',
    dob: '26/09/2009',
    phone: '7630892873',
    mother: 'GITA DEBNATH',
    father: 'BIMAL DEBNATH',
    guardian: 'BIMAL DEBNATH',
    penNumber: '22214142083',
    apaarId: '487959868907'
  },
  23: {
    name: 'Anamika Biswas',
    dob: '16/09/2010',
    phone: '8974627764',
    mother: 'MANI BALA BISWAS',
    father: 'CHITTARANJAN BISWAS',
    guardian: 'CHITTARANJAN BISWAS',
    penNumber: '22111517390',
    apaarId: '479337721809'
  },
  24: {
    name: 'Reshmi Das',
    dob: '15/01/2010',
    phone: '9366981533',
    mother: 'RAKHI DAS',
    father: 'DILIP DAS',
    guardian: 'DILIP DAS',
    penNumber: '22526071171',
    apaarId: '636663893709'
  },
  25: {
    name: 'Jaya Das',
    dob: '13/04/2010',
    phone: '8259858030',
    mother: 'INDU DAS',
    father: 'SUJIT DAS',
    guardian: 'SUJIT DAS',
    penNumber: '22001977782',
    apaarId: '735846845670'
  },
  26: {
    name: 'Riya Sarkar',
    dob: '05/03/2010',
    phone: '8787463390',
    mother: 'SARATHI SARKAR',
    father: 'CHANDAN SARKAR',
    guardian: 'CHANDAN SARKAR',
    penNumber: '22028527006',
    apaarId: '670278564476'
  },
  27: {
    name: 'Ankita Das',
    dob: '22/07/2010',
    phone: '8119063909',
    mother: 'SOMA DAS',
    father: 'ASHIS DAS',
    guardian: 'ASHIS DAS',
    penNumber: '22213981748',
    apaarId: '558026550990'
  },
  28: {
    name: 'Jhutika Nama',
    dob: '10/01/2010',
    phone: '8415085864',
    mother: 'REKHA BISWAS NAMA',
    father: 'AJIT NAMA',
    guardian: 'AJIT NAMA',
    penNumber: '21847239899',
    apaarId: '517095673377'
  },
  29: {
    name: 'Puja Debnath',
    dob: '20/02/2010',
    phone: '9863592545',
    mother: 'PRATIMA DEBNATH',
    father: 'GOPAL DEBNATH',
    guardian: 'GOPAL DEBNATH',
    penNumber: '21841409922',
    apaarId: '698426546423'
  },
  30: {
    name: 'Tripti Das',
    dob: '12/10/2009',
    phone: '9366324358',
    mother: 'MILLIKA BALA DAS',
    father: 'SANJIT DAS',
    guardian: 'SANJIT DAS',
    penNumber: '21912902855',
    apaarId: 'Not Available'
  },
  31: {
    name: 'Papiya Das',
    dob: '09/01/2010',
    phone: '8974640527',
    mother: 'BHAGYASHRI DAS',
    father: 'DIPAK DAS',
    guardian: 'DIPAK DAS',
    penNumber: '22214829804',
    apaarId: '175436956432'
  },
  33: {
    name: 'Rajesh Das',
    dob: '01/01/2010',
    phone: '9612264877',
    mother: 'ANIMA DAS',
    father: 'RAKHAL DAS',
    guardian: 'RAKHAL DAS',
    penNumber: '21918082639',
    apaarId: '113059799137'
  },
  34: {
    name: 'Rajdweep Das',
    dob: '05/11/2009',
    phone: '9612825486',
    mother: 'MANIKA DAS',
    father: 'SARANJIT DAS',
    guardian: 'SARANJIT DAS',
    penNumber: '22090072750',
    apaarId: '169552655870'
  },
  35: {
    name: 'Arghadeep Haldar',
    dob: '06/10/2009',
    phone: '6033352400',
    mother: 'SUPRITI HALDER',
    father: 'RAKESH HALDER',
    guardian: 'RAKESH HALDER',
    penNumber: '22478599144',
    apaarId: '328923294195'
  },
  36: {
    name: 'Bristi Das',
    dob: '08/10/2010',
    phone: '8837385013',
    mother: 'SEFALI DHAR DAS',
    father: 'BISWAJIT DAS',
    guardian: 'BISWAJIT DAS',
    penNumber: '21926439157',
    apaarId: '751792286579'
  },
  37: {
    name: 'Debasmita Gope',
    dob: '01/10/2010',
    phone: '6009103511',
    mother: 'KHELA GOPE',
    father: 'SUJIT KUMAR GOPE',
    guardian: 'SUJIT KUMAR GOPE',
    penNumber: '22228718509',
    apaarId: '389989346956'
  },
  38: {
    name: 'Aparajita Das',
    dob: '12/10/2009',
    phone: '9863443676',
    mother: 'SHIPRA DAS',
    father: 'SUKANTA DAS',
    guardian: 'SUKANTA DAS',
    penNumber: '22158247063',
    apaarId: '497601866020'
  },
  39: {
    name: 'Prasanjit Das',
    dob: '30/12/2009',
    phone: '7005365438',
    mother: 'BHAGYABATI DAS',
    father: 'NANDALAL DAS',
    guardian: 'NANDALAL DAS',
    penNumber: '22005281846',
    apaarId: '803529398394'
  },
  40: {
    name: 'Susmita Debnath',
    dob: '18/01/2010',
    phone: '9366621697',
    mother: 'BINA RANI DEBNATH',
    father: 'NIRANJAN DEBNATH',
    guardian: 'NIRANJAN DEBNATH',
    penNumber: '22148584084',
    apaarId: '208631837348'
  },
  42: {
    name: 'Sandip Chandra Das',
    dob: '21/09/2010',
    phone: '7005153733',
    mother: 'BISHU BALA NAMA DAS',
    father: 'KESHAB CHANDRA DAS',
    guardian: 'KESHAB CHANDRA DAS',
    penNumber: '22500396374',
    apaarId: 'Not Available'
  },
  43: {
    name: 'Anamika Das',
    dob: '08/05/2010',
    phone: '7629806966',
    mother: 'SHILA RANI DAS',
    father: 'AMALESH DAS',
    guardian: 'AMALESH DAS',
    penNumber: '21873623315',
    apaarId: '207901831966'
  },
  44: {
    name: 'Abhijit Das',
    dob: '26/04/2010',
    phone: '8415891716',
    mother: 'SHIBU RANI DAS',
    father: 'LALKAMAL DAS',
    guardian: 'LALKAMAL DAS',
    penNumber: '22273898305',
    apaarId: '985507581920'
  },
  45: {
    name: 'Sandip Biswas',
    dob: '12/12/2009',
    phone: '8414846792',
    mother: 'LAXMI DAS',
    father: 'GOUTAM BISWAS',
    guardian: 'GOUTAM BISWAS',
    penNumber: '21948575028',
    apaarId: '843323984867'
  },
  46: {
    name: 'Pritam Sarkar',
    dob: '02/11/2009',
    phone: '8787467802',
    mother: 'PUTUL SARKAR',
    father: 'UTTAM SARKAR',
    guardian: 'UTTAM SARKAR',
    penNumber: '21853279036',
    apaarId: '596222286143'
  },
  47: {
    name: 'Sukanta Das',
    dob: '23/07/2009',
    phone: '8732823151',
    mother: 'RINABALA DAS',
    father: 'SUSHIL DAS',
    guardian: 'SUSHIL DAS',
    penNumber: '22441459618',
    apaarId: '206747329747'
  },
  48: {
    name: 'Biswajit Das',
    dob: '17/09/2009',
    phone: '9612415507',
    mother: 'RUBIRANI DAS',
    father: 'SUDIP DAS',
    guardian: 'SUDIP DAS',
    penNumber: '22000968418',
    apaarId: '164945071849'
  },
  49: {
    name: 'Akhil Sarkar',
    dob: '07/11/2008',
    phone: '8974866525',
    mother: 'SARATHI SARKAR',
    father: 'MANORANJAN SARKAR',
    guardian: 'MANORANJAN SARKAR',
    penNumber: '22557215245',
    apaarId: '168347483975'
  },
  50: {
    name: 'Tanmoy Sarkar',
    dob: '16/03/2010',
    phone: '9366511985',
    mother: 'KABITA SARKAR',
    father: 'TAPAN SARKAR',
    guardian: 'TAPAN SARKAR',
    penNumber: '22286584366',
    apaarId: '167483380436'
  },
  51: {
    name: 'Nayan Das',
    dob: '28/03/2010',
    phone: '6909956252',
    mother: 'SHIPRA DAS',
    father: 'RUPCHAN DAS',
    guardian: 'RUPCHAN DAS',
    penNumber: '22177375983',
    apaarId: '817252424928'
  },
  52: {
    name: 'Nandini Das',
    dob: '01/05/2009',
    phone: '8837409757',
    mother: 'KAJALI DAS',
    father: 'MANTU DAS',
    guardian: 'MANTU DAS',
    penNumber: '21958513610',
    apaarId: '342233027804'
  },
  53: {
    name: 'Arpita Mandal',
    dob: '10/01/2010',
    phone: '6009794441',
    mother: 'ADHARI MANDAL',
    father: 'ABHIJIT MANDAL',
    guardian: 'ABHIJIT MANDAL',
    penNumber: '21848991407',
    apaarId: '488763217024'
  },
  55: {
    name: 'Sumen Das',
    dob: '09/05/2010',
    phone: '8974760014',
    mother: 'SWAPNA DAS',
    father: 'SAJAL DAS',
    guardian: 'SAJAL DAS',
    penNumber: '22015982522',
    apaarId: '278008025340'
  },
  58: {
    name: 'Sangita Ghosh',
    dob: '13/06/2010',
    phone: '8274884427',
    mother: 'NAMITA GHOSH',
    father: 'JUGAL DAS',
    guardian: 'JUGAL DAS',
    penNumber: '21888626614',
    apaarId: '105349386767'
  },
  59: {
    name: 'Anamika Das',
    dob: '18/08/2009',
    phone: '8730914218',
    mother: 'PATI DAS',
    father: 'SAMIR DAS',
    guardian: 'SAMIR DAS',
    penNumber: '21929985511',
    apaarId: '326638870484'
  },
  60: {
    name: 'Supriya Sarkar',
    dob: '06/04/2010',
    phone: '6009358180',
    mother: 'SHIPRA SARKAR',
    father: 'SHYAMAL SARKAR',
    guardian: 'SHYAMAL SARKAR',
    penNumber: '21833488954',
    apaarId: '746574083424'
  },
  63: {
    name: 'Anindita Das',
    dob: '02/06/2009',
    phone: '7085821133',
    mother: 'PARUL DAS',
    father: 'SHUBHALAL DAS',
    guardian: 'SHUBHALAL DAS',
    penNumber: '22083729516',
    apaarId: '207402984529'
  },
  65: {
    name: 'Ruma Das',
    dob: '02/05/2010',
    phone: '9366710415',
    mother: 'SAJALA DAS',
    father: 'DULAL DAS',
    guardian: 'DULAL DAS',
    penNumber: '22227484625',
    apaarId: '502446887257'
  },
  66: {
    name: 'Joydipa Ghosh',
    dob: '14/08/2009',
    phone: '8132021108',
    mother: 'SANJU GHOSH',
    father: 'SRIBASAN GHOSH',
    guardian: 'SRIBASAN GHOSH',
    penNumber: '22306510852',
    apaarId: '368961276676'
  },
  67: {
    name: 'Papiya Nama Shudra',
    dob: '03/08/2010',
    phone: '8787700858',
    mother: 'SABITA BISWAS',
    father: 'MITAN NAMA SHUDRA',
    guardian: 'MITAN NAMA SHUDRA',
    penNumber: '22097571780',
    apaarId: '380333688841'
  },
  69: {
    name: 'Sagar Das',
    dob: '28/09/2009',
    phone: '8974385314',
    mother: 'RINA DAS',
    father: 'SUSHIL DAS',
    guardian: 'SUSHIL DAS',
    penNumber: '22457706656',
    apaarId: '685826618167'
  },
  70: {
    name: 'Rima Debnath',
    dob: '22/11/2009',
    phone: '8787459779',
    mother: 'JHUMA DEBNATH',
    father: 'GOUR DEBNATH',
    guardian: 'GOUR DEBNATH',
    penNumber: '21980226162',
    apaarId: '170144712849'
  },
  74: {
    name: 'Purnima Das',
    dob: '12/08/2009',
    phone: '9366857547',
    mother: 'LAXMI RANI DAS',
    father: 'NRIPENDRA DAS',
    guardian: 'NRIPENDRA DAS',
    penNumber: '22442173000',
    apaarId: '538153958154'
  },
  75: {
    name: 'Himani Debnath',
    dob: '12/10/2009',
    phone: '7628035353',
    mother: 'SHIPRA DEBNATH',
    father: 'AJIT DEBNATH',
    guardian: 'AJIT DEBNATH',
    penNumber: '22171689902',
    apaarId: '329160220543'
  },
  76: {
    name: 'Asmita Das',
    dob: '22/11/2009',
    phone: '9436507576',
    mother: 'MAMPI DAS',
    father: 'SUBRATA DAS',
    guardian: 'SUBRATA DAS',
    penNumber: '21836990602',
    apaarId: '813391190859'
  },
  77: {
    name: 'Manika Biswas',
    dob: '21/01/2010',
    phone: '9089290924',
    mother: 'SATHI DEY BISWAS',
    father: 'MARAN BISWAS',
    guardian: 'MARAN BISWAS',
    penNumber: '22141006294',
    apaarId: '891206702022'
  },
  80: {
    name: 'Chira Shri Mallik',
    dob: '20/07/2009',
    phone: '9366159100',
    mother: 'PRANATI DEBNATH',
    father: 'GURU CHARAN MALLIK',
    guardian: 'GURU CHARAN MALLIK',
    penNumber: '22102374093',
    apaarId: '963287352345'
  },
  81: {
    name: 'Abai Sarkar',
    dob: '19/11/2008',
    phone: '7629800344',
    mother: 'SUBHADRA SARKAR',
    father: 'AJIT SARKAR',
    guardian: 'AJIT SARKAR',
    penNumber: '22398145972',
    apaarId: '229726753240'
  },
  82: {
    name: 'Suvankar Sarkar',
    dob: '13/04/2010',
    phone: '9233112044',
    mother: 'NANDINI SARKAR',
    father: 'DILIP SARKAR',
    guardian: 'DILIP SARKAR',
    penNumber: '22211723709',
    apaarId: '945834875105'
  },
  102: {
    name: 'Hritika Debnath',
    dob: '29/05/2010',
    phone: '7005929561',
    mother: 'SARASWATI DEBNATH',
    father: 'NANTU DEBNATH',
    guardian: 'NANTU DEBNATH',
    penNumber: '21897161982',
    apaarId: '303577090720'
  },
  111: {
    name: 'Dipayan Debnath',
    dob: '07/06/2010',
    phone: '7630888767',
    mother: 'SHILPI DEBNATH',
    father: 'RUPEN DEBNATH',
    guardian: 'RUPEN DEBNATH',
    penNumber: '22102538819',
    apaarId: '261554102484'
  },
  152: {
    name: 'Supriya Debnath',
    dob: '02/07/2010',
    phone: '6033351721',
    mother: 'SHILPI DEBNATH',
    father: 'UTTAM KR DEBNATH',
    guardian: 'UTTAM KR DEBNATH',
    penNumber: '22103044793',
    apaarId: '799673806789'
  },
  166: {
    name: 'Shristi Ghosh',
    dob: '26/01/2010',
    phone: '8413986741',
    mother: 'RATNA GOPE GHOSH',
    father: 'SATYA RANJAN GHOSH',
    guardian: 'SATYA RANJAN GHOSH',
    penNumber: '21868114678',
    apaarId: '470203171393'
  }
};

// Updates for Class XI Science
const updatesSciByRoll = {
  1: {
    name: 'Amit Sarkar',
    dob: '27/10/2009',
    phone: '7005886876',
    mother: 'PARAMITA SARKAR',
    father: 'AMARCHAN SARKAR',
    guardian: 'AMARCHAN SARKAR',
    penNumber: '21993894869',
    apaarId: '612950769916'
  },
  3: {
    name: 'Daliya Das',
    dob: '24/05/2010',
    phone: '9366615642',
    mother: 'SOMA DAS',
    father: 'NIRMAL DAS',
    guardian: 'NIRMAL DAS',
    penNumber: '22394693286',
    apaarId: '999643426372'
  },
  6: {
    name: 'Parmita Das',
    dob: '25/06/2010',
    phone: '9612640326',
    mother: 'DIPIKA DAS',
    father: 'BASANTA KR DAS',
    guardian: 'BASANTA KR DAS',
    penNumber: '22180412875',
    apaarId: '722877270401'
  }
};

async function updateClass11() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    // Update Class XI Arts
    const artsStudents = await Student.find({ classId: 'class-11-arts' }).sort({ rollNumber: 1 });
    console.log(`Found ${artsStudents.length} students in Class XI Arts.`);
    let artsUpdated = 0;
    let artsBlank = 0;

    for (const st of artsStudents) {
      const rollNum = parseInt(st.roll, 10);
      const updateData = updatesArtsByRoll[rollNum];

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
        artsUpdated++;
        console.log(`[ARTS UPDATED] Roll ${st.roll} (${st.name}) - PEN: ${st.penNumber}, APAAR: ${st.apaarId}`);
      } else {
        // Leave blank
        artsBlank++;
      }
    }

    // Update Class XI Science
    const sciStudents = await Student.find({ classId: 'class-11-sci' }).sort({ rollNumber: 1 });
    console.log(`Found ${sciStudents.length} students in Class XI Science.`);
    let sciUpdated = 0;
    let sciBlank = 0;

    for (const st of sciStudents) {
      const rollNum = parseInt(st.roll, 10);
      const updateData = updatesSciByRoll[rollNum];

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
        sciUpdated++;
        console.log(`[SCI UPDATED] Roll ${st.roll} (${st.name}) - PEN: ${st.penNumber}, APAAR: ${st.apaarId}`);
      } else {
        // Leave blank
        sciBlank++;
      }
    }

    console.log(`\n================ Summary ================`);
    console.log(`Class XI Arts: ${artsUpdated} updated, ${artsBlank} kept blank.`);
    console.log(`Class XI Science: ${sciUpdated} updated, ${sciBlank} kept blank.`);
    console.log(`Total updated: ${artsUpdated + sciUpdated} of 75 provided.`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class XI students:', err);
    process.exit(1);
  }
}

updateClass11();
