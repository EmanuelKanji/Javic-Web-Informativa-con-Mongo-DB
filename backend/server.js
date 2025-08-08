require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const config = require('./config/config');
require('./config/db'); // Conexión a MongoDB

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = config.port;

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173', // para desarrollo
  'https://javicltda.netlify.app' // producción
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

// ✅ Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'frontend', 'build'))); // Ajusta si tu carpeta se llama diferente

// ✅ Fallback para React Router (dashboard, about, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
