import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CamposGrid from './pages/CamposGrid';
import CampoDetail from './pages/CampoDetail';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campos" element={<CamposGrid />} />
          <Route path="/campos/:id" element={<CampoDetail />} />
          <Route path="/nosotros" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
