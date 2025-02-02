require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
require('./db');  // Conectar a la base de datos de MongoDB

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());  // Habilitar el parsing de JSON en las peticiones

// Importar las rutas
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacto', contactRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});



