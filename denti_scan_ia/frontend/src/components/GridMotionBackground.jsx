import React from 'react';
import GridMotion from './GridMotion';

// Usamos las 5 imágenes y las repetimos para llenar todos los huecos
const imageNames = [
  'Imagen_1.jpeg',
  'Imagen_2.jpeg',
  'Imagen_3.jpeg',
  'Imagen_4.jpeg',
  'Imagen_5.jpeg',
];

// Creamos un array de URLs de imágenes en vez de elementos <img />
const items = Array.from({ length: 25 }, (_, i) =>
  `/assets/images/${imageNames[i % imageNames.length]}`
);

const GridMotionBackground = ({ opaque = false }) => (
  <div className="fixed inset-0 w-screen h-screen z-0">
    <GridMotion items={items} gradientColor="#0B132B" />
    {opaque && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)', // Puedes ajustar la opacidad aquí
          zIndex: 1,
        }}
      />
    )}
  </div>
);

export default GridMotionBackground;