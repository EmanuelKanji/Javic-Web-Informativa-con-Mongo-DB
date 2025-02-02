const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());

app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, users) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).send({ message: 'Error al obtener los usuarios' });
    } else {
      res.send(users);
    }
  });
});

app.listen(27017, () => {
  console.log('Servidor escuchando en el puerto 3000');
});