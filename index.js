const express = require('express');
const path = require('path'); 

require('module-alias/register');
const connectionDB = require('./src/config/db');
const appointment = require('./src/models/appointment');
const cors = require('cors');
const verifyToken = require('./src/middleware/authMiddleware');

require('dotenv').config();
const app = express();
connectionDB();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, './public')));

// Serve index.html when accessing the root URL
app.get('/adminHomepage', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/adminHomepage.html'));
});

// Use the combined appointment routes (GET, PUT, etc.)
const appointmentsRoute = require("./src/routes/appointmentRoutes");
app.use('/api', appointmentsRoute);

//Item Routes
const itemRoutes = require("./src/routes/inventoryRoutes");
app.use('/api', itemRoutes);

// Send email to user
const emailRoutes =  require("./src/routes/emailRoutes");
app.use('/api', emailRoutes);

// Admin login routes
const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));


