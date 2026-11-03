document.addEventListener('DOMContentLoaded', () => {
    cargarComentarios();

    const form = document.getElementById('formComentario');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            enviarComentario();
        });
    }
});

function cargarComentarios() {
    fetch(`/avistamiento/${avistamientoId}/comentarios`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la obtencion de comentarios: ${response.statusText}`);
            }
            return response.json();
        })
        .then(comentarios => {
            const contenedor = document.getElementById('contenedor-comentarios');
            contenedor.innerHTML = '';

            const ul = document.createElement('ul');
            ul.className = 'lista-comentarios';

            comentarios.forEach(c => {
                const li = document.createElement('li');
                li.className = 'item-comentario';
                li.innerHTML = `<strong>${c.nombre}</strong> (${c.fecha}):<br><p class="texto-comentario">${c.texto}</p>`;
                ul.appendChild(li);
            });

            contenedor.appendChild(ul);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function enviarComentario() {
    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const divError = document.getElementById("mensaje-error");

    divError.style.display = "none";
    divError.innerHTML = "";


    let errores = [];
    if (nombre.length < 3 || nombre.length > 50) {
        errores.push("El nombre debe tener entre 3 y 50 caracteres.");
    }
    if (texto.length < 5 || texto.length > 300) {
        errores.push("El texto del comentario debe tener entre 5 y 300 caracteres.");
    }

    if (errores.length > 0) {
        divError.innerHTML = errores.join("<br>");
        divError.style.display = "block";
        return;
    }

    fetch('/avistamiento/' + avistamientoId + '/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, texto: texto })
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data: data })))
    .then(res => {
        if (!res.ok) {
            divError.innerHTML = res.data.errores.join('<br>');
            divError.style.display = 'block';
        } else {
            document.getElementById('formComentario').reset();
            cargarComentarios();
        }
    })
    .catch(error => {
        console.error('Error al enviar comentario:', error);
    });
}