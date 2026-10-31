import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Student from '../models/Student.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const class8Data = [
  { roll: 1, caste: 'UR', admissionNo: '24', admissionDate: '05/04/2024' },
  { roll: 2, caste: 'OBC', admissionNo: '22', admissionDate: '05/04/2024' },
  { roll: 3, caste: 'SC', admissionNo: '20', admissionDate: '03/04/2024' },
  { roll: 4, caste: 'OBC', admissionNo: '30', admissionDate: '08/04/2024' },
  { roll: 5, caste: '', admissionNo: '15', admissionDate: '05/04/2024' },
  { roll: 6, caste: '', admissionNo: '58', admissionDate: '12/04/2024' },
  { roll: 7, caste: 'SC', admissionNo: '27', admissionDate: '06/04/2024' },
  { roll: 8, caste: 'SC', admissionNo: '45', admissionDate: '03/04/2024' },
  { roll: 9, caste: '', admissionNo: '36', admissionDate: '08/04/2024' },
  { roll: 10, caste: '', admissionNo: '28', admissionDate: '06/04/2024' },
  { roll: 11, caste: '', admissionNo: '38', admissionDate: '08/04/2024' },
  { roll: 12, caste: 'SC', admissionNo: '62', admissionDate: '15/04/2024' },
  { roll: 13, caste: 'SC', admissionNo: '11', admissionDate: '09/04/2024' },
  { roll: 14, caste: 'SC', admissionNo: '66', admissionDate: '16/04/2024' },
  { roll: 15, caste: 'SC', admissionNo: '67', admissionDate: '16/04/2024' },
  { roll: 16, caste: 'SC', admissionNo: '63', admissionDate: '16/04/2024' },
  { roll: 17, caste: 'SC', admissionNo: '32', admissionDate: '05/04/2024' },
  { roll: 18, caste: 'SC', admissionNo: '71', admissionDate: '23/04/2024' },
  { roll: 19, caste: 'SC', admissionNo: '25', admissionDate: '06/04/2024' },
  { roll: 20, caste: '', admissionNo: '47', admissionDate: '09/04/2024' },
  { roll: 21, caste: 'SC', admissionNo: '13', admissionDate: '09/04/2024' },
  { roll: 22, caste: '', admissionNo: '59', admissionDate: '12/04/2024' },
  { roll: 23, caste: 'SC', admissionNo: '70', admissionDate: '19/04/2024' },
  { roll: 24, caste: '', admissionNo: '42', admissionDate: '08/04/2024' },
  { roll: 25, caste: '', admissionNo: '16', admissionDate: '05/04/2024' },
  { roll: 26, caste: 'SC', admissionNo: '50', admissionDate: '10/04/2024' },
  { roll: 27, caste: 'OBC', admissionNo: '4', admissionDate: '02/04/2024' },
  { roll: 28, caste: 'SC', admissionNo: '35', admissionDate: '08/04/2024' },
  { roll: 29, caste: 'OBC', admissionNo: '2', admissionDate: '02/04/2024' },
  { roll: 30, caste: 'SC', admissionNo: '', admissionDate: '' },
  { roll: 31, caste: 'SC', admissionNo: '43', admissionDate: '09/04/2024' },
  { roll: 32, caste: 'OBC', admissionNo: '3', admissionDate: '02/04/2024' },
  { roll: 33, caste: 'SC', admissionNo: '37', admissionDate: '08/04/2024' },
  { roll: 34, caste: 'SC', admissionNo: '29', admissionDate: '08/04/2024' },
  { roll: 35, caste: '', admissionNo: '31', admissionDate: '08/04/2024' },
  { roll: 36, caste: '', admissionNo: '40', admissionDate: '08/04/2024' },
  { roll: 37, caste: 'SC', admissionNo: '14', admissionDate: '05/04/2024' },
  { roll: 38, caste: '', admissionNo: '57', admissionDate: '10/04/2024' },
  { roll: 39, caste: 'SC', admissionNo: '19', admissionDate: '05/04/2024' },
  { roll: 40, caste: 'OBC', admissionNo: '60', admissionDate: '15/04/2024' },
  { roll: 41, caste: 'SC', admissionNo: '68', admissionDate: '17/04/2024' },
  { roll: 42, caste: 'OBC', admissionNo: '5', admissionDate: '02/04/2024' },
  { roll: 43, caste: 'OBC', admissionNo: '37', admissionDate: '08/04/2024' },
  { roll: 44, caste: '', admissionNo: '26', admissionDate: '06/04/2024' },
  { roll: 45, caste: '', admissionNo: '53', admissionDate: '10/04/2024' },
  { roll: 46, caste: 'SC', admissionNo: '64', admissionDate: '16/04/2024' },
  { roll: 47, caste: '', admissionNo: '21', admissionDate: '05/04/2024' },
  { roll: 48, caste: 'SC', admissionNo: '23', admissionDate: '05/04/2024' },
  { roll: 49, caste: 'SC', admissionNo: '7', admissionDate: '03/04/2024' },
  { roll: 50, caste: 'SC', admissionNo: '44', admissionDate: '09/04/2024' },
  { roll: 51, caste: '', admissionNo: '49', admissionDate: '10/04/2024' },
  { roll: 52, caste: 'SC', admissionNo: '51', admissionDate: '10/04/2024' },
  { roll: 53, caste: '', admissionNo: '48', admissionDate: '09/04/2024' },
  { roll: 54, caste: 'SC', admissionNo: '39', admissionDate: '08/04/2024' },
  { roll: 55, caste: 'OBC', admissionNo: '6', admissionDate: '02/04/2024' },
  { roll: 56, caste: '', admissionNo: '55', admissionDate: '10/04/2024' },
  { roll: 57, caste: 'OBC', admissionNo: '8', admissionDate: '03/04/2024' },
  { roll: 58, caste: 'SC', admissionNo: '69', admissionDate: '12/04/2024' },
  { roll: 59, caste: 'SC', admissionNo: '34', admissionDate: '08/04/2024' },
  { roll: 60, caste: 'OBC', admissionNo: '65', admissionDate: '16/04/2024' },
  { roll: 61, caste: 'OBC', admissionNo: '12', admissionDate: '03/04/2024' },
  { roll: 62, caste: 'OBC', admissionNo: '17', admissionDate: '05/04/2024' },
  { roll: 63, caste: 'SC', admissionNo: '13', admissionDate: '05/04/2024' },
  { roll: 64, caste: '', admissionNo: '', admissionDate: '' },
  { roll: 65, caste: 'SC', admissionNo: '54', admissionDate: '10/04/2024' },
  { roll: 66, caste: 'SC', admissionNo: '41', admissionDate: '08/04/2024' },
  { roll: 67, caste: 'SC', admissionNo: '18', admissionDate: '05/04/2024' },
  { roll: 68, caste: '', admissionNo: '52', admissionDate: '10/04/2024' },
  { roll: 69, caste: 'SC', admissionNo: '73', admissionDate: '03/05/2024' },
  { roll: 70, caste: 'OBC', admissionNo: '', admissionDate: '17/04/2025' },
  { roll: 71, caste: '', admissionNo: '1', admissionDate: '02/04/2024' },
];

async function updateClass8() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

    let updatedCount = 0;

    for (const item of class8Data) {
      const rollStr = String(item.roll).padStart(2, '0');
      const rollNum = item.roll;

      const updateFields = {
        caste: item.caste,
        admissionNo: item.admissionNo,
        admissionDate: item.admissionDate,
      };

      const result = await Student.findOneAndUpdate(
        {
          classId: 'class-8',
          $or: [
            { roll: rollStr },
            { roll: String(rollNum) },
            { rollNumber: rollNum },
            { studentId: `PMS-26-08-${rollStr}` }
          ]
        },
        { $set: updateFields },
        { new: true }
      );

      if (result) {
        updatedCount++;
        console.log(`Updated Roll #${rollStr} (${result.name}): Caste="${result.caste}", AdmNo="${result.admissionNo}", AdmDate="${result.admissionDate}"`);
      } else {
        console.warn(`Could not find student for Roll #${rollStr} in Class VIII`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} of ${class8Data.length} students in Class VIII.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

updateClass8();
