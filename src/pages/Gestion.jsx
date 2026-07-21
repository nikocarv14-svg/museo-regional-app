import { useState } from 'react';

export default function Gestion() {
  const [visitante, setVisitante] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    tipoEntrada: 'General',
    precio: 3000,
    cantidad: 1
  });

  const [registrado, setRegistrado] = useState(false);

  // Precios según la entrada elegida
  const listaPrecios = {
    General: 3000,
    Estudiante: 1500,
    'Tercera Edad': 0
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipoEntrada') {
      setVisitante({
        ...visitante,
        tipoEntrada: value,
        precio: listaPrecios[value]
      });
    } else {
      setVisitante({
        ...visitante,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrado(true);
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Gestión y Registro de Entradas</h2>
      <p>Registra a los visitantes para el ingreso al Museo Regional.</p>

      {registrado ? (
        <div style={{ padding: '20px', backgroundColor: '#e6fffa', border: '1px solid #38b2ac', borderRadius: '8px' }}>
          <h3>¡Registro completado con éxito! 🎉</h3>
          <p><strong>Nombre del Visitante:</strong> {visitante.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {visitante.email}</p>
          <p><strong>Teléfono de Contacto / Emergencia:</strong> {visitante.telefono}</p>
          <p><strong>Tipo de Entrada:</strong> {visitante.tipoEntrada}</p>
          <p><strong>Precio unitario:</strong> ${visitante.precio.toLocaleString('es-CL')} CLP</p>
          <p><strong>Cantidad:</strong> {visitante.cantidad}</p>
          <p><strong>Total pagado:</strong> ${(visitante.precio * visitante.cantidad).toLocaleString('es-CL')} CLP</p>
          
          <button 
            onClick={() => setRegistrado(false)} 
            style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}
          >
            Registrar un nuevo visitante
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nombre completo del visitante:</label>
            <input
              type="text"
              name="nombre"
              required
              value={visitante.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              required
              value={visitante.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Teléfono de contacto (Precaución/Emergencia):</label>
            <input
              type="tel"
              name="telefono"
              required
              value={visitante.telefono}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de entrada:</label>
            <select
              name="tipoEntrada"
              value={visitante.tipoEntrada}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="General">General ($3.000)</option>
              <option value="Estudiante">Estudiante / Niño ($1.500)</option>
              <option value="Tercera Edad">Tercera Edad / Convenio (Gratis)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Cantidad de entradas:</label>
            <input
              type="number"
              name="cantidad"
              min="1"
              max="10"
              value={visitante.cantidad}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ backgroundColor: '#f7fafc', padding: '15px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              Precio Total a Pagar: ${(visitante.precio * visitante.cantidad).toLocaleString('es-CL')} CLP
            </p>
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3182ce',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Registrar Visita
          </button>
        </form>
      )}
    </div>
  );
}
