const COLS = 10; // Nombre de colonnes
const ROWS = 22; // Nombre de lignes

var gameCanvas = document.getElementById("game-canvas"); // Zone de dessin
var ctx = gameCanvas.getContext("2d"); // Contexte de rendu

/**
 * Cette fonction dessine une grille sur le canvas.
 * La grille est composée de lignes verticales et horizontales qui délimitent les cellules de la grille de jeu.
 */
function drawGrid() {
    ctx.strokeStyle = "#cccccc";
    ctx.beginPath();

    for (let x = 0; x <= COLS; x++) {
        ctx.moveTo(x * BLOCK_SIZE, 0);
        ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    }

    for (let y = 0; y <= ROWS; y++) {
        ctx.moveTo(0, y * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
    }

    ctx.stroke();
}

const tetriminoL = new Tetrimino([
    [0, 0], [1, 0], [2, 0], [2, 1]
], "orange");
const tetriminoJ = new Tetrimino([
    [0, 0], [1, 0], [2, 0], [0, 1]
], "blue");
const tetriminoI = new Tetrimino([
    [0, 0], [1, 0], [2, 0], [3, 0]
], "cyan");
const tetriminoO = new Tetrimino([
    [0, 0], [1, 0], [0, 1], [1, 1]
], "yellow");
const tetriminoT = new Tetrimino([
    [0, 0], [1, 0], [2, 0], [1, 1]
], "purple");
const tetriminoZ = new Tetrimino([
    [0, 0], [1, 0], [1, 1], [2, 1]
], "red");
const tetriminoS = new Tetrimino([
    [0, 1], [1, 1], [1, 0], [2, 0]
], "green");

/**
 * Cette fonction initialise la partie.
 */
function init() {
    drawGrid();
    tetriminoL.draw(ctx);
    // tetriminoJ.draw(ctx);
    // tetriminoI.draw(ctx);
    // tetriminoO.draw(ctx);
    // tetriminoT.draw(ctx);
    // tetriminoZ.draw(ctx);
    // tetriminoS.draw(ctx);
}

init();
