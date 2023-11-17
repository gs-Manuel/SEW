"use strict";
class Memoria{
    constructor(){
        this.hasFlippedCard = false;//Indica si ya hay una carta dada la vuelta
        this.lockBoard = false;//Indica si el tablero está bloqueado a la interaccion del usuario
        this.firstCard = null;//indica la primera carta que se ha dado la vuelta en esta interaccion
        this.secondCard = null;//indica la segunda carta que se ha dado la vuelta en esta interaccion
        // Objeto JSON con las tarjetas del juego de memoria
        this.elements = [
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg", state: "faceDown" },
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg", state: "faceDown" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg", state: "faceDown" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg", state: "faceDown" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg", state: "faceDown" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg", state: "faceDown" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", state: "faceDown" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", state: "faceDown" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg", state: "faceDown" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg", state: "faceDown" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg", state: "faceDown" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg", state: "faceDown" },
        ];
      this.shuffleElements();
    }
    // Método para barajar los elementos utilizando el algoritmo de Durstenfeld
    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Intercambia elementos
          [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
      }
    createElements(){
    const seccion = document.querySelector("section");
    this.elements.forEach((elemento, index) => {
        const carta = document.createElement("article");
        carta.setAttribute("data-element", elemento.element);
    
        // Encabezado h3 para la tarjeta bocabajo
        const encabezadoH3 = document.createElement("h3");
        encabezadoH3.textContent = "Tarjeta de memoria";
        carta.appendChild(encabezadoH3);
    
        // Imagen para representar la tarjeta
        const imagen = document.createElement("img");
        imagen.setAttribute("src", elemento.source);
        imagen.setAttribute("alt", elemento.element);
        carta.appendChild(imagen);
    
        // Agregar el nodo article a la sección del juego
        seccion.appendChild(carta);
        });
    }
    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }
    checkForMatch() {
        if(this.firstCard==null || this.secondCard==null)return;
        const isMatch = this.firstCard.element === this.secondCard.element && this.firstCard.source === this.secondCard.source
        isMatch ? this.disableCards() : this.unflipCards();
    }
       // Implementa la lógica para desactivar las cartas (por ejemplo, cambiar el estado a "revealed")
    disableCards() {
        this.firstCard.state = "revealed";
        this.secondCard.state = "revealed";
        this.resetBoard();
    }
    flipCard(tarjeta){
        if (this.lockBoard) return;
        if (this.firstCard==null) return;
        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = tarjeta;
            this.firstCard.state="flip";
            this.firstCard.classList.add('flip');
            return;
        }
        this.secondCard = tarjeta;
        this.secondCard.state="flip";
        this.secondCard.classList.add('flip');
        this.checkForMatch();
    }
    // Implementa la lógica para revertir las cartas a su estado original (boca abajo)
    unflipCards(){
        this.lockBoard = true;
        this.firstCard.state = "faceDown";
        this.secondCard.state = "faceDown";
        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard(game);
        }, 1500);
    }
    addEventListeners(){
        const tarjetas = document.querySelectorAll("article");
        for(var i=0;i<tarjetas.length;i++){
            tarjetas[i].setAttribute("onclick",this.flipCard.bind(this));
        }
    }
}
const juegoMemoria = new Memoria();
juegoMemoria.createElements();

juegoMemoria.addEventListeners();
