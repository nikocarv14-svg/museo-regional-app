export default function ApiStatus({ loading, error, success }) {
  if (loading) {
    return (
      <div className="card status-box loading">
        ⏳ Cargando exposiciones desde la API local (http://127.0.0.1:8000)...
      </div>
    );
  }
  if (error) {
    return (
      <div className="card status-box error">
        ❌ Error al conectar con la API: {error}. Asegúrate de ejecutar `uvicorn main:app --port 8000`.
      </div>
    );
  }
  if (success) {
    return (
      <div className="card status-box success">
        ✅ Datos obtenidos con éxito desde la API del Museo Regional
      </div>
    );
  }
  return null;
}