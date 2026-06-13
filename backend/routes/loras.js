const express = require('express');
const router = express.Router();
const Personaje = require('../models/Personaje');
const Lora = require('../models/Lora');

// ==========================================
// CREAR Y VINCULAR UN LORA A UN PERSONAJE
// POST: http://localhost:5000/api/loras
// ==========================================
router.post('/loras', async (req, res) => {
    try {
        const { personaje_id, nombre, almacenamiento_Lora, trigger_words } = req.body; 

        //1. Crear el registro
        const nuevoLora = new Lora({
            personaje_id,
            nombre,
            almacenamiento_Lora: almacenamiento_Lora || '',
            trigger_words: trigger_words || []
        });
        const loraGuardada = await nuevoLora.save();

        //Buscar el personaje y vincular el lora
        await Personaje.findByIdAndUpdate(personaje_id, { 
            $push: { lora: loraGuardada._id } 
        });

        res.status(201).json({message: 'Lora creado y vinculado exitosamente', lora: loraGuardada});
    } catch (error) {
        res.status(400).json({message: 'Error al crear el lora', error: error.message});
    }
});

module.exports = router;