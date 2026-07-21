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
  const [reservas, setReservas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

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
    const totalCalculado = calcularTotal();

    if (editandoId !== null) {
      // Editar registro existente
      const actualizadas = reservas.map((res) => {
        if (res.id === editandoId) {
          return { ...visitante, id: editandoId, total: totalCalculado };
        }
        return res;
      });
      setReservas(actualizadas);
      setEditandoId(null);
    } else {
      // Agregar nuevo registro
      const nuevaReserva = {
        ...visitante,
        id: Date.now(),
        total: totalCalculado,
      };
      setReservas([...reservas, nuevaReserva]);
    }

    setReservaConfirmada({
      ...visitante,
      total: totalCalculado,
    });

    // Limpiar formulario
    setVisitante({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      tipoEntrada: '3000',
      cantidad: 1,
    });
  };

  const handleEditar = (res) => {
    setVisitante({
      nombre: res.nombre,
      email: res.email,
      telefono: res.telefono,
      fecha: res.fecha,
      tipoEntrada: res.tipoEntrada,
      cantidad: res.cantidad,
    });
    setEditandoId(res.id);
  };

  const handleEliminar = (id) => {
    setReservas(reservas.filter((res) => res.id !== id));
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
            backgroundColor: editandoId !== null ? '#2b6cb0' : '#3182ce',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {editandoId !== null ? 'Guardar Cambios' : 'Registrar Visita'}
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

      {/* SECCIÓN DE LISTADO Y ACCIONES DE EDITAR / ELIMINAR */}
      {reservas.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Registros Guardados</h3>
          {reservas.map((res) => (
            <div
              key={res.id}
              style={{
                border: '1px solid #ccc',
                padding: '12px',
                borderRadius: '4px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{res.nombre}</strong> - {res.fecha}
                <br />
                <small>{res.email} | Tel: {res.telefono}</small>
                <br />
                <small>Total: ${res.total.toLocaleString('es-CL')} CLP</small>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => handleEditar(res)}
                  style={{ backgroundColor: '#ecc94b', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(res.id)}
                  style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}