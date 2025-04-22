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

module.exports = router;