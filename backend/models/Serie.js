const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true,'El nombre de la serie es obligatorio'],
        unique: true,
        trim: true
    },
    tipo: {
        type: String,
        enum: ['Anime', 'Videojuego', 'Manga', 'Libro', 'OC'],
        default: 'Anime',
    }    
}, {
    timestamps: true});

module.exports = mongoose.model('Serie', SerieSchema);