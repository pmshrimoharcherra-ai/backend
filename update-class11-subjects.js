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

// Subject rename map
const rename = (s) => {
  if (!s || !s.trim()) return null;
  const t = s.trim();
  if (t === 'Biological Science') return 'Biology';
  if (t === 'Information Technology') return 'IT/ITeS';
  return t;
};

// Build subject list: [LangI, LangII, E1, E2, E3, E4?, E5?, Sixth?]
const mkSubjects = (l1, l2, e1, e2, e3, e4, e5, sixth) =>
  [l1, l2, e1, e2, e3, e4, e5, sixth].map(rename).filter(Boolean);

// Each entry: enrollmentNo (unique key) + subjects array
const studentSubjects = [
  { enrollmentNo: '321202805444', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805460', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805440', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805548', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805574', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805571', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '321202805545', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805420', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '331202805470', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Mathematics','Biological Science','','') },
  { enrollmentNo: '321202805463', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805576', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805407', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805496', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805430', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805551', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805442', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805530', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805560', subjects: mkSubjects('Bengali','English','Political Science','Education','Geography','','','Information Technology') },
  { enrollmentNo: '322202805427', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805448', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805561', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '321202805536', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805540', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805515', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805523', subjects: mkSubjects('Bengali','English','Political Science','Education','History','Philosophy','','') },
  { enrollmentNo: '321202805490', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '321202805464', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805499', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805562', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805441', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805421', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805573', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '322202805423', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805568', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805458', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805555', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805429', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '321202805478', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805471', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '331202805435', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Biological Science','Mathematics','','') },
  { enrollmentNo: '321202805559', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805572', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805497', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805498', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '321202805532', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805550', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '332202805569', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Biological Science','Mathematics','','') },
  { enrollmentNo: '321202805425', subjects: mkSubjects('Bengali','English','History','Political Science','Education','','','Information Technology') },
  { enrollmentNo: '322202805449', subjects: mkSubjects('Bengali','English','Political Science','Education','History','Philosophy','','') },
  { enrollmentNo: '321202805487', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805447', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805468', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805543', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805474', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805565', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '321202805539', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805527', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805459', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805514', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805507', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805503', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805467', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805476', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805438', subjects: mkSubjects('Bengali','English','Education','History','Political Science','','','Information Technology') },
  { enrollmentNo: '322202805456', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805485', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805522', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '321202805556', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805547', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805432', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805526', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805552', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '322202805519', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805443', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805531', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805405', subjects: mkSubjects('Bengali','English','History','Political Science','Education','','','Information Technology') },
  { enrollmentNo: '321202805411', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805492', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805437', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805484', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805424', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805541', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805416', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805465', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '322202805431', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805534', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '321202805410', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805508', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805538', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805475', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805516', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805408', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '322202805422', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '332202805433', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Biological Science','','','Information Technology') },
  { enrollmentNo: '321202805461', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805419', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805462', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805414', subjects: mkSubjects('Bengali','English','Political Science','History','Education','','','Information Technology') },
  { enrollmentNo: '321202805558', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805566', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805450', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805445', subjects: mkSubjects('Bengali','English','History','Political Science','Education','','','Information Technology') },
  { enrollmentNo: '322202805434', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805542', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','') },
  { enrollmentNo: '322202805418', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805453', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805511', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805537', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '331202805486', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Biological Science','','','Information Technology') },
  { enrollmentNo: '321202805501', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805518', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '321202805439', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805436', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805500', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805428', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805488', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805413', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805564', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805553', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805489', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805473', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805426', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805452', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805415', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805512', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805506', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805457', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805412', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805505', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805491', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805521', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805409', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805570', subjects: mkSubjects('Bengali','English','Political Science','Education','History','Philosophy','','') },
  { enrollmentNo: '321202805493', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805533', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805549', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805557', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805454', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805528', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805417', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805469', subjects: mkSubjects('Bengali','English','History','Political Science','Education','','','Information Technology') },
  { enrollmentNo: '322202805525', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805517', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805529', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805406', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805477', subjects: mkSubjects('Bengali','English','History','Political Science','Education','','','Information Technology') },
  { enrollmentNo: '321202805524', subjects: mkSubjects('Bengali','English','Education','Political Science','History','','','Information Technology') },
  { enrollmentNo: '322202805513', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805510', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805451', subjects: mkSubjects('Bengali','English','Political Science','Education','History','Philosophy','','') },
  { enrollmentNo: '322202805554', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '332202805535', subjects: mkSubjects('Bengali','English','Physics','Chemistry','Mathematics','Biological Science','','') },
  { enrollmentNo: '322202805575', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805482', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805455', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805494', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805504', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805466', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805563', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805502', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805480', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805483', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805495', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805472', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805446', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805481', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '321202805546', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805479', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805520', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
  { enrollmentNo: '322202805509', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '321202805567', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','') },
  { enrollmentNo: '322202805544', subjects: mkSubjects('Bengali','English','Political Science','Education','History','','','Information Technology') },
];

async function updateSubjects() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected: ${mongoose.connection.name}`);

    let updated = 0, notFound = 0;
    const missing = [];

    for (const entry of studentSubjects) {
      const student = await Student.findOne({ enrollmentNo: entry.enrollmentNo });
      if (!student) {
        console.log(`[NOT FOUND] enrollmentNo: ${entry.enrollmentNo}`);
        missing.push(entry.enrollmentNo);
        notFound++;
        continue;
      }
      student.subjects = entry.subjects;
      await student.save();
      updated++;
      console.log(`[OK] ${student.name.padEnd(25)} → ${entry.subjects.join(', ')}`);
    }

    console.log(`\n====== Summary ======`);
    console.log(`Updated : ${updated}`);
    console.log(`Missing : ${notFound}`);
    if (missing.length) console.log('Missing enrollmentNos:', missing);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateSubjects();
