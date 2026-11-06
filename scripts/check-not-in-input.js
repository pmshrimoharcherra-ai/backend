import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  // Find Class 11 students whose PEN is NOT in user_input_names.txt
  const fs = await import('fs');
  const content = fs.readFileSync(path.resolve(__dirname, 'user_input_names.txt'), 'utf8');
  const lines = content.split('\n');
  const inputPens = new Set();
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 6) {
      inputPens.add((parts[5] || '').trim().replace(/\D/g, ''));
    }
  }

  const c11 = await Student.find({ classId: /11/i }).sort({ classId: 1, rollNumber: 1 });
  const notInInput = c11.filter(s => !inputPens.has((s.penNumber || '').replace(/\D/g, '')));
  console.log(`Class 11 students not in input table (${notInInput.length}):`);
  notInInput.forEach(s => {
    console.log(`Roll ${s.roll} (${s.classId}): ${s.name} | PEN: ${s.penNumber} | APAAR: ${s.apaarId} | Father: ${s.father}`);
  });

  await mongoose.disconnect();
}

run().catch(console.error);
