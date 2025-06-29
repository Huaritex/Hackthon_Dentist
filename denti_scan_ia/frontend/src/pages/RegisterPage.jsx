import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPage = ({ setOpaque }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0B132B]">
      <StyledWrapper>
        <form className="form" onSubmit={handleSubmit}>
          <div id="login-area">
            <p>AYUDA CON LOS DATOS PARA ANALISIS</p>
          </div>

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

          <div id="background-color" />
          <div id="whitefilter" />
        </form>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 35em; /* Ancho aumentado para ser más horizontal */
    height: auto;
    padding-bottom: 2em;
    border: 2px solid #24135a;
    border-bottom-left-radius: 1.5em;
    border-top-right-radius: 1.5em;
    box-shadow:
      -10px 0px 0px #24135a,
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
    color: white;
    padding: 0;
  }

  #login-area p {
    top: 0.35em;
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    z-index: 2;
  }

  #login-area #behind {
    top: 60%;
    font-size: 1em;
    font-weight: bold;
    position: absolute;
    z-index: 1;
  }

  #behind {
    position: absolute;
    left: 1em;
    color: #6041bf;
  }

  #name-area, #email-area, #birthdate-area {
    height: 4em;
    margin-top: 1em;
  }

  #name-area input, #email-area input, #birthdate-area input {
    width: 100%;
    border: 2px solid #6041bf;
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
    border: 2px dashed #6041bf;
    border-radius: 0.5em;
    cursor: pointer;
    color: #6041bf;
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
    width: 100%;
    border: 2px solid #6041bf;
    border-radius: 0.5em;
    height: 2.5em;
    font-size: 0.95em;
    transition: all 0.25s ease;
    color: white;
    font-weight: bold;
    background-color: #6041bf;
    box-shadow: 0px 5px 5px -3px rgb(0, 0, 0, 0.2);
  }

  #background-color {
    width: 100%;
    height: 3.5em;
    background-color: #6041bf;
    position: absolute;
    top: 0em;
    z-index: 1;
    transition: all 0.5s ease;
    box-shadow: inset 5px 0px #24135a;
  }

  #whitefilter {
    width: 3.5em;
    height: 3.5em;
    top: 2.5px;
    right: 2.5px;
    position: absolute;
    z-index: 2;
    border-top-right-radius: 1.25em;
    box-shadow: 35px -35px 0px -1px white;
  }

  ::placeholder {
    color: #6041bf;
    font-weight: bold;
  }

  /* --- ANIMATION FIX --- */

  #name-area:hover ~ #background-color { height: 4em; transform: translateY(3.5em); }
  #email-area:hover ~ #background-color { height: 4em; transform: translateY(8.5em); }
  #birthdate-area:hover ~ #background-color { height: 4em; transform: translateY(13.5em); }
  #image-area:hover ~ #background-color { height: 10em; transform: translateY(18.5em); }
  #submit-area:hover ~ #background-color { height: 4em; transform: translateY(30em); }

  #name-area:hover input,
  #email-area:hover input,
  #birthdate-area:hover input {
    color: white;
    border: 2px solid white;
    background-color: #6041bf;
    height: 3em;
  }
  
  #image-area:hover label {
    background-color: #6041bf;
    color: white;
    border-color: white;
  }

  #submit-area:hover button {
    border: 2px solid white;
    background-color: #6041bf;
    height: 3em;
  }

  #submit-area button:active {
    color: #6041bf;
    background-color: white;
    width: 90%;
  }

  #name-area:hover ::placeholder,
  #email-area:hover ::placeholder,
  #birthdate-area:hover ::placeholder {
    color: white;
  }
`;

export default RegisterPage;