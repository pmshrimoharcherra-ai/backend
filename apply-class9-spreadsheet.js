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

export const class9SpreadsheetData = [
  { roll: 1, name: "Akash Das", father: "Sushil Das", mother: "Manika Das", dob: "01-09-2011", admissionDate: "24-04-2023", admissionNo: "62", aadhaar: "7409 7784 4107", phone: "9612068080", caste: "SC" },
  { roll: 2, name: "Akash Debnath", father: "Gopal Debnath", mother: "Rupali Debnath", dob: "19-07-2012", admissionDate: "17-04-2023", admissionNo: "60", aadhaar: "4025 8338 1029", phone: "6009290703", caste: "OBC" },
  { roll: 3, name: "Alomoy Sarkar", father: "Sanjoy Kr. Sarkar", mother: "Jaya Biswas Sarkar", dob: "07-04-2013", admissionDate: "15-04-2024", admissionNo: "74", aadhaar: "", phone: "8787833044", caste: "OBC" },
  { roll: 4, name: "Ananya Biswas", father: "Sujit Biswas", mother: "Bina Rani Biswas", dob: "25-10-2011", admissionDate: "08-04-2023", admissionNo: "40", aadhaar: "3343 9845 8625", phone: "9366141994", caste: "SC" },
  { roll: 5, name: "Anikesh Roy", father: "Adhir Roy", mother: "Asha Roy", dob: "30-08-2012", admissionDate: "08-04-2023", admissionNo: "61", aadhaar: "7115 4035 510", phone: "9862396326", caste: "SC" },
  { roll: 6, name: "Ankita Biswas", father: "Roychan Biswas", mother: "Bina Sarkar Biswas", dob: "10-12-2011", admissionDate: "10-04-2023", admissionNo: "46", aadhaar: "3423 5614 4791", phone: "6009897403", caste: "SC" },
  { roll: 7, name: "Ankita Rani Sarkar", father: "Surjyaman Sarkar", mother: "Karunabala Sarkar", dob: "28-11-2011", admissionDate: "05-04-2023", admissionNo: "18", aadhaar: "9886 7077 7108", phone: "6009682480", caste: "SC" },
  { roll: 8, name: "Ankurjit Das", father: "Amarjit Das", mother: "Dipika Das", dob: "02-08-2012", admissionDate: "05-04-2023", admissionNo: "20", aadhaar: "8216 7652 7080", phone: "9863182836", caste: "SC" },
  { roll: 9, name: "Anmita Das", father: "Arun Das", mother: "Sangita Das", dob: "08-07-2012", admissionDate: "05-04-2023", admissionNo: "24", aadhaar: "6955 8062 1306", phone: "7005919867", caste: "SC" },
  { roll: 10, name: "Arpan Debnath", father: "Arun Debnath", mother: "Pratima Debnath", dob: "31-10-2011", admissionDate: "12-04-2023", admissionNo: "51", aadhaar: "8469 2420 3861", phone: "7005742281", caste: "OBC" },
  { roll: 11, name: "Arpita Das", father: "Dipak Das", mother: "Gouri Das", dob: "05-10-2011", admissionDate: "04-04-2023", admissionNo: "07", aadhaar: "6567 0580 3501", phone: "8974560959", caste: "SC" },
  { roll: 12, name: "Baishaki Das", father: "Abishanta Das", mother: "Barani Das", dob: "10-03-2012", admissionDate: "08-04-2023", admissionNo: "36", aadhaar: "2345 2578 8278", phone: "8257981745", caste: "SC" },
  { roll: 13, name: "Barnali Debnath", father: "Braja Mohan Debnath", mother: "Karuna Debnath", dob: "29-11-2011", admissionDate: "04-04-2023", admissionNo: "09", aadhaar: "8231 7220 4771", phone: "6909980100", caste: "OBC" },
  { roll: 14, name: "Barsha Sarkar", father: "Mitan Sarkar", mother: "Ruma Mallik Sarkar", dob: "22-08-2011", admissionDate: "12-04-2023", admissionNo: "53", aadhaar: "8839 7507 3607", phone: "9366683730", caste: "SC" },
  { roll: 15, name: "Bijoy Biswas", father: "Pradip Biswas", mother: "Supriya Sarkar (Biswas)", dob: "18-05-2011", admissionDate: "04-04-2023", admissionNo: "12", aadhaar: "7318 5165 2177", phone: "7005568930", caste: "SC" },
  { roll: 16, name: "Binoy Das", father: "Baishnab Das", mother: "Helan Rani Das", dob: "17-03-2012", admissionDate: "04-04-2023", admissionNo: "04", aadhaar: "4154 5760 6025", phone: "8413815753", caste: "SC" },
  { roll: 17, name: "Bipasa Debnath", father: "Sukumar Debnath", mother: "Ajanta Debnath", dob: "06-03-2012", admissionDate: "03-04-2023", admissionNo: "01", aadhaar: "5545 9602 7127", phone: "", caste: "OBC" },
  { roll: 18, name: "Bishal Biswas", father: "Bhajan Biswas", mother: "Shilpi Biswas", dob: "01-10-2011", admissionDate: "03-07-2023", admissionNo: "70", aadhaar: "9899 0630 3494", phone: "9612828657", caste: "SC" },
  { roll: 19, name: "Debasree Biswas", father: "Sankar Biswas", mother: "Anamika Biswas", dob: "17-01-2012", admissionDate: "08-04-2023", admissionNo: "43", aadhaar: "7536 6544 6038", phone: "6009920098", caste: "SC" },
  { roll: 20, name: "Debisha Nama", father: "Shankar Nama", mother: "Shanta Das (Nama)", dob: "14-02-2012", admissionDate: "26-04-2023", admissionNo: "67", aadhaar: "3121 4293 4309", phone: "6009880927", caste: "SC" },
  { roll: 21, name: "Debojit Das", father: "Dipendra Das", mother: "Sulekha Das", dob: "10-04-2012", admissionDate: "06-04-2023", admissionNo: "32", aadhaar: "5840 4487 0727", phone: "9612958430", caste: "SC" },
  { roll: 22, name: "Diptanu Nama Das", father: "Rajkumar Nama Das", mother: "Nisha Nama Das", dob: "02-08-2012", admissionDate: "04-04-2023", admissionNo: "11", aadhaar: "6993 6362 2626", phone: "7005963263", caste: "SC" },
  { roll: 23, name: "Eshan Chowdhury", father: "Ranjit Chowdhury", mother: "Bina Rani Roy (Chowdhury)", dob: "28-06-2011", admissionDate: "04-04-2023", admissionNo: "10", aadhaar: "9504 3274 8017", phone: "8974680895", caste: "OBC" },
  { roll: 24, name: "Hritika Sarkar", father: "Gopal Sarkar", mother: "Soma Sarkar", dob: "18-10-2011", admissionDate: "05-04-2023", admissionNo: "21", aadhaar: "5457 3504 6447", phone: "9863070617", caste: "SC" },
  { roll: 25, name: "Hriday Das", father: "Urdav Das", mother: "Kabita Bina (Das)", dob: "20-03-2012", admissionDate: "08-04-2023", admissionNo: "44", aadhaar: "2460 6045 1016", phone: "8414846758", caste: "SC" },
  { roll: 26, name: "Jayasree Mandal", father: "Mahadeb Mandal", mother: "Sanchita Subradhar (Mandal)", dob: "25-07-2012", admissionDate: "13-04-2023", admissionNo: "58", aadhaar: "3127 1220 5644", phone: "6033199217", caste: "SC" },
  { roll: 27, name: "Jeet Deb", father: "Jiban Deb", mother: "Swapna Guha (Deb)", dob: "09-02-2012", admissionDate: "08-04-2023", admissionNo: "42", aadhaar: "4270 0859 3115", phone: "7005689693", caste: "UR" },
  { roll: 28, name: "Kuyel Nama", father: "Manik Nama", mother: "Anita Nama", dob: "22-05-2011", admissionDate: "12-04-2023", admissionNo: "54", aadhaar: "4153 8247 5450", phone: "9366526137", caste: "SC" },
  { roll: 29, name: "Lija Deb", father: "", mother: "", dob: "21-02-2012", admissionDate: "", admissionNo: "", aadhaar: "", phone: "", caste: "UR" },
  { roll: 30, name: "Manika Biswas", father: "Gopal Biswas", mother: "Sangita Biswas", dob: "26-12-2011", admissionDate: "10-04-2023", admissionNo: "49", aadhaar: "4113 7423 1401", phone: "8837270164", caste: "SC" },
  { roll: 31, name: "Maanvi Biswas", father: "Bakul Biswas", mother: "Manika Sarkar (Biswas)", dob: "25-01-2012", admissionDate: "04-04-2023", admissionNo: "05", aadhaar: "5776 0705 7349", phone: "8837400631", caste: "SC" },
  { roll: 32, name: "Moon Biswas", father: "Ramananda Biswas", mother: "Shipra Sarkar (Biswas)", dob: "08-05-2012", admissionDate: "06-04-2023", admissionNo: "28", aadhaar: "2953 9644 6106", phone: "9362930629", caste: "SC" },
  { roll: 33, name: "Moon Malakar", father: "Jiban Malakar", mother: "Aparna Malakar", dob: "01-07-2011", admissionDate: "05-04-2023", admissionNo: "19", aadhaar: "3175 2284 3143", phone: "7341829871", caste: "SC" },
  { roll: 34, name: "Papiya Nama", father: "Ranjit Nama", mother: "Kajalrani Biswas (Nama)", dob: "07-05-2012", admissionDate: "08-07-2023", admissionNo: "41", aadhaar: "5636 8991 3030", phone: "8974252845", caste: "SC" },
  { roll: 35, name: "Parmita Das", father: "Paritosh Das", mother: "Soma Paul (Das)", dob: "02-02-2012", admissionDate: "10-04-2023", admissionNo: "47", aadhaar: "6557 3206 0715", phone: "9612823865", caste: "SC" },
  { roll: 36, name: "Payel Das", father: "Tinku Das", mother: "Mona Bala Das", dob: "22-08-2012", admissionDate: "10-04-2023", admissionNo: "45", aadhaar: "5672 1309 8434", phone: "9863660470", caste: "SC" },
  { roll: 37, name: "Preeti Debnath", father: "Sukanta Debnath", mother: "Gita Debnath", dob: "13-10-2011", admissionDate: "04-04-2023", admissionNo: "02", aadhaar: "6591 1038 6017", phone: "7630896318", caste: "OBC" },
  { roll: 38, name: "Rajarshi Biswas", father: "Rajesh Biswas", mother: "Tinku Bhowmik (Biswas)", dob: "12-04-2012", admissionDate: "04-04-2023", admissionNo: "13", aadhaar: "7927 4947 1678", phone: "6009801290", caste: "OBC" },
  { roll: 39, name: "Rima Sarkar", father: "Goutam Sarkar", mother: "Ratna Nama (Sarkar)", dob: "", admissionDate: "", admissionNo: "", aadhaar: "", phone: "", caste: "SC" },
  { roll: 40, name: "Ripa Sarkar", father: "Manoranjan Sarkar", mother: "Sharabi Sarkar", dob: "", admissionDate: "", admissionNo: "", aadhaar: "", phone: "", caste: "SC" },
  { roll: 41, name: "Ritam Das", father: "Litan Das", mother: "Shilpi Rani Das", dob: "11-01-2012", admissionDate: "06-04-2023", admissionNo: "34", aadhaar: "5265 1044 2468", phone: "8131078254", caste: "SC" },
  { roll: 42, name: "Riya Biswas", father: "Bimal Biswas", mother: "Kiran Malakar (Biswas)", dob: "05-02-2012", admissionDate: "06-04-2023", admissionNo: "25", aadhaar: "6971 0476 8290", phone: "8787747058", caste: "SC" },
  { roll: 43, name: "Riya Das", father: "Susanta Das", mother: "Rima Das", dob: "28-10-2011", admissionDate: "06-04-2023", admissionNo: "33", aadhaar: "5514 3568 1853", phone: "8798145436", caste: "SC" },
  { roll: 44, name: "Riya Debroy", father: "Dipak Debroy", mother: "Kajal Debroy", dob: "19-03-2012", admissionDate: "13-04-2023", admissionNo: "57", aadhaar: "2541 9440 0106", phone: "9612879185", caste: "UR" },
  { roll: 45, name: "Riya Debnath", father: "Pradip Debnath", mother: "Namita Debnath", dob: "26-01-2012", admissionDate: "08-04-2023", admissionNo: "37", aadhaar: "8724 0527 3347", phone: "8787536270", caste: "OBC" },
  { roll: 46, name: "Rudra Nandi", father: "Subal Nandi", mother: "Purnima Das (Nandi)", dob: "25-03-2012", admissionDate: "25-04-2023", admissionNo: "65", aadhaar: "2483 3544 7074", phone: "6009922083", caste: "SC" },
  { roll: 47, name: "Ruhan Biswas", father: "Subhash Biswas", mother: "Rekha Biswas", dob: "21-03-2011", admissionDate: "06-04-2023", admissionNo: "29", aadhaar: "4001 3360 8786", phone: "8787565856", caste: "SC" },
  { roll: 48, name: "Rupa Sarkar", father: "Indrajit Sarkar", mother: "Rina Biswas (Sarkar)", dob: "05-09-2012", admissionDate: "05-04-2023", admissionNo: "15", aadhaar: "", phone: "8732824576", caste: "SC" },
  { roll: 49, name: "Sagar Debnath", father: "Brajatosh Debnath", mother: "Mallika Debnath", dob: "06-09-2011", admissionDate: "06-04-2023", admissionNo: "35", aadhaar: "3926 0543 4366", phone: "7630939574", caste: "OBC" },
  { roll: 50, name: "Sajen Biswas", father: "Badal Biswas", mother: "Saraswati Biswas", dob: "05-06-2011", admissionDate: "08-04-2023", admissionNo: "39", aadhaar: "4645 7051 5529", phone: "9366536519", caste: "SC" },
  { roll: 51, name: "Sajib Biswas", father: "Paresh Biswas", mother: "Manasha Biswas", dob: "24-04-2009", admissionDate: "05-05-2023", admissionNo: "22", aadhaar: "5792 5219 7230", phone: "6000604831", caste: "SC" },
  { roll: 52, name: "Sampa Shil", father: "Sudhir Shil", mother: "Ranjana Shil", dob: "13-10-2012", admissionDate: "13-04-2023", admissionNo: "56", aadhaar: "3331 6407 0810", phone: "9863991996", caste: "OBC" },
  { roll: 53, name: "Sandip Gope", father: "Pradip Gope", mother: "Archana Gope", dob: "29-08-2011", admissionDate: "06-04-2023", admissionNo: "28", aadhaar: "", phone: "8837052277", caste: "OBC" },
  { roll: 54, name: "Sandipan Paul", father: "Satish Paul", mother: "Rakhi Paul", dob: "19-11-2011", admissionDate: "10-04-2023", admissionNo: "48", aadhaar: "", phone: "8974863642", caste: "UR" },
  { roll: 55, name: "Sayan Biswas", father: "Late Nikhil Biswas", mother: "Bishnupriya Biswas", dob: "12-05-2011", admissionDate: "24-06-2023", admissionNo: "69", aadhaar: "", phone: "7085491123", caste: "SC" },
  { roll: 56, name: "Sayan Das", father: "T/C", mother: "", dob: "", admissionDate: "", admissionNo: "", aadhaar: "", phone: "", caste: "SC", status: "Transferred" },
  { roll: 57, name: "Sekhar Sarkar", father: "Sefal Sarkar", mother: "Rina Sarkar", dob: "14-04-2012", admissionDate: "04-04-2023", admissionNo: "14", aadhaar: "", phone: "9080271165", caste: "SC" },
  { roll: 58, name: "Shatarupa Das", father: "Tulalal Das", mother: "Shipra Das", dob: "28-12-2011", admissionDate: "17-04-2023", admissionNo: "29", aadhaar: "9329 8910 3881", phone: "7005236464", caste: "SC" },
  { roll: 59, name: "Shreyasi Biswas", father: "Nikhil Biswas", mother: "Nanita Das Biswas", dob: "01-02-2012", admissionDate: "04-04-2023", admissionNo: "06", aadhaar: "", phone: "8119994406", caste: "SC" },
  { roll: 60, name: "Sneha Das", father: "Sadhan Das", mother: "Tanurani Das", dob: "14-09-2011", admissionDate: "05-04-2023", admissionNo: "23", aadhaar: "9837 3725 7357", phone: "9862986272", caste: "SC" },
  { roll: 61, name: "Soumalya Das", father: "Sukanta Das", mother: "Sunika Das", dob: "", admissionDate: "02-05-2024", admissionNo: "76", aadhaar: "", phone: "6909262566", caste: "SC" },
  { roll: 62, name: "Sneha Debnath", father: "Nishi Kumar Debnath", mother: "Sanghita Debnath", dob: "28-08-2011", admissionDate: "25-04-2023", admissionNo: "64", aadhaar: "", phone: "9862776356", caste: "OBC" },
  { roll: 63, name: "Subrata Debnath", father: "Biswajit Debnath", mother: "Kajal Debnath", dob: "16-04-2012", admissionDate: "11-04-2023", admissionNo: "50", aadhaar: "9864 1503 4504", phone: "8798145384", caste: "OBC" },
  { roll: 64, name: "Supradip Das", father: "Ajit Kumar Das", mother: "Sarana Das", dob: "16-10-2011", admissionDate: "04-04-2023", admissionNo: "08", aadhaar: "4631 6478 9006", phone: "8257034223", caste: "SC" },
  { roll: 65, name: "Supriya Debnath", father: "Biswajit Debnath", mother: "Swapna Debnath", dob: "30-01-2012", admissionDate: "06-04-2023", admissionNo: "31", aadhaar: "", phone: "7640850354", caste: "OBC" },
  { roll: 66, name: "Taniya Biswas", father: "Rakesh Biswas", mother: "Supriya Biswas (Nama)", dob: "05-08-2012", admissionDate: "08-04-2023", admissionNo: "38", aadhaar: "8112 9721 1400", phone: "9366576198", caste: "SC" },
  { roll: 67, name: "Tanushri Biswas", father: "Sanjit Biswas", mother: "Rina Sarkar (Biswas)", dob: "14-10-2011", admissionDate: "06-04-2023", admissionNo: "30", aadhaar: "6115 3850 5700", phone: "5862136468", caste: "SC" },
  { roll: 68, name: "Tapash Das", father: "Dipak Das", mother: "Archita Das", dob: "03-11-2011", admissionDate: "14-06-2023", admissionNo: "", aadhaar: "", phone: "9366835003", caste: "SC" },
  { roll: 69, name: "Trisha Das", father: "Pradip Lal Das", mother: "Sanjita Das", dob: "08-10-2011", admissionDate: "28-04-2023", admissionNo: "66", aadhaar: "3177 5565 8672", phone: "7005510933", caste: "SC" },
  { roll: 70, name: "Risma Das", father: "Anjan Das", mother: "Ruma Das", dob: "30-04-2012", admissionDate: "06-04-2026", admissionNo: "01", aadhaar: "6250 2855 8033", phone: "6009957254", caste: "SC" },
  { roll: 71, name: "Rahul Das", father: "Ranjan Das", mother: "Milan Das (Sarkar)", dob: "30-08-2011", admissionDate: "06-04-2026", admissionNo: "02", aadhaar: "3909 3820 7605", phone: "6909939525", caste: "SC" },
  { roll: 72, name: "Sneha Das", father: "Sujan Das", mother: "Mina Sarkar (Das)", dob: "27-06-2011", admissionDate: "06-04-2026", admissionNo: "03", aadhaar: "9515 4873 3415", phone: "9863275785", caste: "SC" },
  { roll: 73, name: "Subham Das", father: "Sujan Das", mother: "Mina Sarkar (Das)", dob: "27-06-2011", admissionDate: "06-04-2026", admissionNo: "04", aadhaar: "9927 9826 6964", phone: "9863275785", caste: "SC" },
  { roll: 74, name: "Jhumjum Sarkar", father: "Krishnadhan Sarkar", mother: "Sabita Sarkar", dob: "15-04-2012", admissionDate: "06-04-2026", admissionNo: "05", aadhaar: "8294 4658 8325", phone: "6009840959", caste: "UR" },
  { roll: 75, name: "Biplab Deb", father: "Bijay Deb", mother: "Rakhi Deb", dob: "23-11-2012", admissionDate: "06-04-2026", admissionNo: "06", aadhaar: "4013 7623 3501", phone: "8787573892", caste: "UR" },
  { roll: 76, name: "Jual Sarkar", father: "Sujit Sarkar", mother: "Suchitra Sarkar", dob: "10-02-2011", admissionDate: "07-04-2026", admissionNo: "07", aadhaar: "3537 6407 8551", phone: "6009770611", caste: "SC" },
  { roll: 77, name: "Sandeep Nama Das", father: "Haralal Nama Das", mother: "Sampa Nama Das", dob: "28-07-2011", admissionDate: "07-04-2026", admissionNo: "08", aadhaar: "8624 2774 2852", phone: "8413979227", caste: "SC" },
  { roll: 78, name: "Bishal Sarkar", father: "Biswajit Sarkar", mother: "Sabita Debnath (Sarkar)", dob: "01-12-2011", admissionDate: "07-04-2026", admissionNo: "09", aadhaar: "8245 4742 7400", phone: "8415032769", caste: "SC" },
  { roll: 79, name: "Rajdeep Biswas", father: "Dwijaraj Biswas", mother: "Sayanti Namadas (Biswas)", dob: "12-01-2012", admissionDate: "07-04-2026", admissionNo: "10", aadhaar: "8186 7954 0355", phone: "6009890165", caste: "SC" },
  { roll: 80, name: "Debajit Sarkar", father: "Harimangal Sarkar", mother: "Nirmala Sarkar", dob: "23-10-2011", admissionDate: "08-04-2026", admissionNo: "11", aadhaar: "8195 2545 8299", phone: "9862790948", caste: "SC" },
  { roll: 81, name: "Mayori Das", father: "Ratan Das", mother: "Shikha Das", dob: "25-10-2012", admissionDate: "09-04-2026", admissionNo: "12", aadhaar: "2050 4633 0465", phone: "6909273804", caste: "SC" },
  { roll: 82, name: "Bijoya Das", father: "Bikash Das", mother: "Pranati Mitra (Das)", dob: "03-08-2012", admissionDate: "10-04-2026", admissionNo: "13", aadhaar: "5704 2225 6970", phone: "9366271956", caste: "SC" },
  { roll: 83, name: "Rohit Das", father: "Rakesh Das", mother: "Ruma Das", dob: "15-03-2012", admissionDate: "10-04-2026", admissionNo: "14", aadhaar: "4036 4265 3165", phone: "9366809963", caste: "SC" },
  { roll: 84, name: "Rajdeep Ghosh", father: "Rajesh Ghosh", mother: "Shipra Ghosh", dob: "14-08-2011", admissionDate: "13-04-2026", admissionNo: "15", aadhaar: "5070 2624 4477", phone: "8132836570", caste: "UR" },
  { roll: 85, name: "Nayan Debnath", father: "Nakul Debnath", mother: "Pranati Debnath", dob: "12-04-2012", admissionDate: "16-04-2026", admissionNo: "16", aadhaar: "3264 3660 4728", phone: "7629806761", caste: "OBC" },
  { roll: 86, name: "Amit Das", father: "Animesh Das", mother: "Uma Das", dob: "27-03-2012", admissionDate: "16-04-2026", admissionNo: "17", aadhaar: "9836 4573 3097", phone: "6009319126", caste: "SC" },
  { roll: 87, name: "Nayan Biswas", father: "Litan Biswas", mother: "Julan Mallik", dob: "14-06-2011", admissionDate: "16-04-2026", admissionNo: "18", aadhaar: "8522 4396 2566", phone: "8414052071", caste: "SC" },
  { roll: 88, name: "Barsha Das", father: "Manik Das", mother: "Karan Biswas (Das)", dob: "19-09-2012", admissionDate: "23-04-2026", admissionNo: "19", aadhaar: "4385 7789 7315", phone: "9862151084", caste: "SC" },
  { roll: 89, name: "Ritika Debnath", father: "Kshirmohan Debnath", mother: "Champa Debnath", dob: "15-02-2012", admissionDate: "24-04-2026", admissionNo: "20", aadhaar: "7166 3564 4788", phone: "7005672715", caste: "OBC" },
  { roll: 90, name: "Pritam Das", father: "Mithun Das", mother: "Pranati Das", dob: "08-06-2011", admissionDate: "15-05-2026", admissionNo: "21", aadhaar: "5931 8332 5178", phone: "6009641767", caste: "SC" },
  { roll: 91, name: "Diya Debroy", father: "Brajalal Debroy", mother: "Shilpi Ghosh Deb Roy", dob: "14-12-2011", admissionDate: "16-05-2026", admissionNo: "22", aadhaar: "3053 6856 6975", phone: "8837449287", caste: "UR" },
  { roll: 92, name: "Arghyadwip Das", father: "Rajesh Ch. Das", mother: "Sangita Lodh (Das)", dob: "27-11-2011", admissionDate: "12-06-2026", admissionNo: "23", aadhaar: "4195 3238 1001", phone: "7630090358", caste: "SC" }
];

async function applyClass9Updates() {
  if (!MONGO_URI) {
    console.error('MONGO_URI not found in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to MongoDB Atlas: "${mongoose.connection.name}"`);

    let updatedCount = 0;

    for (const item of class9SpreadsheetData) {
      const rollNum = item.roll;
      const rollStr = String(rollNum).padStart(2, '0');

      let student = await Student.findOne({ classId: 'class-9', rollNumber: rollNum });
      if (!student) {
        student = await Student.findOne({ classId: 'class-9', roll: rollStr });
      }

      if (!student) {
        console.warn(`[WARNING] Student roll ${rollNum} not found in DB! Creating new...`);
        student = new Student({
          studentId: `PMS-26-09-${rollStr}`,
          roll: rollStr,
          rollNumber: rollNum,
          name: item.name,
          classId: 'class-9',
          className: 'Class IX',
          gender: 'Boy',
          academicYear: '2026-2027',
          status: item.status || 'Enrolled'
        });
      }

      // Update name
      if (item.name) student.name = item.name.trim();

      // Update father & mother
      student.father = item.father ? item.father.trim() : (student.father || '');
      student.mother = item.mother ? item.mother.trim() : (student.mother || '');

      // Guardian
      if (item.father && item.father.toUpperCase() === 'T/C') {
        student.guardian = 'T/C';
      } else {
        student.guardian = student.father || student.mother || student.guardian || '';
      }

      // Date of Birth
      if (item.dob) student.dob = item.dob.trim();

      // Admission Date & Number
      if (item.admissionDate) student.admissionDate = item.admissionDate.trim();
      if (item.admissionNo) student.admissionNo = item.admissionNo.trim();

      // Caste
      if (item.caste) student.caste = item.caste.trim();

      // Aadhaar
      if (item.aadhaar !== undefined && item.aadhaar !== '') {
        student.aadhaar = item.aadhaar.trim();
      }

      // Phone
      if (item.phone) {
        student.phone = item.phone.trim();
      }

      // Status
      if (item.status) {
        student.status = item.status;
      } else if (student.father && student.father.toUpperCase() === 'T/C') {
        student.status = 'Transferred';
      }

      await student.save();
      updatedCount++;
      console.log(`[UPDATED] Roll ${rollStr}: ${student.name.padEnd(22, ' ')} | AdmNo: ${(student.admissionNo || '-').padEnd(6, ' ')} | Caste: ${(student.caste || '-').padEnd(5, ' ')} | Status: ${(student.status || 'Enrolled').padEnd(12, ' ')} | Aadhaar: ${(student.aadhaar || '-').padEnd(16, ' ')} | Ph: ${student.phone || '-'}`);
    }

    console.log(`\nSuccessfully applied spreadsheet updates to all ${updatedCount} Class IX students.`);

    // Summary of Class 9
    const totalInDB = await Student.countDocuments({ classId: 'class-9' });
    const transferredCount = await Student.countDocuments({ classId: 'class-9', status: 'Transferred' });
    const enrolledCount = await Student.countDocuments({ classId: 'class-9', status: 'Enrolled' });
    console.log(`Total Class IX students in DB: ${totalInDB} (${enrolledCount} Enrolled, ${transferredCount} Transferred)`);

    await mongoose.disconnect();
    console.log('Database disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error('Error applying Class 9 updates:', err);
    process.exit(1);
  }
}

applyClass9Updates();
