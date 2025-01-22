const COLS = 10; // Nombre de colonnes
const ROWS = 22; // Nombre de lignes
const BLOCK_SIZE = 30; // Taille d'un bloc en pixels

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

/**
 * Cette fonction initialise la partie.
 */
function init() {
    drawGrid();
}

init();
