import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DetallesPersonaje from './DetallesPersonaje'; // 👈 Importamos el modal

function ListaPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null); // 👈 Estado para el modal
    const [cargando, setCargando] = useState(true);

    useEffect(() => { obtenerPersonajes(); }, []);

    const obtenerPersonajes = async () => {
        try {
            const res = await api.get('/personajes');
            setPersonajes(res.data);
            setCargando(false);
        } catch (err) { setCargando(false); }
    };

    // Función para actualizar los datos en la lista principal cuando el modal cambie algo
    const actualizarPersonajeEnLista = (personajeActualizado) => {
        setPersonajes(personajes.map(p => p._id === personajeActualizado._id ? personajeActualizado : p));
        setPersonajeSeleccionado(personajeActualizado); // Actualizamos también el modal abierto
    };

    if (cargando) return <div style={{ padding: '20px' }}>Cargando...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Mis Personajes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {personajes.map(p => (
                    <div 
                        key={p._id} 
                        onClick={() => setPersonajeSeleccionado(p)} // 👈 Abrimos el modal al hacer clic
                        style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', cursor: 'pointer' }}
                    >
                        <h3 style={{ margin: '0 0 5px 0' }}>{p.nombre}</h3>
                        <p style={{ color: '#007bff', fontSize: '0.8rem', fontWeight: 'bold' }}>{p.serie_id?.nombre || 'Independiente'}</p>
                        
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <div style={{ flex: 1, textAlign: 'center', backgroundColor: '#f1f8e9', padding: '5px', borderRadius: '5px' }}>
                                <span style={{ fontSize: '0.7rem' }}>SFW</span><br/>
                                <strong>{p.pendientes_sfw || 0}</strong>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center', backgroundColor: '#fbe9e7', padding: '5px', borderRadius: '5px' }}>
                                <span style={{ fontSize: '0.7rem' }}>NSFW</span><br/>
                                <strong>{p.pendientes_nsfw || 0}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderizado condicional del Modal */}
            {personajeSeleccionado && (
                <DetallesPersonaje 
                    personaje={personajeSeleccionado} 
                    onClose={() => setPersonajeSeleccionado(null)} 
                    onUpdate={actualizarPersonajeEnLista}
                />
            )}
        </div>
    );
}

export default ListaPersonajes;