const Contact = require('../models/Contact');

// Controlador para crear un nuevo contacto (guardar formulario)
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
