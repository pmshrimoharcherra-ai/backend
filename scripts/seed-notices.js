import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Notice from '../models/Notice.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads/notices');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Generate valid standard PDF file
const generatePdf = (filename, title, refNo) => {
  const filePath = path.join(uploadDir, filename);
  const streamText = `BT /F1 18 Tf 50 730 Td (PM SHRI Moharcherra H.S. School) Tj
/F1 11 Tf 50 705 Td (Govt. of Tripura | Teliamura, Khowai, Tripura - 799205) Tj
/F1 10 Tf 50 685 Td (Ref No: ${refNo}) Tj
/F1 14 Tf 50 640 Td (${title.replace(/[()]/g, '')}) Tj
/F1 10 Tf 50 610 Td (Official Circular issued by the Office of the Headmaster / Principal.) Tj
/F1 10 Tf 50 590 Td (Please follow instructions and deadlines strictly as mentioned.) Tj
ET`;

  const streamLength = Buffer.byteLength(streamText, 'utf8');

  const pdfData = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length ${streamLength} >> stream
${streamText}
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000300 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
380
%%EOF`;

  fs.writeFileSync(filePath, pdfData);
  const stats = fs.statSync(filePath);
  return {
    filePath,
    fileSize: `${Math.round(stats.size / 10.24) / 100} KB`,
    url: `http://localhost:5000/uploads/notices/${filename}`
  };
};

const SEED_NOTICES = [
  {
    title: 'TBSE Secondary (Class X) & Higher Secondary (Class XII) Pre-Board Routine 2026–27',
    noticeNo: 'PMS/NOT/2026/048',
    category: 'Examinations',
    audience: 'Classes X & XII Candidates',
    publishDate: '18 Oct 2026',
    filename: 'TBSE_PreBoard_Routine_2026.pdf',
    pinned: true,
    description: 'Detailed examination routine, admit card verification instructions, and practical exam schedules for Secondary and Higher Secondary candidates.'
  },
  {
    title: 'PM SHRI Science Hub & Innovation Fair 2026: Project Submissions & Guidelines',
    noticeNo: 'PMS/NOT/2026/045',
    category: 'Activities',
    audience: 'Classes VI to XII',
    publishDate: '15 Oct 2026',
    filename: 'Science_Fair_Guidelines_2026.pdf',
    pinned: true,
    description: 'Guidelines for working models in STEM, robotics, green energy, and environmental sustainability under PM SHRI Science Wing.'
  },
  {
    title: 'Schedule for Parent-Teacher Meeting (PTM) for Term I Academic Evaluation',
    noticeNo: 'PMS/NOT/2026/041',
    category: 'Academic',
    audience: 'Parents & Guardians of Classes I to XII',
    publishDate: '12 Oct 2026',
    filename: 'PTM_Schedule_Oct2026.pdf',
    pinned: false,
    description: 'Interactive session between parents and class teachers to review Term I performance, attendance records, and student progress cards.'
  },
  {
    title: 'National Means-cum-Merit Scholarship (NMMS) Verification & Document Submission',
    noticeNo: 'PMS/NOT/2026/039',
    category: 'Scholarship',
    audience: 'Class VIII Registered Students',
    publishDate: '09 Oct 2026',
    filename: 'NMMS_Verification_Notice_2026.pdf',
    pinned: false,
    description: 'Mandatory verification of Aadhaar-linked bank accounts and income certificates for eligible NMMS candidates.'
  },
  {
    title: 'Admission Guidelines & Seat Matrix for Academic Session 2027–28',
    noticeNo: 'PMS/NOT/2026/035',
    category: 'Admissions',
    audience: 'Prospective Students & Parents',
    publishDate: '05 Oct 2026',
    filename: 'Admission_Notice_2027_28.pdf',
    pinned: false,
    description: 'Information regarding age criteria, reservation norms under Govt. of Tripura, and online application portal opening dates.'
  },
  {
    title: 'Puja Vacation & School Reopening Schedule Official Notification',
    noticeNo: 'PMS/NOT/2026/031',
    category: 'Holidays',
    audience: 'All Students, Teachers & Staff',
    publishDate: '01 Oct 2026',
    filename: 'Puja_Vacation_Order_2026.pdf',
    pinned: false,
    description: 'Official notification on school closure dates, holiday homework allotments, and reopening schedule for all classes.'
  }
];

const seedNotices = async () => {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME || 'school_erp';

  if (!MONGO_URI) {
    console.error(' MONGODB_URI missing from environment.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to MongoDB "${mongoose.connection.name}"`);

    // Remove existing notices to avoid duplicates
    await Notice.deleteMany({});
    console.log('Cleared existing notices collection.');

    for (const item of SEED_NOTICES) {
      const pdfMeta = generatePdf(item.filename, item.title, item.noticeNo);
      const noticeDoc = new Notice({
        title: item.title,
        noticeNo: item.noticeNo,
        category: item.category,
        audience: item.audience,
        publishDate: item.publishDate,
        pdfUrl: pdfMeta.url,
        pdfFileName: item.filename,
        pdfFileSize: pdfMeta.fileSize,
        pinned: item.pinned,
        description: item.description
      });
      await noticeDoc.save();
      console.log(` Seeded: ${item.title} -> ${pdfMeta.url}`);
    }

    const count = await Notice.countDocuments();
    console.log(` Successfully seeded ${count} official notices with downloadable PDFs!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(' Error seeding notices:', err);
    process.exit(1);
  }
};

seedNotices();
