const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno desde .env

const mongoURI = process.env.MONGO_URI; // Usar la variable de entorno MONGO_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Conectado a MongoDB');
    })
    .catch((err) => {
        console.log('❌ Error al conectar a MongoDB:', err);
    });
