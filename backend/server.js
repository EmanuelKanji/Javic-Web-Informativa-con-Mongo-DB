/**
 * server.js
 * --------------------------------------------------------------------------
 * - Configura y levanta el servidor Express.
 * - Conexión a MongoDB usando Mongoose.
 * - Middleware de CORS con lista de orígenes permitidos (local y producción).
 * - Expone rutas API para contacto.
 * - No sirve archivos estáticos de React (frontend desplegado en Netlify).
 */

/* =========================
   IMPORTS
   ========================= */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/config');
require('./config/db'); // Conexión a MongoDB

const contactRoutes = require('./routes/contactRoutes');

/* =========================
   CONFIGURACIÓN PRINCIPAL
   ========================= */
const app = express();
const PORT = config.port;

/* =========================
   CORS
   - Lista de orígenes permitidos
   ========================= */
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://javicltda.netlify.app' // Producción en Netlify
];

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

/* =========================
   RUTAS API
   ========================= */
app.use('/api/contacto', contactRoutes);

// 🚫 No servimos React aquí, ya que el frontend está en Netlify

/* =========================
   INICIAR SERVIDOR
   ========================= */
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
