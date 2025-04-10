const express = require('express');
const path = require('path');
const router = express.Router();
const appointmentController = require('../../src/controllers/appointmentControllers');

// @route   GET /api/appointments
// @desc    Get all appointment records
// @access  Public or Protected (depending on auth setup)

//Get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

//update appointments by Id completed, accepted, rejected and removed
router.put('/appointments/:id', appointmentController.updateAppointments);
router.put('/appointments/:id', appointmentController.rescheduleAppointments);
router.put('/appointments/:id', appointmentController.removeAppointments);

// Serve admin homepage HTML
router.get('/adminHomepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adminHomepage.html'));
});

module.exports = router;