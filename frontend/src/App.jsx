import React, { useState } from 'react';
import ListaPersonajes from './components/ListaPersonajes';
import FormularioPersonaje from './components/FormularioPersonaje';
import FormularioSeries from './components/FormularioSeries';
//import FormularioMetricas from './components/FormularioMetricas';

function App() {
  const [vista, setVista] = useState('personajes');
  const [actualizarDisparador, setActualizarDisparador] = useState(0);

  // Truco rápido para refrescar la lista de personajes automáticamente al crear uno nuevo
  const refrescarLista = () => {
    setActualizarDisparador(prev => prev + 1);
    setVista('personajes'); // Nos manda de vuelta a la lista para ver el resultado
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#20232a', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Character-Hub 🚀</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setVista('personajes')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: vista === 'personajes' ? '#007bff' : '#444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            Personajes
          </button>
          <button onClick={() => setVista('nuevo-personaje')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: vista === 'nuevo-personaje' ? '#2e7d32' : '#444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Personaje
          </button>
          <button onClick={() => setVista('series')} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: vista === 'series' ? '#007bff' : '#444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            + Serie
          </button>
        </nav>
      </header>
      
      <main style={{ padding: '20px' }}>
        {vista === 'personajes' && <ListaPersonajes key={actualizarDisparador} />}
        {vista === 'nuevo-personaje' && <FormularioPersonaje alAñadirPersonaje={refrescarLista} />}
        {vista === 'series' && <FormularioSeries />}
      </main>
    </div>
  );
}

export default App;