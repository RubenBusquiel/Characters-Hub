import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ListaPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Traer los personajes del backend al cargar la pantalla
    useEffect(() => {
        const obtenerPersonajes = async () => {
            try {
                // Hacemos el GET a http://localhost:5000/api/personajes
                const respuesta = await api.get('/personajes');
                setPersonajes(respuesta.data);
                setCargando(false);
            } catch (err) {
                console.error("Error al traer personajes:", err);
                setError("No se pudo conectar con el servidor.");
                setCargando(false);
            }
        };

        obtenerPersonajes();
    }, []);

    if (cargando) return <div style={{ padding: '20px' }}>Cargando tus personajes... ⏳</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>⚠️ {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Mis Personajes</h2>
            
            {personajes.length === 0 ? (
                <p>No hay personajes registrados todavía. ¡Crea el primero!</p>
            ) : (
                // Rejilla responsiva inteligente
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '20px'
                }}>
                    {personajes.map((p) => (
                        <div key={p._id} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '20px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <h3 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>{p.nombre}</h3>
                                
                                {/* Verificación dinámica del tipo de dato de serie_id */}
                                {p.serie_id && (
                                    <span style={{
                                        fontSize: '0.85em',
                                        backgroundColor: '#e3f2fd',
                                        color: '#0d47a1',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        display: 'inline-block'
                                    }}>
                                        {typeof p.serie_id === 'object' ? p.serie_id.nombre : 'Serie Vinculada'}
                                    </span>
                                )}
                                
                                <p style={{ color: '#666', fontSize: '0.9em', marginTop: '12px', minHeight: '40px' }}>
                                    {p.descripcion || <i>Sin descripción disponible.</i>}
                                </p>
                            </div>

                            {/* Contadores SFW / NSFW dinámicos */}
                            <div style={{ 
                                display: 'flex', 
                                gap: '10px', 
                                marginTop: '15px', 
                                borderTop: '1px solid #f0f0f0', 
                                paddingTop: '15px' 
                            }}>
                                <div style={{ flex: 1, textAlign: 'center', backgroundColor: '#f1f8e9', padding: '6px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8em', color: '#33691e', fontWeight: 'bold' }}>SFW</div>
                                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#1b5e20' }}>{p.loras_sfw || 0}</div>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center', backgroundColor: '#fbe9e7', padding: '6px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8em', color: '#bf360c', fontWeight: 'bold' }}>NSFW</div>
                                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#e65100' }}>{p.loras_nsfw || 0}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaPersonajes;