// Importamos las dependencias
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

// Validar que la variable de entorno MONGO_URI esté definida
if (!process.env.MONGO_URI) {
  console.error('Error: La variable de entorno MONGO_URI no está definida.');
  process.exit(1);  // Salir del proceso si la variable no está definida
}

// Conexión a MongoDB Atlas usando Mongoose
const mongoURI = process.env.MONGO_URI;  // Usar la URI de las variables de entorno
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB Atlas', err);
    process.exit(1);  // Salir si la conexión falla
  });

// Middleware para procesar los datos JSON
app.use(express.json());

// Definir una ruta simple para probar la conexión
app.get('/', (req, res) => {
  res.send('¡Servidor en ejecución!');
});

// Ruta para recibir los datos del formulario
app.post('/api/contacto', async (req, res) => {
  try {
    const newContact = req.body;  // Suponiendo que los datos del formulario se envíen en el cuerpo de la solicitud
    // Aquí puedes agregar el modelo y guardar los datos en MongoDB si lo necesitas.
    // Por ejemplo: 
    // const contact = new Contact(newContact);
    // await contact.save();
    res.status(201).json({ message: 'Mensaje guardado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el mensaje', error });
  }
});

// Ruta para obtener los usuarios (requiere autenticación)
// Aquí debes agregar algún tipo de autenticación para asegurar la ruta
app.get('/users', async (req, res) => {
  // Autenticación de ejemplo (debes reemplazar con algo más seguro, como JWT)
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Acceso denegado. API Key inválida.' });
  }

  try {
    const users = await mongoose.connection.db.collection('users').find().toArray();
    res.status(200).send(users);
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).send({ message: 'Error al obtener los usuarios' });
  }
});

// Configuración del puerto para que escuche en el adecuado
const PORT = process.env.PORT || 5000; // Si no hay un puerto definido en las variables de entorno, usará 5000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
