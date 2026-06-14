const mongoose = require('mongoose');

const MetricaSchema = new mongoose.Schema({
    personaje_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personaje',
        required: true
    },
    tipo: {
        type: String,
        enum: ['SFW', 'NSFW'],
        required: true
    },
    plataforma: {
        type: String,
        required: [true, 'La plataforma (ej. Twitter, Pixiv, Patreon) es obligatoria'],
        trim: true
    },
    fecha_subida: {
        type: Date,
        required: [true, 'La fecha de subida es obligatoria'],
        default: Date.now
    },
    favs: {
        type: Number,
        default: 0
    },
    rts: {
        type: Number,
        default: 0 // Retweets / Compartidos (puedes dejarlo a 0 si la plataforma no tiene)
    },
    comentarios: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Metrica', MetricaSchema);