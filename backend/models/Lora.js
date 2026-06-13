const mongoose = require('mongoose');

const LoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true,'El nombre del lora es obligatorio'],
        trim: true
    },
    personaje_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personaje', //Conecta el lora a un personaje de la tabla Personaje
        required: true,
    },
    almacenamiento_Lora: {
        type: String, //Ruta de almacenamiento del lora, puede ser local o en la nube
        default: '',
    },
    trigger_words: {
        type: [String], //Palabras clave para activar el lora
        default: []
    },
    tipo:{
        type: String,
        enum: ['Personaje', 'Estilo', 'Pose'],
        default: 'Personaje',
    }
}, { timestamps: true});

module.exports = mongoose.model('Lora', LoraSchema);