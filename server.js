import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import holidayRoutes from './routes/holidays.js';
import galleryRoutes from './routes/gallery.js';
import teacherRoutes from './routes/teachers.js';
import noticeRoutes from './routes/notices.js';
import examinationRoutes from './routes/examinations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the backend directory
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

// Trust reverse proxy for Render / production HTTPS headers
app.set('trust proxy', 1);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (PDFs, Images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/examinations', examinationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    databaseName: mongoose.connection.name,
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(` MongoDB Connected Successfully to "${mongoose.connection.name}"!`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(` PM SHRI Backend server is running on http://localhost:${PORT}`);
});
