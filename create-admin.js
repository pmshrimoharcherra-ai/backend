import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || 'school_erp';

const adminData = {
  name: 'Kiran Samanta',
  email: 'kiransamanta88@gmail.com',
  password: 'Kiran123456?',
  role: 'admin',
  isActive: true
};

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(` Connected to MongoDB database: "${mongoose.connection.name}"`);

    // Check if admin user already exists
    let existingUser = await User.findOne({ email: adminData.email.toLowerCase() });

    if (existingUser) {
      console.log(` User ${adminData.email} already exists! Updating password and ensuring admin role...`);
      existingUser.password = adminData.password;
      existingUser.role = 'admin';
      existingUser.name = adminData.name;
      existingUser.isActive = true;
      await existingUser.save();
      console.log(` Admin account updated successfully!`);
    } else {
      const newAdmin = new User(adminData);
      await newAdmin.save();
      console.log(` New Admin account created successfully!`);
    }

    console.log('-------------------------------------------');
    console.log('Admin Account Details:');
    console.log(`Name:     ${adminData.name}`);
    console.log(`Email:    ${adminData.email}`);
    console.log(`Role:     admin`);
    console.log(`Password: ${adminData.password}`);
    console.log('-------------------------------------------');

    await mongoose.disconnect();
    console.log('Disconnected cleanly.');
    process.exit(0);
  } catch (err) {
    console.error(' Error creating admin account:', err);
    process.exit(1);
  }
}

createAdmin();
