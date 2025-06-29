// src/pages/HomePage.jsx  (o donde lo tengas)

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    // Este div ahora es el contenedor principal del contenido.
    // Ocupa toda la pantalla y centra todo vertical y horizontalmente.
    <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
      
      {/* El título principal */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-4 text-[#ffffff] [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        DentiScan <span className="text-[#3A86FF]">IA</span>
      </motion.h1>

      {/* La frase de bienvenida (la que mencionaste) */}
      <motion.p
        className="text-2xl md:text-3xl mb-6 max-w-3xl font-light text-[#ffffff] [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]" // Usamos font-light para que la frase principal resalte más
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        Cuidar tu sonrisa es cuidar de quienes te rodean.<br />
        <span className="font-semibold text-[#ffffff] [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">La salud comienza con una sonrisa compartida.</span>
      </motion.p>
      
      {/* El subtítulo descriptivo */}
      <motion.p
        className="text-lg md:text-xl mb-8 max-w-2xl text-[#ffffff] [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
      >
        Tu salud dental, analizada con inteligencia artificial. Sube una imagen y recibe un análisis preliminar en segundos.
      </motion.p>

      {/* El botón de llamada a la acción */}
      <Link to="/register"> {/* Asegúrate que la ruta sea /register o la que definiste */}
        <motion.button
          className="bg-[#3A86FF] hover:bg-[#2a75e8]  text-white font-bold py-3 px-8 rounded-full text-xl transition-transform transform duration-300 [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1, type: "spring", stiffness: 120 }}
        >
          Comenzar Análisis
        </motion.button>
      </Link>
    </div>
  );
};

export default HomePage;