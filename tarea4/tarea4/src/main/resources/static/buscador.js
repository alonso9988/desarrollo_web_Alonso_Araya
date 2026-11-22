const API_SPRING = "http://localhost:8080";


// Destacar el texto buscado con amarillo
function destacar(texto, q) {
    const limpio = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return String(texto).replace(new RegExp(`(${limpio})`, "gi"), '<mark style="background:#fff59d;">$1</mark>');
}

document.addEventListener("DOMContentLoaded", async function() {
    const respuestaHtml = await fetch(API_SPRING + "/buscador.html");
    const codigoHtml = await respuestaHtml.text();
    document.body.insertAdjacentHTML("afterbegin", codigoHtml);

    const wrapper = document.getElementById("buscador-wrapper");
    const input = document.getElementById("input-buscador");
    const resultados = document.getElementById("resultados-buscador");
    let temporizador = null;

   // Buscar apenas se empieza a escribir (desde 1 letra)
    input.addEventListener("input", function() {
        clearTimeout(temporizador);
        const texto = input.value.trim();

        if (texto.length === 0) {
            resultados.style.display = "none";
            return;
        }

        temporizador = setTimeout(async function() {
            const url = API_SPRING + "/api/avistamientos?q=" + encodeURIComponent(texto);
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            if (datos.length === 0) {
                resultados.innerHTML = '<div style="padding:10px; color:#666;">No se encontraron resultados.</div>';
                resultados.style.display = "block";
                return;
            }

            let limite = datos.length;
            if (limite > 8) {
                limite = 8;
            }

            let htmlResultados = "";
            for (let i = 0; i < limite; i++) {
                const item = datos[i];

                htmlResultados += '<div style="padding:10px; border-bottom:1px solid #eee; font-size:13px;">';
                htmlResultados += '  <a href="/avistamiento/' + item.id + '" style="text-decoration:none; color:inherit; display:block;">';
                htmlResultados += '    <strong>' + destacar(item.ave, texto) + '</strong> — ' + destacar(item.comuna, texto) + '<br>';
                htmlResultados += '    <small style="color:#555;">Voluntario: ' + destacar(item.voluntario, texto) + ' | Día: ' + item.fechaHora + '</small>';
                htmlResultados += '  </a>';
                htmlResultados += '  <div style="margin-top:5px; display:flex; justify-content:space-between; align-items:center;">';
                htmlResultados += '    <span>Nota: <strong id="buscador-nota-' + item.id + '">' + item.notaProm + '</strong></span>';
                htmlResultados += '    <span id="buscador-accion-' + item.id + '">';
                htmlResultados += '      <button type="button" onclick="abrirNotasBuscador(' + item.id + ')">Evaluar</button>';
                htmlResultados += '    </span>';
                htmlResultados += '  </div>';
                htmlResultados += '</div>';
            }

            resultados.innerHTML = htmlResultados;
            resultados.style.display = "block";
        }, 100);
    });

    document.addEventListener("click", function(evento) {
        if (document.body.contains(evento.target) && !wrapper.contains(evento.target)) {
            resultados.style.display = "none";
        }
    });
});


// Botones del 1 al 7
function abrirNotasBuscador(id) {
    let htmlBotones = "";
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 1)" style="margin-right:2px;">1</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 2)" style="margin-right:2px;">2</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 3)" style="margin-right:2px;">3</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 4)" style="margin-right:2px;">4</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 5)" style="margin-right:2px;">5</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 6)" style="margin-right:2px;">6</button>';
    htmlBotones += '<button type="button" onclick="enviarNotaBuscador(' + id + ', 7)" style="margin-right:2px;">7</button>';

    const cajaBoton = document.getElementById("buscador-accion-" + id);
    cajaBoton.innerHTML = htmlBotones;
}

async function enviarNotaBuscador(id, nota) {
    const datos = {
        avistamientoId: id,
        nota: nota
    };

    const respuesta = await fetch(API_SPRING + "/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
        return;
    }

    const datosRecibidos = await respuesta.json();
    const nuevoPromedio = datosRecibidos.notaProm;

    const textoNotaBuscador = document.getElementById("buscador-nota-" + id);
    textoNotaBuscador.innerText = nuevoPromedio;

    const celdaTabla = document.getElementById("nota-" + id);
    if (celdaTabla != null) {
        celdaTabla.innerText = nuevoPromedio;
    }

    const boton = document.getElementById("buscador-accion-" + id);
    boton.innerHTML = '<button type="button" onclick="abrirNotasBuscador(' + id + ')">Evaluar</button>';
}