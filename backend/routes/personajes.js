const express = require('express');
const router = express.Router();
const Personaje = require('../models/Personaje');
const Lora = require('../models/Lora');

// ==========================================
// CREAR UN PERSONAJE (Y OPCIONALMENTE SU LORA INICIAL)
// POST: http://localhost:5000/api/personajes
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { nombre, serie_id, pendientes_sfw, pendientes_nsfw, lora_info } = req.body;

        const nuevoPersonaje = new Personaje({
            nombre,
            serie_id,
            pendientes_sfw: pendientes_sfw || 0,
            pendientes_nsfw: pendientes_nsfw || 0
        });

        if (lora_info && lora_info.nombre_archivo) {
            const nuevoLora = new Lora({
                personaje_id: nuevoPersonaje._id,
                nombre_archivo: lora_info.nombre_archivo,
                almacenamiento_lora: lora_info.almacenamiento_lora || '',
                trigger_words: lora_info.trigger_words || []
            });

            const loraGuardado = await nuevoLora.save();
            nuevoPersonaje.lora.push(loraGuardado._id);
        }

        const personajeGuardado = await nuevoPersonaje.save();
        res.status(201).json({ message: '¡Personaje creado con éxito!', personaje: personajeGuardado });

    } catch (error) {
        res.status(400).json({ message: 'Error al crear el personaje', error: error.message });
    }
});

// ==========================================
// OBTENER PERSONAJES (Con sus Loras e información de la Serie)
// GET: http://localhost:5000/api/personajes
// ==========================================
router.get('/', async (req, res) => {
    try {
        const personajes = await Personaje.find()
            .populate('serie_id', 'nombre tipo')
            .populate('lora');
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los personajes', error: error.message });
    }
});

// ==========================================
// ACTUALIZAR UN PERSONAJE (Campos generales o contadores)
// PUT: http://localhost:5000/api/personajes/:id
// ==========================================
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const camposAActualizar = req.body;

        // Buscamos y actualizamos el personaje con los datos recibidos
        const personajeActualizado = await Personaje.findByIdAndUpdate(
            id,
            { $set: camposAActualizar },
            { new: true } // Devuelve el documento modificado
        ).populate('serie_id', 'nombre tipo').populate('lora');

        if (!personajeActualizado) {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }

        res.json({ message: 'Personaje actualizado con éxito', personaje: personajeActualizado });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el personaje', error: error.message });
    }
});

module.exports = router;