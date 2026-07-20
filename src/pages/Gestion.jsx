import { useState, useEffect } from 'react';
import ReservaForm from '../components/ReservaForm';
import ReservaCard from '../components/ReservaCard';

const EXPOSICIONES_BASE = [
  { id: 1, nombre: 'Pueblos australes', sala: 'Sala 1' },
  { id: 2, nombre: 'Fotografía patagónica', sala: 'Sala 2' },
  { id: 3, nombre: 'Arte textil', sala: 'Sala 3' },
  { id: 4, nombre: 'Fauna nativa', sala: 'Sala 4' },
  { id: 5, nombre: 'Pintura contemporánea', sala: 'Sala 5' }
];

export default function Gestion() {
  const [reservas, setReservas] = useState([]);
  const [editando, setEditando] = useState(null);

  // Cargar reservas desde LocalStorage al iniciar
  useEffect(() => {
    const dataGuardada = JSON.parse(localStorage.getItem('museo_reservas')) || [];
    setReservas(dataGuardada);
  }, []);

  const guardarReserva = (reserva) => {
    let actualizadas;
    if (editando) {
      actualizadas = reservas.map(r => r.id === reserva.id ? reserva : r);
      setEditando(null);
    } else {
      actualizadas = [...reservas, reserva];
    }
    setReservas(actualizadas);
    localStorage.setItem('museo_reservas', JSON.stringify(actualizadas));
  };

  const eliminarReserva = (id) => {
    const filtradas = reservas.filter(r => r.id !== id);
    setReservas(filtradas);
    localStorage.setItem('museo_reservas', JSON.stringify(filtradas));
  };

  return (
    <div className="container">
      <h2>Gestión de Visitas Guiadas (CRUD + LocalStorage)</h2>
      
      <div className="layout-grid">
        <div>
          <ReservaForm 
            onGuardar={guardarReserva} 
            editando={editando} 
            setEditando={setEditando}
            exposiciones={EXPOSICIONES_BASE}
          />
        </div>

        <div>
          <h3>Reservas Registradas ({reservas.length})</h3>
          {reservas.length === 0 ? (
            <div className="card"><p>No hay reservas agendadas. Agrega una desde el formulario.</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {reservas.map((reserva) => (
                <ReservaCard 
                  key={reserva.id} 
                  reserva={reserva} 
                  onEditar={setEditando} 
                  onEliminar={eliminarReserva} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}