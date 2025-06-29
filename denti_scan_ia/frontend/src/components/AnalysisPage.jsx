import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Usar imágenes desde public/assets
const dentalScanResult = '/assets/dental-scan-result.jpg';
const iconCavity = '/assets/icon-cavity.png';
const iconHealthScore = '/assets/icon-health-score.png';

const AnalysisPage = () => {
  return (
    <PageWrapper>
      <CardWrapper>
        <div className="card">
          <div className="card-content">
            {/* Layout de dos columnas */}
            <div className="analysis-grid">
              {/* Columna Izquierda: Imagen */}
              <div className="image-column">
                <img src={dentalScanResult} alt="Resultado del escaneo dental" className="main-image" />
              </div>

              {/* Columna Derecha: Contenido */}
              <div className="content-column">
                <h1 className="heading">Análisis de DentiScan IA</h1>
                
                <div className="findings-section">
                  <h2>Hallazgos Clave</h2>
                  <div className="findings-grid">
                    <div className="finding-card">
                      <img src={iconCavity} alt="Icono de caries" />
                      <div>
                        <h3>Probabilidad de Caries</h3>
                        <p>Baja</p>
                      </div>
                    </div>
                    <div className="finding-card">
                      <img src={iconHealthScore} alt="Icono de salud" />
                      <div>
                        <h3>Puntaje de Salud Dental</h3>
                        <p>4.5/5 Estrellas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="recommendations-section">
                  <h2>Análisis y Recomendaciones</h2>
                  <p>
                    Basado en tu imagen, el análisis de IA indica una baja probabilidad de caries. El puntaje de salud general es bueno. Sin embargo, para una evaluación completa, se recomienda consultar a un profesional.
                  </p>
                </div>

                <div className="footer-section">
                  <button>Ver Detalles Interactivos</button>
                  <Link to="/" className="home-link">Volver al Inicio</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: rgba(11, 19, 43, 0.7); /* Fondo semitransparente */
  backdrop-filter: blur(10px); /* Efecto de desenfoque */
`;

const CardWrapper = styled.div`
  width: 80vw;
  max-width: 1400px;
  height: auto; /* Altura dinámica */

  .card {
    width: 100%;
    height: 100%;
    background: #07182E;
    position: relative;
    display: flex;
    overflow: hidden;
    border-radius: 20px;
  }

  .card-content {
    z-index: 1;
    color: white;
    padding: 0; /* Sin padding para que el grid ocupe todo */
    width: 100%;
    height: 100%;
  }

  .card::before {
    content: '';
    position: absolute;
    width: 150%; /* Aumentado para cubrir todo el borde */
    height: 150%; /* Aumentado para cubrir todo el borde */
    background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: '';
    position: absolute;
    background: #07182E;
    inset: 5px;
    border-radius: 15px;
  }

  .analysis-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr; /* Dos columnas */
    width: 100%;
    height: 100%;
  }

  .image-column {
    width: 100%;
    height: 100%;
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px; /* Bordes redondeados para la imagen */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5); /* Sombra para resaltar */
  }

  .content-column {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .heading {
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
  }

  .findings-section h2, .recommendations-section h2 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .findings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .finding-card {
    background: #1a1a1a;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .finding-card img {
    width: 40px;
  }

  .finding-card h3 {
    font-size: 1rem;
    font-weight: bold;
  }

  .recommendations-section {
    background: #1a1a1a;
    padding: 1rem;
    border-radius: 8px;
  }

  .recommendations-section p {
    font-size: 1rem;
    line-height: 1.5;
  }

  .footer-section {
    margin-top: auto; /* Empuja al final */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-section button, .home-link {
    background: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }
`;

export default AnalysisPage;
