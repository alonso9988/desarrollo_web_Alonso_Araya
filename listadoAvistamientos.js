//Tabla constante
const avistamientos = [
    {
        especie: "Peuco",
        tipo: "Rapaces",
        foto: "img/peuco.jpg",
        lugar: "Parque Mahuida",
        fecha: "2025-08-01 14:30"
    },
    {
        especie: "Garza chica",
        tipo: "Acuáticas",
        foto: "img/garzaChica.jpg",
        lugar: "Costas de Chiloe",
        fecha: "2026-07-08 09:15"
    },
    {
        especie: "Bandurrilla",
        tipo: "Pájaros",
        foto: "img/bandurrilla.jpg",
        lugar: "Región de Aysén",
        fecha: "2026-04-02 17:45"
    },
    {
        especie: "Garza Boyera",
        tipo: "zancudas",
        foto: "img/garzaBoyera.jpg",
        lugar: "Isla de Pascua",
        fecha: "2026-02-03 11:10"
    }
];

//Variables
let listaNueva = avistamientos;
let pagina = 1;
const porPagina = 2; //Cantidad de filas por página

//Elementos de la tabla y botones
const mTabla = document.getElementById("tabla");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const txtPagina = document.getElementById("numeroDePagina");

//Mostrar la tabla recortada por página
function mostrarTabla() {
    mTabla.innerHTML = "";

    //Elementos tocan en esta página
    const inicio = (pagina - 1) * porPagina;
    const fin = inicio + porPagina;
    const corte = listaNueva.slice(inicio, fin);

    //Dibujo de las filas
    for (let i = 0; i < corte.length; i = i + 1) {
        const ave = corte[i];
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${ave.especie}</td>
            <td>${ave.tipo}</td>
            <td style="text-align: center;"><img src="${ave.foto}" alt="${ave.especie}" width="100"></td>
            <td>${ave.lugar}</td>
            <td>${ave.fecha}</td>`;
        mTabla.appendChild(fila);       
    };
};

// Botón Anterior
btnAnterior.addEventListener("click", function () {
    if (pagina > 1) {
        pagina = pagina - 1;
        mostrarTabla();
    }
});

// Botón Siguiente
btnSiguiente.addEventListener("click", function () {
    const totalPaginas = Math.ceil(listaNueva.length / porPagina);
    if (pagina < totalPaginas) {
        pagina = pagina + 1;
        mostrarTabla();
    }
});

//Filtro de tipos de ave
const fTipos = document.getElementById("tiposAves");
fTipos.addEventListener("change", function () {
    const tipoElegido = fTipos.value;
    if (tipoElegido === "todos") {
        listaNueva = avistamientos;
    } else {
        const filtradas = [];
        for (let i = 0; i < avistamientos.length; i = i + 1) {
            if (avistamientos[i].tipo === tipoElegido) {
                filtradas.push(avistamientos[i]);
            }
        }
        listaNueva = filtradas;
    }
    pagina = 1; // Volver a la página 1 al filtrar
    mostrarTabla();
});

// Ordenar
const ordenar = document.getElementById("ordenar");
ordenar.addEventListener("change", function () {
    const ordenElegido = ordenar.value;

    if (ordenElegido === "lugarAsc") {
        listaNueva.sort(function (a, b) {
            return a.lugar.localeCompare(b.lugar);
        });
    } else if (ordenElegido === "lugarDesc") {
        listaNueva.sort(function (a, b) {
            return b.lugar.localeCompare(a.lugar);
        });
    } else if (ordenElegido === "fechaAsc") {
        listaNueva.sort(function (a, b) {
            return new Date(a.fecha) - new Date(b.fecha);
        });
    } else if (ordenElegido === "fechaDesc") {
        listaNueva.sort(function (a, b) {
            return new Date(b.fecha) - new Date(a.fecha);
        });
    }

    pagina = 1; // Volver a la página 1 al ordenar
    mostrarTabla(); 
});

mostrarTabla();