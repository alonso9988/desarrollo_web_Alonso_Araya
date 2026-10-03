# Tarea 2 - Alonso Araya

Página web para el registro y gestión de avistamientos de aves y voluntarios desarrollado con Python Flask, MySQL y JavaScript.

* **Backend:** Python 3, Flask, SQLAlchemy.
* **Base de Datos:** MySQL.
* **Frontend:** HTML5, CSS3 (dentro de cada HTML), JavaScript.

```text
Tar2/
│
├── app.py                     # Rutas de Flask 
├── models.py                  # Conexión SQLAlchemy y modelos de tablas
├── requirements.txt           # Lista de dependencias
├── schema.sql                 # Script SQL para crear las tablas y precargar aves, regiones y comunas
├── README.md                  
│
├── templates/                 
│   ├── index.html                
│   ├── registroVoluntario.html    
│   ├── informarAvistamiento.html  
│   ├── listadoAvistamiento.html   
│   ├── detalleAvistamiento.html   
│   └── estadisticas.html          
│
└── static/                   
    │    
    ├── js/
    │   ├── listadoAvistamiento.js  
    |   ├── registroVoluntario.js    
    |   ├── informarAvistamiento.js  
    |   └── estadisticas.js         
    └── uploads/            # Dos imagenes de aves para ejemplo en el listadp      
        ├── 1790985781_aguila.jpg
        └── 1790986051_albatrozoscuro.jpg
```
