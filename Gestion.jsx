import { useState } from 'react';

export default function Gestion() {
  const [visitante, setVisitante] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    tipoEntrada: '3000',
    cantidad: 1,
  });

  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitante({
      ...visitante,
      [name]: value,
    });
  };

  const calcularTotal = () => {
    const precio = parseInt(visitante.tipoEntrada) || 0;
    const cantidad = parseInt(visitante.cantidad) || 0;
    return precio * cantidad;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservaConfirmada({
      ...visitante,
      total: calcularTotal(),
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Gestión y Registro de Entradas</h2>
      <p>Registre a los visitantes para el ingreso al Museo Regional.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre completo del visitante:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={visitante.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={visitante.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Teléfono de contacto (Precaución/Emergencia):</label>
          <input
            type="tel"
            name="telefono"
            placeholder="+56 9 1234 5678"
            value={visitante.telefono}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Fecha de visita:</label>
          <input
            type="date"
            name="fecha"
            value={visitante.fecha}
            onChange={handleChange}
            required
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
            <option value="3000">General ($3.000)</option>
            <option value="1500">Estudiante / Tercera Edad ($1.500)</option>
            <option value="0">Niños (Gratis - $0)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Cantidad de entradas:</label>
          <input
            type="number"
            name="cantidad"
            min="1"
            value={visitante.cantidad}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '4px', fontWeight: 'bold' }}>
          Precio Total por Pagar: $ {calcularTotal().toLocaleString('es-CL')} CLP
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#3182ce',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Registrar Visita
        </button>
      </form>

      {reservaConfirmada && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #48bb78', borderRadius: '4px', backgroundColor: '#f0fff4' }}>
          <h3>¡Reserva Registrada con Éxito!</h3>
          <p><strong>Visitante:</strong> {reservaConfirmada.nombre}</p>
          <p><strong>Correo:</strong> {reservaConfirmada.email}</p>
          <p><strong>Teléfono:</strong> {reservaConfirmada.telefono}</p>
          <p><strong>Fecha de Visita:</strong> {reservaConfirmada.fecha}</p>
          <p><strong>Cantidad:</strong> {reservaConfirmada.cantidad}</p>
          <p><strong>Total Pagado:</strong> $ {reservaConfirmada.total.toLocaleString('es-CL')} CLP</p>
        </div>
      )}
    </div>
  );
}