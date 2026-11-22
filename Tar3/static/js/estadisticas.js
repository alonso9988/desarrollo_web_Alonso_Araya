document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/estadisticas')
        .then(response => {
            if (!response.ok) {
                throw new Error('error en la api');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos recibidos:", data);

            //Gráfico de Líneas
            Highcharts.chart('graficoDeLineas', {
                chart: {
                    type: 'line',
                    backgroundColor: '#FFFFFF'
                },
                title: {
                    text: 'Cantidad de Avistamientos por Día',
                    style: { color: '#000000', fontWeight: 'bold' }
                },
                xAxis: {
                    categories: data.dias,
                    title: { text: 'Día', style: { color: '#000000' } },
                    labels: { style: { color: '#000000' } }
                },
                yAxis: {
                    title: { text: 'Cantidad de Avistamientos', style: { color: '#000000' } },
                    min: 0,
                    allowDecimals: false,
                    labels: { style: { color: '#000000' } }
                },
                legend: {
                    itemStyle: { color: '#000000' }
                },
                series: [{
                    name: 'Avistamientos',
                    data: data.cantidadAvistamientos
                }],
                credits: { enabled: false }
            });

            //Gráfico de Torta
            Highcharts.chart('graficoDeTorta', {
                chart: {
                    type: 'pie',
                    backgroundColor: '#FFFFFF',
                    plotBackgroundColor: '#FFFFFF'
                },
                title: {
                    text: 'Distribución de Avistamientos por Tipo de Ave',
                    style: { color: '#000000', fontWeight: 'bold' }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: { color: '#000000' }
                        }
                    }
                },
                series: [{
                    name: 'Avistamientos',
                    colorByPoint: true,
                    data: data.datosTorta
                }],
                credits: { enabled: false }
            });

            //Gráfico de Barras
            Highcharts.chart('graficoDeBarras', {
                chart: {
                    type: 'column',
                    backgroundColor: '#FFFFFF',
                    plotBackgroundColor: '#FFFFFF'
                },
                title: {
                    text: 'Cantidad de Voluntarios por Comuna',
                    style: { color: '#000000', fontWeight: 'bold' }
                },
                xAxis: {
                    categories: data.comunas,
                    title: { text: 'Comuna', style: { color: '#000000' } },
                    labels: { style: { color: '#000000' } }
                },
                yAxis: {
                    title: { text: 'Cantidad', style: { color: '#000000' } },
                    min: 0,
                    allowDecimals: false,
                    labels: { style: { color: '#000000' } }
                },
                legend: {
                    itemStyle: { color: '#000000' }
                },
                series: [{
                    name: 'Voluntarios',
                    data: data.cantidadVoluntarios
                }],
                credits: { enabled: false }
            });
        })
        .catch(error => {
            console.error("Error al consultar las estadísticas:", error);
        });
});