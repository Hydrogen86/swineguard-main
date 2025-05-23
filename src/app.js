
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
require('module-alias/register');

const app = express();
const connectionDB = require('./config/db');
const verifyToken = require('./middleware/authMiddleware');

// Connect to MongoDB
connectionDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// Serve static files (HTML, CSS, JS) from public/
app.use(express.static(path.join(__dirname, '../public')));

// 🔒 Role-based Homepage Routes
app.get('/admin/homepage', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, './views/adminHomepage.html'));
});

app.get('/ac/homepage', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, './views/AC_staffHomepage.html'));
});

app.get('/ic/homepage', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, './views/IC_staffHomepage.html'));
});

// Client
app.get('/client/homepage', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, './views/clientHomepage.html'));
})

// 📦 API Routes
app.use('/api', require('./routes/admin/appointmentRoutes'));
app.use('/api', require('./routes/admin/inventoryRoutes'));
app.use('/api', require('./routes/admin/emailRoutes'));
app.use('/api/admin', require('./routes/admin/adminRoutes'));

//users
app.use('/api', require('./routes/client/clientRoutes'));

// ❌ Optional: 404 fallback for unmatched routes
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

module.exports = app;
