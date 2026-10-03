const form = document.getElementById("registroVoluntario");
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

// Manejo del selector de comunas según la región
if (selectRegion) {
    if (selectComuna) {
        selectRegion.addEventListener("change", function () {
            const regionSeleccionada = selectRegion.value;
            const opcionesComuna = selectComuna.querySelectorAll("option");

            selectComuna.value = "";

            for (let i = 0; i < opcionesComuna.length; i++) {
                const opcion = opcionesComuna[i];
                const regionDeComuna = opcion.getAttribute("data-region");

                if (!regionDeComuna || regionDeComuna === regionSeleccionada) {
                    opcion.style.display = "block";
                } else {
                    opcion.style.display = "none";
                }
            }
        });
    }
}

// Validación y envío del formulario
if (form) {
    form.addEventListener("submit", function (evento) {
        evento.preventDefault(); 

        let error = false;

        // Validar Nombre 
        const nombre = document.getElementById("nombre").value;
        const errorNombre = document.getElementById("error-nombre");
        if (nombre.length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 letras.";
            error = true;
        } else {
            errorNombre.textContent = "";
        }

        // Validar Email 
        const email = document.getElementById("email").value;
        const errorEmail = document.getElementById("error-email");
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formatoEmail.test(email) == false) {
            errorEmail.textContent = "Ingrese un correo válido.";
            error = true;
        } else {
            errorEmail.textContent = "";
        }

        // Validar Teléfono 
        const telefono = document.getElementById("telefono").value;
        const errorTelefono = document.getElementById("error-telefono");
        const formatoTelefono = /^(\+?56)?9\d{8}$/;
        if (formatoTelefono.test(telefono) == false) {
            errorTelefono.textContent = "Ingrese un teléfono válido (ej: 912345678).";
            error = true;
        } else {
            errorTelefono.textContent = "";
        }

        // Validar Región
        const region = document.getElementById("region").value;
        const errorRegion = document.getElementById("error-region");
        if (region === "") {
            errorRegion.textContent = "Debe seleccionar su región.";
            error = true;
        } else {
            errorRegion.textContent = "";
        }

        // Validar Comuna 
        const comuna = document.getElementById("comuna").value;
        const errorComuna = document.getElementById("error-comuna");
        if (comuna === "") {
            errorComuna.textContent = "Debe seleccionar su comuna.";
            error = true;
        } else {
            errorComuna.textContent = "";
        }

        // Envío si no hay fallos
        if (error == false) {
            form.submit();
        }
    });
}