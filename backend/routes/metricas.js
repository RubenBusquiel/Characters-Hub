const express = require('express');
const router = express.Router();
const Metrica = require('../models/Metrica');

// ==========================================
// REGISTRAR UNA NUEVA PUBLICACIÓN/MÉTRICA
// POST: http://localhost:5000/api/metricas
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { personaje_id, tipo, plataforma, fecha_subida, favs, rts, comentarios } = req.body;

        const nuevaMetrica = new Metrica({
            personaje_id,
            tipo,
            plataforma,
            fecha_subida,
            favs,
            rts,
            comentarios: comentarios || 0 // Si no se proporciona, se establece en 0
        });

        const metricaGuardada = await nuevaMetrica.save();

        res.status(201).json({ 
            message: 'Métrica registrada exitosamente',
            metrica: metricaGuardada
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al registrar la métrica',
            error: error.message
        });
    }
});

// ==========================================
// OBTENER EL HISTORIAL DE PUBLICACIONES DE UN PERSONAJE
// GET: http://localhost:5000/api/metrics/personaje/:personaje_id
// ==========================================

router.get('/personaje/:personaje_id', async (req, res) => {
    try {
        const { personaje_id } = req.params;

        //Buscamos la s metricas de personaje y las ordenamos de mas reciente a mas antigua
        const historial = await Metrica.find({ personaje_id }).sort({ fecha_subida: -1 });

        res.json(historial);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el historial de métricas',
            error: error.message
        });
    }
});

module.exports = router;
