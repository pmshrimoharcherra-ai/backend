import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cleanDigits = (s) => (s || '').replace(/\D/g, '');
const normalizeName = (s) => (s || '').toLowerCase().replace(/[^a-z]/g, '');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const Student = mongoose.model('Student', new mongoose.Schema({}, { strict: false }));

  const dbStudents = await Student.find({ classId: /11/i });
  const content = fs.readFileSync(path.resolve(__dirname, 'user_input_full.txt'), 'utf8');
  const lines = content.split('\n');
  const inputRows = [];
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 6 && parts[0] !== 'Student Name' && !parts[0].startsWith('<')) {
      inputRows.push({
        name: parts[0].trim(),
        dob: parts[1] ? parts[1].trim() : '',
        phone: parts[2] ? parts[2].trim() : '',
        mother: parts[3] ? parts[3].trim() : '',
        father: parts[4] ? parts[4].trim() : '',
        penNumber: parts[5] ? parts[5].trim() : '',
        apaarId: parts[6] ? parts[6].trim() : ''
      });
    }
  }

  // Pre-process manual matches for edge cases:
  // RAJDEEP CHANDA -> Rajdeep Chandra (class-11-sci Roll 05)
  // Let's check other students in notMatchedDb from before:
  // Roll 30 (class-11-arts): Tripti Das | DOB: 12/09/2009 | PEN: 21912902855
  // Roll 41 (class-11-arts): Shrishti Ghosh
  // Roll 42 (class-11-arts): Sandip Chandra Das | DOB: 21/09/2010 | PEN: 22500396374
  // Roll 68 (class-11-arts): Susmita Saha | DOB: 12/05/2010 | PEN: 22446147341
  // Roll 94 (class-11-arts): Susmita Biswas | DOB: 30/05/2010 | PEN: 22069847562
  // Roll 97 (class-11-arts): Sumana Barman | DOB: 11/05/2009 | PEN: 21863160054
  // Roll 108 (class-11-arts): Susmita Biswas | DOB: 23/10/2009 | PEN: 22069847562
  // Roll 142 (class-11-arts): Arpan Sarkar | DOB: 01/01/2010 | PEN: 21953062958 | APAAR: 993484850773
  // Roll 143 (class-11-arts): Hriday Biswas | DOB: 10/08/2005 | PEN: 21911304615
  // Roll 153 (class-11-arts): Abhay Biswas | DOB: 17/01/2010 | PEN: 21916360702
  // Roll 161 (class-11-arts): Rahul Haldar | DOB: 28/11/2008 | PEN: 22071558601
  // Roll 164 (class-11-arts): Shantanu Debnath | DOB: 03/07/2010
  // Roll 165 (class-11-arts): Chandini Das | DOB: 06/11/2008
  // Roll 02 (class-11-sci): Suparna Das
  // Roll 05 (class-11-sci): Rajdeep Chandra

  // Let's see if any of these are in the input list with a slightly different spelling!
  console.log('\n--- Checking input list for candidates of unmatched DB students ---');
  const checkNames = [
    'Tripti', 'Shrishti', 'Shristi', 'Sandip', 'Susmita', 'Sumana', 'Arpan',
    'Hriday', 'Abhay', 'Rahul', 'Shantanu', 'Chandini', 'Suparna', 'Rajdeep', 'Chanda'
  ];
  for (const cn of checkNames) {
    const hits = inputRows.filter(r => r.name.toLowerCase().includes(cn.toLowerCase()));
    if (hits.length > 0) {
      console.log(`Input rows matching "${cn}":`, hits.map(h => `${h.name} | DOB: ${h.dob} | PEN: ${h.penNumber} | APAAR: ${h.apaarId}`));
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
