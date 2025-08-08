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

// Middlewares
app.use(cors());
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
