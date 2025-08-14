/**
 * Contact.js (Modelo de Contacto)
 * --------------------------------------------------------------------------
 * - Define el esquema de datos para los mensajes recibidos desde el formulario de contacto.
 * - Valida los campos obligatorios y el formato de correo electrónico.
 * - Almacena nombre, correo, teléfono y fecha de creación.
 */

const mongoose = require('mongoose');

// Esquema del formulario de contacto
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Correo inválido']
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
