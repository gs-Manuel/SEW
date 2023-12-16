"use strict";
class Agenda{
    constructor(){
        this.URL= "http://ergast.com/api/f1/current.xml";
        this.last_api_call  = null;
        this.last_api_result = null;
    }
    getCurrentRaces(){
        if (this.last_api_call === null || this.last_api_call * 1000 * 60 * 60 < Date.now()) {//una llamada cada 10 minutos
            this.last_api_call = Date.now();
            $.ajax({
                url: this.URL,
                method: 'GET',
                dataType: 'xml',
                success: function (data) {
                    this.last_api_result = data;
                    this.mostrarCarreras(data);
                }.bind(this),
                error: function (error) {
                    console.error('Error en la solicitud AJAX:', error);
                }
            });
        } else {
            this.mostrarCarreras(this.last_api_result);
        }
    }
    mostrarCarreras(data){
        const carreras = $(data).find('Race');

        const mainElement = $("main");


        // Iterar sobre cada carrera en la respuesta XML
        carreras.each((carrera) => {
            const carreraElement = $("<section>");

            const nombreCarrera = $(carrera).find('RaceName').text();
            const nombreCircuito = $(carrera).find('CircuitName').text();
            const latitud = $(carrera).find('Location').attr('lat');
            const longitud = $(carrera).find('Location').attr('long');
            const fecha = $(carrera).find('Date').text();
            const hora = $(carrera).find('Time').text();

            carreraElement.append(`<h2>${nombreCarrera}</h2>`);
            carreraElement.append(`<p>Circuito: ${nombreCircuito}</p>`);
            carreraElement.append(`<p>Coordenadas: Latitud ${latitud}, Longitud ${longitud}</p>`);
            carreraElement.append(`<p>Fecha: ${fecha}</p>`);
            carreraElement.append(`<p>Hora: ${hora}</p>`);

            mainElement.append(carreraElement);
        });
    }
}