const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    suffix: { type: String, required: false },

    contact: { type: String, required: true },
    barangay: { type: String, required: true },
    municipality: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    createdTime: { type: Date, default:Date.now },
    updatedTime: { type: Date, default:Date.now },

    role: {
    type: String,
    enum: ['admin', 'ic_staff', 'ac_staff', 'client'],
    default: 'client'
  }

}, { collection: 'user_tbl' });

module.exports = mongoose.model('User', userSchema);