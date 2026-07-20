import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🏛️ Museo Regional</h2>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/gestion">Gestión de Visitas</Link>
        <Link to="/api-externa">Exposiciones (API)</Link>
      </div>
    </nav>
  );
}