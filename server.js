require('dotenv').config();
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./backend/config');
require('./backend/db'); 

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

const contactRoutes = require('./backend/routes/contactRoutes');
app.use('/api/contacto', contactRoutes);

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});


