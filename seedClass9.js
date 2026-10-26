import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const rawData = [
  {
    "roll": 1,
    "name": "Akash Das",
    "enrollmentNo": "31202826948",
    "dob": "01/09/2011",
    "phone": "9612068080",
    "father": "SUSHIL DAS",
    "mother": "MANIKA DAS",
    "guardian": "SUSHIL DAS",
    "penNumber": "21985592225",
    "apaarId": ""
  },
  {
    "roll": 2,
    "name": "Akash Debnath",
    "enrollmentNo": "31202827003",
    "dob": "19/07/2012",
    "phone": "8974354695",
    "father": "GOPI DEBNATH",
    "mother": "RUPALI DEBNATH",
    "guardian": "GOPI DEBNATH",
    "penNumber": "21853645262",
    "apaarId": "883497791378"
  },
  {
    "roll": 3,
    "name": "Alomoy Sarkar",
    "enrollmentNo": "31202827010",
    "dob": "07/04/2013",
    "phone": "8787833044",
    "father": "SANJOY KUMAR SARKAR",
    "mother": "JOYA BISWAS SARKAR",
    "guardian": "SANJOY KUMAR SARKAR",
    "penNumber": "22424293827",
    "apaarId": "186455417337"
  },
  {
    "roll": 4,
    "name": "Ananya Biswas",
    "enrollmentNo": "32202826976",
    "dob": "25/10/2011",
    "phone": "9366141994",
    "father": "SUJIT BISWAS",
    "mother": "BINA RANI SARKAR BISWAS",
    "guardian": "SUJIT BISWAS",
    "penNumber": "21923293421",
    "apaarId": "351403422049"
  },
  {
    "roll": 5,
    "name": "Anikesh Roy",
    "enrollmentNo": "31202827026",
    "dob": "30/08/2012",
    "phone": "9862396326",
    "father": "ADHIR ROY",
    "mother": "ASHA ROY",
    "guardian": "ADHIR ROY",
    "penNumber": "22745733574",
    "apaarId": "398349079689"
  },
  {
    "roll": 6,
    "name": "Ankita Biswas",
    "enrollmentNo": "32202826966",
    "dob": "10/12/2011",
    "phone": "6009897403",
    "father": "RAICHAN BISWAS",
    "mother": "BINA SARKAR BISWAS",
    "guardian": "RAICHAN BISWAS",
    "penNumber": "22187133898",
    "apaarId": "611973325142"
  },
  {
    "roll": 7,
    "name": "Ankita Rani Sarkar",
    "enrollmentNo": "32202827015",
    "dob": "28/11/2011",
    "phone": "6009682480",
    "father": "SURJYAMAN SARKAR",
    "mother": "KARUNA BALA SARKAR",
    "guardian": "SURJYAMAN SARKAR",
    "penNumber": "22170024421",
    "apaarId": "414894665077"
  },
  {
    "roll": 8,
    "name": "Ankurjit Das",
    "enrollmentNo": "31202826957",
    "dob": "02/08/2012",
    "phone": "9863182583",
    "father": "AMARJIT DAS",
    "mother": "DIPIKA DAS",
    "guardian": "AMARJIT DAS",
    "penNumber": "22074472818",
    "apaarId": "564444747211"
  },
  {
    "roll": 9,
    "name": "Anmita Das",
    "enrollmentNo": "32202826986",
    "dob": "08/07/2012",
    "phone": "7005319867",
    "father": "ARUN DAS",
    "mother": "SANGITA DAS",
    "guardian": "ARUN DAS",
    "penNumber": "22210659385",
    "apaarId": "284502135444"
  },
  {
    "roll": 10,
    "name": "Arpan Debnath",
    "enrollmentNo": "31202826949",
    "dob": "31/10/2011",
    "phone": "7005742281",
    "father": "ARUN DEBNATH",
    "mother": "PRATIMA DEBNATH",
    "guardian": "ARUN DEBNATH",
    "penNumber": "22979140048",
    "apaarId": "420082649577"
  },
  {
    "roll": 11,
    "name": "Arpita Das",
    "enrollmentNo": "32202826977",
    "dob": "05/10/2011",
    "phone": "8974560959",
    "father": "DIPAK DAS",
    "mother": "GOURI DAS",
    "guardian": "DIPAK DAS",
    "penNumber": "21882155132",
    "apaarId": "104833309225"
  },
  {
    "roll": 12,
    "name": "Baishakhi Das",
    "enrollmentNo": "32202827004",
    "dob": "10/03/2012",
    "phone": "8257981745",
    "father": "ABHISANTA DAS",
    "mother": "BASANI DAS",
    "guardian": "ABHISANTA DAS",
    "penNumber": "22043625754",
    "apaarId": "669673349397"
  },
  {
    "roll": 13,
    "name": "Barnali Debnath",
    "enrollmentNo": "32202827027",
    "dob": "29/11/2011",
    "phone": "6909980100",
    "father": "BRAJAMOHAN DEBNATH",
    "mother": "KARUNA DEBNATH",
    "guardian": "BRAJAMOHAN DEBNATH",
    "penNumber": "22008632511",
    "apaarId": "973674134201"
  },
  {
    "roll": 14,
    "name": "Barsha Sarkar",
    "enrollmentNo": "32202826967",
    "dob": "22/08/2011",
    "phone": "9366683730",
    "father": "MITAN SARKAR",
    "mother": "RUMA MALLIK SARKAR",
    "guardian": "MITAN SARKAR",
    "penNumber": "21950397870",
    "apaarId": "793140609053"
  },
  {
    "roll": 15,
    "name": "Bijoy Biswas",
    "enrollmentNo": "31202827016",
    "dob": "18/05/2011",
    "phone": "7005568930",
    "father": "PRADIP BISWAS",
    "mother": "SUPRIYA SARKAR BISWAS",
    "guardian": "PRADIP BISWAS",
    "penNumber": "21899215658",
    "apaarId": "909456337615"
  },
  {
    "roll": 16,
    "name": "Binoy Das",
    "enrollmentNo": "31202826958",
    "dob": "17/03/2012",
    "phone": "8413815753",
    "father": "BAISHNAB DAS",
    "mother": "HELAN RANI DAS",
    "guardian": "BAISHNAB DAS",
    "penNumber": "21861629230",
    "apaarId": "587469269889"
  },
  {
    "roll": 17,
    "name": "Bipasa Debnath",
    "enrollmentNo": "32202826987",
    "dob": "06/03/2012",
    "phone": "7629962653",
    "father": "SUKUMAR DEBNATH",
    "mother": "AJANTA DEBNATH",
    "guardian": "SUKUMAR DEBNATH",
    "penNumber": "22167014798",
    "apaarId": "855503589841"
  },
  {
    "roll": 18,
    "name": "Bishal Biswas",
    "enrollmentNo": "31202826950",
    "dob": "01/10/2011",
    "phone": "9612828656",
    "father": "BHAJAN BISWAS",
    "mother": "SHILPI BISWAS",
    "guardian": "BHAJAN BISWAS",
    "penNumber": "21856138349",
    "apaarId": "314951351605"
  },
  {
    "roll": 19,
    "name": "Debasree Biswas",
    "enrollmentNo": "32202827005",
    "dob": "17/01/2012",
    "phone": "8257981745",
    "father": "SANKAR BISWAS",
    "mother": "ANAMIKA BISWAS",
    "guardian": "SANKAR BISWAS",
    "penNumber": "21903036984",
    "apaarId": "479959480716"
  },
  {
    "roll": 20,
    "name": "Debisha Nama",
    "enrollmentNo": "32202826978",
    "dob": "14/02/2012",
    "phone": "9612414722",
    "father": "SHANKAR NAMA",
    "mother": "SHANTA NAMA",
    "guardian": "SHANKAR NAMA",
    "penNumber": "21831759145",
    "apaarId": "967828059662"
  },
  {
    "roll": 21,
    "name": "Debajit Das",
    "enrollmentNo": "31202827028",
    "dob": "10/04/2012",
    "phone": "9612958439",
    "father": "DIPENDRA DAS",
    "mother": "SULEKHS DAS",
    "guardian": "DIPENDRA DAS",
    "penNumber": "22377503856",
    "apaarId": "991560252345"
  },
  {
    "roll": 22,
    "name": "Diptanu Nama Das",
    "enrollmentNo": "31202826968",
    "dob": "02/08/2012",
    "phone": "9863217388",
    "father": "RAJKUMAR NAMA DAS",
    "mother": "MISTU NAMA DAS",
    "guardian": "RAJKUMAR NAMA DAS",
    "penNumber": "21873732748",
    "apaarId": "356201348861"
  },
  {
    "roll": 23,
    "name": "Eshan Chowdhury",
    "enrollmentNo": "31202827017",
    "dob": "28/06/2011",
    "phone": "8974680895",
    "father": "RANJIT CHOUDHURY",
    "mother": "BINA RANI ROY CHOUDHURY",
    "guardian": "RANJIT CHOUDHURY",
    "penNumber": "22070998618",
    "apaarId": ""
  },
  {
    "roll": 24,
    "name": "Hrittika Sarkar",
    "enrollmentNo": "32202826959",
    "dob": "18/10/2011",
    "phone": "8974110369",
    "father": "GOPAL SARKAR",
    "mother": "SOMA SARKAR",
    "guardian": "GOPAL SARKAR",
    "penNumber": "21989208614",
    "apaarId": "959345140293"
  },
  {
    "roll": 25,
    "name": "Hriday Das",
    "enrollmentNo": "Not found",
    "dob": "29/03/2012",
    "phone": "8414846758",
    "father": "UDHABH DAS",
    "mother": "KABITA BISWAS",
    "guardian": "UDHABH DAS",
    "penNumber": "22306493425",
    "apaarId": "289719646084"
  },
  {
    "roll": 26,
    "name": "Jayasree Mandal",
    "enrollmentNo": "32202826988",
    "dob": "25/07/2012",
    "phone": "6033199217",
    "father": "MAHADEB MANDAL",
    "mother": "SANCHITA SUTRADHAR MANDAL",
    "guardian": "MAHADEB MANDAL",
    "penNumber": "22550918507",
    "apaarId": "552729180270"
  },
  {
    "roll": 27,
    "name": "Jeet Deb",
    "enrollmentNo": "31202826951",
    "dob": "09/02/2012",
    "phone": "8974759951",
    "father": "JIBAN DEB",
    "mother": "SWAPNA GUHA",
    "guardian": "JIBAN DEB",
    "penNumber": "22226031625",
    "apaarId": "326895741347"
  },
  {
    "roll": 28,
    "name": "Kuyel Nama",
    "enrollmentNo": "32202827006",
    "dob": "22/05/2011",
    "phone": "9366526137",
    "father": "MANTU NAMA",
    "mother": "ANITA NAMA",
    "guardian": "MANTU NAMA",
    "penNumber": "22122285355",
    "apaarId": "408136049422"
  },
  {
    "roll": 29,
    "name": "Lija Deb",
    "enrollmentNo": "Not found",
    "dob": "21/02/2012",
    "phone": "8413891721",
    "father": "SUKANTA DEB",
    "mother": "NAMITA MANDAL DEB",
    "guardian": "SUKANTA DEB",
    "penNumber": "21998318772",
    "apaarId": "284272082213"
  },
  {
    "roll": 30,
    "name": "Manika Biswas",
    "enrollmentNo": "32202827029",
    "dob": "26/12/2011",
    "phone": "8837270164",
    "father": "GOPAL BISWAS",
    "mother": "SANGITA BISWAS",
    "guardian": "GOPAL BISWAS",
    "penNumber": "22207306904",
    "apaarId": "142204134306"
  },
  {
    "roll": 31,
    "name": "Maanvi Biswas",
    "enrollmentNo": "32202827022",
    "dob": "25/01/2012",
    "phone": "9612825446",
    "father": "BAKUL BISWAS",
    "mother": "MANIKA SARKAR BISWAS",
    "guardian": "BAKUL BISWAS",
    "penNumber": "22069090589",
    "apaarId": "602451085558"
  },
  {
    "roll": 32,
    "name": "Moon Biswas",
    "enrollmentNo": "32202826962",
    "dob": "08/05/2012",
    "phone": "9077224999",
    "father": "RAMA NANDA BISWAS",
    "mother": "SHIPRA SARKAR BISWAS",
    "guardian": "RAMA NANDA BISWAS",
    "penNumber": "22053865919",
    "apaarId": "796239173824"
  },
  {
    "roll": 33,
    "name": "Moon Malakar",
    "enrollmentNo": "32202827011",
    "dob": "01/07/2011",
    "phone": "9612813472",
    "father": "JIBAN MALAKAR",
    "mother": "APARNA MALAKAR",
    "guardian": "JIBAN MALAKAR",
    "penNumber": "22040588165",
    "apaarId": "808752232992"
  },
  {
    "roll": 34,
    "name": "Papiya Nama",
    "enrollmentNo": "32202826953",
    "dob": "07/05/2012",
    "phone": "8974252845",
    "father": "RANJIT NAMA",
    "mother": "KAJAL RANI BISWAS",
    "guardian": "RANJIT NAMA",
    "penNumber": "21915903963",
    "apaarId": ""
  },
  {
    "roll": 35,
    "name": "Parmita Das",
    "enrollmentNo": "32202826971",
    "dob": "02/02/2012",
    "phone": "9612823869",
    "father": "PARITOSH DAS",
    "mother": "SOMA PAUL DAS",
    "guardian": "PARITOSH DAS",
    "penNumber": "21850603328",
    "apaarId": "303185256059"
  },
  {
    "roll": 36,
    "name": "Payel Das",
    "enrollmentNo": "32202826982",
    "dob": "22/08/2012",
    "phone": "8415897650",
    "father": "TINKU DAS",
    "mother": "MONA BALA DAS",
    "guardian": "TINKU DAS",
    "penNumber": "22285695728",
    "apaarId": "473743968202"
  },
  {
    "roll": 37,
    "name": "Priti Debnath",
    "enrollmentNo": "32202826944",
    "dob": "13/10/2011",
    "phone": "7630893186",
    "father": "SUKANTA DEBNATH",
    "mother": "GITA DEBNATH",
    "guardian": "SUKANTA DEBNATH",
    "penNumber": "22864167920",
    "apaarId": "815240857962"
  },
  {
    "roll": 38,
    "name": "Rajarshi Biswas",
    "enrollmentNo": "Not found",
    "dob": "12/04/2012",
    "phone": "8794059952",
    "father": "RAJESH BISWAS",
    "mother": "TINKU BHOWMIK BISWAS",
    "guardian": "RAJESH BISWAS",
    "penNumber": "21927029759",
    "apaarId": "966117702460"
  },
  {
    "roll": 39,
    "name": "Rima Sarkar",
    "enrollmentNo": "32202826972",
    "dob": "07/11/2011",
    "phone": "9089320486",
    "father": "GOUTAM SARKAR",
    "mother": "RATNA NAMA SARKAR",
    "guardian": "GOUTAM SARKAR",
    "penNumber": "21981411067",
    "apaarId": "626046321813"
  },
  {
    "roll": 40,
    "name": "Ripa Sarkar",
    "enrollmentNo": "32202827023",
    "dob": "10/09/2011",
    "phone": "8974866525",
    "father": "MANORANJAN SARKAR",
    "mother": "SARATHI SARKAR",
    "guardian": "MANORANJAN SARKAR",
    "penNumber": "22242553823",
    "apaarId": "951696583173"
  },
  {
    "roll": 41,
    "name": "Ritam Das",
    "enrollmentNo": "31202826963",
    "dob": "11/01/2012",
    "phone": "8131078254",
    "father": "LITAN DAS",
    "mother": "SHILPI RANI PAUL DAS",
    "guardian": "LITAN DAS",
    "penNumber": "22399702492",
    "apaarId": "555177108362"
  },
  {
    "roll": 42,
    "name": "Riya Biswas",
    "enrollmentNo": "32202827012",
    "dob": "05/02/2012",
    "phone": "8787747058",
    "father": "BIMAL BISWAS",
    "mother": "KIRAN MALAKAR BISWAS",
    "guardian": "BIMAL BISWAS",
    "penNumber": "21892690501",
    "apaarId": "468757540001"
  },
  {
    "roll": 43,
    "name": "Riya Das",
    "enrollmentNo": "32202826954",
    "dob": "28/10/2011",
    "phone": "8798145436",
    "father": "SUSHANTA DAS",
    "mother": "RIMA DAS",
    "guardian": "SUSHANTA DAS",
    "penNumber": "22001482070",
    "apaarId": "292643686783"
  },
  {
    "roll": 44,
    "name": "Riya Deb Roy",
    "enrollmentNo": "32202826955",
    "dob": "19/03/2012",
    "phone": "9436918282",
    "father": "DIPAK DEBROY",
    "mother": "KAJAL DEBROY",
    "guardian": "DIPAK DEBROY",
    "penNumber": "21831594278",
    "apaarId": "127327416637"
  },
  {
    "roll": 45,
    "name": "Riya Debnath",
    "enrollmentNo": "32202826983",
    "dob": "26/01/2012",
    "phone": "8787536270",
    "father": "PRADIP DEBNATH",
    "mother": "NAMITA DEBNATH",
    "guardian": "PRADIP DEBNATH",
    "penNumber": "21950454657",
    "apaarId": "393362370320"
  },
  {
    "roll": 46,
    "name": "Rudra Nandi",
    "enrollmentNo": "31202826945",
    "dob": "25/03/2012",
    "phone": "6909413062",
    "father": "SEBAL NANDI",
    "mother": "PURNIMA DAS NANDI",
    "guardian": "SEBAL NANDI",
    "penNumber": "21907299636",
    "apaarId": "712021617024"
  },
  {
    "roll": 47,
    "name": "Ruhan Biswas",
    "enrollmentNo": "31202827000",
    "dob": "21/09/2011",
    "phone": "8787565856",
    "father": "SUBHASH BISWAS",
    "mother": "REKHA SARKAR",
    "guardian": "SUBHASH BISWAS",
    "penNumber": "22051554252",
    "apaarId": "502415695335"
  },
  {
    "roll": 48,
    "name": "Rupa Sarkar",
    "enrollmentNo": "32202826973",
    "dob": "05/09/2012",
    "phone": "8732824576",
    "father": "INDRAJIT SARKAR",
    "mother": "SARATHI SARKAR",
    "guardian": "INDRAJIT SARKAR",
    "penNumber": "22315560076",
    "apaarId": "297989868277"
  },
  {
    "roll": 49,
    "name": "Sagar Debnath",
    "enrollmentNo": "31202827024",
    "dob": "06/09/2011",
    "phone": "7630939574",
    "father": "PRANTOSH DEBNATH",
    "mother": "MALLIKA DERBNATH",
    "guardian": "PRANTOSH DEBNATH",
    "penNumber": "22528514039",
    "apaarId": "110686317129"
  },
  {
    "roll": 50,
    "name": "Sajen Biswas",
    "enrollmentNo": "31202826964",
    "dob": "05/06/2011",
    "phone": "9366536519",
    "father": "BADAL BISWAS",
    "mother": "SARASWATI BISWAS",
    "guardian": "BADAL BISWAS",
    "penNumber": "21898705027",
    "apaarId": "814143668736"
  },
  {
    "roll": 51,
    "name": "Sajib Biswas",
    "enrollmentNo": "31202827013",
    "dob": "24/04/2009",
    "phone": "6009604831",
    "father": "PARESH BISWAS",
    "mother": "MANASHA BISWAS",
    "guardian": "PARESH BISWAS",
    "penNumber": "22124719420",
    "apaarId": "983524535288"
  },
  {
    "roll": 52,
    "name": "Sampa Shil",
    "enrollmentNo": "32202827019",
    "dob": "17/10/2012",
    "phone": "9363282213",
    "father": "SUDHIR SHIL",
    "mother": "RANJANA SHIL",
    "guardian": "SUDHIR SHIL",
    "penNumber": "22150002047",
    "apaarId": "286720614343"
  },
  {
    "roll": 53,
    "name": "Sandip Gope",
    "enrollmentNo": "31202826970",
    "dob": "29/08/2011",
    "phone": "8837052277",
    "father": "PRADIP GOPE",
    "mother": "ARCHANA GOPE",
    "guardian": "PRADIP GOPE",
    "penNumber": "22538758339",
    "apaarId": "390851226220"
  },
  {
    "roll": 54,
    "name": "Sandipan Paul",
    "enrollmentNo": "31202827030",
    "dob": "19/11/2011",
    "phone": "8974863642",
    "father": "SATISH PAUL",
    "mother": "RAKHI PAUL",
    "guardian": "SATISH PAUL",
    "penNumber": "21947273944",
    "apaarId": "758111526446"
  },
  {
    "roll": 55,
    "name": "Sayan Biswas",
    "enrollmentNo": "31202827007",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 56,
    "name": "Sayan Das",
    "enrollmentNo": "Not found",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 57,
    "name": "Sekhar Sarkar",
    "enrollmentNo": "31202826996",
    "dob": "14/04/2012",
    "phone": "9089271165",
    "father": "SHEFAL SARKAR",
    "mother": "RINA SARKAR",
    "guardian": "SHEFAL SARKAR",
    "penNumber": "21946487853",
    "apaarId": ""
  },
  {
    "roll": 58,
    "name": "Shatarupa Das",
    "enrollmentNo": "32202826969",
    "dob": "28/12/2011",
    "phone": "7005236464",
    "father": "TUTAN LAL DAS",
    "mother": "SHIPRA DAS",
    "guardian": "TUTAN LAL DAS",
    "penNumber": "22866470096",
    "apaarId": ""
  },
  {
    "roll": 59,
    "name": "Shreyasi Biswas",
    "enrollmentNo": "32202826975",
    "dob": "01/02/2012",
    "phone": "8119994406",
    "father": "NIKHIL BISWAS",
    "mother": "NAMITA DAS BISWAS",
    "guardian": "NIKHIL BISWAS",
    "penNumber": "22564422307",
    "apaarId": "902122797118"
  },
  {
    "roll": 60,
    "name": "Sneha Das",
    "enrollmentNo": "32202826960",
    "dob": "14/09/2011",
    "phone": "9862986272",
    "father": "SADHAN DAS",
    "mother": "TUNU DAS",
    "guardian": "SADHAN DAS",
    "penNumber": "21931827317",
    "apaarId": "149385719419"
  },
  {
    "roll": 61,
    "name": "Soumalya Das",
    "enrollmentNo": "31202826946",
    "dob": "06/06/2011",
    "phone": "7909265266",
    "father": "SUKANTA DAS",
    "mother": "SUMIKA DAS",
    "guardian": "SUKANTA DAS",
    "penNumber": "21867863837",
    "apaarId": "873475530754"
  },
  {
    "roll": 62,
    "name": "Sneha Debnath",
    "enrollmentNo": "32202826956",
    "dob": "26/08/2011",
    "phone": "9862776356",
    "father": "NISHI KUMAR DEBNATH",
    "mother": "SANGHITA DEBNATH",
    "guardian": "NISHI KUMAR DEBNATH",
    "penNumber": "22240821597",
    "apaarId": "695255034545"
  },
  {
    "roll": 63,
    "name": "Subrata Debnath",
    "enrollmentNo": "31202826985",
    "dob": "16/04/2012",
    "phone": "7005226429",
    "father": "BISWAJIT DEBNATH",
    "mother": "KAJAL DEBNATH",
    "guardian": "BISWAJIT DEBNATH",
    "penNumber": "22980409217",
    "apaarId": "639401045913"
  },
  {
    "roll": 64,
    "name": "Supradip Das",
    "enrollmentNo": "31202827001",
    "dob": "16/10/2011",
    "phone": "8257034223",
    "father": "AJIT KUMAR DAS",
    "mother": "SARANA RANI DAS",
    "guardian": "AJIT KUMAR DAS",
    "penNumber": "22063824679",
    "apaarId": "740497080367"
  },
  {
    "roll": 65,
    "name": "Supriya Debnath",
    "enrollmentNo": "32202826947",
    "dob": "30/01/2012",
    "phone": "7640859354",
    "father": "BISWAJIT DEBNATH",
    "mother": "SWAPANA DEBNATH",
    "guardian": "BISWAJIT DEBNATH",
    "penNumber": "22153352481",
    "apaarId": "994859904653"
  },
  {
    "roll": 66,
    "name": "Taniya Biswas",
    "enrollmentNo": "32202827002",
    "dob": "05/08/2012",
    "phone": "8974375245",
    "father": "RAKESH BISWAS",
    "mother": "SUPRIYA BISWAS NANDI",
    "guardian": "RAKESH BISWAS",
    "penNumber": "21982973614",
    "apaarId": "784500769129"
  },
  {
    "roll": 67,
    "name": "Tanushri Biswas",
    "enrollmentNo": "32202827014",
    "dob": "14/10/2011",
    "phone": "9862136468",
    "father": "SANJITBISWAS",
    "mother": "RINA SARKAR BISWAS",
    "guardian": "SANJITBISWAS",
    "penNumber": "21882355879",
    "apaarId": "684990529131"
  },
  {
    "roll": 68,
    "name": "Tapas Das",
    "enrollmentNo": "31202826974",
    "dob": "03/11/2011",
    "phone": "9366835003",
    "father": "DIPAK DAS",
    "mother": "ARCHITA DAS",
    "guardian": "DIPAK DAS",
    "penNumber": "22148770869",
    "apaarId": ""
  },
  {
    "roll": 69,
    "name": "Trisha Das",
    "enrollmentNo": "32202826965",
    "dob": "08/10/2011",
    "phone": "8974654954",
    "father": "PRADIP LAL DAS",
    "mother": "SANGITA DAS",
    "guardian": "PRADIP LAL DAS",
    "penNumber": "21963569297",
    "apaarId": "413384250592"
  },
  {
    "roll": 70,
    "name": "Risma Das",
    "enrollmentNo": "32202827025",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 71,
    "name": "Rahul Das",
    "enrollmentNo": "32202827018",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 72,
    "name": "Sneha Das",
    "enrollmentNo": "32202826984",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 73,
    "name": "Subhani Das",
    "enrollmentNo": "Not found",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 74,
    "name": "Jhumjum Sarkar",
    "enrollmentNo": "32202826989",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 75,
    "name": "Biplob Das",
    "enrollmentNo": "Not found",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 76,
    "name": "Juel Sarkar",
    "enrollmentNo": "32202826961",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 77,
    "name": "Sandip Nama Das",
    "enrollmentNo": "31202826990",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 78,
    "name": "Bishal Sarkar",
    "enrollmentNo": "31202826993",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 79,
    "name": "Rajdeep Biswas",
    "enrollmentNo": "31202827008",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 80,
    "name": "Debajit Sarkar",
    "enrollmentNo": "31202826980",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 81,
    "name": "Mayuri Das",
    "enrollmentNo": "32202827020",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 82,
    "name": "Bijoya Das",
    "enrollmentNo": "32202826997",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 83,
    "name": "Rohit Das",
    "enrollmentNo": "31202827034",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 84,
    "name": "Rajdeep Ghosh",
    "enrollmentNo": "31202826991",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 85,
    "name": "Nayan Debnath",
    "enrollmentNo": "31202827032",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 86,
    "name": "Amit Das",
    "enrollmentNo": "31202826994",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 87,
    "name": "Nayan Biswas",
    "enrollmentNo": "Not found",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 88,
    "name": "Barsha Das",
    "enrollmentNo": "32202827009",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 89,
    "name": "Ritika Debnath",
    "enrollmentNo": "32202826981",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 90,
    "name": "Pritam Das",
    "enrollmentNo": "31202827021",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 91,
    "name": "Diya Deb Roy",
    "enrollmentNo": "32202826998",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 92,
    "name": "Arghyadwip Das",
    "enrollmentNo": "31202827035",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 93,
    "name": "Dritiman Debnath",
    "enrollmentNo": "31202826992",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 94,
    "name": "Joydeep Biswas",
    "enrollmentNo": "31202827033",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  },
  {
    "roll": 95,
    "name": "Aheli Das",
    "enrollmentNo": "32202826995",
    "dob": "",
    "phone": "",
    "father": "",
    "mother": "",
    "guardian": "",
    "penNumber": "",
    "apaarId": ""
  }
];

const seedClass9 = async () => {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME || 'school_erp';

  if (!MONGO_URI) {
    console.error('MONGODB_URI not found in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to MongoDB Atlas: "${mongoose.connection.name}"`);

    // Remove existing class-9 students
    const deleteResult = await Student.deleteMany({ classId: 'class-9' });
    console.log(`Removed ${deleteResult.deletedCount} existing records for Class IX.`);

    // Build documents
    const docs = rawData.map((item) => {
      const rollStr = String(item.roll).padStart(2, '0');
      return {
        studentId: `PMS-26-09-${rollStr}`,
        roll: rollStr,
        rollNumber: item.roll,
        name: item.name.trim(),
        classId: 'class-9',
        className: 'Class IX',
        enrollmentNo: (item.enrollmentNo || '').trim(),
        enrollmentYear: '2026',
        dob: item.dob || '',
        phone: item.phone || '',
        father: item.father || '',
        mother: item.mother || '',
        guardian: item.guardian || item.father || '',
        penNumber: item.penNumber || '',
        apaarId: item.apaarId || '',
        attendance: '95%',
        monthlyAttendance: {
          '2026-10': { workingDays: 24, presentDays: 23, notes: 'Regular attendance' }
        },
        status: 'Enrolled',
        academicYear: '2026-2027'
      };
    });

    const inserted = await Student.insertMany(docs);
    console.log(`Successfully inserted ${inserted.length} students for Class IX!`);

    const count = await Student.countDocuments({ classId: 'class-9' });
    console.log(`Total students now in Class IX: ${count}`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding Class IX:', err);
    process.exit(1);
  }
};

seedClass9();
