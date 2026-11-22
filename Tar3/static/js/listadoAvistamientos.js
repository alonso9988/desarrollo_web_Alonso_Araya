const nodos = document.querySelectorAll("#fuente-datos .dato-avistamiento");
const avistamientos = Array.from(nodos).map(el => ({
    id: Number(el.dataset.id),
    especie: el.dataset.especie,
    foto: el.dataset.foto,
    lugar: el.dataset.lugar,
    fecha: el.dataset.fecha,
    voluntario: el.dataset.voluntario,
    notaProm: "-"
}));

let listaNueva = [...avistamientos];
let pagina = 1;
const porPagina = 5;
const mTabla = document.getElementById("tabla");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const txtPagina = document.getElementById("numeroDePagina");
const ordenar = document.getElementById("ordenar");

function mostrarTabla() {
    mTabla.innerHTML = "";

    const totalPaginas = Math.ceil(listaNueva.length / porPagina) || 1;
    if (pagina > totalPaginas) pagina = totalPaginas;
    if (pagina < 1) pagina = 1;

    if (txtPagina) {
        txtPagina.innerText = `Página ${pagina} de ${totalPaginas}`;
    }

    const inicio = (pagina - 1) * porPagina;
    const fin = inicio + porPagina;
    const corte = listaNueva.slice(inicio, fin);

    if (corte.length === 0) {
        mTabla.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay avistamientos registrados.</td></tr>';
        return;
    }

    for (let i = 0; i < corte.length; i++) {
        const ave = corte[i];
        const fila = document.createElement("tr");
        fila.style.cursor = "pointer";
        fila.addEventListener("click", () => {
            window.location.href = `/avistamiento/${ave.id}`;
        });

        fila.innerHTML = `
            <td>${ave.fecha}</td>
            <td>${ave.lugar}</td>
            <td>${ave.especie}</td>
            <td>${ave.voluntario}</td>
            <td style="text-align: center;"><img src="${ave.foto}" alt="${ave.especie}" width="70" style="border-radius: 4px;"></td>
            <td id="nota-${ave.id}" style="text-align: center; font-weight: bold;">${ave.notaProm}</td>
            <td id="evaluar-${ave.id}">
                <button type="button" onclick="mostrarBotones(event, ${ave.id})">Evaluar</button>
            </td>
        `;
        mTabla.appendChild(fila);
    }
}

// Botones de paginación
if (btnAnterior) {
    btnAnterior.addEventListener("click", () => {
        if (pagina > 1) {
            pagina--;
            mostrarTabla();
        }
    });
}

if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
        const totalPaginas = Math.ceil(listaNueva.length / porPagina);
        if (pagina < totalPaginas) {
            pagina++;
            mostrarTabla();
        }
    });
}

// Ordenar
if (ordenar) {
    ordenar.addEventListener("change", () => {
        const ordenElegido = ordenar.value;
        if (ordenElegido === "lugarAsc") {
            listaNueva.sort((a, b) => a.lugar.localeCompare(b.lugar));
        } else if (ordenElegido === "lugarDesc") {
            listaNueva.sort((a, b) => b.lugar.localeCompare(a.lugar));
        } else if (ordenElegido === "fechaAsc") {
            listaNueva.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        } else if (ordenElegido === "fechaDesc") {
            listaNueva.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        }
        pagina = 1;
        mostrarTabla();
    });
}

mostrarTabla();


const API_LISTADO = "http://localhost:8080";

// Traer los promedios de notas actuales 
async function cargarNotasDesdeSpring() {
    try {
        const resp = await fetch(`${API_LISTADO}/api/avistamientos`);
        const datos = await resp.json();

        const mapaNotas = new Map(datos.map(item => [Number(item.id), item.notaProm]));
        avistamientos.forEach(av => {
            if (mapaNotas.has(av.id)) {
                av.notaProm = mapaNotas.get(av.id);
            }
        });
        mostrarTabla();
    } catch (err) {
        console.error("No se pudieron cargar las notas desde Spring Boot:", err);
    }
}

function mostrarBotones(e, id) {
    e.stopPropagation();
    const celda = document.getElementById(`evaluar-${id}`);
    celda.innerHTML = "";

    for (let n = 1; n <= 7; n++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.innerText = n;
        btn.style.marginRight = "3px";
        btn.addEventListener("click", (ev) => enviarNota(ev, id, n));
        celda.appendChild(btn);
    }
}

async function enviarNota(e, avistamientoId, nota) {
    e.stopPropagation();
    const resp = await fetch(`${API_LISTADO}/api/notas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avistamientoId, nota })
    });
    const data = await resp.json();

    document.getElementById(`nota-${avistamientoId}`).innerText = data.notaProm;
    const item = avistamientos.find(a => a.id === avistamientoId);
    if (item) item.notaProm = data.notaProm;

    const celda = document.getElementById(`evaluar-${avistamientoId}`);
    celda.innerHTML = `<button type="button" onclick="mostrarBotones(event, ${avistamientoId})">Evaluar</button>`;
}

cargarNotasDesdeSpring();