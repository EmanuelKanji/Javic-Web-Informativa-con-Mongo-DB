require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,  // El puerto donde corre el servidor
  mongoURI: 'mongodb+srv://emanuel:javicarriendo@cluster0.t0dck.mongodb.net/',  // URL para la conexión a MongoDB Atlas
};

module.exports = config;
