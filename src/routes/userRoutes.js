const express = require('express');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware'); // or './middleware/authMiddleware'
const router = express.Router();

router.get('/homepage', verifyToken, (req, res) => {
  const role = req.user.role;

  if (role === 'admin') {
    res.sendFile(path.join(__dirname, 'views/adminHomepage.html'));
  } else if (role === 'ac_staff') {
    res.sendFile(path.join(__dirname, 'views/AC_staffHomepage.html'));
  } else if (role === 'ic_staff') {
    res.sendFile(path.join(__dirname, 'views/IC_staffHomepage.html'));
  } else if (role === 'client') {
    res.sendFile(path.join(__dirname, 'views/clientHomepage.html'));
  } else {
    res.status(403).send('Access Denied: Unknown Role');
  }
});

module.exports = router;