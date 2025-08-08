require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/config');
require('./config/db'); // Conexión a MongoDB

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = config.port;

// Middleware CORS (temporalmente abierto a todos)
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rutas API
app.use('/api/contacto', contactRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
