# 🦷 DentiScan IA

Sistema de análisis dental basado en IA para la detección temprana de problemas bucodentales a través de imágenes.

## 🚀 Características Principales

- 📸 Carga de imágenes dentales
- 🤖 Análisis automático de imágenes mediante IA
- 💾 Almacenamiento seguro de registros médicos
- 📊 Visualización de resultados detallados
- 🔄 Interfaz de usuario intuitiva y responsiva

## 🏗️ Estructura del Proyecto

```
denti_scan_ia/
├── backend/                  # Código del servidor
│   ├── uploads/             # Imágenes subidas por los usuarios
│   ├── main.py              # Aplicación principal de FastAPI
│   ├── requirements.txt     # Dependencias de Python
│   └── .env                # Variables de entorno (crear manualmente)
├── frontend/               # Aplicación React
│   ├── public/             # Archivos estáticos
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes de React
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Punto de entrada
│   ├── package.json        # Dependencias de Node.js
│   └── vite.config.js      # Configuración de Vite
└── README.md               # Este archivo
```

## 🛠️ Requisitos Previos

- Python 3.8+
- Node.js 16+
- MongoDB 6.0+
- npm o yarn

## 🚀 Instalación y Configuración

### 1. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Crear y activar entorno virtual (Windows)
python -m venv venv
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno (crear archivo .env)
echo "MONGO_URI=mongodb://localhost:27017/" > .env
echo "MONGO_DB_NAME=dentiscan_db" >> .env

# Iniciar servidor de desarrollo
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Configuración del Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Configuración de MongoDB

1. Descargar e instalar MongoDB Community Server desde [aquí](https://www.mongodb.com/try/download/community)
2. Iniciar el servicio de MongoDB:
   - Windows: Buscar "Services" y asegurarse que el servicio "MongoDB" esté en ejecución
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

## 📚 API Endpoints

### Análisis de Imagen Dental
```
POST /analyze_dental_image
Content-Type: multipart/form-data

Parámetros:
- name: string (requerido)
- email: string (requerido)
- birthDate: string (formato YYYY-MM-DD)
- dentalImage: file (imagen)
```

### Verificar Estado del Servicio
```
GET /health
```

## 🌐 Despliegue

### Backend (Producción)
```bash
# Instalar gunicorn
pip install gunicorn

# Ejecutar con gunicorn (producción)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (Producción)
```bash
# Construir para producción
npm run build

# Servir archivos estáticos
npm install -g serve
serve -s dist
```
## 🦷 Pipeline de Entrenamiento e Inferencia de IA para Análisis Dental

### Visión General

Este proyecto integra dos modelos avanzados de deep learning para el análisis de radiografías dentales:

- **MobileNet (TensorFlow/Keras):** Clasificación de imágenes (presencia de caries u otras patologías).
- **YOLOv8 (Ultralytics/PyTorch):** Detección y localización de caries mediante bounding boxes.

Ambos modelos están integrados en un backend robusto con FastAPI, asegurando estandarización de imágenes, inferencia confiable y almacenamiento de resultados en MongoDB.

---

### 1. Requisitos de Datos y Preprocesamiento

#### MobileNet (Clasificación)
- **Entrada:** Imágenes de radiografías dentales (recomendado: 224x224 px, RGB).
- **Etiquetas:** Categóricas (ej: `caries`, `sano`).
- **Preprocesamiento:**
  - Conversión a RGB y redimensionado a 224x224 px.
  - Normalización: valores de píxel en [0, 1].
  - (Entrenamiento) Augmentación: flips, rotaciones, ajustes de brillo/contraste.

#### YOLOv8 (Detección)
- **Entrada:** Imágenes (PNG/JPG, cualquier tamaño; recomendado ≥640x640 px).
- **Etiquetas:** Formato YOLO (`.txt` por imagen): `<class_id> <x_center> <y_center> <width> <height>` (normalizado).
- **Preprocesamiento:**
  - Conversión a RGB si es necesario.
  - Bounding boxes precisos y normalizados.
  - Separar en carpetas `train/`, `val/`, `test/`.

---

### 2. Entrenamiento de Modelos

#### MobileNet (Keras)
- **Framework:** TensorFlow/Keras
- **Comando recomendado:**
  ```bash
  python train_mobilenet.py \
    --data_dir ./data/classification \
    --epochs 30 \
    --batch_size 32 \
    --output_model ./backend/models/mobilenet.keras
  ```
- **Formato de exportación:** `.keras` (o SavedModel/HDF5)
- **Buenas prácticas:**
  - Early stopping y ajuste de learning rate.
  - Monitorear accuracy y loss de validación.
  - Guardar el mejor checkpoint.

#### YOLOv8 (Ultralytics)
- **Framework:** PyTorch (Ultralytics YOLOv8)
- **Comando recomendado:**
  ```bash
  pip install ultralytics
  yolo task=detect mode=train \
    model=yolov8n.pt \
    data=./data/detection/data.yaml \
    epochs=50 \
    imgsz=640 \
    project=./backend/models \
    name=caries_yolov8
  ```
- **Formato de exportación:** `.pt` (PyTorch weights)
- **Buenas prácticas:**
  - Usar set de validación para early stopping.
  - Ajustar anchors si es necesario.
  - Exportar los mejores pesos (`best.pt`).

---

### 3. Pipeline de Inferencia

#### Estandarización de Imágenes
- Todas las imágenes subidas:
  - Se convierten a formato PNG.
  - Se fuerzan a espacio de color RGB.
  - Se guardan con nombre único y timestamp.
- Esto garantiza compatibilidad y previene errores de formato.

#### Flujo de Inferencia
1. **Subida:** El usuario sube una radiografía desde el frontend.
2. **Preprocesamiento:** El backend estandariza la imagen (PNG, RGB).
3. **Clasificación:** MobileNet predice la probabilidad de caries.
4. **Detección:** YOLOv8 localiza caries y genera bounding boxes e imagen de resultado.
5. **Almacenamiento:** Todos los resultados y rutas de imágenes se guardan en MongoDB.
6. **Respuesta:** La API retorna un JSON estructurado con diagnóstico, probabilidades, detecciones y URLs de imágenes.

#### Expectativas de los Modelos
- **MobileNet:** Espera imágenes PNG RGB de 224x224 px.
- **YOLOv8:** Acepta PNG/JPG RGB de cualquier tamaño (óptimo ≥640x640).

---

### 4. Actualización y Troubleshooting de Modelos
- **Reemplazo:** Coloca los nuevos modelos en `backend/models/` con los nombres esperados (`mobilenet.keras`, `best.pt`).
- **Entorno:** Instala todas las dependencias de `requirements.txt` (TensorFlow, Pillow, Ultralytics, etc.).
- **Problemas comunes:**
  - *Errores de formato:* Asegúrate de que las imágenes sean PNG/JPG y RGB.
  - *Errores de carga de modelo:* Verifica rutas y formatos.
  - *Problemas de GPU/CUDA:* Para entrenamiento, revisa versiones de CUDA/cuDNN.

---

### 5. Ejemplo: Reentrenamiento y Exportación

#### MobileNet
```bash
python train_mobilenet.py \
  --data_dir ./data/classification \
  --epochs 30 \
  --output_model ./backend/models/mobilenet.keras
```

#### YOLOv8
```bash
yolo task=detect mode=train \
  model=yolov8n.pt \
  data=./data/detection/data.yaml \
  epochs=50 \
  imgsz=640 \
  project=./backend/models \
  name=caries_yolov8
```

---

### 6. Referencias
- [TensorFlow MobileNet](https://www.tensorflow.org/api_docs/python/tf/keras/applications/MobileNetV2)
- [Ultralytics YOLOv8](https://docs.ultralytics.com/)
- [Pillow](https://pillow.readthedocs.io/en/stable/)

---

**Para detalles de integración, consulta el backend en `backend/main.py` y `backend/ia_integration.py`.**


## 🐛 Solución de Problemas

### Error de Conexión a MongoDB
- Verificar que el servicio de MongoDB esté en ejecución
- Comprobar que la URL de conexión sea correcta en el archivo `.env`

### Problemas de CORS
- Asegurarse que los orígenes permitidos en `main.py` incluyan la URL del frontend
- Verificar que las credenciales CORS estén configuradas correctamente

### Errores de Dependencias
- Asegurarse de tener todas las dependencias instaladas
- Reinstalar dependencias si es necesario: `pip install -r requirements.txt`

## 🤝 Equipo EASYCODE

* Sebastian Guarachi Aguilar
* Jose Alfredo Zambrana Cruz
* Leandro Joe Jaldin Gutierrez
* Kevin Mamani Roque
* Leandro Emiliano Miranda Roman

