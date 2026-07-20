import { useState, useEffect } from 'react';

export default function ReservaForm({ onGuardar, editando, setEditando, exposiciones }) {
  const [visitante, setVisitante] = useState('');
  const [exposicion, setExposicion] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipoEntrada, setTipoEntrada] = useState('General');

  // Si hay exposiciones cargadas y no hemos seleccionado una, elegimos la primera por defecto
  useEffect(() => {
    if (exposiciones && exposiciones.length > 0 && !exposicion) {
      setExposicion(exposiciones[0].nombre);
    }
  }, [exposiciones, exposicion]);

  // Manejar modo edición
  useEffect(() => {
    if (editando) {
      setVisitante(editando.visitante);
      setExposicion(editando.exposicion);
      setFecha(editando.fecha);
      setTipoEntrada(editando.tipoEntrada);
    }
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!visitante.trim() || !fecha) {
      alert('Por favor ingresa el nombre del visitante y la fecha de la visita');
      return;
    }

    onGuardar({
      id: editando ? editando.id : Date.now(),
      visitante,
      exposicion: exposicion || (exposiciones[0]?.nombre || 'General'),
      fecha,
      tipoEntrada
    });

    limpiar();
  };

  const limpiar = () => {
    setVisitante('');
    setFecha('');
    setTipoEntrada('General');
    if (exposiciones && exposiciones.length > 0) {
      setExposicion(exposiciones[0].nombre);
    }
    if (setEditando) setEditando(null);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{editando ? '✏️ Editar Reserva' : '📝 Reservar Visita Guiada'}</h3>
      
      <div className="form-group">
        <label>Nombre del Visitante / Grupo:</label>
        <input 
          type="text" 
          value={visitante} 
          onChange={(e) => setVisitante(e.target.value)} 
          placeholder="Ej: Nicolás Carvallo"
          required
        />
      </div>

      <div className="form-group">
        <label>Exposición a Visitar (Desde la API):</label>
        <select value={exposicion} onChange={(e) => setExposicion(e.target.value)}>
          {exposiciones.map((exp) => (
            <option key={exp.id} value={exp.nombre}>
              {exp.nombre} ({exp.sala})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Fecha de la Visita:</label>
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
          required
        />
      </div>

      <div className="form-group">
        <label>Tipo de Entrada:</label>
        <select value={tipoEntrada} onChange={(e) => setTipoEntrada(e.target.value)}>
          <option value="General">General</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Tercera Edad">Tercera Edad</option>
          <option value="Delegación Escolar">Delegación Escolar</option>
        </select>
      </div>

      <div style={{ marginTop: '15px' }}>
        <button type="submit" className="btn btn-success">
          {editando ? '💾 Actualizar Reserva' : '➕ Guardar Reserva'}
        </button>
        {editando && (
          <button type="button" className="btn btn-secondary" onClick={limpiar} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}