"use strict";
class fondo{
    constructor( pais){
        this.nombre = pais.getNombre();
        this.capital = paiss.getCapital();
        this.coordenadas = pais.getCoordenadasCapital();
    }
    getNombre(){
        return this.nombre;
    }
    getCapital(){
        return this.capital;
    }
    getCoordenadasCapital(){
        return this.coordenadas;
    }
    getFotos() {
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: this.getCapital(),
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("<img />").attr( "src", item.media.m).appendTo( "#imagenes" );
                        if ( i === 20 ) {
                                return false;
                        }
                    });
        });
    };

}
var pais = new Pais("Marruecos", "Rabat", 36000000);
var fondo = new fondo( pais);
fondo.getFotos();