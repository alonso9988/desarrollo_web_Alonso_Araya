# Tarea 4 

-Se usaron dos servidores, Flask para todo lo integrado en las anteriores tareas, y springboot para las funciones nuevas.
-Debido a que se usaron los templates de las tareas anteriores con jinja2, no se migro todo a java con thymeleaf.
-Se corren ambos servidores en puertos diferentes en diferentes terminales.


##Esquema de archivos

```text
APP/
│
├── Tar3/                                      # Aplicación Flask (Tareas anteriores + integración)
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schema.sql
│   ├── static/
│   │   ├── js/
│   │   │   ├── listadoAvistamientos.js        # [Modificado] Carga y envío de notas 1-7 vía fetch
│   │   │   ├── comentarios.js
│   │   │   ├── estadisticas.js
│   │   │   ├── validacionAvistamiento.js
│   │   │   └── validacionRegistro.js
│   │   └── uploads/                        
│   └── templates/
│       ├── index.html                         # [Modificado] Carga buscador.js 
│       ├── listadoAvistamiento.html           # [Modificado] Columna Nota/Evaluar + buscador.js
│       ├── detalleAvistamiento.html           # [Modificado] Carga buscador.js
│       ├── estadisticas.html                  # [Modificado] Carga buscador.js
│       ├── informarAvistamiento.html          # [Modificado] Carga buscador.js
│       └── registroVoluntario.html            # [Modificado] Carga buscador.js
│
└── tarea4/                                    # Spring Boot
    ├── schema.sql                             # Tabla `nota`
    └── tarea4/
        ├── pom.xml
        ├── mvnw / mvnw.cmd
        └── src/main/
            ├── java/cl/uchile/cc5002/tarea4/
            │   ├── Tarea4Application.java     # Clase principal de Spring Boot
            │   ├── CorsConfig.java            # [Creado] Habilita peticiones CORS desde :5000
            │   ├── controller/
            │   │   ├── ApiController.java    
            │   │   └── AppController.java     
            │   ├── model/
            │   │   ├── Ave.java               
            │   │   ├── Avistamiento.java      
            │   │   ├── Comuna.java            
            │   │   ├── Nota.java              
            │   │   ├── Region.java            
            │   │   └── Voluntario.java       
            │   ├── repository/
            │   │   ├── AvistamientoRepository.java  # Repositorio JPA de avistamientos
            │   │   └── NotaRepository.java          # Repositorio JPA de notas
            │   └── service/
            │       └── AvistamientoService.java     # Búsqueda por texto y cálculo de promedios
            └── resources/
                ├── application.properties     
                └── static/
                    ├── buscador.html          # Barra de búsqueda y contenedor desplegable
                    └── buscador.js            # Lógica de filtrado dinámico, resaltado y evaluación
