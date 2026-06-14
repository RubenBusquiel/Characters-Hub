import React, { useState, useEffect } from 'react';
import api from '../services/api';

function FormularioPersonaje({ alAñadirPersonaje }) {
    const [series, setSeries] = useState([]);
    const [datos, setDatos] = useState({
        nombre: '',
        descripcion: '',
        serie_id: ''
    });
    const [mensaje, setMensaje] = useState({ texto: '', error: false });

    // Traer las series disponibles para el desplegable
    useEffect(() => {
        api.get('/series')
            .then(res => setSeries(res.data))
            .catch(err => console.error("Error al cargar series:", err));
    }, []);

    const manejarCambio = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        
        if (!datos.nombre.trim()) {
            setMensaje({ texto: 'El nombre del personaje es obligatorio.', error: true });
            return;
        }

        try {
            // Mandamos los datos limpios al backend
            const payload = {
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                // Si no se selecciona serie, mandamos undefined para que Mongoose no intente meter un string vacío como ObjectId
                serie_id: datos.serie_id || undefined 
            };

            const respuesta = await api.post('/personajes', payload);
            
            setMensaje({ texto: `¡${datos.nombre} ha sido registrado con éxito! 🎉`, error: false });
            
            // Limpiamos el formulario
            setDatos({ nombre: '', descripcion: '', serie_id: '' });
            
            // Si pasamos una función para actualizar la lista principal, la ejecutamos
            if (alAñadirPersonaje) alAñadirPersonaje();

        } catch (err) {
            console.error(err);
            setMensaje({ texto: err.response?.data?.message || 'Error al registrar el personaje.', error: true });
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a' }}>Nuevo Personaje</h3>

            {mensaje.texto && (
                <div style={{ padding: '10px', borderRadius: '6px', marginBottom: '15px', backgroundColor: mensaje.error ? '#ffebee' : '#e8f5e9', color: mensaje.error ? '#c62828' : '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
                    {mensaje.texto}
                </div>
            )}

            <form onSubmit={enviarFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>
                    Nombre del Personaje:
                    <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} placeholder="Ej. Endministrator" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>
                    Serie / Origen:
                    <select name="serie_id" value={datos.serie_id} onChange={manejarCambio} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                        <option value="">-- Sin serie (Independiente) --</option>
                        {series.map(s => (
                            <option key={s._id} value={s._id}>{s.nombre}</option>
                        ))}
                    </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold', fontSize: '0.9em' }}>
                    Descripción o Notas:
                    <textarea name="descripcion" value={datos.descripcion} onChange={manejarCambio} placeholder="Detalles de diseño, tags clave o lore..." rows="3" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical', fontFamily: 'inherit' }} />
                </label>

                <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#2e7d32', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(46,125,50,0.2)' }}>
                    Guardar Personaje
                </button>
            </form>
        </div>
    );
}

export default FormularioPersonaje;