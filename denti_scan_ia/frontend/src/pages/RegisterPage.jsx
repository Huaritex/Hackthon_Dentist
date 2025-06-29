import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  body: '#F0F2F5',
  formBg: 'white',
  text: '#24135a',
  primary: '#6041bf',
  primaryDark: '#24135a',
  inputBg: 'white',
  inputBorder: '#6041bf',
  inputText: '#24135a',
  placeholder: '#6041bf',
  hover: {
    inputBg: '#6041bf',
    inputText: 'white',
    borderColor: 'white',
  }
};

const darkTheme = {
  body: '#0a0a0a', // Fondo principal casi negro
  formBg: '#1a1a1a', // Fondo del formulario gris muy oscuro
  text: '#E0E0E0',
  primary: '#6041bf', // Morado como color de acento
  primaryDark: '#24135a', // Morado oscuro
  inputBg: '#2a2a2a',
  inputBorder: '#6041bf', // Borde morado
  inputText: 'white',
  placeholder: '#888888',
  hover: {
    inputBg: '#6041bf', // Fondo morado en hover
    inputText: 'white',
    borderColor: 'white',
  }
};

const RegisterPage = ({ setOpaque }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.birthDate || !image) {
      alert('Por favor, completa todos los campos y sube una imagen.');
      return;
    }
    setIsLoading(true);
    if (setOpaque) setOpaque(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('birthDate', formData.birthDate);
    data.append('dentalImage', image);

    try {
      const response = await fetch('http://localhost:8000/analyze_dental_image', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) throw new Error('Error en el backend');
      
      // Redirigir a la página de análisis después de un envío exitoso
      navigate('/analysis');

    } catch (error) {
      alert('Hubo un error al procesar tu solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <PageWrapper>
        <Link to="/" className="home-button">
          Volver al Inicio
        </Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
        <StyledWrapper>
          <form className="form" onSubmit={handleSubmit}>
            <div id="login-area">
              <p>DATOS PARA ANÁLISIS</p>
            </div>
            
            {/* Barra estática para el título */}
            <div className="title-bg" />

            <div id="name-area">
              <input placeholder="NOMBRE COMPLETO" id="name" name="name" className="input" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div id="email-area">
              <input placeholder="EMAIL" id="email" name="email" className="input" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div id="birthdate-area">
              <input placeholder="FECHA DE NACIMIENTO" id="birthDate" name="birthDate" className="input" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={formData.birthDate} onChange={handleInputChange} required />
            </div>

            <div id="image-area">
              <label htmlFor="dentalImage">
                {imagePreview ? <img src={imagePreview} alt="Preview" /> : 'Subir Imagen Dental'}
              </label>
              <input id="dentalImage" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            <div id="submit-area">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Analizando...' : 'Enviar para Análisis'}
              </button>
            </div>

            {/* Barra animada que se mueve */}
            <div id="moving-bg" />
            <div id="whitefilter" />
          </form>
        </StyledWrapper>
      </PageWrapper>
    </ThemeProvider>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  position: relative;
  transition: background-color 0.3s ease;

  .home-button, .theme-toggle {
    position: absolute;
    top: 1rem;
    z-index: 100;
    padding: 0.5rem 1.5rem; /* Más padding horizontal */
    border-radius: 10px; /* Bordes menos redondeados */
    background: ${({ theme }) => theme.formBg};
    color: ${({ theme }) => theme.text};
    border: none; /* Quitamos el borde */
    cursor: pointer;
    font-weight: 600; /* Un poco más grueso */
    text-transform: uppercase; /* Mayúsculas */
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
    /* Sombra dinámica según el tema */
    box-shadow: ${({ theme }) => theme.body === '#F0F2F5' 
      ? '0 8px 15px rgba(0, 0, 0, 0.1)' 
      : '0 8px 15px rgba(255, 255, 255, 0.1)'};

    &:hover {
      background: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.formBg};
      transform: translateY(-2px); /* Efecto de levantamiento */
      box-shadow: ${({ theme }) => theme.body === '#F0F2F5' 
        ? '0 12px 20px rgba(0, 0, 0, 0.2)' 
        : '0 12px 20px rgba(255, 255, 255, 0.2)'};
    }

    &:active {
      transform: translateY(0);
      scale: 0.95;
    }
  }

  .home-button {
    left: 1rem;
  }

  .theme-toggle {
    right: 1rem;
  }
`;

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.formBg};
    width: 35em;
    height: auto;
    padding-bottom: 2em;
    border: 2px solid ${({ theme }) => theme.primaryDark};
    border-bottom-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
    box-shadow:
      -10px 0px 0px ${({ theme }) => theme.primaryDark},
      -10px 5px 5px rgb(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    transition: all 0.25s ease;
  }

  #login-area,
  #name-area,
  #email-area,
  #birthdate-area,
  #image-area,
  #submit-area {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }

  #login-area {
    height: 3.5em;
    color: ${({ theme }) => theme.formBg};
    padding: 0;
  }

  #login-area p {
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    z-index: 2;
  }

  #name-area, #email-area, #birthdate-area {
    height: 4em;
    margin-top: 1em;
  }

  #name-area input, #email-area input, #birthdate-area input {
    width: 100%;
    background-color: ${({ theme }) => theme.inputBg};
    border: 2px solid ${({ theme }) => theme.inputBorder};
    color: ${({ theme }) => theme.inputText};
    border-radius: 0.5em;
    height: 2.5em;
    padding-left: 1em;
    font-size: 0.95em;
    transition: all 0.5s ease;
    outline: none;
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, 0.2);
  }

  #image-area {
    margin-top: 1em;
    height: 10em;
  }

  #image-area label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${({ theme }) => theme.inputBorder};
    border-radius: 0.5em;
    cursor: pointer;
    color: ${({ theme }) => theme.placeholder};
    font-weight: bold;
    transition: all 0.25s ease;
  }
  
  #image-area img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5em;
  }

  #submit-area {
    margin-top: 1.5em;
    height: 4em;
  }

  #submit-area button {
    position: relative; /* Requerido para posicionar los pseudo-elementos */
    background-color: transparent;
    color: transparent;
    font-size: 17px;
    font-weight: 600;
    border-radius: 10px;
    width: 100%;
    height: 60px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.body === '#F0F2F5' 
      ? '0 10px 20px rgba(0, 0, 0, 0.2)' 
      : '0 10px 20px rgba(255, 255, 255, 0.1)'};
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  }

  /* Propiedades comunes para ambas capas de texto */
  #submit-area button::before,
  #submit-area button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  /* Capa que se muestra en hover (¡Listo!) */
  #submit-area button::before {
    content: "¡Listo!";
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.formBg};
    transform: translateY(100%); /* Empieza abajo, fuera de la vista */
  }

  /* Capa que se muestra por defecto (Enviar...) */
  #submit-area button::after {
    content: "Enviar para Análisis";
    background-color: ${({ theme }) => theme.formBg};
    color: ${({ theme }) => theme.primary};
    transform: translateY(0); /* Empieza visible */
  }

  #submit-area button:hover::before {
    transform: translateY(0); /* Se desliza hacia adentro */
  }

  #submit-area button:hover::after {
    transform: translateY(-100%); /* Se desliza hacia afuera */
  }

  #submit-area button:focus {
    outline: none;
  }

  #submit-area button:active {
    scale: 0.95;
  }

  /* Estilo para el estado de carga */
  #submit-area button:disabled {
    color: white;
    background-color: #888;
    cursor: not-allowed;
  }

  #submit-area button:disabled::before,
  #submit-area button:disabled::after {
    content: none; /* Ocultamos los pseudo-elementos al cargar */
  }


  /* Barra de fondo estática para el título */
  .title-bg {
    width: 100%;
    height: 3.5em;
    background-color: ${({ theme }) => theme.primary};
    position: absolute;
    top: 0em;
    z-index: 1;
    box-shadow: inset 5px 0px ${({ theme }) => theme.primaryDark};
  }

  /* Barra de fondo animada */
  #moving-bg {
    width: 100%;
    height: 3.5em;
    background-color: ${({ theme }) => theme.primary};
    position: absolute;
    top: 0em;
    z-index: 1;
    transition: all 0.5s ease;
    box-shadow: inset 5px 0px ${({ theme }) => theme.primaryDark};
    opacity: 0; /* Inicialmente invisible */
  }

  #whitefilter {
    width: 3.5em;
    height: 3.5em;
    top: 2.5px;
    right: 2.5px;
    position: absolute;
    z-index: 2;
    border-top-right-radius: 1.25em;
    box-shadow: 35px -35px 0px -1px ${({ theme }) => theme.formBg};
  }

  ::placeholder {
    color: ${({ theme }) => theme.placeholder};
    font-weight: bold;
  }

  #name-area:hover ~ #moving-bg { opacity: 1; height: 4em; transform: translateY(3.5em); }
  #email-area:hover ~ #moving-bg { opacity: 1; height: 4em; transform: translateY(8.5em); }
  #birthdate-area:hover ~ #moving-bg { opacity: 1; height: 4em; transform: translateY(13.5em); }
  #image-area:hover ~ #moving-bg { opacity: 1; height: 10em; transform: translateY(18.5em); }
  #submit-area:hover ~ #moving-bg { opacity: 1; height: 4em; transform: translateY(30em); }

  #name-area:hover input,
  #email-area:hover input,
  #birthdate-area:hover input {
    color: ${({ theme }) => theme.hover.inputText};
    border: 2px solid ${({ theme }) => theme.hover.borderColor};
    background-color: ${({ theme }) => theme.hover.inputBg};
    height: 3em;
  }
  
  #image-area:hover label {
    background-color: ${({ theme }) => theme.hover.inputBg};
    color: ${({ theme }) => theme.hover.inputText};
    border-color: ${({ theme }) => theme.hover.borderColor};
  }

  #submit-area:hover button:not(:disabled) {
    border: 2px solid ${({ theme }) => theme.hover.borderColor};
    background-color: ${({ theme }) => theme.hover.inputBg};
    height: 3em;
  }

  #submit-area button:active {
    color: ${({ theme }) => theme.hover.inputBg};
    background-color: ${({ theme }) => theme.hover.inputText};
    width: 90%;
  }

  #name-area:hover ::placeholder,
  #email-area:hover ::placeholder,
  #birthdate-area:hover ::placeholder {
    color: ${({ theme }) => theme.hover.inputText};
  }
`;

export default RegisterPage;