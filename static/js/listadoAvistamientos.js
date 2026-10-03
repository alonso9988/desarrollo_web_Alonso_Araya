// Leer datos desde el HTML
const nodos = document.querySelectorAll("#fuente-datos .dato-avistamiento");
const avistamientos = Array.from(nodos).map(el => ({
    id: el.dataset.id,
    especie: el.dataset.especie,
    foto: el.dataset.foto,
    lugar: el.dataset.lugar,
    fecha: el.dataset.fecha,
    voluntario: el.dataset.voluntario
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
        mTabla.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay avistamientos registrados.</td></tr>';
        return;
    }

    // Tu for original (sin duplicar)
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
        `;
        mTabla.appendChild(fila);
    }
}

//botones de la tabla
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

//ordenar
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