const express = require('express');
const path = require('path'); 

require('module-alias/register');
const connectionDB = require('@config/db');
const appointment = require('./src/models/appointment');
const cors = require('cors');

require('dotenv').config();
const app = express();
connectionDB();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, './public')));

// // 🔹 Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/adminHomepage.html'));
});

// ✅ Use the combined appointment routes (GET, PUT, etc.)
const appointmentsRoute = require("./src/routes/appointmentRoutes");
app.use('/api', appointmentsRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));