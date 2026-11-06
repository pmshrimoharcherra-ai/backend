import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const artsData = [
  { roll: 1, name: "Tapas Biswas", gender: "Boy", caste: "SC" },
  { roll: 2, name: "Mandira Das", gender: "Girl", caste: "SC" },
  { roll: 3, name: "Ankita Das", gender: "Girl", caste: "SC" },
  { roll: 4, name: "Kishan Das", gender: "Boy", caste: "SC" },
  { roll: 5, name: "Priti Das", gender: "Girl", caste: "SC" },
  { roll: 6, name: "Nandita Sarkar", gender: "Girl", caste: "SC" },
  { roll: 7, name: "Susmita Das", gender: "Girl", caste: "SC" },
  { roll: 8, name: "Hritika Das", gender: "Girl", caste: "SC" },
  { roll: 9, name: "Trishna Sarkar", gender: "Girl", caste: "SC" },
  { roll: 10, name: "Jwel Sarkar", gender: "Boy", caste: "SC" },
  { roll: 11, name: "Gopal Gope", gender: "Boy", caste: "OBC" },
  { roll: 12, name: "Krishnandu Sarkar", gender: "Boy", caste: "SC" },
  { roll: 13, name: "Susmita Biswas", gender: "Girl", caste: "SC" },
  { roll: 14, name: "Sonali Das", gender: "Girl", caste: "SC" },
  { roll: 15, name: "Bidyasree Das", gender: "Girl", caste: "SC" },
  { roll: 16, name: "Abhijit Biswas", gender: "Boy", caste: "SC" },
  { roll: 17, name: "Subham Das", gender: "Boy", caste: "SC" },
  { roll: 18, name: "Joydip Dhar", gender: "Boy", caste: "SC" },
  { roll: 19, name: "Subham Das", gender: "Boy", caste: "SC" },
  { roll: 20, name: "Sumit Biswas", gender: "Boy", caste: "SC" },
  { roll: 21, name: "Swastika Das", gender: "Girl", caste: "SC" },
  { roll: 22, name: "Anamika Biswas", gender: "Girl", caste: "SC" },
  { roll: 23, name: "Puja Nama", gender: "Girl", caste: "SC" },
  { roll: 24, name: "Niloy Debnath", gender: "Boy", caste: "OBC" },
  { roll: 25, name: "Sourabi Mandal", gender: "Girl", caste: "SC" },
  { roll: 26, name: "Samarjit Choudhury", gender: "Boy", caste: "UR" },
  { roll: 27, name: "Joyeta Debnath", gender: "Girl", caste: "OBC" },
  { roll: 28, name: "Suparna Debnath", gender: "Girl", caste: "OBC" },
  { roll: 29, name: "Anu Priya Debnath", gender: "Girl", caste: "OBC" },
  { roll: 30, name: "Sagarika Biswas", gender: "Girl", caste: "SC" },
  { roll: 31, name: "Krish Kumar Nama", gender: "Boy", caste: "SC" },
  { roll: 32, name: "Sudipta Das", gender: "Girl", caste: "SC" },
  { roll: 33, name: "Subhajit Das", gender: "Boy", caste: "SC" },
  { roll: 34, name: "Barsha Das", gender: "Girl", caste: "SC" },
  { roll: 35, name: "Jayasree Debnath", gender: "Girl", caste: "OBC" },
  { roll: 36, name: "Priya Nandi", gender: "Girl", caste: "UR" },
  { roll: 37, name: "Supriya Das", gender: "Girl", caste: "SC" },
  { roll: 38, name: "Mandira Das", gender: "Girl", caste: "SC" },
  { roll: 39, name: "Dipa Biswas", gender: "Girl", caste: "SC" },
  { roll: 40, name: "Nayan Nandi", gender: "Boy", caste: "UR" },
  { roll: 41, name: "Pranjit Das", gender: "Boy", caste: "SC" },
  { roll: 42, name: "Rupesh Sarkar", gender: "Boy", caste: "SC" },
  { roll: 43, name: "Rima Rani Das", gender: "Girl", caste: "SC" },
  { roll: 44, name: "Alpana Das", gender: "Girl", caste: "SC" },
  { roll: 45, name: "Mandira Debnath", gender: "Girl", caste: "OBC" },
  { roll: 46, name: "Riya Nama", gender: "Girl", caste: "SC" },
  { roll: 47, name: "Jayasree Gope", gender: "Girl", caste: "OBC" },
  { roll: 48, name: "Anusmita Sharma", gender: "Girl", caste: "UR" },
  { roll: 49, name: "Pritam Sarkar", gender: "Boy", caste: "SC" },
  { roll: 50, name: "Sukla Barma", gender: "Girl", caste: "SC" },
  { roll: 51, name: "Nayan Sarkar", gender: "Boy", caste: "SC" },
  { roll: 52, name: "Sagarika Das", gender: "Girl", caste: "SC" },
  { roll: 53, name: "Bristi Barman", gender: "Girl", caste: "SC" },
  { roll: 54, name: "Puja Rani Paul", gender: "Girl", caste: "OBC" },
  { roll: 55, name: "Chiranjit Barma", gender: "Boy", caste: "SC" },
  { roll: 56, name: "Subhajit Shil", gender: "Boy", caste: "OBC" },
  { roll: 57, name: "Subhajit Das", gender: "Boy", caste: "SC" },
  { roll: 58, name: "Payel Nama Das", gender: "Girl", caste: "SC" },
  { roll: 59, name: "Papiya Datta", gender: "Girl", caste: "UR" },
  { roll: 60, name: "Sandipa Das", gender: "Girl", caste: "SC" },
  { roll: 61, name: "Papiya Sarkar", gender: "Girl", caste: "SC" },
  { roll: 62, name: "Sayan Shil", gender: "Boy", caste: "OBC" },
  { roll: 63, name: "Abhijit Das", gender: "Boy", caste: "SC" },
  { roll: 64, name: "Krishnadhan Biswas", gender: "Boy", caste: "SC" },
  { roll: 65, name: "Sani Nandi", gender: "Boy", caste: "UR" },
  { roll: 66, name: "Swarupa Das", gender: "Girl", caste: "SC" },
  { roll: 67, name: "Sriparna Paul", gender: "Girl", caste: "OBC" },
  { roll: 68, name: "Shilpi Das", gender: "Girl", caste: "SC" },
  { roll: 69, name: "Papriya Das", gender: "Girl", caste: "SC" },
  { roll: 70, name: "Sunali Biswas", gender: "Girl", caste: "SC" },
  { roll: 71, name: "Diya Biswas", gender: "Girl", caste: "SC" },
  { roll: 72, name: "Sagar Das", gender: "Boy", caste: "SC" },
  { roll: 73, name: "Rahul Biswas", gender: "Boy", caste: "SC" },
  { roll: 74, name: "Nayan Sannyasi", gender: "Boy", caste: "SC" },
  { roll: 75, name: "Joy Das", gender: "Boy", caste: "SC" },
  { roll: 76, name: "Riya Das", gender: "Girl", caste: "SC" },
  { roll: 77, name: "Sabuj Sarkar", gender: "Boy", caste: "SC" },
  { roll: 78, name: "Rahul Biswas", gender: "Boy", caste: "SC" },
  { roll: 79, name: "Deep Saha", gender: "Boy", caste: "UR" },
  { roll: 80, name: "Juyel Biswas", gender: "Boy", caste: "SC" },
  { roll: 81, name: "Tina Sarkar", gender: "Girl", caste: "SC" },
  { roll: 82, name: "Uday Biswas", gender: "Boy", caste: "SC" },
  { roll: 83, name: "Tushar Biswas", gender: "Boy", caste: "SC" },
  { roll: 84, name: "Ashim Das", gender: "Boy", caste: "SC" },
  { roll: 85, name: "Sayan Biswas", gender: "Boy", caste: "SC" },
  { roll: 86, name: "Rahul Sarkar", gender: "Boy", caste: "SC" },
  { roll: 87, name: "Sonia Das", gender: "Girl", caste: "SC" },
  { roll: 88, name: "Minati Das", gender: "Girl", caste: "SC" },
  { roll: 89, name: "Priyanka Das", gender: "Girl", caste: "SC" },
  { roll: 90, name: "Gourav Das", gender: "Boy", caste: "SC" },
  { roll: 91, name: "Deeya Biswas", gender: "Girl", caste: "SC" },
  { roll: 92, name: "Priyanka Biswas", gender: "Girl", caste: "SC" },
  { roll: 93, name: "Jual Das", gender: "Boy", caste: "SC" },
  { roll: 94, name: "Antara Sarkar", gender: "Girl", caste: "SC" },
  { roll: 95, name: "Anupriya Das", gender: "Girl", caste: "SC" },
  { roll: 96, name: "Sarajit Das", gender: "Boy", caste: "SC" },
  { roll: 97, name: "Ayantan Bhowmik", gender: "Boy", caste: "SC" },
  { roll: 98, name: "Rahul Das", gender: "Boy", caste: "SC" },
  { roll: 99, name: "Himani Debnath", gender: "Girl", caste: "OBC" },
  { roll: 100, name: "Bijoy Malakar", gender: "Boy", caste: "SC" },
  { roll: 101, name: "Akash Das", gender: "Boy", caste: "SC" },
  { roll: 102, name: "Purnima Das", gender: "Girl", caste: "SC" },
  { roll: 103, name: "Sandipa Das", gender: "Girl", caste: "SC" },
  { roll: 104, name: "Bina Das", gender: "Girl", caste: "SC" },
  { roll: 105, name: "Minakhi Nama", gender: "Girl", caste: "SC" },
  { roll: 106, name: "Manchi Biswas", gender: "Girl", caste: "SC" },
  { roll: 107, name: "Nikita Biswas", gender: "Girl", caste: "SC" },
  { roll: 108, name: "Arup Biswas", gender: "Boy", caste: "SC" },
  { roll: 109, name: "Nikita Das", gender: "Girl", caste: "SC" },
  { roll: 110, name: "Munai Sarkar", gender: "Girl", caste: "SC" },
  { roll: 111, name: "Pipasha Biswas", gender: "Girl", caste: "SC" },
  { roll: 112, name: "Jhuma Sarkar", gender: "Girl", caste: "SC" },
  { roll: 113, name: "Arjita Malakar", gender: "Girl", caste: "SC" },
  { roll: 114, name: "Alok Sarkar", gender: "Boy", caste: "SC" },
  { roll: 115, name: "Diya Sarkar", gender: "Girl", caste: "SC" },
  { roll: 116, name: "Ankita Sarkar", gender: "Girl", caste: "SC" },
  { roll: 117, name: "Shritika Sukla Das", gender: "Girl", caste: "SC" },
  { roll: 118, name: "Joy Biswas", gender: "Boy", caste: "SC" },
  { roll: 119, name: "Suhel Das", gender: "Boy", caste: "SC" },
  { roll: 120, name: "Rikesh Das", gender: "Boy", caste: "SC" },
  { roll: 121, name: "Ripan Biswas", gender: "Boy", caste: "SC" },
  { roll: 122, name: "Bibek Acharjee", gender: "Boy", caste: "UR" },
  { roll: 123, name: "Prashanta", gender: "Boy", caste: "SC" },
  { roll: 124, name: "Ajit Sarkar", gender: "Boy", caste: "SC" },
  { roll: 125, name: "Sayam Roy", gender: "Boy", caste: "UR" },
  { roll: 126, name: "Mintu Biswas", gender: "Boy", caste: "SC" },
  { roll: 127, name: "Sayan Deb", gender: "Boy", caste: "UR" },
  { roll: 128, name: "Joydip Mandal", gender: "Boy", caste: "SC" },
  { roll: 129, name: "Angkita Barma", gender: "Girl", caste: "SC" },
  { roll: 130, name: "Manisha Sarkar", gender: "Girl", caste: "SC" },
  { roll: 131, name: "Nandita Debnath", gender: "Girl", caste: "OBC" },
  { roll: 132, name: "Babatosh Biswas", gender: "Boy", caste: "SC" },
  { roll: 133, name: "Rupak Biswas", gender: "Boy", caste: "SC" },
  { roll: 134, name: "Sukrita Debnath", gender: "Girl", caste: "OBC" },
  { roll: 135, name: "Ripan Deb", gender: "Boy", caste: "UR" }
];

const sciData = [
  { roll: 1, name: "Alak Das", gender: "Boy", caste: "SC" },
  { roll: 2, name: "Arpita Debnath", gender: "Girl", caste: "OBC" },
  { roll: 3, name: "Tanushree Das", gender: "Girl", caste: "SC" },
  { roll: 4, name: "Puja Paul", gender: "Girl", caste: "OBC" },
  { roll: 5, name: "Priyanka Debnath", gender: "Girl", caste: "OBC" },
  { roll: 6, name: "Anupa Ghosh", gender: "Girl", caste: "OBC" }
];

const artsSubjects = ['Bengali', 'English', 'History', 'Political Science', 'Education', 'IT/ITeS'];
const sciSubjects = ['Bengali', 'English', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

async function seedClass12() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database: "${mongoose.connection.name}"`);

    // Remove existing Class 12 records if any
    const delArts = await Student.deleteMany({ classId: 'class-12-arts' });
    const delSci = await Student.deleteMany({ classId: 'class-12-sci' });
    console.log(`Cleared existing: ${delArts.deletedCount} Arts, ${delSci.deletedCount} Science records.`);

    // Prepare Arts Docs
    const artsDocs = artsData.map(st => {
      const rollPadded = String(st.roll).padStart(2, '0');
      const studentId = `PMS-24-12A-${rollPadded}`;
      return {
        studentId,
        roll: rollPadded,
        rollNumber: st.roll,
        name: st.name.trim(),
        classId: 'class-12-arts',
        className: 'Class XII (Arts)',
        gender: st.gender,
        caste: st.caste,
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
        enrollmentYear: '2024',
        subjects: artsSubjects
      };
    });

    // Prepare Science Docs
    const sciDocs = sciData.map(st => {
      const rollPadded = String(st.roll).padStart(2, '0');
      const studentId = `PMS-24-12S-${rollPadded}`;
      return {
        studentId,
        roll: rollPadded,
        rollNumber: st.roll,
        name: st.name.trim(),
        classId: 'class-12-sci',
        className: 'Class XII (Science)',
        gender: st.gender,
        caste: st.caste,
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
        enrollmentYear: '2024',
        subjects: sciSubjects
      };
    });

    const insertedArts = await Student.insertMany(artsDocs);
    console.log(`Successfully seeded ${insertedArts.length} Class XII (Arts) students.`);

    const insertedSci = await Student.insertMany(sciDocs);
    console.log(`Successfully seeded ${insertedSci.length} Class XII (Science) students.`);

    const totalInDB = await Student.countDocuments();
    console.log(`Total students across all classes now in DB: ${totalInDB}`);

    await mongoose.connection.close();
    console.log('Database connection closed cleanly.');
  } catch (err) {
    console.error('Error seeding Class 12:', err);
    process.exit(1);
  }
}

seedClass12();
