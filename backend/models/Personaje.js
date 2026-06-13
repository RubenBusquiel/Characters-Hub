const mongoose = require('mongoose');

const PersonajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true,'El nombre del personaje es obligatorio'],
        trim: true
    },
    serie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie', //Conecta el personaje a una de las series de la tabla Serie
        required: true,
    }, 
    lora:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lora'
    }],
    pendientes_sfw: {
        type: Number,
        default: 0
    },
    pendientes_nsfw:{
        type: Number,
        default: 0
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', //Conecta el personaje a un usuario de la tabla Usuario
        //required: true,
    }
}, { timestamps: true});

module.exports = mongoose.model('Personaje', PersonajeSchema);