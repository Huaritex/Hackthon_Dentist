# 🦷 DentiScan IA

DentiScan IA es un sistema innovador diseñado para el análisis de imágenes dentales utilizando inteligencia artificial. Su objetivo principal es facilitar la detección temprana de problemas bucodentales, proporcionando una herramienta de apoyo tanto para profesionales de la odontología como para pacientes.

## 🚀 Características Principales

-   **Carga de Imágenes Dentales**: Permite a los usuarios subir imágenes de sus dientes de forma sencilla.
-   **Análisis con IA**: Utiliza un modelo de inteligencia artificial para analizar las imágenes y detectar posibles anomalías.
-   **Registro de Pacientes**: Almacena información relevante de los pacientes junto con sus análisis.
-   **Interfaz Amigable**: Cuenta con una interfaz de usuario intuitiva y fácil de usar desarrollada en React.
-   **API Robusta**: Backend desarrollado con FastAPI para gestionar las solicitudes y la lógica del negocio.
-   **Base de Datos NoSQL**: Utiliza MongoDB para almacenar los datos de forma flexible y escalable.

## 🛠️ Tecnologías Utilizadas

**Backend:**

-   Python
-   FastAPI
-   MongoDB (a través de Pymongo)
-   Uvicorn (servidor ASGI)
-   Gunicorn (servidor WSGI para producción)

**Frontend:**

-   React.js
-   Vite (empaquetador y servidor de desarrollo)
-   Tailwind CSS
-   Axios (para peticiones HTTP)
-   React Router
-   Framer Motion (para animaciones)
-   tsparticles (para fondos animados)

## 🏗️ Estructura del Proyecto

```
denti_scan_ia/
├── backend/                  # Código del servidor (Python + FastAPI)
│   ├── API_Conecction-Joe/  # Módulo específico (posiblemente en desarrollo o integrado)
│   │   ├── app.py
│   │   ├── guardar_imagen_dentiscan.py
│   │   ├── mongo_utils.py
│   │   └── mostrar_imagen.py
│   ├── uploads/             # Directorio donde se guardan las imágenes subidas
│   ├── venv/                # Entorno virtual de Python (si se crea dentro)
│   ├── cert.pem             # Certificado SSL (para HTTPS)
│   ├── key.pem              # Clave privada SSL (para HTTPS)
│   ├── check_mongodb.py     # Script para verificar la conexión a MongoDB
│   ├── ia_integration.py    # Módulo para la integración con el modelo de IA (suposición)
│   ├── main.py              # Aplicación principal de FastAPI (punto de entrada del backend)
│   └── requirements.txt     # Dependencias de Python
├── frontend/               # Aplicación cliente (React + Vite)
│   ├── node_modules/        # Dependencias de Node.js
│   ├── public/              # Archivos estáticos (ej: favicon, imágenes)
│   ├── src/                 # Código fuente de la aplicación React
│   │   ├── assets/          # Recursos como imágenes, fuentes, etc.
│   │   ├── components/      # Componentes reutilizables de React
│   │   ├── pages/           # Componentes que representan páginas completas
│   │   ├── App.jsx          # Componente raíz de la aplicación
│   │   ├── index.css        # Estilos globales o base de Tailwind
│   │   └── main.jsx         # Punto de entrada de la aplicación React
│   ├── .eslintrc.cjs        # Configuración de ESLint (lintern)
│   ├── index.html           # Archivo HTML principal
│   ├── package-lock.json    # Versiones exactas de las dependencias npm
│   ├── package.json         # Metadatos del proyecto y dependencias npm
│   ├── postcss.config.js    # Configuración de PostCSS (usado por Tailwind)
│   ├── tailwind.config.js   # Configuración de Tailwind CSS
│   └── vite.config.js       # Configuración de Vite
└── README.md                 # Este archivo (documentación principal)
```

## ⚙️ Instalación y Configuración

### Requisitos Previos

-   Python 3.8 o superior
-   Node.js 16 o superior (incluye npm)
-   MongoDB 6.0 o superior

### 1. Configuración del Backend

```bash
# 1. Navegar al directorio del backend
cd denti_scan_ia/backend

# 2. Crear y activar un entorno virtual (recomendado)
# En Windows:
python -m venv venv
.\venv\Scripts\activate
# En macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# 3. Instalar las dependencias de Python
pip install -r requirements.txt

# 4. Configurar variables de entorno (opcional, revisar main.py para valores por defecto)
# Puedes crear un archivo .env en el directorio backend/ con el siguiente contenido:
# MONGO_URI=mongodb://localhost:27017/
# MONGO_DB_NAME=DentiScan-AI--Proyect
# (Asegúrate de que MongoDB esté corriendo en la URI especificada)

# 5. Iniciar el servidor de desarrollo del backend
# El servidor por defecto se ejecutará en http://localhost:8000
uvicorn main:app --reload
```

### 2. Configuración del Frontend

```bash
# 1. Navegar al directorio del frontend (desde la raíz del proyecto)
cd denti_scan_ia/frontend

# 2. Instalar las dependencias de Node.js
npm install
# o si prefieres yarn:
# yarn install

# 3. Iniciar el servidor de desarrollo del frontend
npm run dev
# o si prefieres yarn:
# yarn dev
# La aplicación frontend generalmente se ejecutará en http://localhost:5173 (revisar la salida de la consola)
```

### 3. Configuración de MongoDB

1.  **Descargar e Instalar**: Obtén MongoDB Community Server desde [su sitio web oficial](https://www.mongodb.com/try/download/community).
2.  **Iniciar el Servicio**:
    *   **Windows**: Busca "Services" en el menú de inicio y asegúrate de que el servicio "MongoDB Server" (o similar) esté en ejecución.
    *   **macOS** (si instalaste con Homebrew): `brew services start mongodb-community`
    *   **Linux** (dependiendo de la instalación): `sudo systemctl start mongod` o `sudo service mongod start`

Asegúrate de que el servicio MongoDB esté corriendo antes de iniciar el backend.

## 🚀 Uso del Proyecto

1.  **Inicia el Backend**: Sigue los pasos de la sección "Configuración del Backend".
2.  **Inicia el Frontend**: Sigue los pasos de la sección "Configuración del Frontend".
3.  **Accede a la Aplicación**: Abre tu navegador web y ve a la dirección donde se está ejecutando el frontend (generalmente `http://localhost:5173`).
4.  **Registra un Paciente**: Utiliza el formulario de registro para ingresar datos y subir una imagen dental.
5.  **Análisis de Imagen**: La imagen subida será procesada por el backend. (Actualmente, el análisis de IA es simulado como se ve en `backend/main.py`).

## 📄 API Endpoints

El backend expone los siguientes endpoints principales (definidos en `denti_scan_ia/backend/main.py`):

-   **`GET /health`**:
    -   Descripción: Verifica el estado del servicio y la conexión a MongoDB.
    -   Respuesta: JSON con el estado general y de MongoDB.

-   **`GET /db-status`**:
    -   Descripción: Intenta conectar a MongoDB y devuelve el estado.
    -   Respuesta: JSON indicando si la conexión fue exitosa o un error 500 si falla.

-   **`POST /analyze_dental_image`**:
    -   Descripción: Recibe datos de un paciente y una imagen dental para análisis. Guarda la información y la imagen, y simula una respuesta de análisis de IA.
    -   Tipo de Contenido: `multipart/form-data`
    -   Parámetros del Formulario:
        -   `dentalImage`: (file) La imagen dental a analizar.
        -   `name`: (string) Nombre del paciente.
        -   `email`: (string) Email del paciente.
        -   `birthDate`: (string) Fecha de nacimiento del paciente (ej. "YYYY-MM-DD").
    -   Respuesta Exitosa (200 OK): JSON con los resultados del "análisis".
    -   Respuesta de Error (500 Internal Server Error): Si ocurre un problema durante el procesamiento.

-   **`POST /registro`**:
    -   Descripción: Similar a `/analyze_dental_image`, pero parece ser un endpoint alternativo o anterior para el registro. Guarda la información del paciente y la imagen.
    -   Tipo de Contenido: `multipart/form-data`
    -   Parámetros del Formulario:
        -   `nombre`: (string) Nombre.
        -   `apellido`: (string) Apellido.
        -   `email`: (string) Email.
        -   `fecha_nacimiento`: (string) Fecha de nacimiento.
        -   `imagen`: (file) La imagen.
    -   Respuesta: JSON con el estado del registro y los datos guardados.

-   **`GET /`**:
    -   Descripción: Endpoint raíz que devuelve un mensaje de bienvenida.
    -   Respuesta: JSON `{"message": "DentiScan IA Backend funcionando"}`.

## 💡 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor sigue estos pasos:

1.  Haz un Fork del repositorio.
2.  Crea una nueva rama para tu fonctionnalité (`git checkout -b feature/AmazingFeature`).
3.  Realiza tus cambios y haz commit de ellos (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

## 📄 Licencia

Este proyecto está distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` (actualmente no existe en el repositorio, se recomienda añadir uno) para más detalles.

## 📞 Contacto

Si tienes preguntas, sugerencias o encuentras algún problema, por favor abre un "Issue" en este repositorio de GitHub.
