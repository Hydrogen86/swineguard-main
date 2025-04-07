const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/swineguard_db';

const connectionDB = async () => {
  if (!mongoURI) {
    console.error('❌ Error: DB_URI is not defined in .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to the database');
  } catch (err) {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  }
};

module.exports = connectionDB;