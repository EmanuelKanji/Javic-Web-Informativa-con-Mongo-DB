// Importar mongoose
const mongoose = require('mongoose');

// Obtener la URI de conexión desde la variable de entorno
const dbURI = process.env.MONGO_URI || 'mongodb+srv://emanuel:<db_password>@cluster0.t0dck.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Conectar a MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas');
    })
    .catch(err => {
        console.log('❌ Error al conectar a MongoDB: ', err);
    });

// Exportar mongoose para su uso en otras partes de la aplicación
module.exports = mongoose;
