const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentTitle: { type: String, required: true },
    swineType: { type: String, required: true },
    swineCount: { type: String, required: true },
    
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    swineSymptoms: { type: String, required: true },
    swineAge: { type: String, required: true },
    swineMale: { type: String, required: true },
    swineFemale: { type: String, required: true },

    appointmentStatus: { type: String, required: true },

    municipality: { type: String, required: true },
    barangay: { type: String, required: true },

    clientName: { type: String, required: true },
    clientContact: { type: String, required: true },
    clientEmail: { type: String, required: true }
}, { collection: 'appointment_tbl' });

module.exports = mongoose.model('Appointment', appointmentSchema);