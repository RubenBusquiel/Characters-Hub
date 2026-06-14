// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


// MIDDLEWARES
app.use(cors()); /// Permite peticiones desde aplicaciones externas(movil/escritorio)
app.use(express.json()); /// Permite recibir datos en formato JSON.

// CONEXION A MONGOOSE
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexión a MongoDB exitosa'))
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// RUTAS
// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: "¡Bienvenido a la API de Character Hub!" });
});

// Ruta de personajes (ENLAZADA AQUÍ)
const rutasSeries = require('./routes/series');
const rutasPersonajes = require('./routes/personajes');
const rutasLoras = require('./routes/loras');
const rutasMetricas = require('./routes/metricas');

app.use('/api/series', rutasSeries); /// Todas las rutas de series empezarán por /api/...
app.use('/api/personajes', rutasPersonajes); /// Todas las rutas de personajes empezarán por /api/...
app.use('/api/loras', rutasLoras); /// Todas las rutas de loras empezarán por /api/...
app.use('/api/metricas', rutasMetricas); /// Todas las rutas de métricas empezarán por /api/...

// ARRANQUE DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
});