const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Mensaje guardado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el mensaje', error });
    }
});

module.exports = router;