import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Teacher, { computeTeacherPassword } from '../models/Teacher.js';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Clean standard subjects for the 19 school teachers
const OFFICIAL_SUBJECT_MAP = {
  TR45208338: { subject: 'Physics' },
  TP00693724: { subject: 'Kokborok' },
  TP12999252: { subject: 'Biology' },
  TP40548371: { subject: 'Bengali' },
  TP41073978: { subject: 'English' },
  TP41160956: { subject: 'Mathematics' },
  TP69529790: { subject: 'History' },
  TR02672728: { subject: 'Chemistry' },
  TR05821328: { subject: 'Geography' },
  TR49491164: { subject: 'Social Science' },
  TP22856391: { subject: 'Commerce' },
  TR02672782: { subject: 'Bengali' },
  TR76404582: { subject: 'Physical Education' },
  TP43381101: { subject: 'Sanskrit' },
  TP13217757: { subject: 'Kokborok' },
  TR65553969: { subject: 'Computer Science' },
  TR94841403: { subject: 'Fine Arts' },
  TR95081566: { subject: 'Physics' },
  TR96957895: { subject: 'General Science' },
};

async function syncTeacherDatabase() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`Connected to database "${DB_NAME}".`);

    const teachers = await Teacher.find().sort({ slNo: 1 });
    console.log(`Found ${teachers.length} teachers in database. Updating credentials...`);

    const credentialsList = [];

    for (const t of teachers) {
      // 1. Get clean subject
      const mapped = OFFICIAL_SUBJECT_MAP[t.teacherId];
      const cleanSubject = mapped?.subject || t.subject || 'General';

      // 2. Generate password: FirstName + Subject (e.g. JoydebPhysics)
      const password = computeTeacherPassword(t.name, cleanSubject);

      // 3. Update Teacher document in MongoDB
      t.subject = cleanSubject;
      t.password = password;
      await t.save();

      // 4. Create or update User in User collection with role 'teacher'
      let user = await User.findOne({
        $or: [
          { teacherId: t.teacherId },
          { email: t.email.toLowerCase() }
        ]
      });

      if (user) {
        user.name = t.name;
        user.teacherId = t.teacherId;
        user.role = 'teacher';
        user.password = password; // pre-save hook will hash it
        await user.save();
      } else {
        user = new User({
          name: t.name,
          email: t.email.toLowerCase(),
          teacherId: t.teacherId,
          role: 'teacher',
          password: password,
          isActive: true
        });
        await user.save();
      }

      credentialsList.push({
        slNo: t.slNo,
        teacherId: t.teacherId,
        name: t.name,
        subject: cleanSubject,
        email: t.email,
        password: password
      });
    }

    console.log('\n================ OFFICIAL TEACHERS DATABASE & CREDENTIALS ================');
    console.table(credentialsList);
    console.log('=========================================================================\n');
    console.log('Teacher database successfully built and synchronized with user credentials!');

    process.exit(0);
  } catch (err) {
    console.error('Error synchronizing teacher database:', err);
    process.exit(1);
  }
}

syncTeacherDatabase();
