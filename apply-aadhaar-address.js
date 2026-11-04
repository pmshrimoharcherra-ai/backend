import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Exact roll-to-data mapping determined by student name & roll matching
export const class9AadhaarAddressUpdates = [
  { roll: 2, name: "Akash Debnath", aadhaar: "4025 8387 1929", address: "Kamalnagar, Moharcherra" },
  { roll: 3, name: "Alomoy Sarkar", aadhaar: "7120 0640 8850", address: "Moharcherra" },
  { roll: 4, name: "Ananya Biswas", aadhaar: "3343 9845 8625", address: "Kamalnagar, Moharcherra" },
  { roll: 5, name: "Anikesh Roy", aadhaar: "7115 4035 5510", address: "Moharcherra" },
  { roll: 6, name: "Ankita Biswas", aadhaar: "3423 5614 4791", address: "Moharcherra" },
  { roll: 7, name: "Ankita Rani Sarkar", aadhaar: "9886 7077 7198", address: "Moharcherra" },
  { roll: 8, name: "Ankurjit Das", aadhaar: "8216 7652 7080", address: "Laltilla" },
  { roll: 9, name: "Anmita Das", aadhaar: "6955 8062 1306", address: "Moharcherra" },
  { roll: 10, name: "Arpan Debnath", aadhaar: "8469 2420 3861", address: "Kamalnagar, Moharcherra" },
  { roll: 11, name: "Arpita Das", aadhaar: "6567 0580 3501", address: "Moharcherra" },
  { roll: 12, name: "Baishaki Das", aadhaar: "2345 2578 8278", address: "Kamalnagar, Moharcherra" },
  { roll: 13, name: "Barnali Debnath", aadhaar: "8231 7220 4771", address: "Moharcherra" },
  { roll: 14, name: "Barsha Sarkar", aadhaar: "8839 7597 3607", address: "Kamalnagar, Moharcherra" },
  { roll: 15, name: "Bijoy Biswas", aadhaar: "7318 5165 2177", address: "Kamalnagar, Moharcherra" },
  { roll: 16, name: "Binoy Das", aadhaar: "4154 5761 6095", address: "Kalyanpur" },
  { roll: 17, name: "Bipasa Debnath", aadhaar: "9545 9602 7127", address: "Moharcherra" },
  { roll: 18, name: "Bishal Biswas", aadhaar: "9899 0630 3494", address: "Moharcherra" },
  { roll: 19, name: "Debasree Biswas", aadhaar: "7536 6544 6038", address: "Moharcherra" },
  { roll: 20, name: "Debisha Nama", aadhaar: "3121 4293 4309", address: "Kamalnagar, Moharcherra" },
  { roll: 21, name: "Debojit Das", aadhaar: "5840 4487 0727", address: "Moharcherra" },
  { roll: 22, name: "Diptanu Nama Das", aadhaar: "6993 6362 2626", address: "Moharcherra" },
  { roll: 23, name: "Eshan Chowdhury", aadhaar: "9504 3274 8017", address: "Moharcherra" },
  { roll: 24, name: "Hritika Sarkar", aadhaar: "5457 3504 6447", address: "Moharcherra" },
  { roll: 26, name: "Jayasree Mandal", aadhaar: "3127 1220 5644", address: "Moharcherra" },
  { roll: 27, name: "Jeet Deb", aadhaar: "4270 9859 3115", address: "Moharcherra" },
  { roll: 28, name: "Kuyel Nama", aadhaar: "4153 8247 5450", address: "Moharcherra" },
  { roll: 29, name: "Lija Deb", aadhaar: "3191 3088 1143", address: "Moharcherra" },
  { roll: 30, name: "Manika Biswas", aadhaar: "4113 7423 1401", address: "Moharcherra" },
  { roll: 31, name: "Maanvi Biswas", aadhaar: "5776 0705 7349", address: "Moharcherra" },
  { roll: 32, name: "Moon Biswas", aadhaar: "2953 9644 6106", address: "Moharcherra" },
  { roll: 33, name: "Moon Malakar", aadhaar: "3175 2284 3143", address: "Moharcherra" },
  { roll: 34, name: "Papiya Nama", aadhaar: "5636 8991 3030", address: "Moharcherra" },
  { roll: 35, name: "Parmita Das", aadhaar: "6557 3206 0715", address: "Moharcherra" },
  { roll: 36, name: "Payel Das", aadhaar: "5672 1909 8434", address: "Amarpur" },
  { roll: 37, name: "Preeti Debnath", aadhaar: "6591 1038 6017", address: "Moharcherra" },
  { roll: 38, name: "Rajarshi Biswas", aadhaar: "7927 4947 1678", address: "Kamalnagar, Moharcherra" },
  { roll: 40, name: "Ripa Sarkar", aadhaar: "8407 4622 3538", address: "Moharcherra" },
  { roll: 41, name: "Ritam Das", aadhaar: "5265 1044 2468", address: "" },
  { roll: 42, name: "Riya Biswas", aadhaar: "6971 0476 8290", address: "Moharcherra" },
  { roll: 43, name: "Riya Das", aadhaar: "5514 3568 1853", address: "Moharcherra" },
  { roll: 44, name: "Riya Debroy", aadhaar: "2541 9440 0106", address: "Moharcherra" },
  { roll: 45, name: "Riya Debnath", aadhaar: "8724 0527 3347", address: "Moharcherra" },
  { roll: 46, name: "Rudra Nandi", aadhaar: "2483 3544 7074", address: "Moharcherra" },
  { roll: 47, name: "Ruhan Biswas", aadhaar: "4001 3369 8786", address: "Moharcherra" },
  { roll: 48, name: "Rupa Sarkar", aadhaar: "6411 3660 6040", address: "Moharcherra" },
  { roll: 49, name: "Sagar Debnath", aadhaar: "3926 0543 4369", address: "Moharcherra" },
  { roll: 51, name: "Sajib Biswas", aadhaar: "5792 9219 7230", address: "Kamalnagar" },
  { roll: 52, name: "Sampa Shil", aadhaar: "3331 6407 0810", address: "Moharcherra" },
  { roll: 53, name: "Sandip Gope", aadhaar: "4457 5924 0622", address: "Moharcherra" },
  { roll: 54, name: "Sandipan Paul", aadhaar: "3544 6893 6546", address: "Moharcherra" },
  { roll: 55, name: "Sayan Biswas", aadhaar: "7808 8150 5469", address: "Moharcherra" },
  { roll: 57, name: "Sekhar Sarkar", aadhaar: "8435 1330 4912", address: "Moharcherra" },
  { roll: 58, name: "Shatarupa Das", aadhaar: "9329 8910 3881", address: "Moharcherra" },
  { roll: 59, name: "Shreyasi Biswas", aadhaar: "7115 5851 9652", address: "Moharcherra" },
  { roll: 60, name: "Sneha Das", aadhaar: "9837 3725 7357", address: "Moharcherra" },
  { roll: 61, name: "Soumalya Das", aadhaar: "6230 9658 4984", address: "Moharcherra" },
  { roll: 62, name: "Sneha Debnath", aadhaar: "8013 4281 7810", address: "Moharcherra" },
  { roll: 64, name: "Supradip Das", aadhaar: "4631 6478 9006", address: "Moharcherra" },
  { roll: 65, name: "Supriya Debnath", aadhaar: "5188 7966 5895", address: "Moharcherra" },
  { roll: 66, name: "Taniya Biswas", aadhaar: "8112 9121 1400", address: "Moharcherra" },
  { roll: 67, name: "Tanushri Biswas", aadhaar: "6115 3850 5700", address: "Moharcherra" },
  { roll: 70, name: "Risma Das", aadhaar: "6250 2855 8033", address: "Kamalnagar, Moharcherra" },
  { roll: 72, name: "Sneha Das", aadhaar: "9515 4873 3415", address: "Kamalnagar, Moharcherra" },
  { roll: 73, name: "Subham Das", aadhaar: "9927 9826 6964", address: "Kamalnagar, Moharcherra" },
  { roll: 74, name: "Jhumjum Sarkar", aadhaar: "8294 4658 8325", address: "Moharcherra" },
  { roll: 75, name: "Biplab Deb", aadhaar: "4013 7623 3501", address: "Moharcherra" },
  { roll: 77, name: "Sandeep Nama Das", aadhaar: "8624 2774 2852", address: "Champlai, Teliamura" },
  { roll: 78, name: "Bishal Sarkar", aadhaar: "8245 4742 7400", address: "Champlai. Madhya Krishnapur, Teliamura" },
  { roll: 80, name: "Debajit Sarkar", aadhaar: "8195 2545 8299", address: "Krishnapur, Teliamura" },
  { roll: 81, name: "Mayori Das", aadhaar: "2050 4633 0465", address: "Moharcherra" },
  { roll: 82, name: "Bijoya Das", aadhaar: "5704 2225 6970", address: "Kamalnagar" },
  { roll: 84, name: "Rajdeep Ghosh", aadhaar: "5079 2624 4477", address: "Kamalnagar" },
  { roll: 85, name: "Nayan Debnath", aadhaar: "3264 3660 4728", address: "Vill-Champlai, PO-Maiganga, Teliamura" },
  { roll: 88, name: "Barsha Das", aadhaar: "4385 7789 7315", address: "Champak Nagar" },
  { roll: 89, name: "Ritika Debnath", aadhaar: "7166 3564 4788", address: "Moharcherra" },
  { roll: 90, name: "Pritam Das", aadhaar: "5931 8332 5178", address: "Moharcherra" },
  { roll: 91, name: "Diya Debroy", aadhaar: "3053 6856 6975", address: "Moharcherra" },
  { roll: 92, name: "Arghyadwip Das", aadhaar: "4195 3238 1001", address: "Moharcherra" },
  { roll: 93, name: "Dritiman Debnath", aadhaar: "2170 4298 0214", address: "Uttar Kamal Nagar" },
  { roll: 95, name: "Aheli Das", aadhaar: "4023 9731 6862", address: "Moharcherra" }
];

async function applyAadhaarAndAddress() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to MongoDB Atlas: "${mongoose.connection.name}"`);

    let updatedCount = 0;
    for (const item of class9AadhaarAddressUpdates) {
      const rollNum = item.roll;
      const rollStr = String(rollNum).padStart(2, '0');

      let student = await Student.findOne({ classId: 'class-9', rollNumber: rollNum });
      if (!student) {
        student = await Student.findOne({ classId: 'class-9', roll: rollStr });
      }

      if (!student) {
        console.warn(`[WARNING] Student roll ${rollNum} not found!`);
        continue;
      }

      let changed = false;

      // Update Aadhaar
      if (item.aadhaar && (!student.aadhaar || student.aadhaar.trim() !== item.aadhaar.trim())) {
        student.aadhaar = item.aadhaar.trim();
        changed = true;
      }

      // Update Address
      if (item.address && (!student.address || student.address.trim() !== item.address.trim())) {
        student.address = item.address.trim();
        changed = true;
      }

      if (changed) {
        await student.save();
        updatedCount++;
        console.log(`[UPDATED] Roll ${rollStr} (${student.name}): Aadhaar: "${student.aadhaar}" | Address: "${student.address}"`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} Class 9 students in MongoDB.`);

    // Check Class 9 Aadhaar coverage now
    const totalClass9 = await Student.countDocuments({ classId: 'class-9' });
    const withAadhaar = await Student.countDocuments({
      classId: 'class-9',
      aadhaar: { $exists: true, $ne: '', $regex: /\d{4}\s\d{4}\s\d{4}/ }
    });
    const withAddress = await Student.countDocuments({
      classId: 'class-9',
      address: { $exists: true, $ne: '' }
    });

    console.log(`Class 9 Aadhaar Verified: ${withAadhaar}/${totalClass9}`);
    console.log(`Class 9 Address Populated: ${withAddress}/${totalClass9}`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  } catch (err) {
    console.error('Error applying updates:', err);
    process.exit(1);
  }
}

applyAadhaarAndAddress();
