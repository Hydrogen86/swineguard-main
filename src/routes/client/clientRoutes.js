const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const router = express.Router();
const clientController = require('../../controllers/client/clientControllers');

router.use(cookieParser());

//Verify User
router.post('/login', clientController.clientLogin);

// Create Account
router.post('/signup', clientController.createUserAccount);

// Serve admin homepage HTML

router.get('/client/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/clientHomepage.html'));
});


const verifyToken = require('../../middleware/authMiddleware'); // Import the middleware

// Get logged-in admin details (only for logged-in admin)
router.get('/details', verifyToken, clientController.getuserData);

module.exports = router;

