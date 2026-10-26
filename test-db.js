import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

console.log('Testing connection to MongoDB...');
console.log('URI:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED');

if (!uri) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log(' Successfully connected to MongoDB Atlas!');
  console.log('Database Name:', mongoose.connection.name);
  console.log('Connection State:', mongoose.connection.readyState === 1 ? 'Connected' : mongoose.connection.readyState);
  await mongoose.disconnect();
  console.log('Disconnected cleanly.');
  process.exit(0);
} catch (err) {
  console.error(' MongoDB connection failed:');
  console.error(err.message);
  process.exit(1);
}
