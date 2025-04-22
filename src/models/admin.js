const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },

    adminContact: { type: String, required: true },
    adminAddress: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true }

}, { collection: 'admin_tbl' });

module.exports = mongoose.model('Admin', adminSchema);