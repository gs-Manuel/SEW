"use strict";
class Memoria{
    constructor(){
        this.hasFlippedCard = false;//Indica si ya hay una carta dada la vuelta
        this.lockBoard = false;//Indica si el tablero está bloqueado a la interaccion del usuario
        this.firstCard = null;//indica la primera carta que se ha dado la vuelta en esta interaccion
        this.secondCard = null;//indica la segunda carta que se ha dado la vuelta en esta interaccion
        // Objeto JSON con las tarjetas del juego de memoria
        this.elements = [
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg", state: "unflip" },
            { element: "HTML5", source: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg", state: "unflip" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg", state: "unflip" },
            { element: "CSS3", source: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg", state: "unflip" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg", state: "unflip" },
            { element: "JS", source: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg", state: "unflip" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", state: "unflip" },
            { element: "PHP", source: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg", state: "unflip" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg", state: "unflip" },
            { element: "SVG", source: "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg", state: "unflip" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg", state: "unflip" },
            { element: "W3C", source: "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg", state: "unflip" },
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
        imagen.setAttribute("data-state", elemento.state);
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
    flipCard(game){//El this en este metodo hace referencia a la carta sobre la que se lanza el evento
        if (game.lockBoard) return;
        if (game.firstCard==null) return;
        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true;
            game.firstCard = this;
            game.firstCard.state="flip";
            game.firstCard.dataset.state="flip";
            return;
        }
        game.secondCard = this;
        game.secondCard.state="flip";
        game.secondCard.dataset.state="flip";
        game.checkForMatch();
    }
    // Implementa la lógica para revertir las cartas a su estado original (boca abajo)
    unflipCards(){
        this.lockBoard = true;
        this.firstCard.state = "unflip";
        this.secondCard.state = "unflip";
        setTimeout(() => {
            this.firstCard.dataset.state="unflip";
            this.secondCard.dataset.state="unflip";
            this.resetBoard(game);
        }, 1500);
    }
    addEventListeners(){
        const cards = document.querySelectorAll("article");
        cards.forEach((card) => {
            card.addEventListener("click", this.flipCard.bind(card,this));//this hace referencia al juego de memoria, 
                                                                            //bind permite pasar card como parametro -> el nuevo "this" será la card
        });
    }
}
const juegoMemoria = new Memoria();
juegoMemoria.createElements();
juegoMemoria.addEventListeners();
