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

// Forme du tetrominos
const shapeI = [
    [0, 0], [1, 0], [2, 0], [3, 0]
];

const shapeO = [
    [0, 0], [1, 0], [0, 1], [1, 1]
];

const shapeT = [
    [0, 0], [1, 0], [2, 0], [1, 1]
];

const shapeL = [
    [0, 0], [1, 0], [2, 0], [2, 1]
];

const shapeJ = [
    [0, 0], [1, 0], [2, 0], [0, 1]
];

const shapeZ = [
    [0, 0], [1, 0], [1, 1], [2, 1]
];

const shapeS = [
    [0, 1], [1, 1], [1, 0], [2, 0]
];

// Couleur du tetrominos
const colorI = "cyan";
const colorO = "yellow";
const colorT = "purple";
const colorL = "orange";
const colorJ = "blue";
const colorZ = "red";
const colorS = "green";

const tetriminoL = new Tetrimino(shapeL, colorL);
const tetriminoJ = new Tetrimino(shapeJ, colorJ);
const tetriminoI = new Tetrimino(shapeI, colorI);
const tetriminoO = new Tetrimino(shapeO, colorO);
const tetriminoT = new Tetrimino(shapeT, colorT);
const tetriminoZ = new Tetrimino(shapeZ, colorZ);
const tetriminoS = new Tetrimino(shapeS, colorS);

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
