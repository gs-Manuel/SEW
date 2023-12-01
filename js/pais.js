"use strict";
class Pais{
    constructor(nombre, capital, cantidadPoblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.cantidadPoblacion = cantidadPoblacion;
        this.rellenaValoresPorDefecto();
    }
    rellenaValoresPorDefecto() {
        this.formaGobierno = "Monarquía constitucional";
        this.coordenadasCapital = [34.020882, -6.84165];
        this.religionDominante = "Islam";
    }
    getNombre(){
        return this.nombre;
    }
    getCapital(){
        return this.capital;
    }
    getCantidadPoblacion(){
        return this.cantidadPoblacion;
    }
    getFormaGobierno(){
        return this.formaGobierno;
    }
    getCoordenadasCapital(){
        return this.coordenadasCapital;
    }
    getReligionDominante(){
        return this.religionDominante;
    }
    getInformacionSecundario(){
        const listaHTML = `
        <ul>
          <li>Población: ${this.getCantidadPoblacion()}</li>
          <li>Forma de Gobierno: ${this.getFormaGobierno()}</li>
          <li>Religión Mayoritaria: ${this.getReligionDominante()}</li>
        </ul>
      `;
      return listaHTML;
    }
    escribirCoordenadasCapital() {
        //Escribir despues del titulo de más informacion
        document.write("<p> Coordenadas de la capital</p>")
        document.write(`
            <ul>
                <li>Latitud: ${this.getCoordenadasCapital()[0]}</li>    
                <li>Longitud: ${this.getCoordenadasCapital()[1]}</li>
            </ul>
            `)
    }

    obtenerPrevisionTiempo() {
            const apiKey = "af570203c4f84141406f2b72dc283547";
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.getCoordenadasCapital()[0]}&lon=${this.getCoordenadasCapital()[1]}&units=metric&appid=${apiKey}`;

            $.getJSON({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: data =>{
                    console.log("Previsión del tiempo:", data);
                    this.imprimirPrevisionTiempo(data);
                },
                error: error => {
                    console.error(error);
                }
            });
    }
    imprimirPrevisionTiempo(data) {
        var minTempDay = Number.POSITIVE_INFINITY;
        var maxTempDay = -100000;
        data.list.forEach(element => {
             minTempDay = element.main.temp_min < minTempDay ? element.main.temp_min : minTempDay;
             maxTempDay = element.main.temp_max > maxTempDay ? element.main.temp_max : maxTempDay;
            if(element.dt_txt.includes("18:00:00")){ //Si es la hora de las 15:00
                const section = $("<section>");
                section.append(`<h4>${element.main.temp} °C</h4>`);
                section.append(`<p>Temperatura mínima: ${minTempDay} °C</p>`);
                section.append(`<p>Temperatura máxima: ${maxTempDay} °C</p>`);
                section.append(`<p>Presión: ${element.main.pressure} °C</p>`);
                section.append(`<p>Humedad: ${element.main.humidity} %</p>`);
                section.append(`<p>Cantidad de Lluvia: ${element.rain ? element.rain['3h'] : 0} mm</p>`);
                const iconUrl = `https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
                section.append(`<img src="${iconUrl}" alt="Icono del tiempo">`);
                $("main").append(section);
             
                minTempDay = Number.POSITIVE_INFINITY;
                maxTempDay = -100000;
            }
        });
    }


}