const express = require('express');
const path = require('path');
const router = express.Router();
const Admin = require('../../src/controllers/adminControllers');

//Verify admin
router.post('/login', Admin.loginAdmin);

// Serve admin homepage HTML
router.get('/adminHomepage', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/adminLoginPage.html'));
});

const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

// Get logged-in admin details (only for logged-in admin)
router.get('/details', verifyToken, Admin.adminData);

module.exports = router;