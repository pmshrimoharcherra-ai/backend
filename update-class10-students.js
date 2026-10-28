import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

export const class10Students = [
  {
    roll: 1,
    name: 'Abhijit Singha Roy',
    gender: 'Boy',
    enrollmentNo: '31202738262',
    enrollmentYear: '2025',
    dob: '12/10/2011',
    phone: '8258914997',
    mother: 'DULAN RANI DEB',
    father: 'BISWAJIT SINGHA ROY',
    penNumber: '22554455009',
    apaarId: 'Not Available'
  },
  {
    roll: 2,
    name: 'Achinta Das',
    gender: 'Boy',
    enrollmentNo: '31202727912',
    enrollmentYear: '2025',
    dob: '01/01/2010',
    phone: '7085580289',
    mother: 'RINKU DAS',
    father: 'HIRA LAL DAS',
    penNumber: '22205777025',
    apaarId: 'Not Available'
  },
  {
    roll: 3,
    name: 'Aditya Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727946',
    enrollmentYear: '2025',
    dob: '23/09/2010',
    phone: '8837335345',
    mother: 'NAMITA SARKAR',
    father: 'AMAR CHARAN BISWAS',
    penNumber: '22328000382',
    apaarId: '723387030675'
  },
  {
    roll: 4,
    name: 'Argrajit Ghosh',
    gender: 'Boy',
    enrollmentNo: '',
    enrollmentYear: '2025',
    dob: '03/11/2010',
    phone: '6009420335',
    mother: 'MANJU GHOSH',
    father: 'SUKHAMOY GHOSH',
    penNumber: '21871567886',
    apaarId: '277403685704'
  },
  {
    roll: 5,
    name: 'Ahili Das',
    gender: 'Girl',
    enrollmentNo: '32202727928',
    enrollmentYear: '2025',
    dob: '05/05/2011',
    phone: '9863629659',
    mother: 'SUNITA DAS',
    father: 'SONA MOHAN DAS',
    penNumber: '21864419070',
    apaarId: '600319747174'
  },
  {
    roll: 6,
    name: 'Ajoy Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727978',
    enrollmentYear: '2025',
    dob: '22/09/2010',
    phone: '9612984432',
    mother: 'SABITRI SARKAR',
    father: 'ARUN BISWAS',
    penNumber: '21866671589',
    apaarId: '565067851500'
  },
  {
    roll: 7,
    name: 'Anima Das',
    gender: 'Girl',
    enrollmentNo: '32202727970',
    enrollmentYear: '2025',
    dob: '01/01/2010',
    phone: '6033435705',
    mother: 'PRATIMA RANI DAS',
    father: 'ADHIR LAL DAS',
    penNumber: '22247484079',
    apaarId: '420855356910'
  },
  {
    roll: 8,
    name: 'Anishka Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727974',
    enrollmentYear: '2025',
    dob: '09/09/2010',
    phone: '9089746204',
    mother: 'SHAFALI HALDAR BISWAS',
    father: 'UTTAM BISWAS',
    penNumber: '21958142010',
    apaarId: '475877675427'
  },
  {
    roll: 9,
    name: 'Ankur Deb',
    gender: 'Boy',
    enrollmentNo: '31202727960',
    enrollmentYear: '2025',
    dob: '14/08/2010',
    phone: '8413996740',
    mother: 'RITA DEB',
    father: 'MANIK DEB',
    penNumber: '22419804500',
    apaarId: '600953992273'
  },
  {
    roll: 10,
    name: 'Anujit Das',
    gender: 'Boy',
    enrollmentNo: '31202727923',
    enrollmentYear: '2025',
    dob: '21/04/2010',
    phone: '7005534177',
    mother: 'UJJALA DAS',
    father: 'KRISHNADHAN DAS',
    penNumber: '22125037235',
    apaarId: '632401509955'
  },
  {
    roll: 11,
    name: 'Aparna Das',
    gender: 'Girl',
    enrollmentNo: '32202727933',
    enrollmentYear: '2025',
    dob: '14/10/2010',
    phone: '8414854959',
    mother: 'LAXMI RANI DAS',
    father: 'SANKAR DAS',
    penNumber: '21973355854',
    apaarId: '543561070258'
  },
  {
    roll: 12,
    name: 'Apurba Das',
    gender: 'Boy',
    enrollmentNo: '31202738264',
    enrollmentYear: '2025',
    dob: '26/02/2011',
    phone: '7085574099',
    mother: 'ALPANA DAS',
    father: 'ABHIJIT DAS',
    penNumber: '21910233079',
    apaarId: '983110502443'
  },
  {
    roll: 13,
    name: 'Aritra Das',
    gender: 'Boy',
    enrollmentNo: '31202727917',
    enrollmentYear: '2025',
    dob: '15/12/2010',
    phone: '9612879187',
    mother: 'RAMA RANI DAS',
    father: 'ASHOK DAS',
    penNumber: '21894098259',
    apaarId: '870504902736'
  },
  {
    roll: 14,
    name: 'Arup Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727906',
    enrollmentYear: '2025',
    dob: '19/04/2011',
    phone: '9999999999',
    mother: 'SOMA RANI SHIL BISWAS',
    father: 'AJIT BISWAS',
    penNumber: '21947529047',
    apaarId: 'Not Available'
  },
  {
    roll: 15,
    name: 'Ashish Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727973',
    enrollmentYear: '2025',
    dob: '08/05/2011',
    phone: '6033403110',
    mother: 'RADHA RANI DEBNATH',
    father: 'LT AMRIT DEBNATH',
    penNumber: '22005783400',
    apaarId: '255651229173'
  },
  {
    roll: 16,
    name: 'Ayush Das',
    gender: 'Boy',
    enrollmentNo: '31202727913',
    enrollmentYear: '2025',
    dob: '25/02/2011',
    phone: '9612104233',
    mother: 'RINA DAS',
    father: 'SUKHEN DAS',
    penNumber: '22398054522',
    apaarId: '216564162714'
  },
  {
    roll: 17,
    name: 'Barsha Das',
    gender: 'Girl',
    enrollmentNo: '32202727956',
    enrollmentYear: '2025',
    dob: '29/03/2011',
    phone: '8413073740',
    mother: 'APARNA DAS',
    father: 'AJIT DAS',
    penNumber: '22299833786',
    apaarId: '498716718273'
  },
  {
    roll: 18,
    name: 'Bishal Das',
    gender: 'Boy',
    enrollmentNo: '31202727934',
    enrollmentYear: '2025',
    dob: '25/05/2010',
    phone: '7085185950',
    mother: 'RUPALI DAS',
    father: 'BIKASH CHANDRA DAS',
    penNumber: '22486618658',
    apaarId: '672329058078'
  },
  {
    roll: 19,
    name: 'Deepshikha Das',
    gender: 'Girl',
    enrollmentNo: '32202727964',
    enrollmentYear: '2025',
    dob: '18/09/2010',
    phone: '8131076937',
    mother: 'RUBI RANI DAS',
    father: 'BIJOY DAS',
    penNumber: '21942832319',
    apaarId: 'Not Available'
  },
  {
    roll: 20,
    name: 'Dipa Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727919',
    enrollmentYear: '2025',
    dob: '20/03/2010',
    phone: '9862393685',
    mother: 'NANDA RANI SARKAR BISWAS',
    father: 'KHOKAN BISWAS',
    penNumber: '21845687905',
    apaarId: '830708008505'
  },
  {
    roll: 21,
    name: 'Dipa Roy',
    gender: 'Girl',
    enrollmentNo: '32202727962',
    enrollmentYear: '2025',
    dob: '10/11/2010',
    phone: '9863002571',
    mother: 'SABITA SARKAR',
    father: 'KALI CHARAN ROY',
    penNumber: '22350123367',
    apaarId: '295716142842'
  },
  {
    roll: 22,
    name: 'Dipali Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202727940',
    enrollmentYear: '2025',
    dob: '',
    phone: '',
    mother: '',
    father: '',
    penNumber: '',
    apaarId: 'Not Available'
  },
  {
    roll: 23,
    name: 'Dipesh Modak',
    gender: 'Boy',
    enrollmentNo: '31202727926',
    enrollmentYear: '2025',
    dob: '20/11/2010',
    phone: '8131935285',
    mother: 'SHILPI RANI DEB',
    father: 'DIPAK MODAK',
    penNumber: '22019767559',
    apaarId: '808718022232'
  },
  {
    roll: 24,
    name: 'Dipika Nandi',
    gender: 'Girl',
    enrollmentNo: '32202727963',
    enrollmentYear: '2025',
    dob: '26/12/2010',
    phone: '9366456685',
    mother: 'BANTI DEB',
    father: 'DIPAK NANDI',
    penNumber: '22284881821',
    apaarId: '171475037125'
  },
  {
    roll: 25,
    name: 'Diya Das',
    gender: 'Girl',
    enrollmentNo: '32202727947',
    enrollmentYear: '2025',
    dob: '28/09/2010',
    phone: '9863617342',
    mother: 'SRIMATI DAS',
    father: 'DAYANANDA DAS',
    penNumber: '22390729187',
    apaarId: '938953314964'
  },
  {
    roll: 26,
    name: 'Genelia Debbarma',
    gender: 'Girl',
    enrollmentNo: '32202727935',
    enrollmentYear: '2025',
    dob: '24/09/2011',
    phone: '6909069892',
    mother: 'PRIJINA DEBBAMA',
    father: 'ARJUN DEBBARMA',
    penNumber: '22494749526',
    apaarId: '172425913171'
  },
  {
    roll: 27,
    name: 'Goutam Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727911',
    enrollmentYear: '2025',
    dob: '22/06/2011',
    phone: '8974110498',
    mother: 'NIRMALA DEBNATH',
    father: 'UPENDRA DEBNATH',
    penNumber: '22106923019',
    apaarId: '211216676525'
  },
  {
    roll: 28,
    name: 'Hriday Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727920',
    enrollmentYear: '2025',
    dob: '25/12/2010',
    phone: '6909496897',
    mother: 'JHUMA DEBNATN',
    father: 'PRADIP DEBNATH',
    penNumber: '22231723505',
    apaarId: '907235054485'
  },
  {
    roll: 29,
    name: 'Jayanta Sarkar',
    gender: 'Boy',
    enrollmentNo: '31202727948',
    enrollmentYear: '2025',
    dob: '11/04/2010',
    phone: '9615792087',
    mother: 'CHAMPA SARKAR',
    father: 'KRISHNADHAN SARKAR',
    penNumber: '21959252929',
    apaarId: '601318179802'
  },
  {
    roll: 30,
    name: 'Jayashree Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727924',
    enrollmentYear: '2025',
    dob: '',
    phone: '',
    mother: '',
    father: '',
    penNumber: '',
    apaarId: 'Not Available'
  },
  {
    roll: 31,
    name: 'Joy Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727909',
    enrollmentYear: '2025',
    dob: '24/08/2011',
    phone: '9863815721',
    mother: 'JHUMA DEBNATH',
    father: 'UTTAM DEBNATH',
    penNumber: '21871234302',
    apaarId: '141020132176'
  },
  {
    roll: 32,
    name: 'Joydip Das',
    gender: 'Boy',
    enrollmentNo: '31202727958',
    enrollmentYear: '2025',
    dob: '10/09/2010',
    phone: '7085318960',
    mother: 'SUCHITRA DAS',
    father: 'SATYA RANJAN DAS',
    penNumber: '21971058090',
    apaarId: 'Not Available'
  },
  {
    roll: 33,
    name: 'Kartik Das',
    gender: 'Boy',
    enrollmentNo: '31202727972',
    enrollmentYear: '2025',
    dob: '28/10/2010',
    phone: '7005857042',
    mother: 'ARPITA DAS',
    father: 'SANJAY DAS',
    penNumber: '22301058588',
    apaarId: '973950514704'
  },
  {
    roll: 34,
    name: 'Mallika Das',
    gender: 'Girl',
    enrollmentNo: '32202727937',
    enrollmentYear: '2025',
    dob: '20/05/2009',
    phone: '6009051643',
    mother: 'DIPALI BALA DAS',
    father: 'NANTU DAS',
    penNumber: '22421970927',
    apaarId: 'Not Available'
  },
  {
    roll: 35,
    name: 'Mandira Debnath',
    gender: 'Girl',
    enrollmentNo: '32202727907',
    enrollmentYear: '2025',
    dob: '11/01/2011',
    phone: '6033294814',
    mother: 'MANIKA DEBNATH',
    father: 'SUBODH DEBNATH',
    penNumber: '22396096776',
    apaarId: 'Not Available'
  },
  {
    roll: 36,
    name: 'Manisha Das',
    gender: 'Girl',
    enrollmentNo: '32202727957',
    enrollmentYear: '2025',
    dob: '18/02/2011',
    phone: '8131962828',
    mother: 'ANIMA DAS',
    father: 'PINTU DAS',
    penNumber: '22394829093',
    apaarId: '502898241272'
  },
  {
    roll: 37,
    name: 'Mitu Das',
    gender: 'Girl',
    enrollmentNo: '32202727925',
    enrollmentYear: '2025',
    dob: '18/12/2010',
    phone: '7085852448',
    mother: 'ANJANA DAS',
    father: 'DILIP DAS',
    penNumber: '22291458794',
    apaarId: '159873918127'
  },
  {
    roll: 38,
    name: 'Moutushi Debnath',
    gender: 'Girl',
    enrollmentNo: '32202727929',
    enrollmentYear: '2025',
    dob: '17/11/2010',
    phone: '8787747807',
    mother: 'ANITA DEBNATH',
    father: 'MINTU DEBNATH',
    penNumber: '21952078239',
    apaarId: 'Not Available'
  },
  {
    roll: 39,
    name: 'Muktarani Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202727930',
    enrollmentYear: '2025',
    dob: '10/06/2009',
    phone: '7085519210',
    mother: 'DIPALI SARKAR',
    father: 'BISWAJIT SARKAR',
    penNumber: '22151134181',
    apaarId: '468641641735'
  },
  {
    roll: 40,
    name: 'Niha Nama',
    gender: 'Girl',
    enrollmentNo: '32202727971',
    enrollmentYear: '2025',
    dob: '12/06/2010',
    phone: '9378743360',
    mother: 'SABITRI NAMA',
    father: 'HIRENDRA NAMA',
    penNumber: '22144804050',
    apaarId: '143930006727'
  },
  {
    roll: 41,
    name: 'Papiya Modak',
    gender: 'Girl',
    enrollmentNo: '32202727943',
    enrollmentYear: '2025',
    dob: '07/07/2011',
    phone: '7005351208',
    mother: 'MUKTA MODAK',
    father: 'RANJAN MODAK',
    penNumber: '22497910637',
    apaarId: '631665389328'
  },
  {
    roll: 42,
    name: 'Papiya Nama',
    gender: 'Girl',
    enrollmentNo: '32202727902',
    enrollmentYear: '2025',
    dob: '26/10/2010',
    phone: '9612580713',
    mother: 'SUMITRA SARKAR NAMA',
    father: 'SADHAN NAMA',
    penNumber: '22504055484',
    apaarId: '302257503678'
  },
  {
    roll: 43,
    name: 'Parmita Das',
    gender: 'Girl',
    enrollmentNo: '32202727969',
    enrollmentYear: '2025',
    dob: '27/06/2011',
    phone: '9089572201',
    mother: 'LAXMI BALA BHOWMIK DAS',
    father: 'PARIMAL DAS',
    penNumber: '21999855389',
    apaarId: 'Not Available'
  },
  {
    roll: 44,
    name: 'Piu Deb',
    gender: 'Girl',
    enrollmentNo: '32202727965',
    enrollmentYear: '2025',
    dob: '29/10/2010',
    phone: '8974227750',
    mother: 'SOMA DEB',
    father: 'PIJUSH DEB',
    penNumber: '22238785215',
    apaarId: 'Not Available'
  },
  {
    roll: 45,
    name: 'Prakash Das',
    gender: 'Boy',
    enrollmentNo: '31202727908',
    enrollmentYear: '2025',
    dob: '03/03/2011',
    phone: '9863196516',
    mother: 'RENUBALA DAS',
    father: 'PAPLU DAS',
    penNumber: '22323518623',
    apaarId: '992058465982'
  },
  {
    roll: 46,
    name: 'Prasanta Das',
    gender: 'Boy',
    enrollmentNo: '31202727921',
    enrollmentYear: '2025',
    dob: '27/10/2010',
    phone: '9862007381',
    mother: 'SHIPRA RANI DAS',
    father: 'DULAL DAS',
    penNumber: '21966878739',
    apaarId: 'Not Available'
  },
  {
    roll: 47,
    name: 'Pritam Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727944',
    enrollmentYear: '2025',
    dob: '19/01/2011',
    phone: '9089671806',
    mother: 'MAMATA MAYEE DEBNATH',
    father: 'PARTHA DEBNATH',
    penNumber: '21981723660',
    apaarId: 'Not Available'
  },
  {
    roll: 48,
    name: 'Puja Das',
    gender: 'Girl',
    enrollmentNo: '32202727955',
    enrollmentYear: '2025',
    dob: '25/05/2011',
    phone: '8414844582',
    mother: 'DIPALI DAS',
    father: 'DILIP DAS',
    penNumber: '22026524096',
    apaarId: 'Not Available'
  },
  {
    roll: 49,
    name: 'Puja Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202727954',
    enrollmentYear: '2025',
    dob: '23/10/2010',
    phone: '7641013739',
    mother: 'KALPANA NAMA SUDRA',
    father: 'GOUTAM SARKAR',
    penNumber: '21880368627',
    apaarId: '896265608659'
  },
  {
    roll: 50,
    name: 'Purnima Ghosh',
    gender: 'Girl',
    enrollmentNo: '32202727903',
    enrollmentYear: '2025',
    dob: '18/02/2011',
    phone: '8974505125',
    mother: 'ANJALI DEB',
    father: 'DEBASHISH GHOSH',
    penNumber: '22264594230',
    apaarId: '636759867744'
  },
  {
    roll: 51,
    name: 'Rahul Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727932',
    enrollmentYear: '2025',
    dob: '10/06/2011',
    phone: '7629005494',
    mother: 'ARAMATI DAS',
    father: 'DULAL BISWAS',
    penNumber: '22379989151',
    apaarId: 'Not Available'
  },
  {
    roll: 52,
    name: 'Rakhi Ghosh',
    gender: 'Girl',
    enrollmentNo: '32202727986',
    enrollmentYear: '2025',
    dob: '13/08/2011',
    phone: '9366534781',
    mother: 'RATNA BALA GIRI',
    father: 'CHANDRA SHEKAR GHOSH',
    penNumber: '22352026691',
    apaarId: 'Not Available'
  },
  {
    roll: 53,
    name: 'Rima Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727976',
    enrollmentYear: '2025',
    dob: '04/04/2011',
    phone: '8131074694',
    mother: 'RUMA BISWAS',
    father: 'RABINDRA BISWAS',
    penNumber: '22266397595',
    apaarId: '456336510512'
  },
  {
    roll: 54,
    name: 'Rima Debnath',
    gender: 'Girl',
    enrollmentNo: '32202727967',
    enrollmentYear: '2025',
    dob: '30/09/2010',
    phone: '9362676246',
    mother: 'RINA DEBNATH',
    father: 'PARIMAL DEBNATH',
    penNumber: '22527872934',
    apaarId: '683732035688'
  },
  {
    roll: 55,
    name: 'Ripa Das',
    gender: 'Girl',
    enrollmentNo: '32202727952',
    enrollmentYear: '2025',
    dob: '23/09/2010',
    phone: '8731067156',
    mother: 'RINKI DAS',
    father: 'SANTA KUMAR DAS',
    penNumber: '21877065254',
    apaarId: '457456687422'
  },
  {
    roll: 56,
    name: 'Ripan Halder',
    gender: 'Boy',
    enrollmentNo: '',
    enrollmentYear: '2025',
    dob: '05/01/2011',
    phone: '9862517246',
    mother: 'MALATI HALDAR',
    father: 'RATAN HALDAR',
    penNumber: '21942947205',
    apaarId: 'Not Available'
  },
  {
    roll: 57,
    name: 'Ritesh Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727914',
    enrollmentYear: '2025',
    dob: '08/09/2010',
    phone: '8974333506',
    mother: 'SUPRITI BISWAS',
    father: 'RANJIT BISWAS',
    penNumber: '21836994318',
    apaarId: 'Not Available'
  },
  {
    roll: 58,
    name: 'Rohit Das',
    gender: 'Boy',
    enrollmentNo: '31202727931',
    enrollmentYear: '2025',
    dob: '01/01/2010',
    phone: '8837388270',
    mother: 'REKHA DAS',
    father: 'SANJIT DAS',
    penNumber: '22538755938',
    apaarId: 'Not Available'
  },
  {
    roll: 59,
    name: 'Rupali Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202727961',
    enrollmentYear: '2025',
    dob: '18/01/2011',
    phone: '9366916979',
    mother: 'BAKUL SARKAR',
    father: 'TARANI SARKAR',
    penNumber: '22580394241',
    apaarId: 'Not Available'
  },
  {
    roll: 60,
    name: 'Sanjib Sarkar',
    gender: 'Boy',
    enrollmentNo: '31202727950',
    enrollmentYear: '2025',
    dob: '07/05/2011',
    phone: '8787806059',
    mother: 'PRATIMA SARKAR',
    father: 'NAROTTAM SARKAR',
    penNumber: '22821496371',
    apaarId: '563348807530'
  },
  {
    roll: 61,
    name: 'Sarajit Sarkar',
    gender: 'Boy',
    enrollmentNo: '31202738263',
    enrollmentYear: '2025',
    dob: '24/10/2010',
    phone: '8414838742',
    mother: 'SOMA RANI SARKAR',
    father: 'SUJIT SARKAR',
    penNumber: '22568861006',
    apaarId: 'Not Available'
  },
  {
    roll: 62,
    name: 'Shantanu Das',
    gender: 'Boy',
    enrollmentNo: '31202727939',
    enrollmentYear: '2025',
    dob: '12/05/2011',
    phone: '6009555620',
    mother: 'MINTU DAS',
    father: 'GANESH DAS',
    penNumber: '22291491830',
    apaarId: '550780158936'
  },
  {
    roll: 63,
    name: 'Shrabanti Nama',
    gender: 'Girl',
    enrollmentNo: '32202727910',
    enrollmentYear: '2025',
    dob: '24/05/2011',
    phone: '8794205602',
    mother: 'MALATI BISWAS',
    father: 'RATAN NAMA',
    penNumber: '21894320092',
    apaarId: 'Not Available'
  },
  {
    roll: 64,
    name: 'Sonali Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202738265',
    enrollmentYear: '2025',
    dob: '27/04/2011',
    phone: '9366492110',
    mother: 'SUJATA DAS',
    father: 'TAPAN SARKAR',
    penNumber: '21857526893',
    apaarId: '529445980018'
  },
  {
    roll: 65,
    name: 'Subhrajit Das',
    gender: 'Boy',
    enrollmentNo: '31202727953',
    enrollmentYear: '2025',
    dob: '05/02/2011',
    phone: '8974504491',
    mother: 'PINKI MAJUMDER',
    father: 'PREMJIT DAS',
    penNumber: '21927744664',
    apaarId: '553191330967'
  },
  {
    roll: 66,
    name: 'Subhrajit Das',
    gender: 'Boy',
    enrollmentNo: '31202727927',
    enrollmentYear: '2025',
    dob: '14/12/2010',
    phone: '9362621993',
    mother: 'SOMA BISWAS DAS',
    father: 'PARITOSH DAS',
    penNumber: '21860437939',
    apaarId: 'Not Available'
  },
  {
    roll: 67,
    name: 'Subhrajit Debnath',
    gender: 'Boy',
    enrollmentNo: '31202727918',
    enrollmentYear: '2025',
    dob: '10/04/2011',
    phone: '8119064674',
    mother: 'REKHA DEBNATH',
    father: 'LITAN DEBNATH',
    penNumber: '22020444357',
    apaarId: 'Not Available'
  },
  {
    roll: 68,
    name: 'Subhrajit Das',
    gender: 'Boy',
    enrollmentNo: '31202727941',
    enrollmentYear: '2025',
    dob: '19/11/2010',
    phone: '8131841549',
    mother: 'PINKI MAJUMDER DAS',
    father: 'BISWAJIT DAS',
    penNumber: '21986537522',
    apaarId: 'Not Available'
  },
  {
    roll: 69,
    name: 'Subrata Das',
    gender: 'Boy',
    enrollmentNo: '31202727922',
    enrollmentYear: '2025',
    dob: '09/12/2010',
    phone: '8798423604',
    mother: 'SHIKHA RANI DAS',
    father: 'BABUL DAS',
    penNumber: '22406452238',
    apaarId: '468725324587'
  },
  {
    roll: 70,
    name: 'Sudipa Das',
    gender: 'Girl',
    enrollmentNo: '32202727915',
    enrollmentYear: '2025',
    dob: '16/04/2010',
    phone: '8119823586',
    mother: 'TAPASI DAS',
    father: 'KAJAL DAS',
    penNumber: '21955557606',
    apaarId: '784217846240'
  },
  {
    roll: 71,
    name: 'Sudipta Das',
    gender: 'Boy',
    enrollmentNo: '31202727959',
    enrollmentYear: '2025',
    dob: '16/04/2010',
    phone: '9233504170',
    mother: 'SOMA SARKAR',
    father: 'LITAN DAS',
    penNumber: '22441347038',
    apaarId: '426027604424'
  },
  {
    roll: 72,
    name: 'Sukamal Das',
    gender: 'Boy',
    enrollmentNo: '31202727951',
    enrollmentYear: '2025',
    dob: '12/11/2009',
    phone: '6033060860',
    mother: 'ANJANA DAS',
    father: 'SUBHASH DAS',
    penNumber: '21914890114',
    apaarId: 'Not Available'
  },
  {
    roll: 73,
    name: 'Sukla Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727949',
    enrollmentYear: '2025',
    dob: '26/02/2011',
    phone: '9366457911',
    mother: 'PUSPA BISWAS',
    father: 'UTTAM BISWAS',
    penNumber: '22436631358',
    apaarId: '710630010501'
  },
  {
    roll: 74,
    name: 'Suman Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727942',
    enrollmentYear: '2025',
    dob: '28/01/2011',
    phone: '6009263718',
    mother: 'SHIKHA SARKAR BISWAS',
    father: 'SUNIL BISWAS',
    penNumber: '22090372938',
    apaarId: '662329809096'
  },
  {
    roll: 75,
    name: 'Susmita Debnath',
    gender: 'Girl',
    enrollmentNo: '32202727916',
    enrollmentYear: '2025',
    dob: '14/09/2011',
    phone: '8974244417',
    mother: 'PRANATI DEBNATH',
    father: 'ARJUN DEBNATH',
    penNumber: '22468742226',
    apaarId: '431925626628'
  },
  {
    roll: 76,
    name: 'Susmita Gope',
    gender: 'Girl',
    enrollmentNo: '32202727905',
    enrollmentYear: '2025',
    dob: '04/08/2010',
    phone: '8837052277',
    mother: 'ARCHANA GOPE',
    father: 'PRADIP GOPE',
    penNumber: '21849768152',
    apaarId: 'Not Available'
  },
  {
    roll: 77,
    name: 'Taniya Biswas',
    gender: 'Girl',
    enrollmentNo: '32202727936',
    enrollmentYear: '2025',
    dob: '14/02/2011',
    phone: '9862260083',
    mother: 'RINKU SARKAR',
    father: 'SRINIBASH BISWAS',
    penNumber: '21855030732',
    apaarId: '620325783052'
  },
  {
    roll: 78,
    name: 'Taniya Sarkar',
    gender: 'Girl',
    enrollmentNo: '32202727904',
    enrollmentYear: '2025',
    dob: '25/05/2011',
    phone: '7005171229',
    mother: 'MISTU DAS SARKAR',
    father: 'MANORANJAN SARKAR',
    penNumber: '22220725690',
    apaarId: '355509971641'
  },
  {
    roll: 79,
    name: 'Trisha Nama',
    gender: 'Girl',
    enrollmentNo: '32202727977',
    enrollmentYear: '2025',
    dob: '24/09/2010',
    phone: '8787660544',
    mother: 'LALITA NAMA',
    father: 'BISWAJIT NAMA',
    penNumber: '22493705683',
    apaarId: '364714040679'
  },
  {
    roll: 80,
    name: 'Trisanjit Das',
    gender: 'Boy',
    enrollmentNo: '31202727945',
    enrollmentYear: '2025',
    dob: '26/08/2010',
    phone: '8837253806',
    mother: 'SHILPI RANI DAS',
    father: 'INDRAJIT DAS',
    penNumber: '22034996693',
    apaarId: '857850187215'
  },
  {
    roll: 81,
    name: 'Udai Biswas',
    gender: 'Boy',
    enrollmentNo: '31202727966',
    enrollmentYear: '2025',
    dob: '03/06/2011',
    phone: '9863221944',
    mother: 'JHULAN SARKAR',
    father: 'AMRIT BISWAS',
    penNumber: '21901965058',
    apaarId: '992690587554'
  }
];

async function updateClass10Students() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    // Remove obsolete records above roll 81 in Class X
    const deleteResult = await Student.deleteMany({
      classId: 'class-10',
      rollNumber: { $gt: 81 }
    });
    if (deleteResult.deletedCount > 0) {
      console.log(`Removed ${deleteResult.deletedCount} old excess records above roll 81.`);
    }

    let updatedCount = 0;
    let createdCount = 0;

    for (const item of class10Students) {
      const rollStr = String(item.roll).padStart(2, '0');
      const studentId = `PMS-26-10-${rollStr}`;

      let student = await Student.findOne({ classId: 'class-10', rollNumber: item.roll });
      if (!student) {
        student = await Student.findOne({ studentId });
      }

      const isNew = !student;

      if (!student) {
        student = new Student({
          studentId,
          roll: rollStr,
          rollNumber: item.roll,
          name: item.name,
          classId: 'class-10',
          className: 'Class X',
          gender: item.gender,
          enrollmentNo: item.enrollmentNo,
          enrollmentYear: item.enrollmentYear || '2025',
          father: item.father,
          mother: item.mother,
          guardian: item.father || item.mother || '',
          dob: item.dob,
          phone: item.phone,
          penNumber: item.penNumber,
          apaarId: item.apaarId,
          aadhaar: '', // Kept empty as requested
          attendance: '95%',
          status: 'Enrolled',
          academicYear: '2026-2027'
        });
      } else {
        student.studentId = studentId;
        student.roll = rollStr;
        student.rollNumber = item.roll;
        student.name = item.name;
        student.classId = 'class-10';
        student.className = 'Class X';
        student.gender = item.gender;
        student.enrollmentNo = item.enrollmentNo;
        student.enrollmentYear = item.enrollmentYear || '2025';
        student.father = item.father;
        student.mother = item.mother;
        student.guardian = item.father || item.mother || student.guardian || '';
        student.dob = item.dob;
        student.phone = item.phone;
        student.penNumber = item.penNumber;
        student.apaarId = item.apaarId;
        student.aadhaar = ''; // Kept empty as requested
        student.status = 'Enrolled';
        student.academicYear = '2026-2027';
      }

      await student.save();
      if (isNew) {
        createdCount++;
        console.log(`[CREATED] Roll ${rollStr}: ${item.name.padEnd(20, ' ')} | Gender: ${item.gender.padEnd(5, ' ')} | Reg: ${item.enrollmentNo.padEnd(12, ' ')} | PEN: ${item.penNumber}`);
      } else {
        updatedCount++;
        console.log(`[UPDATED] Roll ${rollStr}: ${item.name.padEnd(20, ' ')} | Gender: ${item.gender.padEnd(5, ' ')} | Reg: ${item.enrollmentNo.padEnd(12, ' ')} | PEN: ${item.penNumber}`);
      }
    }

    console.log('\n================ Summary ================');
    console.log(`Total Class X records processed: ${class10Students.length}`);
    console.log(`- Created: ${createdCount}`);
    console.log(`- Updated: ${updatedCount}`);

    const totalInDB = await Student.countDocuments({ classId: 'class-10' });
    console.log(`Total Class X students now in DB: ${totalInDB}`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class X students:', err);
    process.exit(1);
  }
}

updateClass10Students();
