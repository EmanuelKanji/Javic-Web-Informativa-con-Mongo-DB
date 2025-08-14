/**
 * contactRoutes.js
 * --------------------------------------------------------------------------
 * - Define las rutas para el recurso "contacto".
 * - Expone la ruta POST para recibir formularios de contacto.
 * - Utiliza el controlador correspondiente para manejar la lógica.
 */

const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');

/**
 * @route   POST /api/contacto
 * @desc    Recibe y almacena los datos del formulario de contacto
 * @access  Público
 */
router.post('/', createContact);

module.exports = router;
