const express = require('express');

require('module-alias/register');//Alias
const connectionDB = require('@config/db');

require('dotenv').config();
const app = express();
connectionDB();

//Routes


const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port http://${PORT}`));