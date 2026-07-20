import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Gestion from './pages/Gestion';
import ApiExterna from './pages/ApiExterna';

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/api-externa" element={<ApiExterna />} />
        </Routes>
      </main>
    </div>
  );
}