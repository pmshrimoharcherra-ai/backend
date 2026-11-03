import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const sciDetails = [
  {
    roll: 1,
    rollStr: '01',
    name: 'Alak Das',
    gender: 'Boy',
    dob: '20-03-2009',
    father: 'Abinash Chandra Das',
    mother: 'Bina Das',
    guardian: 'Abinash Chandra Das',
    admissionDate: '14-06-2025',
    admissionNo: 'SC-04',
    aadhaar: '5218 3828 5191',
    address: 'Kamalnagar, Moharchera, KLP',
    caste: 'SC',
    phone: '8415085916',
    enrollmentNo: '31202508149',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Biology', 'Mathematics']
  },
  {
    roll: 2,
    rollStr: '02',
    name: 'Arpita Debnath',
    gender: 'Girl',
    dob: '23-02-2010',
    father: 'Nishi Kr. Debnath',
    mother: 'Sanghita Debnath',
    guardian: 'Nishi Kr. Debnath',
    admissionDate: '13-06-2025',
    admissionNo: 'SC-03',
    aadhaar: '4791 9699 4197',
    address: 'Uttar Kamalnagar, Moharchera',
    caste: 'OBC',
    phone: '9863079228',
    enrollmentNo: '32202508128',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Biology', 'IT/ITeS']
  },
  {
    roll: 3,
    rollStr: '03',
    name: 'Tanushree Das',
    gender: 'Girl',
    dob: '27-09-2008',
    father: 'Nirmal Das',
    mother: 'Pinki Das',
    guardian: 'Nirmal Das',
    admissionDate: '14-06-2025',
    admissionNo: 'SC-05',
    aadhaar: '9857 6697 2776',
    address: 'Moharchera',
    caste: 'SC',
    phone: '8787430360',
    enrollmentNo: '32202508139',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Mathematics']
  },
  {
    roll: 4,
    rollStr: '04',
    name: 'Puja Paul',
    gender: 'Girl',
    dob: '28-11-2008',
    father: 'Tapan Paul',
    mother: 'Parna Deb Paul',
    guardian: 'Tapan Paul',
    admissionDate: '13-06-2025',
    admissionNo: 'SC-02',
    aadhaar: '2253 7771 7686',
    address: 'Kalyanpur',
    caste: 'General',
    phone: '9366553021',
    enrollmentNo: '32202500432',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Biology', 'IT/ITeS']
  },
  {
    roll: 5,
    rollStr: '05',
    name: 'Priyanka Debnath',
    gender: 'Girl',
    dob: '14-01-2009',
    father: 'Ashish Debnath',
    mother: 'Mahamaya Debnath',
    guardian: 'Ashish Debnath',
    admissionDate: '01-07-2025',
    admissionNo: 'SC-06',
    aadhaar: '2400 8705 3348',
    address: 'Ghilatali, KLP',
    caste: 'OBC',
    phone: '9366616291',
    enrollmentNo: '32202500437',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Mathematics']
  },
  {
    roll: 6,
    rollStr: '06',
    name: 'Anupa Ghosh',
    gender: 'Girl',
    dob: '18-08-2008',
    father: 'Banchit Ghosh',
    mother: 'Santana Ghosh',
    guardian: 'Banchit Ghosh',
    admissionDate: '13-06-2025',
    admissionNo: 'SC-01',
    aadhaar: '9605 6073 9095',
    address: 'Kalyanpur',
    caste: 'OBC',
    phone: '8415073045',
    enrollmentNo: '32202500436',
    enrollmentYear: '2025',
    registrationYear: '2023',
    subjects: ['Bengali', 'English', 'Physics', 'Chemistry', 'Biology', 'IT/ITeS']
  }
];

async function updateClass12Science() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: "${mongoose.connection.name}"`);

    for (const item of sciDetails) {
      const studentId = `PMS-24-12S-${item.rollStr}`;
      const updated = await Student.findOneAndUpdate(
        { classId: 'class-12-sci', rollNumber: item.roll },
        {
          $set: {
            studentId,
            roll: item.rollStr,
            rollNumber: item.roll,
            name: item.name,
            classId: 'class-12-sci',
            className: 'Class XII (Science)',
            gender: item.gender,
            dob: item.dob,
            father: item.father,
            mother: item.mother,
            guardian: item.guardian,
            admissionDate: item.admissionDate,
            admissionNo: item.admissionNo,
            aadhaar: item.aadhaar,
            address: item.address,
            caste: item.caste,
            phone: item.phone,
            enrollmentNo: item.enrollmentNo,
            enrollmentYear: item.enrollmentYear,
            registrationYear: item.registrationYear,
            subjects: item.subjects,
            academicYear: '2026-2027',
            status: 'Enrolled',
            attendance: '95%'
          }
        },
        { upsert: true, new: true }
      );
      console.log(`Updated Roll ${updated.roll}: ${updated.name} (DOB: ${updated.dob}, Reg No: ${updated.enrollmentNo})`);
    }

    console.log('Successfully updated all 6 Class XII Science students!');
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error updating Class 12 Science:', err);
    process.exit(1);
  }
}

updateClass12Science();
