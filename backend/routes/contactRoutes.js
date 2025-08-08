const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');

// Ruta POST para recibir los formularios de contacto
router.post('/', createContact);

module.exports = router;
