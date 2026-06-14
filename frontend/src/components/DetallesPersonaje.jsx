import React, { useState } from 'react';
import api from '../services/api';

function DetallesPersonaje({ personaje, onClose, onUpdate }) {
    const [cargando, setCargando] = useState(false);

    // Función para actualizar los contadores en el servidor
    const modificarContador = async (campo, operacion) => {
        if (cargando) return;
        
        setCargando(true);
        const valorActual = personaje[campo] || 0;
        const nuevoValor = operacion === 'sumar' ? valorActual + 1 : Math.max(0, valorActual - 1);

        try {
            // Usamos la ruta PUT que acabamos de crear en el backend
            const respuesta = await api.put(`/personajes/${personaje._id}`, {
                [campo]: nuevoValor
            });

            // Notificamos al componente padre que los datos han cambiado
            onUpdate(respuesta.data.personaje);
        } catch (error) {
            console.error("Error al actualizar contador:", error);
            alert("Error al conectar con la base de datos.");
        } finally {
            setCargando(false);
        }
    };

    if (!personaje) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Botón de cerrar */}
                <button onClick={onClose} style={styles.closeButton}>&times;</button>
                
                <h2 style={styles.titulo}>{personaje.nombre}</h2>
                <p style={styles.serie}>{personaje.serie_id?.nombre || 'Independiente'}</p>
                
                <hr style={styles.divider} />

                <div style={styles.controlesContainer}>
                    {/* Control SFW */}
                    <div style={styles.controlBlock}>
                        <span style={styles.label}>PENDIENTES SFW</span>
                        <div style={styles.contadorRow}>
                            <button 
                                onClick={() => modificarContador('pendientes_sfw', 'restar')} 
                                style={styles.btnMenos}
                                disabled={cargando}
                            >-</button>
                            <span style={styles.numero}>{personaje.pendientes_sfw || 0}</span>
                            <button 
                                onClick={() => modificarContador('pendientes_sfw', 'sumar')} 
                                style={styles.btnMas}
                                disabled={cargando}
                            >+</button>
                        </div>
                    </div>

                    {/* Control NSFW */}
                    <div style={styles.controlBlock}>
                        <span style={styles.label}>PENDIENTES NSFW</span>
                        <div style={styles.contadorRow}>
                            <button 
                                onClick={() => modificarContador('pendientes_nsfw', 'restar')} 
                                style={styles.btnMenos}
                                disabled={cargando}
                            >-</button>
                            <span style={styles.numero}>{personaje.pendientes_nsfw || 0}</span>
                            <button 
                                onClick={() => modificarContador('pendientes_nsfw', 'sumar')} 
                                style={styles.btnMas}
                                disabled={cargando}
                            >+</button>
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    <p style={styles.descripcion}>{personaje.descripcion || 'Sin notas adicionales.'}</p>
                </div>
            </div>
        </div>
    );
}

// Estilos rápidos y responsivos (Inline para no romper nada)
const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
    modal: { backgroundColor: '#fff', padding: '30px', borderRadius: '16px', width: '100%', maxWidth: '450px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    closeButton: { position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' },
    titulo: { margin: '0 0 5px 0', fontSize: '1.8rem', color: '#1a1a1a' },
    serie: { margin: 0, color: '#007bff', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' },
    divider: { margin: '20px 0', border: '0', borderTop: '1px solid #eee' },
    controlesContainer: { display: 'flex', flexDirection: 'column', gap: '25px' },
    controlBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
    label: { fontSize: '0.8rem', fontWeight: 'bold', color: '#666' },
    contadorRow: { display: 'flex', alignItems: 'center', gap: '20px' },
    numero: { fontSize: '2.5rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' },
    btnMas: { width: '50px', height: '50px', borderRadius: '12px', border: 'none', backgroundColor: '#28a745', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' },
    btnMenos: { width: '50px', height: '50px', borderRadius: '12px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333', fontSize: '1.5rem', cursor: 'pointer' },
    footer: { marginTop: '30px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' },
    descripcion: { margin: 0, fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }
};

export default DetallesPersonaje;