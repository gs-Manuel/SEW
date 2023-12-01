"use strict";
class Fondo{
    constructor( pais){
        this.nombre = pais.getNombre();
        this.capital = pais.getCapital();
        this.coordenadas = pais.getCoordenadasCapital();
    }
    getImagen() {
        const apiKey = "449519db638408c458d94b70d99d04ba";
        const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.capital}&format=json&nojsoncallback=true`;

        $.getJSON({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
              // Verificar si se obtuvieron resultados
              if (data.stat='ok') {
                console.log(data);
                const photo = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length) ];
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                $("article").css({
                  "background-image": `url('${imageUrl}')`,
                  "background-repeat": "no-repeat",
                  'height': '100vh',
                  "background-size": "cover",
                  "background-position": "center center"
                  
              });
              } else {
                console.error(`No se encontraron imágenes para la capital de ${pais}.`);
              }
            },
            error: function (error) {
              console.error('Error en la solicitud AJAX:', error);
            }
          });
        }
    //Secreto: 1b710fc80ffa252f
    //Background de fondo mediante propiedad css
}