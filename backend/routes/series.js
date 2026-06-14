const express = require('express');
const router = express.Router();
const Serie = require('../models/Serie');

// ==========================================
// OBTENER TODAS LAS SERIES
// GET: http://localhost:5000/api/series
// ==========================================
router.get('/', async (req, res) => {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener las series', error: error.message});
    }
});

// ==========================================
// CREAR UNA NUEVA SERIE (Global)
// POST: http://localhost:5000/api/series
// ==========================================
router.post('/', async (req, res) => {
    try {
        const { nombre, tipo } = req.body;

        const nuevaSerie = new Serie({ nombre, tipo });
        const serieGuardada = await nuevaSerie.save();

        res.status(201).json({message: 'Serie creada exitosamente', serie: serieGuardada});
    } catch (error) {
        res.status(400).json({message: 'Error al crear la serie', error: error.message});
    }   
    
});

module.exports = router;