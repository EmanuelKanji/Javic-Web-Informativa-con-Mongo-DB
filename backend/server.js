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
  'http://localhost:5173', // Desarrollo
  'https://javicltda.netlify.app' // Producción
];

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Rutas API
app.use('/api/contacto', contactRoutes);

// 🚫 Eliminamos cualquier referencia a servir React, ya que el frontend está en Netlify

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
