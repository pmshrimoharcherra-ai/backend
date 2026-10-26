import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./models/Student.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "school_erp";

const class8Students = [
  {
    "roll": 1,
    "name": "Abinash Paul",
    "father": "Pankaj Paul",
    "mother": "Shibani Das Paul",
    "aadhaar": "6668 0055 5972",
    "dob": "04/09/2012",
    "phone": "8837259725",
    "penNumber": "21944219201",
    "apaarId": "211045455591"
  },
  {
    "roll": 2,
    "name": "Anamika D/Nath",
    "father": "Himanshu D/Nath",
    "mother": "Shipra D/Nath",
    "aadhaar": "4233 4569 3428",
    "dob": "26/01/2013",
    "phone": "9612705851",
    "penNumber": "22366237327",
    "apaarId": "107622261375"
  },
  {
    "roll": 3,
    "name": "Aparna Das",
    "father": "Suklal Das",
    "mother": "Supriya Biswas (Das)",
    "aadhaar": "6491 5001 6779",
    "dob": "26/08/2012",
    "phone": "8837465230",
    "penNumber": "21897221361",
    "apaarId": "339893299273"
  },
  {
    "roll": 4,
    "name": "Aparna D/Nath",
    "father": "Manuranjan D/Nath",
    "mother": "Swapna D/Nath",
    "aadhaar": "5756 4721 0187",
    "dob": "04/02/2013",
    "phone": "9612104020",
    "penNumber": "21992924641",
    "apaarId": "183017012148"
  },
  {
    "roll": 5,
    "name": "Arpita Das",
    "father": "Dipak Das",
    "mother": "Shreemati Baishya",
    "aadhaar": "5510 7420 9386",
    "dob": "18/11/2012",
    "phone": "8413987194",
    "penNumber": "22567304621",
    "apaarId": "308713490007"
  },
  {
    "roll": 6,
    "name": "Arpita Das",
    "father": "Pitan Das",
    "mother": "Aparna Das",
    "aadhaar": "2130 3140 2500",
    "dob": "04/04/2013",
    "phone": "8787593143",
    "penNumber": "21923150060",
    "apaarId": "164569624989"
  },
  {
    "roll": 7,
    "name": "Avoy Das",
    "father": "Rajkumar Das",
    "mother": "Riba Das",
    "aadhaar": "7367 9976 4150",
    "dob": "04/11/2012",
    "phone": "7630838617",
    "penNumber": "21977652482",
    "apaarId": "874969769190"
  },
  {
    "roll": 8,
    "name": "Ayush Biswas",
    "father": "Parimal Ch. Biswas",
    "mother": "Laxmi Biswas",
    "aadhaar": "8280 7601 3269",
    "dob": "16/09/2012",
    "phone": "6009203728",
    "penNumber": "22382653565",
    "apaarId": "234528929540"
  },
  {
    "roll": 9,
    "name": "Baishakhi D/Nath",
    "father": "Ranjit D/Nath",
    "mother": "Soma Shil (D/Nath)",
    "aadhaar": "8014 8106 5162",
    "dob": "15/04/2013",
    "phone": "8974149277",
    "penNumber": "22160401195",
    "apaarId": "378745778922"
  },
  {
    "roll": 10,
    "name": "Barsha Das",
    "father": "Nandalal Das",
    "mother": "Bhagabati Das",
    "aadhaar": "7083 4553 8600",
    "dob": "02/06/2012",
    "phone": "8798922688",
    "penNumber": "21867791726",
    "apaarId": "722531046171"
  },
  {
    "roll": 11,
    "name": "Barsha Nama",
    "father": "Krishna Dhan Nama",
    "mother": "Manika Biswas (Nama)",
    "aadhaar": "9900 2648 9610",
    "dob": "13/08/2012",
    "phone": "6033199213",
    "penNumber": "22017802024",
    "apaarId": "415092644437"
  },
  {
    "roll": 12,
    "name": "Bindiya Dhar",
    "father": "Baban Dhar",
    "mother": "Suchitra Dhar",
    "aadhaar": "1379 4942 8514",
    "dob": "17/08/2013",
    "phone": "6009501922",
    "penNumber": "22523086950",
    "apaarId": "939145155131"
  },
  {
    "roll": 13,
    "name": "Binoy Das",
    "father": "Barun Chandra Das",
    "mother": "Sadhana Biswas Das",
    "aadhaar": "6853 2641 8162",
    "dob": "05/07/2013",
    "phone": "7630839065",
    "penNumber": "21889619784",
    "apaarId": "728307660840"
  },
  {
    "roll": 14,
    "name": "Bipasha Saskar",
    "father": "Narottam Saskar",
    "mother": "Malina Das (Saskar)",
    "aadhaar": "2834 9865 8371",
    "dob": "22/04/2013",
    "phone": "9612496235",
    "penNumber": "22075236023",
    "apaarId": "441382888221"
  },
  {
    "roll": 15,
    "name": "Biraj Saskar",
    "father": "Manoranjan Saskar",
    "mother": "Manisha Das (Saskar)",
    "aadhaar": "6883 1907 3521",
    "dob": "16/06/2013",
    "phone": "8798710084",
    "penNumber": "22073269045",
    "apaarId": "978685009759"
  },
  {
    "roll": 16,
    "name": "Chuhina Das",
    "father": "Gurupad Das",
    "mother": "Jamuna Das",
    "aadhaar": "3658 8794 0803",
    "dob": "13/08/2013",
    "phone": "8787591214",
    "penNumber": "22374089892",
    "apaarId": "227995689595"
  },
  {
    "roll": 17,
    "name": "Debajit Biswas",
    "father": "Paresh Chandra Biswas",
    "mother": "Dipali Das (Biswas)",
    "aadhaar": "6087 9664 5457",
    "dob": "18/05/2013",
    "phone": "6009835076",
    "penNumber": "22298046199",
    "apaarId": "445669376140"
  },
  {
    "roll": 18,
    "name": "Debajeet Roy",
    "father": "Nirod Roy",
    "mother": "Shila Das (Roy)",
    "aadhaar": "9475 2771 7954",
    "dob": "29/12/2012",
    "phone": "9089641375",
    "penNumber": "22958149528",
    "apaarId": "325227325286"
  },
  {
    "roll": 19,
    "name": "Debalina Das",
    "father": "Indrajit Das",
    "mother": "Babli Das",
    "aadhaar": "4290 7184 5546",
    "dob": "10/02/2013",
    "phone": "7005510684",
    "penNumber": "22035298442",
    "apaarId": "388656610310"
  },
  {
    "roll": 20,
    "name": "Debasish Ghosh",
    "father": "Jugal Ghosh",
    "mother": "Namita Ghosh",
    "aadhaar": "6979 9512 0886",
    "dob": "17/10/2012",
    "phone": "8731900388",
    "penNumber": "22097409395",
    "apaarId": "567960171696"
  },
  {
    "roll": 21,
    "name": "Debhasmita Nama",
    "father": "Sanjoy Nama",
    "mother": "Beauty Das (Nama)",
    "aadhaar": "9767 1192 4782",
    "dob": "20/09/2013",
    "phone": "9233699042",
    "penNumber": "22361210081",
    "apaarId": "965900650672"
  },
  {
    "roll": 22,
    "name": "Debajit Das",
    "father": "Pitan Das",
    "mother": "Aparna Das",
    "aadhaar": "8192 1012 7867",
    "dob": "24/04/2013",
    "phone": "8787598143",
    "penNumber": "22216034988",
    "apaarId": "391743953692"
  },
  {
    "roll": 23,
    "name": "Deepsi Das",
    "father": "Sajal Das",
    "mother": "Reba Rani Pal (Das)",
    "aadhaar": "8758 7249 8862",
    "dob": "24/01/2013",
    "phone": "6909519208",
    "penNumber": "22944704203",
    "apaarId": "325208478178"
  },
  {
    "roll": 24,
    "name": "Dipa Chakraborty",
    "father": "Dilip Chakraborty",
    "mother": "Jhuma Chakraborty",
    "aadhaar": "5308 4883 6051",
    "dob": "09/07/2013",
    "phone": "6909939529",
    "penNumber": "22209067089",
    "apaarId": "985120924415"
  },
  {
    "roll": 25,
    "name": "Dipa Das",
    "father": "Ratan Das",
    "mother": "Bina Das",
    "aadhaar": "9379 0187 7469",
    "dob": "10/05/2013",
    "phone": "8415991562",
    "penNumber": "21934148363",
    "apaarId": "474973716361"
  },
  {
    "roll": 26,
    "name": "Dipika Biswas",
    "father": "Dipak Biswas",
    "mother": "Basana Biswas",
    "aadhaar": "6518 1860 7673",
    "dob": "27/03/2013",
    "phone": "9862635930",
    "penNumber": "21934083360",
    "apaarId": "688264252921"
  },
  {
    "roll": 27,
    "name": "Diya D/Nath",
    "father": "Jiban Debnath",
    "mother": "Ruma Debnath",
    "aadhaar": "8938 3890 8285",
    "dob": "15/11/2013",
    "phone": "9414838330",
    "penNumber": "22429560455",
    "apaarId": "491897680993"
  },
  {
    "roll": 28,
    "name": "Diya Saskar",
    "father": "Ranjit Saskar",
    "mother": "Shibani Saskar",
    "aadhaar": "2299 5461 6785",
    "dob": "14/10/2012",
    "phone": "8132826331",
    "penNumber": "22046920056",
    "apaarId": "116572908852"
  },
  {
    "roll": 29,
    "name": "Gourab Debnath",
    "father": "Goutam Debnath",
    "mother": "Supriya Nath (D/Nath)",
    "aadhaar": "4400 1163 3282",
    "dob": "19/05/2013",
    "phone": "9863574483",
    "penNumber": "21920041527",
    "apaarId": "464199465532"
  },
  {
    "roll": 30,
    "name": "Hriday Mandal",
    "father": "t/c",
    "mother": "",
    "aadhaar": "",
    "dob": "",
    "phone": ""
  },
  {
    "roll": 31,
    "name": "Hritik Biswas",
    "father": "Rajmohan Biswas",
    "mother": "Adari Biswas",
    "aadhaar": "3587 8261 1249",
    "dob": "03/12/2012",
    "phone": "9378022065",
    "penNumber": "22002244624",
    "apaarId": "611969077106"
  },
  {
    "roll": 32,
    "name": "Jishan D/Nath",
    "father": "Nishikanta D/Nath",
    "mother": "Swapna Rani D/Nath",
    "aadhaar": "8950 7271 3453",
    "dob": "08/08/2013",
    "phone": "9966566790",
    "penNumber": "22125856671",
    "apaarId": "573185269005"
  },
  {
    "roll": 33,
    "name": "Joy Saskar",
    "father": "Nirmal Saskar",
    "mother": "Tharna Saskar",
    "aadhaar": "7830 8792 2990",
    "dob": "18/08/2012",
    "phone": "9966642139",
    "penNumber": "21949442766",
    "apaarId": "383997274632"
  },
  {
    "roll": 34,
    "name": "Joydeep Das",
    "father": "Jadab Das",
    "mother": "Purnabala Nama (Das)",
    "aadhaar": "7946 2438 7884",
    "dob": "12/07/2013",
    "phone": "9436495308 / 8974365819",
    "penNumber": "22000527983",
    "apaarId": "353515218498"
  },
  {
    "roll": 35,
    "name": "Kohinoor Biswas",
    "father": "Khukan Biswas",
    "mother": "Rekha Namasudra (Biswas)",
    "aadhaar": "4702 1972 7928",
    "dob": "18/04/2013",
    "phone": "9366639076",
    "penNumber": "22129039265",
    "apaarId": "Not Available"
  },
  {
    "roll": 36,
    "name": "Kushan Ghosh",
    "father": "Manoranjan Ghosh",
    "mother": "Rita Gope (Ghosh)",
    "aadhaar": "3000 9905 6668",
    "dob": "13/11/2012",
    "phone": "9612116436",
    "penNumber": "21919941889",
    "apaarId": "174150151963"
  },
  {
    "roll": 37,
    "name": "Lovely Halder",
    "father": "Lutan Halder",
    "mother": "Lipika Sarkar (Halder)",
    "aadhaar": "3559 6792 7622",
    "dob": "16/02/2013",
    "phone": "8974250622",
    "penNumber": "22310289993",
    "apaarId": "190711724095"
  },
  {
    "roll": 38,
    "name": "Megha Biswas",
    "father": "Srikanta Biswas",
    "mother": "Sebika Roy (Biswas)",
    "aadhaar": "5298 5075 3232",
    "dob": "05/09/2012",
    "phone": "9366613667",
    "penNumber": "21961876196",
    "apaarId": "508523881484"
  },
  {
    "roll": 39,
    "name": "Nandita Das",
    "father": "Paritosh Das",
    "mother": "Namita Das",
    "aadhaar": "5534 2245 2927",
    "dob": "21/05/2013",
    "phone": "8787684872",
    "penNumber": "22100262844",
    "apaarId": "376056216547"
  },
  {
    "roll": 40,
    "name": "Nandita D/Nath",
    "father": "Rakhal D/Nath",
    "mother": "Tapashi D/Nath",
    "aadhaar": "8053 1739 1580",
    "dob": "22/05/2013",
    "phone": "9366244768",
    "penNumber": "22058264797",
    "apaarId": "376111775362"
  },
  {
    "roll": 41,
    "name": "Pabitra Das",
    "father": "Prantosh Das",
    "mother": "Manika Biswas",
    "aadhaar": "2017 1650 1556",
    "dob": "19/11/2012",
    "phone": "6009721272",
    "penNumber": "22082642564",
    "apaarId": "113424838695"
  },
  {
    "roll": 42,
    "name": "Pritam D/Nath",
    "father": "Paritosh D/Nath",
    "mother": "Rimpi D/Nath",
    "aadhaar": "3143 0574 1233",
    "dob": "04/10/2013",
    "phone": "9862931661",
    "penNumber": "21914641154",
    "apaarId": "197069663267"
  },
  {
    "roll": 43,
    "name": "Priyanka Saskar",
    "father": "Kanu Sarkar",
    "mother": "Mani Biswas (Sarkar)",
    "aadhaar": "4312 8638 3837",
    "dob": "27/12/2012",
    "phone": "6009495721",
    "penNumber": "21879485461",
    "apaarId": "Not Available"
  },
  {
    "roll": 44,
    "name": "Puja Debnath",
    "father": "Kartik D/Nath",
    "mother": "Jharna D/Nath",
    "aadhaar": "4875 9344 7394",
    "dob": "29/05/2013",
    "phone": "8837267966",
    "penNumber": "21840538581",
    "apaarId": "881684840191"
  },
  {
    "roll": 45,
    "name": "Purnajit Biswas",
    "father": "Pradip Biswas",
    "mother": "Archana Biswas",
    "aadhaar": "7710 0506 2109",
    "dob": "17/02/2013",
    "phone": "9378024974",
    "penNumber": "22226021149",
    "apaarId": "433348809789"
  },
  {
    "roll": 46,
    "name": "Rajdeep Mallik",
    "father": "Babul Mallik",
    "mother": "Manti Mallik",
    "aadhaar": "9126 3553 5511",
    "dob": "22/07/2013",
    "phone": "6009568595",
    "penNumber": "22127275642",
    "apaarId": "263621118620"
  },
  {
    "roll": 47,
    "name": "Rajesh D/Nath",
    "father": "Kartik D/Nath",
    "mother": "Tapashi D/Nath",
    "aadhaar": "6866 8230 4640",
    "dob": "05/09/2012",
    "phone": "6033352404",
    "penNumber": "21884139852",
    "apaarId": "837929704423"
  },
  {
    "roll": 48,
    "name": "Reshmi Das",
    "father": "Sudip Das",
    "mother": "Rubi Rani Das",
    "aadhaar": "9508 7567 6300",
    "dob": "27/07/2012",
    "phone": "9612415507",
    "penNumber": "22523263968",
    "apaarId": "421505980816"
  },
  {
    "roll": 49,
    "name": "Riya Das",
    "father": "Kajal Das",
    "mother": "Mamata Rani Das",
    "aadhaar": "4558 2259 4305",
    "dob": "29/05/2013",
    "phone": "8974610874",
    "penNumber": "22140407664",
    "apaarId": "521093796979"
  },
  {
    "roll": 50,
    "name": "Riya Namasudra",
    "father": "Mitali Namasudra",
    "mother": "Sabita Biswas (Namasudra)",
    "aadhaar": "7969 1954 2240",
    "dob": "16/02/2013",
    "phone": "9366075697",
    "penNumber": "22037051592",
    "apaarId": "499502664585"
  },
  {
    "roll": 51,
    "name": "Sagarika Nandi",
    "father": "Mithun Nandi",
    "mother": "Shipra Sarkar (Nandi)",
    "aadhaar": "7035 8787 1160",
    "dob": "20/12/2012",
    "phone": "6009101276",
    "penNumber": "22263540350",
    "apaarId": "207602670614"
  },
  {
    "roll": 52,
    "name": "Santuno Das",
    "father": "Dulal Das",
    "mother": "Sujali Sarkar (Das)",
    "aadhaar": "8953 3100 4358",
    "dob": "30/04/2012",
    "phone": "9366710415",
    "penNumber": "22332326268",
    "apaarId": "464720766607"
  },
  {
    "roll": 53,
    "name": "Shiyoli Biswas",
    "father": "Anil Biswas",
    "mother": "Sumitra Biswas",
    "aadhaar": "9397 6640 6541",
    "dob": "29/08/2012",
    "phone": "6909618278",
    "penNumber": "22097053313",
    "apaarId": "187641708425"
  },
  {
    "roll": 54,
    "name": "Shubashree Biswas",
    "father": "Sanjit Biswas",
    "mother": "Satabdi Nama (Biswas)",
    "aadhaar": "7831 0774 4202",
    "dob": "22/01/2013",
    "phone": "9863771936",
    "penNumber": "22022320092",
    "apaarId": "341569038760"
  },
  {
    "roll": 55,
    "name": "Subham D/Nath",
    "father": "Subhash D/Nath",
    "mother": "Parbati D/Nath",
    "aadhaar": "4441 7299 9417",
    "dob": "01/09/2012",
    "phone": "6009697207",
    "penNumber": "21871786087",
    "apaarId": "211490362267"
  },
  {
    "roll": 56,
    "name": "Sneha Saskar",
    "father": "Sanjit Saskar",
    "mother": "Fulan Saskar",
    "aadhaar": "8917 1790 6488",
    "dob": "15/08/2012",
    "phone": "7085264511",
    "penNumber": "21931574154",
    "apaarId": "252349991882"
  },
  {
    "roll": 57,
    "name": "Snehal D/Nath",
    "father": "Bhrigumani D/Nath",
    "mother": "Sukriti D/Nath",
    "aadhaar": "5963 9584 4541",
    "dob": "30/04/2013",
    "phone": "6033227806",
    "penNumber": "22101179656",
    "apaarId": "569015635150"
  },
  {
    "roll": 58,
    "name": "Sonali Das",
    "father": "Sujit Das",
    "mother": "Madhabi Sarkar (Das)",
    "aadhaar": "9506 8750 4645",
    "dob": "02/08/2012",
    "phone": "6909865858",
    "penNumber": "22322914006",
    "apaarId": "338749108642"
  },
  {
    "roll": 59,
    "name": "Sovasree Das",
    "father": "Tapash Das",
    "mother": "Sangita Das",
    "aadhaar": "2143 1994 0324",
    "dob": "30/01/2013",
    "phone": "8731030733",
    "penNumber": "22421202339",
    "apaarId": "Not Available"
  },
  {
    "roll": 60,
    "name": "Subhasree D/Nath",
    "father": "Raju D/Nath",
    "mother": "Gita D/Nath",
    "aadhaar": "6513 4941 4410",
    "dob": "18/09/2012",
    "phone": "8730898519",
    "penNumber": "22301110423",
    "apaarId": "828046006405"
  },
  {
    "roll": 61,
    "name": "Sohani D/Nath",
    "father": "Kamal D/Nath",
    "mother": "Namita Das (D/Nath)",
    "aadhaar": "5622 8582 0309",
    "dob": "29/03/2013",
    "phone": "8798234783",
    "penNumber": "21868527642",
    "apaarId": "828321784329"
  },
  {
    "roll": 62,
    "name": "Suparna D/Nath",
    "father": "Sujit D/Nath",
    "mother": "Aparna Das (D/Nath)",
    "aadhaar": "8284 8615 9290",
    "dob": "24/10/2012",
    "phone": "9862871105",
    "penNumber": "21848167376",
    "apaarId": "822799933462"
  },
  {
    "roll": 63,
    "name": "Swarna Biswas",
    "father": "Sadhan Biswas",
    "mother": "Malina Singh (Biswas)",
    "aadhaar": "7465 5873 4496",
    "dob": "21/11/2012",
    "phone": "8974973626",
    "penNumber": "21909475568",
    "apaarId": "399930468004"
  },
  {
    "roll": 64,
    "name": "Taniya Nama",
    "father": "t/c",
    "mother": "",
    "aadhaar": "",
    "dob": "",
    "phone": ""
  },
  {
    "roll": 65,
    "name": "Tanmoy Das",
    "father": "Laxan Das",
    "mother": "Namila Das",
    "aadhaar": "7303 4763 5098",
    "dob": "15/12/2012",
    "phone": "6009037808",
    "penNumber": "22090296127",
    "apaarId": "533232206491"
  },
  {
    "roll": 66,
    "name": "Tanushree Saskar",
    "father": "Sushil Saskar",
    "mother": "Parbati Saskar",
    "aadhaar": "9632 1713 5017",
    "dob": "03/04/2013",
    "phone": "6009191807",
    "penNumber": "22380465410",
    "apaarId": "556704538023"
  },
  {
    "roll": 67,
    "name": "Tripti Das",
    "father": "Pinkulal Das",
    "mother": "Babli Sarkar (Das)",
    "aadhaar": "9383 1326 1000",
    "dob": "22/12/2012",
    "phone": "8974297343",
    "penNumber": "21985602725",
    "apaarId": "298017707876"
  },
  {
    "roll": 68,
    "name": "Urmila D/Nath",
    "father": "Sridam D/Nath",
    "mother": "Jasoda D/Nath",
    "aadhaar": "8962 3652 1306",
    "dob": "28/12/2012",
    "phone": "9863376514",
    "penNumber": "21834874428",
    "apaarId": "521839426048"
  },
  {
    "roll": 69,
    "name": "Amarjit Das",
    "father": "Tapan Chandra Das",
    "mother": "Kuntirani Sarkar (Das)",
    "aadhaar": "6942 6370 3950",
    "dob": "28/12/2012",
    "phone": "",
    "penNumber": "21863994412",
    "apaarId": "424010548020"
  },
  {
    "roll": 70,
    "name": "Papiya Debnath",
    "father": "Parthajit D/Nath",
    "mother": "Bhabita D/Nath",
    "aadhaar": "3716 9380 0034",
    "dob": "05/07/2012",
    "phone": "8704956507",
    "penNumber": "22883250456",
    "apaarId": "492985272384"
  },
  {
    "roll": 71,
    "name": "Rudra Das",
    "father": "Sefal Das",
    "mother": "Supriya Das",
    "aadhaar": "6265 9906 9044",
    "dob": "27/12/2011",
    "phone": "9233255426",
    "penNumber": "22531362790",
    "apaarId": "349925052974"
  }
];

const attendancePcts = [95,92,96,94,97,91,95,93,98,90,94,96,92,95,93,97,91,94,96,92,95,93,98,94,96,91,95,92,97,0,95,92,96,94,97,91,95,93,96,92,94,97,93,95,92,96,94,95,93,96,92,95,94,96,93,97,91,95,92,96,94,93,95,0,92,96,95,93,94,96,95];

async function seedClass8() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: "${mongoose.connection.name}"`);

    // Remove existing Class 8 records
    const deleted = await Student.deleteMany({ classId: "class-8" });
    console.log(`Removed ${deleted.deletedCount} existing records for Class VIII.`);

    const studentsToInsert = class8Students.map((st, index) => {
      const rollPadded = String(st.roll).padStart(2, "0");
      const studentId = `PMS-26-08-${rollPadded}`;
      const isTC = st.father.toLowerCase() === "t/c" || st.name.toLowerCase().includes("t/c");
      const status = isTC ? "Transferred" : "Enrolled";
      const pct = isTC ? 0 : (attendancePcts[index] || 95);

      return {
        studentId,
        roll: rollPadded,
        rollNumber: st.roll,
        name: st.name,
        classId: "class-8",
        className: "Class VIII",
        father: st.father,
        mother: st.mother,
        guardian: isTC ? "TC Issued" : (st.father || st.mother || ""),
        aadhaar: st.aadhaar,
        dob: st.dob,
        phone: st.phone,
        penNumber: st.penNumber || "",
        apaarId: st.apaarId || "",
        attendance: isTC ? "0%" : `${pct}%`,
        status,
        academicYear: "2026-2027",
        monthlyAttendance: {
          "2026-10": {
            workingDays: 16,
            presentDays: isTC ? 0 : Math.round((16 * pct) / 100),
            notes: isTC ? "Transferred (TC Issued)" : ""
          }
        }
      };
    });

    const result = await Student.insertMany(studentsToInsert);
    console.log(`Successfully seeded ${result.length} Class VIII students into MongoDB!`);
    console.log("Sample entries:");
    result.slice(0, 3).forEach(s => console.log(` - Roll ${s.roll}: ${s.name} (F: ${s.father}, M: ${s.mother}, Aadh: ${s.aadhaar}, Status: ${s.status})`));
    console.log(` - Roll 30: ${result[29].name} (Status: ${result[29].status}, Guardian: ${result[29].guardian})`);
    console.log(` - Roll 64: ${result[63].name} (Status: ${result[63].status}, Guardian: ${result[63].guardian})`);
    console.log(` - Roll ${result[result.length - 1].roll}: ${result[result.length - 1].name} (Status: ${result[result.length - 1].status})`);

    await mongoose.connection.close();
    console.log("Database connection closed cleanly.");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedClass8();
