//Grafico Tipo
const tipo = document.getElementById("graficoTipo");
const graficoTipo = tipo.getContext("2d");

graficoTipo.font = "14px sans-serif";

//Rapaces: 2
graficoTipo.fillRect(40, 60, 40, 100);
graficoTipo.fillText("2", 55, 50);
graficoTipo.fillText("Rapaz", 40, 180);

//Pájaros: 1
graficoTipo.fillRect(130, 110, 40, 50);
graficoTipo.fillText("1", 145, 100);
graficoTipo.fillText("Pájaro", 130, 180);

//Acuáticas: 1
graficoTipo.fillRect(220, 110, 40, 50);
graficoTipo.fillText("1", 235, 100);
graficoTipo.fillText("Acuát.", 220, 180);


//Grafico Regiones
const region = document.getElementById("graficoRegiones");
const graficoRegiones = region.getContext("2d");

graficoRegiones.font = "14px sans-serif";

//Metropolitana: 2
graficoRegiones.fillText("Metropolitana (2)", 20, 40);
graficoRegiones.fillRect(20, 50, 180, 25);

//Los Lagos: 1
graficoRegiones.fillText("Los Lagos (1)", 20, 100);
graficoRegiones.fillRect(20, 110, 90, 25);

//Antofagasta: 1
graficoRegiones.fillText("Antofagasta (1)", 20, 160);
graficoRegiones.fillRect(20, 170, 90, 25);