# Tarea 3 - Desarrollo de Aplicaciones Web (CC5002)

## Cambios Realizados en la Tarea 3

- **Creación de `static/js/comentarios.js`:** Implementación del envío y carga asíncrona de comentarios en tiempo real mediante `fetch` (métodos `GET` y `POST`).
- **Actualización de `app.py`:** Incorporación de las rutas de la API para obtener métricas (`/api/estadisticas`) y gestionar comentarios (`/avistamiento/<id>/comentarios`).
- **Implementación de Highcharts (`static/js/estadisticas.js` y `templates/estadisticas.html`):** Configuración de gráficos interactivos (líneas para avistamientos por día, torta para distribución por ave y barras para voluntarios por comuna).
- **Módulo de Comentarios en `templates/detalleAvistamiento.html`:** Integración de la sección de comentarios al consultar la vista detallada de cada avistamiento registrado.

---

## Estructura del Repositorio

```text
├── app.py
├── models.py
├── requirements.txt
├── schema.sql
├── static/
│   ├── js/
│   │   ├── comentarios.js
│   │   ├── estadisticas.js
│   │   ├── listadoAvistamiento.js
│   │   ├── validacionAvistamiento.js
│   │   └── validacionRegistro.js
│   └── uploads/
└── templates/
    ├── detalleAvistamiento.html
    ├── estadisticas.html
    ├── index.html
    ├── informarAvistamiento.html
    ├── listadoAvistamiento.html
    └── registroVoluntario.html
