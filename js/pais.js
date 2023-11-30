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
        document.write("<p> Coordenadas de la capital</p>")
        document.write(`
            <ul>
                <li>Latitud: ${this.getCoordenadasCapital()[0]}</li>    
                <li>Longitud: ${this.getCoordenadasCapital()[1]}</li>
            </ul>
            `)
    }
}