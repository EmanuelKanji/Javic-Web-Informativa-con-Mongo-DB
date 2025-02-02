const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de tener dotenv configurado

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1); // Termina el proceso si la conexión falla
  }
};

module.exports = connectDB;
