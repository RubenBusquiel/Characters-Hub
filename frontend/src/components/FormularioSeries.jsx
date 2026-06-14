import React, { useState, useEffect } from 'react';
import api from '../services/api';

function FormularioSeries() {
    const [series, setSeries] = useState([]);
    const [datos, setDatos] = useState({ nombre: '', tipo: 'Videojuego' });
    const [mensaje, setMensaje] = useState({ texto: '', error: false });
    const [cargando, setCargando] = useState(true);

    // Al cargar la pantalla, traemos las series que ya existen en MongoDB
    useEffect(() => {
        obtenerSeries();
    }, []);

    const obtenerSeries = async () => {
        try {
            const respuesta = await api.get('/series');
            setSeries(respuesta.data);
            setCargando(false);
        } catch (err) {
            console.error("Error al traer las series:", err);
            setCargando(false);
        }
    };

    const manejarCambio = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        
        if (!datos.nombre.trim()) {
            setMensaje({ texto: 'El nombre de la serie es obligatorio.', error: true });
            return;
        }

        try {
            // Mandamos la nueva serie al backend (POST http://localhost:5000/api/series)
            await api.post('/series', datos);
            
            setMensaje({ texto: `¡Serie "${datos.nombre}" añadida correctamente! 🎉`, error: false });
            setDatos({ nombre: '', tipo: 'Videojuego' }); // Limpiamos formulario
            
            // Recargamos la lista de abajo para que aparezca la nueva serie al segundo
            obtenerSeries();
        } catch (err) {
            console.error(err);
            setMensaje({ texto: 'Error al guardar la serie.', error: true });
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* SECCIÓN 1: FORMULARIO */}
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a' }}>Añadir Nueva Serie / Origen</h3>
                
                {mensaje.texto && (
                    <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '15px', backgroundColor: mensaje.error ? '#ffebee' : '#e8f5e9', color: mensaje.error ? '#c62828' : '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
                        {mensaje.texto}
                    </div>
                )}

                <form onSubmit={enviarFormulario} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <label style={{ flex: 2, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>
                        Nombre de la Serie:
                        <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Ej. Arknights, Genshin Impact..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                    </label>

                    <label style={{ flex: 1, minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>
                        Tipo:
                        <select name="tipo" value={datos.tipo} onChange={manejarCambio} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                            <option value="Videojuego">Videojuego</option>
                            <option value="Anime">Anime</option>
                            <option value="Manga">Manga</option>
                            <option value="Novela">Novela</option>
                            <option value="Original">Original</option>
                        </select>
                    </label>

                    <button type="submit" style={{ padding: '11px 20px', borderRadius: '6px', border: 'none', backgroundColor: '#e0a800', color: '#1a1a1a', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(224,168,0,0.2)' }}>
                        Guardar
                    </button>
                </form>
            </div>

            {/* SECCIÓN 2: TABLA / LISTA DE EXISTENTES */}
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0' }}>
                <h4 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>Series Registradas</h4>
                
                {cargando ? (
                    <p style={{ fontSize: '0.9em', color: '#666' }}>Cargando series... ⏳</p>
                ) : series.length === 0 ? (
                    <p style={{ fontSize: '0.9em', color: '#666' }}>No hay ninguna serie creada todavía.</p>
                ) : (
                    <div style={{ maxHeight: '250px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '6px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95em' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                                    <th style={{ padding: '10px 15px' }}>Nombre</th>
                                    <th style={{ padding: '10px 15px' }}>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {series.map((s) => (
                                    <tr key={s._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 15px', fontWeight: '500' }}>{s.nombre}</td>
                                        <td style={{ padding: '10px 15px' }}>
                                            <span style={{ fontSize: '0.85em', backgroundColor: '#f1f3f5', padding: '3px 8px', borderRadius: '4px', color: '#495057' }}>
                                                {s.tipo}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default FormularioSeries;