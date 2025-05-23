const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../../controllers/admin/adminControllers');

router.use(cookieParser());

//Verify user
router.post('/login', adminController.loginStaff);

// Serve admin homepage HTML
router.get('/adminHomepage', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '../../public/adminLoginPage.html'));
});

router.get('/ac/homepage', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '../../public/AC_staffHomepage.html'));
});

router.get('/ic/homepage', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '../../public/IC_staffHomepage.html'));
});

const verifyToken = require('../../middleware/authMiddleware'); // Import the middleware

// Get logged-in admin details (only for logged-in admin)
router.get('/details', verifyToken, adminController.getVetStaffData);

module.exports = router;

