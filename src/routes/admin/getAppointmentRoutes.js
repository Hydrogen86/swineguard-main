const express = require('express');
const Appointment = require('@models/appointment'); // Model for appointments

const router = express.Router();

// @route   GET /api/appointments
// @desc    Get all appointment records
// @access  Public or Protected (depending on auth setup)
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find(); // Fetch all records
        res.status(200).json(appointments); // Return them as JSON
    } catch (error) {
        console.error('❌ Error fetching appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
});

router.get('/adminHomepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/adminHomepage.html')); // Serve the HTML file
});
module.exports = router;