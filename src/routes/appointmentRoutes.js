const express = require('express');
const path = require('path');
const router = express.Router();
const appointmentController = require('../../src/controllers/appointmentControllers');

// @route   GET /api/appointments
// @desc    Get all appointment records
// @access  Public or Protected (depending on auth setup)

//Add appointments
router.post('/request/appointments', appointmentController.addAppointment);

//Get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

//get json file from the data folder
router.get('/addresses', appointmentController.getAllAddresses);
router.get('/services', appointmentController.getAllServices);
router.get('/swines', appointmentController.getAllSwineType);
router.get('/medicines', appointmentController.getAllMedicines);
router.get('/personnel', appointmentController.getAllPersonnel);


//update appointments by Id completed, accepted, rejected, removed, restore and delete
router.put('/appointments/:id/update', appointmentController.updateAppointments);
router.put('/appointments/:id/reschedule', appointmentController.rescheduleAppointments);
router.put('/appointments/:id/removed', appointmentController.removeAppointments);
router.put('/appointments/:id/completed', appointmentController.completedAppointments);
router.put('/appointments/:id/restore', appointmentController.removeAppointments);

//Delete apointments
router.delete('/appointments/:id', appointmentController.deleteAppointments);

// Serve admin homepage HTML
router.get('/adminHomepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adminHomepage.html'));
});

module.exports = router;