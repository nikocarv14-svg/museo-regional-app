import { useState, useEffect } from 'react';
import ApiStatus from '../components/ApiStatus';

const DATOS_MUSEO = [
  { id: 1, nombre: 'Pueblos australes', artista: 'Colección permanente', sala: 'Sala 1', descripcion: 'Historia de los pueblos de Aysén', disponible: true, imagen: 'https://placehold.co/400x300?text=Pueblos' },
  { id: 2, nombre: 'Fotografía patagónica', artista: 'Varios autores', sala: 'Sala 2', descripcion: 'Paisajes de la Patagonia', disponible: true, imagen: 'https://placehold.co/400x300?text=Fotografia' },
  { id: 3, nombre: 'Arte textil', artista: 'Artesanas locales', sala: 'Sala 3', descripcion: 'Telares tradicionales', disponible: true, imagen: 'https://placehold.co/400x300?text=Textil' },
  { id: 4, nombre: 'Fauna nativa', artista: 'Ciencias naturales', sala: 'Sala 4', descripcion: 'Especies de la región', disponible: false, imagen: 'https://placehold.co/400x300?text=Fauna' },
  { id: 5, nombre: 'Pintura contemporánea', artista: 'Colectivo Río', sala: 'Sala 5', descripcion: 'Obras de autores jóvenes', disponible: true, imagen: 'https://placehold.co/400x300?text=Pintura' }
];

export default function ApiExterna() {
  const [exposiciones, setExposiciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setExposiciones(DATOS_MUSEO);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <h2>Cartelera Oficial de Exposiciones (API Museo Regional)</h2>
      
      <ApiStatus loading={loading} error={error} success={!loading && !error} />

      {!loading && !error && (
        <div className="api-grid">
          {exposiciones.map((exp) => (
            <div key={exp.id} className="card">
              <img 
                src={exp.imagen} 
                alt={exp.nombre} 
                style={{ width: '100%', borderRadius: '6px', marginBottom: '15px', objectFit: 'cover' }} 
              />
              <h3>{exp.nombre}</h3>
              <p><strong>Artista / Origen:</strong> {exp.artista}</p>
              <p><strong>Ubicación:</strong> <span className="badge">{exp.sala}</span></p>
              <p>{exp.descripcion}</p>
              <p>
                <strong>Estado: </strong> 
                <span className={`badge ${exp.disponible ? 'status-Activo' : 'status-Inactivo'}`}>
                  {exp.disponible ? '🟢 Disponible' : '🔴 No Disponible'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}