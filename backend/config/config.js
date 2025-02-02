require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,  // El puerto donde corre el servidor
  mongoURI: process.env.MONGO_URI  // Usamos la variable de entorno que contiene la URL de conexión
};

module.exports = config;
