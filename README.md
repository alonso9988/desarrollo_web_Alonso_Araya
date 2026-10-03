# Tarea 2 - Alonso Araya

Página web para el registro y gestión de avistamientos de aves y voluntarios desarrollado con Python Flask, MySQL y JavaScript.

* **Backend:** Python 3, Flask, SQLAlchemy.
* **Base de Datos:** MySQL.
* **Frontend:** HTML5, CSS3 (dentro de cada HTML), JavaScript.

```text
Tar2/
│
├── app.py                     # Rutas de Flask (/, /voluntario, /avistamiento, etc.) y lógica del servidor
├── models.py                  # Conexión SQLAlchemy (engine, SessionLocal) y modelos de tablas
├── requirements.txt           # Lista de dependencias (Flask, SQLAlchemy, filetype, etc.)
├── schema.sql                 # Script SQL para crear las tablas y precargar aves, regiones y comunas
├── README.md                  # Documentación e instrucciones de instalación/ejecución
├── .gitignore                 # Exclusión de venv/, __pycache__/ y temporales
│
├── templates/                 # Plantillas HTML procesadas por Jinja2
│   ├── index.html                 # Portada con los 2 últimos avistamientos
│   ├── registroVoluntario.html    # Formulario para registrar voluntarios
│   ├── informarAvistamiento.html  # Formulario con carga de 1 a 3 fotos/videos
│   ├── listadoAvistamiento.html   # Tabla con paginación, orden y datos embebidos
│   ├── detalleAvistamiento.html   # Vista individual de un avistamiento
│   └── estadisticas.html          # Gráficos / estadísticas del sistema
│
└── static/                    # Archivos estáticos servidos directamente al navegador
    ├── css/
    │   └── styles.css             # Estilos y diseño visual de las vistas
    ├── js/
    │   ├── listadoAvistamiento.js # Manejo de paginación (5 por pág), orden y DOM
    │   └── validaciones.js        # Validaciones de formularios en el cliente
    └── uploads/                   # Archivos multimedia subidos (ej. .jpg, .mp4)
        ├── 1790985781_aguila.jpg
        └── 1790986051_albatrozoscuro.jpg
```
