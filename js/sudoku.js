class Sudoku{
    constructor(){
        this.boardArray = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        //this.board = "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7";
        //this.board = "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984";
        this.boardRow = 9;
        this.boardColumn = 9;
        this.board = Array.from({ length: this.boardRow }, () => Array(this.boardColumn).fill(0));
        this.start();
    }
    start(){
        for(let i = 0;i<this.boardRow;i++){
            for(let j = 0;j<this.boardColumn;j++){
                this.board[i][j] = this.boardArray.charAt(i*this.boardRow+j)!=='.' ? parseInt(this.boardArray.charAt(i*this.boardRow+j)) : 0;
            }
        }
    }
    cleanClicked(){
        const cellParagraph = document.querySelectorAll("main>p");
        for(let i = 0;i<this.boardRow;i++){
            for(let j = 0;j<this.boardColumn;j++){
                if(cellParagraph[i*this.boardRow+j].getAttribute("data-state") === "clicked"){
                    cellParagraph[i*this.boardRow+j].setAttribute("data-state", "unclicked");
                }
            }
        }
    }
    createStructure() {
        const sudokuBoard = document.querySelector("main");

        // Crear párrafos para representar las celdas del sudoku
        for (let i = 0; i < this.boardRow; i++) {
            for (let j = 0; j < this.boardColumn; j++) {
                const cellParagraph = document.createElement("p");
                if(this.board[i][j]==0){
                    cellParagraph.setAttribute("data-state", "unclicked");
                    cellParagraph.addEventListener("click", () => {
                        if (cellParagraph.getAttribute("data-state") === "unclicked") {
                            this.cleanClicked();
                            cellParagraph.setAttribute("data-state", "clicked");
                        }
                        });
                }
                else{
                    cellParagraph.setAttribute("data-state", "blocked");
                }
                sudokuBoard.appendChild(cellParagraph);
            }
        }
    }

    paintSudoku() {
        this.createStructure();
        const cells = document.querySelectorAll("main>p");

        // Poner el valor correspondiente en cada párrafo
        for (let i = 0; i < this.boardRow; i++) {
            for (let j = 0; j < this.boardColumn; j++) {
                const cellValue = this.board[i][j];
                const cellIndex = i * this.boardRow + j;
                const cellParagraph = cells[cellIndex];

                cellParagraph.textContent = cellValue != 0 ? cellValue : "";
            }
        }
    }
    introduceNumber(event,cellParagraph){
        const main = document.querySelector("main");
        var cellIndex = -1;
        for(let i = 0;i<main.childElementCount;i++){
            if(main.children[i].getAttribute("data-state") === "clicked"){
                cellParagraph = main.children[i];
                cellIndex = i;
                continue;
            }
        }
        var numero = parseInt(event.key);
        var row = Math.trunc(cellIndex / this.boardRow);
        var col= cellIndex % this.boardColumn;
        if (this.isValidMove(row, col, numero)) {
            this.board[row][col] = numero;
            cellParagraph.textContent = numero;
            cellParagraph.setAttribute("data-state", "correct");
            if (this.isSolved()) {
                alert("¡Enhorabuena, has completado el sudoku!");
            }
        }
    }
    isValidMove(row, col, num) {
        // Comprobar si el número ya existe en la fila o columna
        for (let i = 0; i < 9; i++) {
            if (this.board[row][i] === num || this.board[i][col] === num) {
                return false;
            }
        }

        // Comprobar si el número ya existe en el bloque 3x3
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        // Si no se encontraron conflictos, el movimiento es válido
        return true;
    }
    isSolved(){
        for(let i = 0;i<this.boardRow;i++){
            for(let j = 0;j<this.boardColumn;j++){
                if(this.board[i][j]==0)return false;
            }
        }
        return true;
    }
    addKeyBoardListener(){
        document.addEventListener("keydown", (event) => {
            const cellParagraph = document.querySelector("main>p[data-state='clicked']");
            if(cellParagraph==null){
                alert("Debes seleccionar una celda válida antes de pulsar un número");
                return;
            }
            const keyPressed = parseInt(event.key);
            if(!isNaN(keyPressed) && keyPressed >= 1 && keyPressed <= 9)
                this.introduceNumber(event,cellParagraph);
            
        });
    }
}