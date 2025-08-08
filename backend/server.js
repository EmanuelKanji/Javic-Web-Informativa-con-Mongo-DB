require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/config');
require('./config/db'); // Conexión a MongoDB

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = config.port;

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://javicltda.netlify.app' // Producción en Netlify
];

// Middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  }
}));

app.use(express.json());

// Rutas API
app.use('/api/contacto', contactRoutes);

// 🚫 No servimos React aquí, ya que el frontend está en Netlify

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
