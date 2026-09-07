const form = document.getElementById("registroVoluntario");

form.addEventListener("submit", function (evento) {
    evento.preventDefault(); //Evita que se recargue la pagina

    let error = false;

    //Validar Nombre 
    const nombre = document.getElementById("nombre").value;
    const errorNombre = document.getElementById("error-nombre");
    if (nombre.length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 letras.";
        error = true;
    }   else {
        errorNombre.textContent = "";
    }

    //Validar RUT
    const rut = document.getElementById("rut").value;
    const errorRut = document.getElementById("error-rut");
    const formatoRut = /^[0-9]+-[0-9kK]{1}$/;
    if (formatoRut.test(rut) == false) {
        errorRut.textContent = "Ingrese RUT válido con guion.";
        error = true;
    }   else {
        errorRut.textContent = "";
    }

    //Validar Email 
    const email = document.getElementById("email").value;
    const errorEmail = document.getElementById("error-email");
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formatoEmail.test(email) == false) {
        errorEmail.textContent = "Ingrese un correo válido.";
        error = true;
    }   else {
        errorEmail.textContent = "";
    }

    //Validar Teléfono 
    const telefono = document.getElementById("telefono").value;
    const errorTelefono = document.getElementById("error-telefono");
    const formatoTelefono = /^(\+?56)?9\d{8}$/;
    if (formatoTelefono.test(telefono) == false) {
        errorTelefono.textContent = "Ingrese un teléfono válido.";
        error = true;
    }   else {
        errorTelefono.textContent = "";
    }

    //Validar Región
    const region = document.getElementById("region").value;
    const errorRegion = document.getElementById("error-region");
    if (region === "") {
        errorRegion.textContent = "Debe ingresar su región.";
        error = true;
    }   else {
        errorRegion.textContent = "";
    }

    //Validar Comuna 
    const comuna = document.getElementById("comuna").value;
    const errorComuna = document.getElementById("error-comuna");
    if (comuna === "") {
        errorComuna.textContent = "Debe ingresar su comuna.";
        error = true;
    }   else {
        errorComuna.textContent = "";
    }

    //Calle  
    document.getElementById("error-calle").textContent = "";

    //Numero
    document.getElementById("error-numero").textContent = "";

    //No fallos
    if (error == false) {
        alert("Registro completado con éxito");
        form.reset();
    }
})