import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GridMotionBackground from './components/GridMotionBackground';
import RegisterPage from './pages/RegisterPage';
import AnalysisPage from './components/AnalysisPage';
import HomePage from './pages/HomePage';
import './index.css';

// Puedes crear AboutPage y ContactPage como componentes simples o importarlos si ya existen
const AboutPage = () => <div className="text-white text-4xl text-center p-20">About Page</div>;
const ContactPage = () => <div className="text-white text-4xl text-center p-20">Contact Page</div>;

function App() {
  const [opaque, setOpaque] = useState(false);

  return (
    <Router>
      <div className="relative w-screen h-screen overflow-hidden bg-[#0B132B]">
        {/* Fondo animado global, siempre detrás */}
        <GridMotionBackground opaque={opaque} />
        {/* Contenido de la app, siempre encima del fondo */}
        <div className="absolute inset-0 z-10 overflow-y-auto flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage setOpaque={setOpaque} />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;