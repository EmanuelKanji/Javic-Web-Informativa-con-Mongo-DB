/**
 * config.js
 * --------------------------------------------------------------------------
 * - Carga las variables de entorno usando dotenv.
 * - Exporta la configuración principal de la aplicación (puerto y URI de MongoDB).
 * - Permite flexibilidad para despliegue local y en Render.
 */

require('dotenv').config();

const config = {
  port: process.env.PORT || 10000,  // Puerto de Render o valor por defecto
  mongoURI: process.env.MONGO_URI   // URI de conexión a MongoDB Atlas
};

module.exports = config;
