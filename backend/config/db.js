/**
 * db.js
 * --------------------------------------------------------------------------
 * - Configura la conexión a MongoDB Atlas usando Mongoose.
 * - Utiliza la URI definida en el archivo de configuración.
 * - Muestra mensajes en consola según el estado de la conexión.
 */

const mongoose = require('mongoose');
const config = require('./config');

// Conectar a MongoDB Atlas usando la URI
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

