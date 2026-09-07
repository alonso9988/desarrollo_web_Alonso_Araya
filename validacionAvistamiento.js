const form = document.getElementById("informarAvistamiento");

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let error = false;

    //Validar Tipo
    const tipo = document.getElementById("tipo").value;
    const errorTipo = document.getElementById("error-tipo");
    if (tipo.length < 3) {
        errorTipo.textContent = "Ingrese un tipo de ave valido";
        error = true; 
    }   else {
        errorTipo.textContent = "";
    }

    //Validar Nombre
    const nombre = document.getElementById("nombre").value;
    const errorNombre = document.getElementById("error-nombre");
    if (nombre.length < 3) {
        errorNombre.textContent = "Ingrese un nombre de ave valido.";
        error = true; 
    }   else {
        errorNombre.textContent = "";
    }  

    //Validar Lugar
    const lugar = document.getElementById("lugar").value;
    const errorLugar = document.getElementById("error-lugar");
    if (lugar.length < 3) {
        errorLugar.textContent = "Ingrese un lugar valido.";
        error = true; 
    }   else {
        errorLugar.textContent = "";
    }  

    //validar Fecha y Hora
    const fechaValor = document.getElementById("fecha_hora").value;
    const errorFecha = document.getElementById("error-fecha");

    if (fechaValor === "") {
        errorFecha.textContent = "Debe ingresar una fecha y hora.";
        error = true;
    }   else {
        const fechaIngresada = new Date(fechaValor);
        const ahora = new Date();

        // Fecha máxima en el pasado (30 dias)
        const limitePasado = new Date();
        limitePasado.setDate(ahora.getDate() - 30);

        if (fechaIngresada > ahora) {
        errorFecha.textContent = "La fecha no puede estar en el futuro.";
        error = true;
        } else if (fechaIngresada < limitePasado) {
        errorFecha.textContent = "La fecha no puede tener más de 30 dias de antigüedad.";
        error = true;
        } else {
        errorFecha.textContent = "";
        }
    }

    //validar Foto o Video
    const archivo = document.getElementById("archivo");
    const errorArchivo = document.getElementById("error-archivo");

    if (archivo.files.length == 0) {
        errorArchivo.textContent = "Debe adjuntar un archivo";
        error = true;
    }   else {
        errorArchivo.textContent = "";
    }

    //No fallos
    if (error == false) {
        alert("Avistamiento exitoso");
        form.reset();
    }

})
 