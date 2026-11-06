import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'school_erp' });
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  // Check if any collection has studentName
  for (const c of collections) {
    const coll = mongoose.connection.db.collection(c.name);
    const doc = await coll.findOne({});
    if (doc) {
      const keys = Object.keys(doc);
      if (keys.some(k => k.toLowerCase().includes('name') || k.toLowerCase().includes('student'))) {
        console.log(`Collection ${c.name} sample keys:`, keys);
      }
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
