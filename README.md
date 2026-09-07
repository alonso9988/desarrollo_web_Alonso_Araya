# Tarea 1

> [!NOTE]
> Se utilizó CSS en los mismos archivos HTML dentro de las etiquetas `<style>`, y JavaScript en archivos separados.

## Páginas del sitio:
- Portada (`index.html`): Menú de navegación accesible hacia las distintas secciones del sistema.
- Registro de Voluntarios (`registroVoluntario.html`): Formulario de registro de usuario.
- Informar Avistamiento (`informarAvistamiento.html`): Formulario para ingresar reportes de aves.
- Listado de Avistamientos (`listadoAvistamiento.html`): Tabla interactiva con los datos de las aves.
- Estadísticas (`estadisticas.html`): Visualización de métricas y gráficos.

## Estructura de la tarea
```text
├── index.html
├── registroVoluntario.html
│   └── validacionRegistro.js
├── informarAvistamiento.html
│   └── validacionAvistamiento.js
├── listadoAvistamiento.html
│   ├── listadoAvistamientos.js
│   └── img/ (se utilizaron imagenes con marca de agua para las aves registradas)
└── estadisticas.html
    └── estadisticas.js
