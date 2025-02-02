require('dotenv').config();
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');  // 📌 Cambié la ruta para apuntar a config.js en la raíz
require('./config/db');  // 📌 Conectar a la base de datos, también se asume que esta carpeta está en la raíz

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');  // 📌 También cambié la ruta de contactRoutes
app.use('/api/contacto', contactRoutes);  // 📌 La API tendrá el prefijo "/api"

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

