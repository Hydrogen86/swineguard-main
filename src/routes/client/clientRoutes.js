const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const router = express.Router();
const clientController = require('../../controllers/client/clientControllers');

router.use(cookieParser());

//Verify User
router.post('/client/login', clientController.clientLogin);

// logout User
router.post('/logout', clientController.logout);

// Create Account
router.post('/signup', clientController.createUserAccount);

router.get('/client/homepage', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '../../public/clientHomepage.html'));
});


const verifyToken = require('../../middleware/authMiddleware'); // Import the middleware

//get User Data from DB
router.get('/client/details', verifyToken, clientController.getClientData);

module.exports = router;

