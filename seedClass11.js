import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const artsData = [
  { roll: 1, name: 'Deb Biswas', enrollmentNo: '321202805425' , penNumber: '22324581996', apaarId: '439008347962', dob: '15/04/2010', phone: '9863335210', father: 'KANU BISWAS', mother: 'ANNAPURNA BISWAS', guardian: 'KANU BISWAS' },
  { roll: 2, name: 'Pritush Das', enrollmentNo: '321202805445' , penNumber: '22159364550', apaarId: '609809148508', dob: '26/09/2009', phone: '9383159814', father: 'SAMARESH DAS', mother: 'BHANUMATI DAS', guardian: 'SAMARESH DAS' },
  { roll: 3, name: 'Jwel Deb', enrollmentNo: '322202805519' , penNumber: '21934798846', apaarId: '348972358904', dob: '14/09/2009', phone: '6009536620', father: 'SUKANTA DEB', mother: 'NAMITA MANDAL DEB', guardian: 'SUKANTA DEB' },
  { roll: 4, name: 'Rupa Acharjee', enrollmentNo: '322202805415' , penNumber: '21863902544', apaarId: '178633854037', dob: '19/08/2009', phone: '8974640562', father: 'GOUTAM ACHARJEE', mother: 'RINA ACHARJEE', guardian: 'GOUTAM ACHARJEE' },
  { roll: 5, name: 'Ishmat Biswas', enrollmentNo: '321202805476*' , penNumber: '22018367195', apaarId: '422367165679', dob: '10/02/2010', phone: '6909979927', father: 'UTTAM KUMAR BISWAS', mother: 'LATA SARKAR BISWAS', guardian: 'UTTAM KUMAR BISWAS' },
  { roll: 6, name: 'Koushik D/nath', enrollmentNo: '321202805405' , penNumber: '21837811096', apaarId: '341549295843', dob: '03/09/2009', phone: '9233111775', father: 'KHOKAN DEBNATH', mother: 'KAKALI DEBNATH', guardian: 'KHOKAN DEBNATH' },
  { roll: 7, name: 'Ruhan Das', enrollmentNo: '321202805426' , penNumber: '21914795053', apaarId: '244794181453', dob: '01/03/2010', phone: '9612828991', father: 'SUJIT DAS', mother: 'MAMATA DAS', guardian: 'SUJIT DAS' },
  { roll: 8, name: 'Rajib Sankar', enrollmentNo: '321202805436*' , penNumber: '22049909946', apaarId: '918636540874', dob: '23/01/2010', phone: '8787439892', father: 'MAHADEB SARKAR', mother: 'PRAMILA SARKAR', guardian: 'MAHADEB SARKAR' },
  { roll: 9, name: 'Dhiman Das', enrollmentNo: '321202805487' , penNumber: '22178784832', apaarId: '962560469943', dob: '29/06/2009', phone: '9436482284', father: 'DHANANJOY DAS', mother: 'SWAPNA SARKAR DAS', guardian: 'DHANANJOY DAS' },
  { roll: 10, name: 'Tanip Nama', enrollmentNo: '321202805446' , penNumber: '21934276552', apaarId: '234539299284', dob: '23/03/2010', phone: '9436485337', father: 'TAPAS NAMA', mother: 'SOBHA DAS NAMA', guardian: 'TAPAS NAMA' },
  { roll: 11, name: 'Trishana Biswas', enrollmentNo: '322202805520' , penNumber: '22552047648', apaarId: '580168487265', dob: '28/05/2010', phone: '8974973646', father: 'SURESH BISWAS', mother: 'JAGATRANI CHOUDHURY BISWAS', guardian: 'SURESH BISWAS' },
  { roll: 12, name: 'Mouhit Das', enrollmentNo: '321202805416' , penNumber: '21871114189', apaarId: '962516108424', dob: '25/03/2010', phone: '8798145190', father: 'NAROTTAM DAS', mother: 'SHILPI DAS', guardian: 'NAROTTAM DAS' },
  { roll: 13, name: 'Sujan Modak', enrollmentNo: '321202805477' , penNumber: '22484946144', apaarId: '228079100530', dob: '03/12/2009', phone: '9366194354', father: 'SANJAY MODAK', mother: 'SIMA DEBNATH MODAK', guardian: 'SANJAY MODAK' },
  { roll: 14, name: 'Subrajit Das', enrollmentNo: '321202805406' , penNumber: '22156385202', apaarId: '897653797666', dob: '24/03/2010', phone: '7005560682', father: 'LT SUJIT DAS', mother: 'SANJU SAHA', guardian: 'SANJU SAHA' },
  { roll: 15, name: 'Ankita Das', enrollmentNo: 'Verify duplicate' , penNumber: '22287827340', apaarId: '468095437410', dob: '23/09/2009', phone: '8415943293', father: 'BAPI RANJAN DAS', mother: 'SARASWATI DAS', guardian: 'BAPI RANJAN DAS' },
  { roll: 16, name: 'Lipi Biswas', enrollmentNo: '322202805437' , penNumber: '22527713146', apaarId: '727221329664', dob: '09/09/2009', phone: '9485108315', father: 'SUKHLAL BISWAS', mother: 'NIYATI BISWAS', guardian: 'SUKHLAL BISWAS' },
  { roll: 17, name: 'Riktika Sarkar', enrollmentNo: '322202805488' , penNumber: '22262840268', apaarId: '809611150249', dob: '15/09/2010', phone: '8794227031', father: 'RANU SARKAR', mother: 'SHANTI SARKAR', guardian: 'RANU SARKAR' },
  { roll: 18, name: 'Adipta Das', enrollmentNo: '321202805571' , penNumber: '22435132756', apaarId: '896321936451', dob: '11/06/2009', phone: '9863544600', father: 'HARENDRA DAS', mother: 'ANITA DAS', guardian: 'HARENDRA DAS' },
  { roll: 19, name: 'Dipanjan D/nath', enrollmentNo: '321202805447' , penNumber: '21862876684', apaarId: '656786054555', dob: '18/01/2010', phone: '9366621697', father: 'NIRANJAN DEBNATH', mother: 'BINA RANI DEBNATH', guardian: 'NIRANJAN DEBNATH' },
  { roll: 20, name: 'Sandeep D/nath', enrollmentNo: 'Not found' , penNumber: '22287505741', apaarId: '728305085988', dob: '02/06/2010', phone: '9366533146', father: 'SHYAMAL DEBNATH', mother: 'SRIMATI DEBNATH', guardian: 'SHYAMAL DEBNATH' },
  { roll: 21, name: 'Shovajit Sarkar', enrollmentNo: '321202805417' , penNumber: '22025179375', apaarId: '139142784680', dob: '03/02/2010', phone: '9436183861', father: 'JHANTU SARKAR', mother: 'JHANNU SARKAR', guardian: 'JHANTU SARKAR' },
  { roll: 22, name: 'Bipul Debnath', enrollmentNo: '321202805478' , penNumber: '22214142083', apaarId: '487959868907', dob: '26/09/2009', phone: '7630892873', father: 'BIMAL DEBNATH', mother: 'GITA DEBNATH', guardian: 'BIMAL DEBNATH' },
  { roll: 23, name: 'Anamika Biswas', enrollmentNo: '322202805407' , penNumber: '22111517390', apaarId: '479337721809', dob: '16/09/2010', phone: '8974627764', father: 'CHITTARANJAN BISWAS', mother: 'MANI BALA BISWAS', guardian: 'CHITTARANJAN BISWAS' },
  { roll: 24, name: 'Reshmi Das', enrollmentNo: '322202805428' , penNumber: '22526071171', apaarId: '636663893709', dob: '15/01/2010', phone: '9366981533', father: 'DILIP DAS', mother: 'RAKHI DAS', guardian: 'DILIP DAS' },
  { roll: 25, name: 'Jaya Das', enrollmentNo: '322202805438' , penNumber: '22001977782', apaarId: '735846845670', dob: '13/04/2010', phone: '8259858030', father: 'SUJIT DAS', mother: 'INDU DAS', guardian: 'SUJIT DAS' },
  { roll: 26, name: 'Riya Sarkar', enrollmentNo: '322202805489' , penNumber: '22028527006', apaarId: '670278564476', dob: '05/03/2010', phone: '8787463390', father: 'CHANDAN SARKAR', mother: 'SARATHI SARKAR', guardian: 'CHANDAN SARKAR' },
  { roll: 27, name: 'Ankita Das', enrollmentNo: 'Verify duplicate' , penNumber: '22213981748', apaarId: '558026550990', dob: '22/07/2010', phone: '8119063909', father: 'ASHIS DAS', mother: 'SOMA DAS', guardian: 'ASHIS DAS' },
  { roll: 28, name: 'Jhutika Nama', enrollmentNo: '322202805522' , penNumber: '21847239899', apaarId: '517095673377', dob: '10/01/2010', phone: '8415085864', father: 'AJIT NAMA', mother: 'REKHA BISWAS NAMA', guardian: 'AJIT NAMA' },
  { roll: 29, name: 'Puja Debnath', enrollmentNo: 'Verify duplicate' , penNumber: '21841409922', apaarId: '698426546423', dob: '20/02/2010', phone: '9863592545', father: 'GOPAL DEBNATH', mother: 'PRATIMA DEBNATH', guardian: 'GOPAL DEBNATH' },
  { roll: 30, name: 'Tripti Das', enrollmentNo: '322202805479' , penNumber: '21912902855', apaarId: 'Not Available', dob: '12/10/2009', phone: '9366324358', father: 'SANJIT DAS', mother: 'MILLIKA BALA DAS', guardian: 'SANJIT DAS' },
  { roll: 31, name: 'Papiya Das', enrollmentNo: '322202805408' , penNumber: '22214829804', apaarId: '175436956432', dob: '09/01/2010', phone: '8974640527', father: 'DIPAK DAS', mother: 'BHAGYASHRI DAS', guardian: 'DIPAK DAS' },
  { roll: 32, name: 'Bipash Das', enrollmentNo: '321202805429' },
  { roll: 33, name: 'Rajesh Das', enrollmentNo: '321202805439' , penNumber: '21918082639', apaarId: '113059799137', dob: '01/01/2010', phone: '9612264877', father: 'RAKHAL DAS', mother: 'ANIMA DAS', guardian: 'RAKHAL DAS' },
  { roll: 34, name: 'Rajdweep Das', enrollmentNo: '321202805518' , penNumber: '22090072750', apaarId: '169552655870', dob: '05/11/2009', phone: '9612825486', father: 'SARANJIT DAS', mother: 'MANIKA DAS', guardian: 'SARANJIT DAS' },
  { roll: 35, name: 'Arghadeep Halder', enrollmentNo: '321202805490' , penNumber: '22478599144', apaarId: '328923294195', dob: '06/10/2009', phone: '6033352400', father: 'RAKESH HALDER', mother: 'SUPRITI HALDER', guardian: 'RAKESH HALDER' },
  { roll: 36, name: 'Brishti Das', enrollmentNo: '322202805497' , penNumber: '21926439157', apaarId: '751792286579', dob: '08/10/2010', phone: '8837385013', father: 'BISWAJIT DAS', mother: 'SEFALI DHAR DAS', guardian: 'BISWAJIT DAS' },
  { roll: 37, name: 'Debasmita Gope', enrollmentNo: '322202805449' , penNumber: '22228718509', apaarId: '389989346956', dob: '01/10/2010', phone: '6009103511', father: 'SUJIT KUMAR GOPE', mother: 'KHELA GOPE', guardian: 'SUJIT KUMAR GOPE' },
  { roll: 38, name: 'Aparajita Das', enrollmentNo: '322202805523' , penNumber: '22158247063', apaarId: '497601866020', dob: '12/10/2009', phone: '9863443676', father: 'SUKANTA DAS', mother: 'SHIPRA DAS', guardian: 'SUKANTA DAS' },
  { roll: 39, name: 'Prasanjit Das', enrollmentNo: '321202805419' , penNumber: '22005281846', apaarId: '803529398394', dob: '30/12/2009', phone: '7005365438', father: 'NANDALAL DAS', mother: 'BHAGYABATI DAS', guardian: 'NANDALAL DAS' },
  { roll: 40, name: 'Susmita Debnath', enrollmentNo: '322202805480' , penNumber: '22148584084', apaarId: '208631837348', dob: '18/01/2010', phone: '9366621697', father: 'NIRANJAN DEBNATH', mother: 'BINA RANI DEBNATH', guardian: 'NIRANJAN DEBNATH' },
  { roll: 41, name: 'Shrishti Ghosh', enrollmentNo: '322202805469' },
  { roll: 42, name: 'Sandeep Ch. Das', enrollmentNo: '321202805409' , penNumber: '22500396374', apaarId: 'Not Available', dob: '21/09/2010', phone: '7005153733', father: 'KESHAB CHANDRA DAS', mother: 'BISHU BALA NAMA DAS', guardian: 'KESHAB CHANDRA DAS' },
  { roll: 43, name: 'Anamika Das', enrollmentNo: 'Verify duplicate' , penNumber: '21873623315', apaarId: '207901831966', dob: '08/05/2010', phone: '7629806966', father: 'AMALESH DAS', mother: 'SHILA RANI DAS', guardian: 'AMALESH DAS' },
  { roll: 44, name: 'Abhijit Das', enrollmentNo: '321202805440' , penNumber: '22273898305', apaarId: '985507581920', dob: '26/04/2010', phone: '8415891716', father: 'LALKAMAL DAS', mother: 'SHIBU RANI DAS', guardian: 'LALKAMAL DAS' },
  { roll: 45, name: 'Sandip Biswas', enrollmentNo: '321202805491' , penNumber: '21948575028', apaarId: '843323984867', dob: '12/12/2009', phone: '8414846792', father: 'GOUTAM BISWAS', mother: 'LAXMI DAS', guardian: 'GOUTAM BISWAS' },
  { roll: 46, name: 'Pritam Sarkar', enrollmentNo: '321202805450' , penNumber: '21853279036', apaarId: '596222286143', dob: '02/11/2009', phone: '8787467802', father: 'UTTAM SARKAR', mother: 'PUTUL SARKAR', guardian: 'UTTAM SARKAR' },
  { roll: 47, name: 'Sukanta Das', enrollmentNo: '321202805524' , penNumber: '22441459618', apaarId: '206747329747', dob: '23/07/2009', phone: '8732823151', father: 'SUSHIL DAS', mother: 'RINABALA DAS', guardian: 'SUSHIL DAS' },
  { roll: 48, name: 'Biswajit Das', enrollmentNo: '321202805572' , penNumber: '22000968418', apaarId: '164945071849', dob: '17/09/2009', phone: '9612415507', father: 'SUDIP DAS', mother: 'RUBIRANI DAS', guardian: 'SUDIP DAS' },
  { roll: 49, name: 'Akhil Sarkar', enrollmentNo: '321202805420' , penNumber: '22557215245', apaarId: '168347483975', dob: '07/11/2008', phone: '8974866525', father: 'MANORANJAN SARKAR', mother: 'SARATHI SARKAR', guardian: 'MANORANJAN SARKAR' },
  { roll: 50, name: 'Tanmoy Sarkar', enrollmentNo: '321202805481' , penNumber: '22286584366', apaarId: '167483380436', dob: '16/03/2010', phone: '9366511985', father: 'TAPAN SARKAR', mother: 'KABITA SARKAR', guardian: 'TAPAN SARKAR' },
  { roll: 51, name: 'Nayan Das', enrollmentNo: '321202805410' , penNumber: '22177375983', apaarId: '817252424928', dob: '28/03/2010', phone: '6909956252', father: 'RUPCHAN DAS', mother: 'SHIPRA DAS', guardian: 'RUPCHAN DAS' },
  { roll: 52, name: 'Nandini Das', enrollmentNo: '322202805431' , penNumber: '21958513610', apaarId: '342233027804', dob: '01/05/2009', phone: '8837409757', father: 'MANTU DAS', mother: 'KAJALI DAS', guardian: 'MANTU DAS' },
  { roll: 53, name: 'Arpita Mandal', enrollmentNo: '322202805441' , penNumber: '21848991407', apaarId: '488763217024', dob: '10/01/2010', phone: '6009794441', father: 'ABHIJIT MANDAL', mother: 'ADHARI MANDAL', guardian: 'ABHIJIT MANDAL' },
  { roll: 54, name: 'Laxmi Rani Debnath', enrollmentNo: '322202805492' },
  { roll: 55, name: 'Sumen Das', enrollmentNo: '321202805451' , penNumber: '22015982522', apaarId: '278008025340', dob: '09/05/2010', phone: '8974760014', father: 'SAJAL DAS', mother: 'SWAPNA DAS', guardian: 'SAJAL DAS' },
  { roll: 56, name: 'Shayantika Paul', enrollmentNo: '322202805525' },
  { roll: 57, name: 'Ashikha Sutradhar', enrollmentNo: '322202805421' },
  { roll: 58, name: 'Sangita Ghosh', enrollmentNo: '322202805570' , penNumber: '21888626614', apaarId: '105349386767', dob: '13/06/2010', phone: '8274884427', father: 'JUGAL DAS', mother: 'NAMITA GHOSH', guardian: 'JUGAL DAS' },
  { roll: 59, name: 'Anamika Das', enrollmentNo: 'Verify duplicate' , penNumber: '21929985511', apaarId: '326638870484', dob: '18/08/2009', phone: '8730914218', father: 'SAMIR DAS', mother: 'PATI DAS', guardian: 'SAMIR DAS' },
  { roll: 60, name: 'Supriya Sarkar', enrollmentNo: '322202805482' , penNumber: '21833488954', apaarId: '746574083424', dob: '06/04/2010', phone: '6009358180', father: 'SHYAMAL SARKAR', mother: 'SHIPRA SARKAR', guardian: 'SHYAMAL SARKAR' },
  { roll: 61, name: 'Kishan Sarkar', enrollmentNo: '321202805411' },
  { roll: 62, name: 'Joy Sarkar', enrollmentNo: '321202805432' },
  { roll: 63, name: 'Anindita Das', enrollmentNo: '322202805442' , penNumber: '22083729516', apaarId: '207402984529', dob: '02/06/2009', phone: '7085821133', father: 'SHUBHALAL DAS', mother: 'PARUL DAS', guardian: 'SHUBHALAL DAS' },
  { roll: 64, name: 'Sanjoy Mallik', enrollmentNo: '321202805493' },
  { roll: 65, name: 'Ruma Das', enrollmentNo: '322202805452' , penNumber: '22227484625', apaarId: '502446887257', dob: '02/05/2010', phone: '9366710415', father: 'DULAL DAS', mother: 'SAJALA DAS', guardian: 'DULAL DAS' },
  { roll: 66, name: 'Joydipa Ghosh', enrollmentNo: '322202805526' , penNumber: '22306510852', apaarId: '368961276676', dob: '14/08/2009', phone: '8132021108', father: 'SRIBASAN GHOSH', mother: 'SANJU GHOSH', guardian: 'SRIBASAN GHOSH' },
  { roll: 67, name: 'Papiya Nama Sudra', enrollmentNo: '322202805422' , penNumber: '22097571780', apaarId: '380333688841', dob: '03/08/2010', phone: '8787700858', father: 'MITAN NAMA SHUDRA', mother: 'SABITA BISWAS', guardian: 'MITAN NAMA SHUDRA' },
  { roll: 68, name: 'Susmita Saha', enrollmentNo: '322202805483' },
  { roll: 69, name: 'Sagar Das', enrollmentNo: '321202805412' , penNumber: '22457706656', apaarId: '685826618167', dob: '28/09/2009', phone: '8974385314', father: 'SUSHIL DAS', mother: 'RINA DAS', guardian: 'SUSHIL DAS' },
  { roll: 70, name: 'Ruma Debnath', enrollmentNo: 'Not found' , penNumber: '21980226162', apaarId: '170144712849', dob: '22/11/2009', phone: '8787459779', father: 'GOUR DEBNATH', mother: 'JHUMA DEBNATH', guardian: 'GOUR DEBNATH' },
  { roll: 71, name: 'Jwel Debnath', enrollmentNo: '322202805443' },
  { roll: 72, name: 'Anisha Sarkar', enrollmentNo: '322202805530' },
  { roll: 73, name: 'Surajit Das', enrollmentNo: '321202805494' },
  { roll: 74, name: 'Purnima Das', enrollmentNo: '322202805453' , penNumber: '22442173000', apaarId: '538153958154', dob: '12/08/2009', phone: '9366857547', father: 'NRIPENDRA DAS', mother: 'LAXMI RANI DAS', guardian: 'NRIPENDRA DAS' },
  { roll: 75, name: 'Himani Debnath', enrollmentNo: '322202805527' , penNumber: '22171689902', apaarId: '329160220543', dob: '12/10/2009', phone: '7628035353', father: 'AJIT DEBNATH', mother: 'SHIPRA DEBNATH', guardian: 'AJIT DEBNATH' },
  { roll: 76, name: 'Asmita Das', enrollmentNo: '322202805423' , penNumber: '21836990602', apaarId: '813391190859', dob: '22/11/2009', phone: '9436507576', father: 'SUBRATA DAS', mother: 'MAMPI DAS', guardian: 'SUBRATA DAS' },
  { roll: 77, name: 'Manika Biswas', enrollmentNo: '322202805484' , penNumber: '22141006294', apaarId: '891206702022', dob: '21/01/2010', phone: '9089290924', father: 'MARAN BISWAS', mother: 'SATHI DEY BISWAS', guardian: 'MARAN BISWAS' },
  { roll: 78, name: 'Prasanjit Sarkar', enrollmentNo: '321202805414*' },
  { roll: 79, name: 'Priyanka Majumdar', enrollmentNo: '322202805434' },
  { roll: 80, name: 'Chirashri Mallik', enrollmentNo: '322202805550' , penNumber: '22102374093', apaarId: '963287352345', dob: '20/07/2009', phone: '9366159100', father: 'GURU CHARAN MALLIK', mother: 'PRANATI DEBNATH', guardian: 'GURU CHARAN MALLIK' },
  { roll: 81, name: 'Abai Sarkar', enrollmentNo: '321202805444' , penNumber: '22398145972', apaarId: '229726753240', dob: '19/11/2008', phone: '7629800344', father: 'AJIT SARKAR', mother: 'SUBHADRA SARKAR', guardian: 'AJIT SARKAR' },
  { roll: 82, name: 'Suvankar Sarkar', enrollmentNo: '321202805495' , penNumber: '22211723709', apaarId: '945834875105', dob: '13/04/2010', phone: '9233112044', father: 'DILIP SARKAR', mother: 'NANDINI SARKAR', guardian: 'DILIP SARKAR' },
  { roll: 83, name: 'Sebika Das', enrollmentNo: '322202805454' },
  { roll: 84, name: 'Shakil Biswas', enrollmentNo: '321202805528' },
  { roll: 85, name: 'Nayan Sarkar', enrollmentNo: '321202805508' },
  { roll: 86, name: 'Manika Rani Saha', enrollmentNo: '322202805424' },
  { roll: 87, name: 'Jhumur Biswas', enrollmentNo: '322202805485' },
  { roll: 88, name: 'Surobhi Biswas', enrollmentNo: '322202805455*' },
  { roll: 89, name: 'Trishna Sarkar', enrollmentNo: '322202805509' },
  { roll: 90, name: 'Milan Biswas', enrollmentNo: '322202805541' },
  { roll: 91, name: 'Ankita Sutradhar', enrollmentNo: '322202805561' },
  { roll: 92, name: 'Arpita Biswas', enrollmentNo: '322202805499' },
  { roll: 93, name: 'Anamika Shil', enrollmentNo: '322202805551' },
  { roll: 94, name: 'Susmita Biswas', enrollmentNo: 'Verify duplicate' },
  { roll: 95, name: 'Jyoti Biswas', enrollmentNo: '322202805531' },
  { roll: 96, name: 'Jayashree Barman', enrollmentNo: '322202805456' },
  { roll: 97, name: 'Sumana Barman', enrollmentNo: '322202805510' },
  { roll: 98, name: 'Puja Debnath', enrollmentNo: 'Verify duplicate' },
  { roll: 99, name: 'Arpita Das', enrollmentNo: '322202805562' },
  { roll: 100, name: 'Rakhi Biswas', enrollmentNo: '322202805500' },
  { roll: 101, name: 'Jutan Sarkar', enrollmentNo: '321202805552' },
  { roll: 102, name: 'Hritika Debnath', enrollmentNo: '322202805467' , penNumber: '21897161982', apaarId: '303577090720', dob: '29/05/2010', phone: '7005929561', father: 'NANTU DEBNATH', mother: 'SARASWATI DEBNATH', guardian: 'NANTU DEBNATH' },
  { roll: 103, name: 'Moumita Biswas', enrollmentNo: '322202805465' },
  { roll: 104, name: 'Chiranjit Biswas', enrollmentNo: '321202805532' },
  { roll: 105, name: 'Sabuj Sarkar', enrollmentNo: '321202805457' },
  { roll: 106, name: 'Rohit Nama Das', enrollmentNo: '321202805511*' },
  { roll: 107, name: 'Dipika Biswas', enrollmentNo: '322202805543' },
  { roll: 108, name: 'Susmita Biswas', enrollmentNo: 'Verify duplicate' },
  { roll: 109, name: 'Rajdip Das', enrollmentNo: '321202805501' },
  { roll: 110, name: 'Ripan Das', enrollmentNo: '321202805553' },
  { roll: 111, name: 'Dipayan Debnath', enrollmentNo: '321202805468' , penNumber: '22102538819', apaarId: '261554102484', dob: '07/06/2010', phone: '7630888767', father: 'RUPEN DEBNATH', mother: 'SHILPI DEBNATH', guardian: 'RUPEN DEBNATH' },
  { roll: 112, name: 'Santanu Das', enrollmentNo: '321202805533' },
  { roll: 113, name: 'Barsa Giri', enrollmentNo: '322202805458' },
  { roll: 114, name: 'Subhrajit Das', enrollmentNo: 'Verify spelling' },
  { roll: 115, name: 'Rupak Biswas', enrollmentNo: '321202805512' },
  { roll: 116, name: 'Ujjala Barman', enrollmentNo: '322202805544*' },
  { roll: 117, name: 'Rinki Shil', enrollmentNo: '322202805564' },
  { roll: 118, name: 'Susmita Das', enrollmentNo: '322202805502' },
  { roll: 119, name: 'Sunati Sarkar', enrollmentNo: '322202805554' },
  { roll: 120, name: 'Niharika Biswas', enrollmentNo: '322202805538' },
  { roll: 121, name: 'Piyash Debnath', enrollmentNo: '321202805461' },
  { roll: 122, name: 'Hridoy Das', enrollmentNo: 'Verify duplicate' },
  { roll: 123, name: 'Titash Majumdar', enrollmentNo: '321202805546' },
  { roll: 124, name: 'Pritam Baishya', enrollmentNo: '321202805566' },
  { roll: 125, name: 'Sahadeb Sarkar', enrollmentNo: '321202805505' },
  { roll: 126, name: 'Sayen Das', enrollmentNo: '321202805557' },
  { roll: 127, name: 'Roman Biswas', enrollmentNo: '321202805473' },
  { roll: 128, name: 'Harsit Das', enrollmentNo: '321202805539' },
  { roll: 129, name: 'Prasanta Das', enrollmentNo: '321202805462' },
  { roll: 130, name: 'Anupriya Das', enrollmentNo: '322202805515' },
  { roll: 131, name: 'Joy Das', enrollmentNo: '321202805547' },
  { roll: 132, name: 'Tuhin Biswas', enrollmentNo: '321202805567' },
  { roll: 133, name: 'Sourav Das', enrollmentNo: '321202805517' },
  { roll: 134, name: 'Rupan Sankar', enrollmentNo: '321202805506*' },
  { roll: 135, name: 'Prashanta Paul', enrollmentNo: '321202805558' },
  { roll: 136, name: 'Anupam Biswas', enrollmentNo: '321202805540' },
  { roll: 137, name: 'Durjoy Biswas', enrollmentNo: '321202805474' },
  { roll: 138, name: 'Amit Rudra Paul', enrollmentNo: '321202805463' },
  { roll: 139, name: 'Nitesh Paul', enrollmentNo: '321202805516' },
  { roll: 140, name: 'Abhijit Debnath', enrollmentNo: '321202805548' },
  { roll: 141, name: 'Ausmita Sarkar', enrollmentNo: '322202805568' },
  { roll: 142, name: 'Arpan Sarkar', enrollmentNo: '321202805464' },
  { roll: 143, name: 'Hriday Biswas', enrollmentNo: '321202805459' },
  { roll: 144, name: 'Hriday Das', enrollmentNo: 'Verify duplicate' },
  { roll: 145, name: 'Bishal Sarkar', enrollmentNo: '321202805559' },
  { roll: 146, name: 'Niloy Das', enrollmentNo: '321202805475*' },
  { roll: 147, name: 'Abhijit Paul', enrollmentNo: '321202805574' },
  { roll: 148, name: 'Hritik Modak', enrollmentNo: '321202805503*' },
  { roll: 149, name: 'Bikram Paul', enrollmentNo: '321202805555' },
  { roll: 150, name: 'Bir Kumar Barman', enrollmentNo: '321202805471' },
  { roll: 151, name: 'Anup Barman', enrollmentNo: '321202805536' },
  { roll: 152, name: 'Supriya Debnath', enrollmentNo: '322202805575' , penNumber: '22103044793', apaarId: '799673806789', dob: '02/07/2010', phone: '6033351721', father: 'UTTAM KR DEBNATH', mother: 'SHILPI DEBNATH', guardian: 'UTTAM KR DEBNATH' },
  { roll: 153, name: 'Abhay Biswas', enrollmentNo: '321202805460' },
  { roll: 154, name: 'Suma Roy', enrollmentNo: '322202805513' },
  { roll: 155, name: 'Akash Sankar', enrollmentNo: 'Not found' },
  { roll: 156, name: 'Eshan Biswas', enrollmentNo: '321202805565' },
  { roll: 157, name: 'Subhankar Saha', enrollmentNo: 'Verify spelling' },
  { roll: 158, name: 'Jiban Biswas', enrollmentNo: '321202805556' },
  { roll: 159, name: 'Tamal Das', enrollmentNo: '321202805472' },
  { roll: 160, name: 'Amrit Biswas', enrollmentNo: '321202805576' },
  { roll: 161, name: 'Rahul Halder', enrollmentNo: '321202805537' },
  { roll: 162, name: 'Nayan Chowdhury', enrollmentNo: '321202805534' },
  { roll: 163, name: 'Ankita Biswas', enrollmentNo: '322202805560' },
  { roll: 164, name: 'Santanu Debnath', enrollmentNo: '321202805549' },
  { roll: 165, name: 'Chandini Das', enrollmentNo: '322202805498' },
  { roll: 166, name: 'Shristi Ghosh', enrollmentNo: '322202805469' , penNumber: '21868114678', apaarId: '470203171393', dob: '26/01/2010', phone: '8413986741', father: 'SATYA RANJAN GHOSH', mother: 'RATNA GOPE GHOSH', guardian: 'SATYA RANJAN GHOSH' }
];

const scienceData = [
  { roll: 1, name: 'Amit Sarmah', enrollmentNo: 'Not found' },
  { roll: 2, name: 'Suparna Das', enrollmentNo: '332202805535' },
  { roll: 3, name: 'Daliya Das', enrollmentNo: '332202805569' },
  { roll: 4, name: 'Bishal Das', enrollmentNo: '331202805435' },
  { roll: 5, name: 'Rajdeep Chandra', enrollmentNo: '331202805486*' },
  { roll: 6, name: 'Parmita Das', enrollmentNo: '332202805433' }
];

const seedClass11 = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    const dbName = process.env.DB_NAME || 'school_erp';
    await mongoose.connect(mongoUri, { dbName });
    console.log(`Connected to MongoDB Atlas: "${mongoose.connection.name}"`);

    // Remove existing Class 11 Arts and Science records
    const delArts = await Student.deleteMany({ classId: 'class-11-arts' });
    const delSci = await Student.deleteMany({ classId: 'class-11-sci' });
    console.log(`Cleared existing: ${delArts.deletedCount} Arts, ${delSci.deletedCount} Science students.`);

    // 1. Prepare Arts students
    const artsDocs = artsData.map(st => {
      const rollStr = String(st.roll).padStart(2, '0');
      const studentId = `PMS-24-11A-${rollStr}`;
      return {
        studentId,
        roll: rollStr,
        rollNumber: st.roll,
        name: st.name.trim(),
        classId: 'class-11-arts',
        className: 'Class XI (Arts)',
        guardian: st.guardian || '',
        phone: st.phone || '',
        attendance: '95%',
        monthlyAttendance: {
          '2026-10': {
            workingDays: 24,
            presentDays: 23,
            notes: 'Regular attendance'
          }
        },
        status: 'Enrolled',
        academicYear: '2026-2027',
        enrollmentNo: st.enrollmentNo.trim(),
        penNumber: st.penNumber || '',
        apaarId: st.apaarId || '',
        dob: st.dob || '',
        father: st.father || '',
        mother: st.mother || '',
        guardian: st.guardian || '',
        enrollmentYear: '2024'
      };
    });

    // 2. Prepare Science students
    const scienceDocs = scienceData.map(st => {
      const rollStr = String(st.roll).padStart(2, '0');
      const studentId = `PMS-24-11S-${rollStr}`;
      return {
        studentId,
        roll: rollStr,
        rollNumber: st.roll,
        name: st.name.trim(),
        classId: 'class-11-sci',
        className: 'Class XI (Science)',
        guardian: '',
        phone: '',
        attendance: '95%',
        monthlyAttendance: {
          '2026-10': {
            workingDays: 24,
            presentDays: 23,
            notes: 'Regular attendance'
          }
        },
        status: 'Enrolled',
        academicYear: '2026-2027',
        enrollmentNo: st.enrollmentNo.trim(),
        enrollmentYear: '2024',
        penNumber: st.penNumber || '',
        apaarId: st.apaarId || '',
        dob: st.dob || '',
        father: st.father || '',
        mother: st.mother || '',
        guardian: st.guardian || ''
      };
    });

    // Insert Arts
    const insertedArts = await Student.insertMany(artsDocs);
    console.log(`Successfully seeded ${insertedArts.length} Class XI (Arts) students with enrollment year 2024!`);

    // Insert Science
    const insertedSci = await Student.insertMany(scienceDocs);
    console.log(`Successfully seeded ${insertedSci.length} Class XI (Science) students with enrollment year 2024!`);

    console.log('Total Class XI seeded:', insertedArts.length + insertedSci.length);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Class 11 students:', error);
    process.exit(1);
  }
};

seedClass11();
