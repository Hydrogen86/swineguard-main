const express = require('express');
const router = express.Router();
const emailController = require('../../controllers/admin/emailControllers');

router.post('/send-email', emailController.sendAppointmentEmail);

module.exports = router;
