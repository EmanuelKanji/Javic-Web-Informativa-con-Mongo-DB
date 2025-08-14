/**
 * contactController.js
 * --------------------------------------------------------------------------
 * - Controlador para el recurso "contacto".
 * - Maneja la lógica para recibir y almacenar los datos del formulario.
 */

const Contact = require('../models/Contact');

/**
 * Crea y guarda un nuevo contacto en la base de datos.
 * @param {Object} req - Request (espera name, email, phone en body)
 * @param {Object} res - Response
 */
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validación básica del lado del servidor
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Crear y guardar nuevo contacto
    const newContact = new Contact({ name, email, phone });
    await newContact.save();

    res.status(201).json({ message: 'Formulario enviado correctamente.' });
  } catch (error) {
    console.error('❌ Error al guardar el contacto:', error);
    res.status(500).json({ message: 'Error del servidor. Intenta más tarde.' });
  }
};

module.exports = {
  createContact
};
