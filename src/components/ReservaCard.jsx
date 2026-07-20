export default function ReservaCard({ reserva, onEditar, onEliminar }) {
  return (
    <div className="card item-card">
      <h3>👤 Visitante: {reserva.visitante}</h3>
      <p><strong>Exposición:</strong> {reserva.exposicion}</p>
      <p><strong>Fecha:</strong> {reserva.fecha}</p>
      <p><strong>Entrada:</strong> <span className="badge">{reserva.tipoEntrada}</span></p>
      <div className="card-actions">
        <button className="btn btn-warning" onClick={() => onEditar(reserva)}>
          ✏️ Editar
        </button>
        <button className="btn btn-danger" onClick={() => onEliminar(reserva.id)}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}