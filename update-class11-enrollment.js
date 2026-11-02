import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

/**
 * Student data with:
 *  - name (to match existing DB record)
 *  - enrollmentNo  = the Enrolment Number (e.g. 321202805444)
 *  - registrationNo = the Registration Number part (e.g. 31202612027)
 *  - registrationYear = extracted year from "31202612027 of 2024"
 *  - classId = 'class-11-arts' | 'class-11-sci'
 *  - subjects = array of subject names for reference (stream already encoded in classId)
 */
const studentUpdates = [
  // --- Arts Stream (class-11-arts) ---
  { name: 'Abai Sarkar',        enrollmentNo: '321202805444', registrationNo: '31202612027', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Abhay Biswas',       enrollmentNo: '321202805460', registrationNo: '31202611636', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Abhijit Das',        enrollmentNo: '321202805440', registrationNo: '31202612084', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Abhijit Debnath',    enrollmentNo: '321202805548', registrationNo: '31202611594', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Abhijit Paul',       enrollmentNo: '321202805574', registrationNo: '31202611596', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Adipta Das',         enrollmentNo: '321202805571', registrationNo: '31202627279', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Akash Sarkar',       enrollmentNo: '321202805545', registrationNo: '31202418940', registrationYear: '2022', classId: 'class-11-arts' },
  { name: 'Akhil Sarkar',       enrollmentNo: '321202805420', registrationNo: '31202612023', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Amit Rudra Paul',    enrollmentNo: '321202805463', registrationNo: '31202611584', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Amrit Biswas',       enrollmentNo: '321202805576', registrationNo: '31202507261', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Anamika Biswas',     enrollmentNo: '322202805407', registrationNo: '32202612050', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anamika Das',        enrollmentNo: '322202805496', registrationNo: '32202612056', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anamika Das',        enrollmentNo: '321202805430', registrationNo: '32202612070', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anamika Shil',       enrollmentNo: '322202805551', registrationNo: '32202611587', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anindita Das',       enrollmentNo: '322202805442', registrationNo: '32202612055', registrationYear: '2026', classId: 'class-11-arts' },
  { name: 'Anisha Sarkar',      enrollmentNo: '322202805530', registrationNo: '22202611317', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ankita Biswas',      enrollmentNo: '322202805560', registrationNo: '32202501267', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Ankita Das',         enrollmentNo: '322202805427', registrationNo: '32202612092', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ankita Das',         enrollmentNo: '322202805448', registrationNo: '32202612021', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ankita Sutradhar',   enrollmentNo: '322202805561', registrationNo: '32202611571', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anup Barman',        enrollmentNo: '321202805536', registrationNo: '31202611591', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anupam Biswas',      enrollmentNo: '321202805540', registrationNo: '31202611590', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Anupriya Das',       enrollmentNo: '322202805515', registrationNo: '32202612294', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Aparajita Das',      enrollmentNo: '322202805523', registrationNo: '32202612046', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Arghadeep Haldar',   enrollmentNo: '321202805490', registrationNo: '31202612062', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Arpan Sarkar',       enrollmentNo: '321202805464', registrationNo: '31202611579', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Arpita Biswas',      enrollmentNo: '322202805499', registrationNo: '32202611563', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Arpita Das',         enrollmentNo: '322202805562', registrationNo: '32202611602', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Arpita Mandal',      enrollmentNo: '322202805441', registrationNo: '32202612035', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ashikha Sutradhar',  enrollmentNo: '322202805421', registrationNo: '32202611573', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Asish Biswas',       enrollmentNo: '321202805573', registrationNo: '31202600409', registrationYear: '2026', classId: 'class-11-arts' },
  { name: 'Asmita Das',         enrollmentNo: '322202805423', registrationNo: '32202612025', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ausmita Sarkar',     enrollmentNo: '322202805568', registrationNo: '32202612280', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Barsa Giri',         enrollmentNo: '322202805458', registrationNo: '32202611603', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Bikram Paul',        enrollmentNo: '321202805555', registrationNo: '31202611580', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Bipash Das',         enrollmentNo: '321202805429', registrationNo: '31202611313', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Bipul Debnath',      enrollmentNo: '321202805478', registrationNo: '31202612044', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Birkumar Barman',    enrollmentNo: '321202805471', registrationNo: '31202611586', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Bishal Sarkar',      enrollmentNo: '321202805559', registrationNo: '31202635396', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Biswajit Das',       enrollmentNo: '321202805572', registrationNo: '31202612052', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Bristi Das',         enrollmentNo: '322202805497', registrationNo: '32202612065', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Chandini Das',       enrollmentNo: '322202805498', registrationNo: '32202600408', registrationYear: '2026', classId: 'class-11-arts' },
  { name: 'Chiranjit Biswas',   enrollmentNo: '321202805532', registrationNo: '31202611354', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Chirashri Mallik',   enrollmentNo: '322202805550', registrationNo: '32202612067', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Deb Biswas',         enrollmentNo: '321202805425', registrationNo: '31202612083', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Debasmita Gope',     enrollmentNo: '322202805449', registrationNo: '32202612039', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Dhiman Das',         enrollmentNo: '321202805487', registrationNo: '31202612057', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Dipanjan Debnath',   enrollmentNo: '321202805447', registrationNo: '31202612091', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Dipayan Debnath',    enrollmentNo: '321202805468', registrationNo: '31202612036', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Dipika Biswas',      enrollmentNo: '322202805543', registrationNo: '32202611644', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Durjoy Biswas',      enrollmentNo: '321202805474', registrationNo: '31202611595', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Eshan Biswas',       enrollmentNo: '321202805565', registrationNo: '31202635380', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Harsit Das',         enrollmentNo: '321202805539', registrationNo: '31202612307', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Himani Debnath',     enrollmentNo: '322202805527', registrationNo: '32202612022', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Hriday Biswas',      enrollmentNo: '321202805459', registrationNo: '31202507971', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Hriday Das',         enrollmentNo: '321202805514', registrationNo: '31202612287', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Hriday Das',         enrollmentNo: '321202805507', registrationNo: '31202635385', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Hrithik Modak',      enrollmentNo: '321202805503', registrationNo: '31202611575', registrationYear: '2026', classId: 'class-11-arts' },
  { name: 'Hritika Debnath',    enrollmentNo: '322202805467', registrationNo: '32202612014', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ishsmit Biswas',     enrollmentNo: '321202805476', registrationNo: '31202612029', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jaya Das',           enrollmentNo: '322202805438', registrationNo: '32202612019', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jayashree Barman',   enrollmentNo: '322202805456', registrationNo: '32202611655', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jhumur Biswas',      enrollmentNo: '322202805485', registrationNo: '32202635379', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jhutika Nama',       enrollmentNo: '322202805522', registrationNo: '32202612049', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jiban Biswas',       enrollmentNo: '321202805556', registrationNo: '31202507268', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Joy Das',            enrollmentNo: '321202805547', registrationNo: '31202635393', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Joy Sarkar',         enrollmentNo: '321202805432', registrationNo: '31202612285', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Joydipa Ghosh',      enrollmentNo: '322202805526', registrationNo: '32202612088', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jutan Sarkar',       enrollmentNo: '321202805552', registrationNo: '31202611645', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jwel Deb',           enrollmentNo: '322202805519', registrationNo: '32202612090', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jwel Debnath',       enrollmentNo: '322202805443', registrationNo: '32202611597', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Jyoti Biswas',       enrollmentNo: '322202805531', registrationNo: '32202611656', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Kaushik Debnath',    enrollmentNo: '321202805405', registrationNo: '31202612013', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Kishan Sarkar',      enrollmentNo: '321202805411', registrationNo: '31202612293', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Laxmi Rani Debnath', enrollmentNo: '322202805492', registrationNo: '32202611314', registrationYear: '2026', classId: 'class-11-arts' },
  { name: 'Lipi Biswas',        enrollmentNo: '322202805437', registrationNo: '32202612074', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Manika Biswas',      enrollmentNo: '322202805484', registrationNo: '32202612018', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Manika Rani Saha',   enrollmentNo: '322202805424', registrationNo: '32202611567', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Milan Biswas',       enrollmentNo: '322202805541', registrationNo: '32202611598', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Mouhit Das',         enrollmentNo: '321202805416', registrationNo: '31202612034', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Moumita Biswas',     enrollmentNo: '322202805465', registrationNo: '32202611356', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Nandini Das',        enrollmentNo: '322202805431', registrationNo: '32202612047', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Nayan Chowdhury',    enrollmentNo: '321202805534', registrationNo: '31202507283', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Nayan Das',          enrollmentNo: '321202805410', registrationNo: '31202612072', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Nayan Sarkar',       enrollmentNo: '321202805508', registrationNo: '31202612169', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Niharika Biswas',    enrollmentNo: '322202805538', registrationNo: '32202635382', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Nilay Das',          enrollmentNo: '321202805475', registrationNo: '31202635395', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Nitesh Paul',        enrollmentNo: '321202805516', registrationNo: '31202611583', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Papiya Das',         enrollmentNo: '322202805408', registrationNo: '32202612089', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Papiya Nama Sudra',  enrollmentNo: '322202805422', registrationNo: '32202612032', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Piyash Debnath',     enrollmentNo: '321202805461', registrationNo: '31202612310', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Prasanjit Das',      enrollmentNo: '321202805419', registrationNo: '31202612075', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Prasanta Das',       enrollmentNo: '321202805462', registrationNo: '31202635388', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Prasenjit Sarkar',   enrollmentNo: '321202805414', registrationNo: '31202612174', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Prashanta Paul',     enrollmentNo: '321202805558', registrationNo: '31202611572', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Pritam Baishya',     enrollmentNo: '321202805566', registrationNo: '31202612309', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Pritam Sarkar',      enrollmentNo: '321202805450', registrationNo: '31202612078', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Pritush Das',        enrollmentNo: '321202805445', registrationNo: '31202612086', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Priyanka Majumder',  enrollmentNo: '322202805434', registrationNo: '32202612281', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Puja Debnath',       enrollmentNo: '322202805542', registrationNo: '32202611604', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Puja Debnath',       enrollmentNo: '322202805418', registrationNo: '32202612045', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Purnima Das',        enrollmentNo: '322202805453', registrationNo: '32202612063', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rahit Nama Das',     enrollmentNo: '321202805511', registrationNo: '31202612178', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rahul Halder',       enrollmentNo: '321202805537', registrationNo: '31202507272', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Rajdip Das',         enrollmentNo: '321202805501', registrationNo: '31202611348', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rajdweep Das',       enrollmentNo: '321202805518', registrationNo: '31202612068', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rajesh Das',         enrollmentNo: '321202805439', registrationNo: '31202612077', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rajib Sarkar',       enrollmentNo: '321202805436', registrationNo: '31202612053', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rakhi Biswas',       enrollmentNo: '322202805500', registrationNo: '32202611581', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Reshmi Das',         enrollmentNo: '322202805428', registrationNo: '32202612038', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Riktika Sarkar',     enrollmentNo: '322202805488', registrationNo: '32202612010', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rima Debnath',       enrollmentNo: '322202805413', registrationNo: '32202612054', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rinki Shil',         enrollmentNo: '322202805564', registrationNo: '32202611577', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ripan Das',          enrollmentNo: '321202805553', registrationNo: '31202611358', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Riya Sarkar',        enrollmentNo: '322202805489', registrationNo: '32202612026', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Roman Biswas',       enrollmentNo: '321202805473', registrationNo: '31202611640', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ruhan Das',          enrollmentNo: '321202805426', registrationNo: '31202612073', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ruma Das',           enrollmentNo: '322202805452', registrationNo: '32202612087', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rupa Acharjee',      enrollmentNo: '322202805415', registrationNo: '32202612058', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rupak Biswas',       enrollmentNo: '321202805512', registrationNo: '31202612170', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Rupan Sarkar',       enrollmentNo: '321202805506', registrationNo: '31202612300', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sabuj Sarkar',       enrollmentNo: '321202805457', registrationNo: '31202612181', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sagar Das',          enrollmentNo: '321202805412', registrationNo: '31202612076', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sahadeb Sarkar',     enrollmentNo: '321202805505', registrationNo: '31202612292', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sandip Biswas',      enrollmentNo: '321202805491', registrationNo: '31202612040', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sandip Debnath',     enrollmentNo: '321202805521', registrationNo: '31202612048', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sandip Chandra Das', enrollmentNo: '321202805409', registrationNo: '31202612012', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sangita Ghosh',      enrollmentNo: '322202805570', registrationNo: '32202627278', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sanjoy Mallik',      enrollmentNo: '321202805493', registrationNo: '31202612186', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Santanu Das',        enrollmentNo: '321202805533', registrationNo: '31202611351', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Santanu Debnath',    enrollmentNo: '321202805549', registrationNo: '31202612024', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sayen Das',          enrollmentNo: '321202805557', registrationNo: '31202612291', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sebika Das',         enrollmentNo: '322202805454', registrationNo: '3220261582',  registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Shakil Biswas',      enrollmentNo: '321202805528', registrationNo: '31202612171', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Shovajit Sarkar',    enrollmentNo: '321202805417', registrationNo: '31202612028', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Shristi Ghosh',      enrollmentNo: '322202805469', registrationNo: '32202612017', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Shyantika Paul',     enrollmentNo: '322202805525', registrationNo: '32202611578', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sourav Das',         enrollmentNo: '321202805517', registrationNo: '31202635394', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Subhajit Das',       enrollmentNo: '321202805529', registrationNo: '31202611585', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Subrajit Das',       enrollmentNo: '321202805406', registrationNo: '31202612033', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sujan Modak',        enrollmentNo: '321202805477', registrationNo: '31202612082', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sukanta Das',        enrollmentNo: '321202805524', registrationNo: '31202612085', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Suma Roy',           enrollmentNo: '322202805513', registrationNo: '32202612306', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sumana Barman',      enrollmentNo: '322202805510', registrationNo: '32202611651', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sumen Das',          enrollmentNo: '321202805451', registrationNo: '31202612037', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sunati Sarkar',      enrollmentNo: '322202805554', registrationNo: '32202635381', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Supriya Debnath',    enrollmentNo: '322202805575', registrationNo: '32202612064', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Supriya Sarkar',     enrollmentNo: '322202805482', registrationNo: '32202612011', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Surabhi Biswas',     enrollmentNo: '322202805455', registrationNo: '32202635376', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Surajit Das',        enrollmentNo: '321202805494', registrationNo: '31202611633', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Sushankar Saha',     enrollmentNo: '321202805504', registrationNo: '31202507274', registrationYear: '2023', classId: 'class-11-arts' },
  { name: 'Susmita Biswas',     enrollmentNo: '322202805466', registrationNo: '32202611635', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Susmita Biswas',     enrollmentNo: '322202805563', registrationNo: '32202611649', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Susmita Das',        enrollmentNo: '322202805502', registrationNo: '32202635386', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Susmita Debnath',    enrollmentNo: '322202805480', registrationNo: '32202612016', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Susmita Saha',       enrollmentNo: '322202805483', registrationNo: '32202611647', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Suvankar Sarkar',    enrollmentNo: '321202805495', registrationNo: '31202612059', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Tamal Das',          enrollmentNo: '321202805472', registrationNo: '31202611630', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Tanip Nama',         enrollmentNo: '321202805446', registrationNo: '31202612043', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Tanmoy Sarkar',      enrollmentNo: '321202805481', registrationNo: '31202612051', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Titash Majumder',    enrollmentNo: '321202805546', registrationNo: '31202612284', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Tripti Das',         enrollmentNo: '322202805479', registrationNo: '32202612081', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Trishana Biswas',    enrollmentNo: '322202805520', registrationNo: '32202612079', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Trishna Sarkar',     enrollmentNo: '322202805509', registrationNo: '32202635389', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Tuhin Biswas',       enrollmentNo: '321202805567', registrationNo: '31202635391', registrationYear: '2024', classId: 'class-11-arts' },
  { name: 'Ujjala Barma',       enrollmentNo: '322202805544', registrationNo: '32202611592', registrationYear: '2024', classId: 'class-11-arts' },

  // --- Science Stream (class-11-sci) ---
  { name: 'Amit Sarkar',   enrollmentNo: '331202805470', registrationNo: '31202612060', registrationYear: '2024', classId: 'class-11-sci' },
  { name: 'Bishal Das',    enrollmentNo: '331202805435', registrationNo: '31202611564', registrationYear: '2024', classId: 'class-11-sci' },
  { name: 'Daliya Das',    enrollmentNo: '332202805569', registrationNo: '32202612020', registrationYear: '2024', classId: 'class-11-sci' },
  { name: 'Parmita Das',   enrollmentNo: '332202805433', registrationNo: '32202612066', registrationYear: '2024', classId: 'class-11-sci' },
  { name: 'Rajdeep Chanda',enrollmentNo: '331202805486', registrationNo: '31202611588', registrationYear: '2024', classId: 'class-11-sci' },
  { name: 'Suparna Das',   enrollmentNo: '332202805535', registrationNo: '32202508107', registrationYear: '2023', classId: 'class-11-sci' },
];

async function updateClass11Enrollment() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: ${mongoose.connection.name}`);

    let updatedCount = 0;
    let notFoundCount = 0;
    const notFound = [];

    for (const entry of studentUpdates) {
      const nameLower = entry.name.trim().toLowerCase();

      // Try matching by enrollmentNo first (most reliable), then by name in the class
      let student = await Student.findOne({
        $or: [
          { enrollmentNo: entry.enrollmentNo },
          {
            classId: { $in: ['class-11-arts', 'class-11-sci'] },
            name: { $regex: new RegExp(`^${entry.name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
          }
        ]
      });

      if (!student) {
        // Fallback: fuzzy name match within class 11
        const allClass11 = await Student.find({ classId: { $in: ['class-11-arts', 'class-11-sci'] } });
        student = allClass11.find(s => s.name.trim().toLowerCase() === nameLower) || null;
      }

      if (!student) {
        console.log(`[NOT FOUND] ${entry.name} (Enrollment: ${entry.enrollmentNo})`);
        notFound.push(entry.name);
        notFoundCount++;
        continue;
      }

      // Update enrollment & registration details
      student.enrollmentNo   = entry.enrollmentNo;
      student.enrollmentYear = entry.registrationYear;
      student.classId        = entry.classId;
      student.className      = entry.classId === 'class-11-sci'
        ? 'Class XI (Science)'
        : 'Class XI (Arts)';

      // Update gender from enrollment number prefix (321=Boy, 322=Girl, 331=Boy-Sci, 332=Girl-Sci)
      const prefix = entry.enrollmentNo.substring(0, 3);
      if (prefix === '321' || prefix === '331') {
        student.gender = 'Boy';
      } else if (prefix === '322' || prefix === '332') {
        student.gender = 'Girl';
      }

      await student.save();
      updatedCount++;
      console.log(`[UPDATED] ${student.name.padEnd(25)} | Enrollment: ${entry.enrollmentNo} | RegNo: ${entry.registrationNo} | Year: ${entry.registrationYear} | Class: ${entry.classId}`);
    }

    console.log('\n================ Summary ================');
    console.log(`Updated: ${updatedCount}`);
    console.log(`Not found: ${notFoundCount}`);
    if (notFound.length > 0) {
      console.log('Missing students:');
      notFound.forEach(n => console.log(`  - ${n}`));
    }

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Class 11 enrollment:', err);
    process.exit(1);
  }
}

updateClass11Enrollment();
