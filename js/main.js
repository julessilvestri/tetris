const COLS = 10; // Nombre de colonnes
const ROWS = 22; // Nombre de lignes
const FPS = 3; // Images par seconde (vitesse de la boucle du jeu)

let gameRunning = true;
let score = 0;

let gameCanvas = document.getElementById("game-canvas"); // Zone de dessin
let ctx = gameCanvas.getContext("2d"); // Contexte de rendu

let previewCanvas = document.getElementById("preview-canvas");
let previewCtx = previewCanvas.getContext("2d");

let scoreValue = document.getElementById("score-value")

let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

let currentTetrimino = null;

let nextTetriminos = []; // Tableau des prochains tetriminos
let gameLoopInterval; // Stocke l'intervalle pour pouvoir l'arrêter

const tetriminoShapes = [ 
    [[0, 0], [1, 0], [2, 0], [2, 1]], // Forme en L inversé
    [[0, 0], [1, 0], [2, 0], [0, 1]], // Autre forme en L
    [[0, 0], [1, 0], [2, 0], [3, 0]], // Barre
    [[0, 0], [1, 0], [0, 1], [1, 1]], // Carré
    [[0, 0], [1, 0], [2, 0], [1, 1]], // T
    [[0, 0], [1, 0], [1, 1], [2, 1]], // Z
    [[0, 1], [1, 1], [1, 0], [2, 0]]  // S
];

const tetriminoColors = ["#f89622", "#005a9d", "#2bace2", "#fde100", "#922b8c", "#ee2733", "#4eb748"];

const playPauseButton = document.getElementById("play-pause-button");
const resetButton = document.getElementById("reset-button");

/**
 * Cette fonction dessine une grille sur le canvas.
 * La grille est composée de lignes verticales et horizontales qui délimitent les cellules de la grille de jeu.
 */
function drawGrid() {
    ctx.strokeStyle = "#999999";
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

// Efface le canvas
function clearCanvas() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Cette fonction génère les 3 prochains Tetriminos
function generateNextTetriminos() {
    nextTetriminos = [];
    for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * tetriminoShapes.length);
        let shape = tetriminoShapes[index];
        let color = tetriminoColors[index];
        nextTetriminos.push({ shape, color }); // Stocker uniquement la forme et la couleur
    }
}

function drawNextTetriminos() {
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);  // Efface le canvas

    let offsetY = 0; // Décalage vertical pour empiler les pièces

    nextTetriminos.forEach(({ shape, color }) => {
        shape.forEach(([x, y]) => {
            previewCtx.fillStyle = color;
            previewCtx.fillRect(x * BLOCK_SIZE, (y + offsetY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            previewCtx.strokeStyle = 'black';
            previewCtx.strokeRect(x * BLOCK_SIZE, (y + offsetY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        });

        offsetY += 3;  // Espace entre les Tetriminos pour éviter qu'ils se touchent
    });
}

function spawnTetrimino() {
    if (nextTetriminos.length === 0) {
        generateNextTetriminos();
    }

    let { shape, color } = nextTetriminos.shift();

    // Trouver la largeur du Tetrimino pour le centrer
    let minX = Math.min(...shape.map(([x, _]) => x));
    let maxX = Math.max(...shape.map(([x, _]) => x));
    let tetriminoWidth = maxX - minX + 1; // Largeur réelle du Tetrimino

    // Calculer le décalage horizontal pour centrer
    let offsetX = Math.floor((COLS - tetriminoWidth) / 2);

    // Créer un Tetrimino avec l'offset appliqué
    let newTetrimino = new Tetrimino(
        shape.map(([x, y]) => [x + offsetX, y]), // Ajouter offsetX aux coordonnées X
        color
    );

    // Vérification de fin de jeu
    if (!newTetrimino.canMove(0, 0, grid)) {
        endGame();
        return;
    }

    currentTetrimino = newTetrimino;

    // Ajouter un nouveau Tetrimino à la liste
    let index = Math.floor(Math.random() * tetriminoShapes.length);
    nextTetriminos.push({
        shape: tetriminoShapes[index],
        color: tetriminoColors[index]
    });

    drawNextTetriminos();
}


function clearCompleteLines() {
    let linesCleared = 0;

    for (let y = ROWS - 1; y >= 0; y--) {
        if (grid[y].every(cell => cell !== null)) {
            grid.splice(y, 1);
            grid.unshift(Array(COLS).fill(null));
            linesCleared++;
            y++;
        }
    }

    return linesCleared;
}

function updateGame() {
    if (currentTetrimino.canMove(0, 1, grid)) {
        currentTetrimino.move(0, 1);
    } else {
        currentTetrimino.blocs.forEach(bloc => {
            grid[bloc.y][bloc.x] = bloc.color;
        });

        const linesCleared = clearCompleteLines();
        if (linesCleared > 0) {
            const points = [0, 100, 300, 500, 800];
            score += points[linesCleared];
            scoreValue.value = score
        }
        // Génère un nouveau Tetrimino
        spawnTetrimino();
    }
}

function renderGame() {
    clearCanvas();
    drawGrid();

    // Dessine le Tetrimino actif
    if (currentTetrimino) {
        currentTetrimino.draw(ctx);
    }

    // Dessine les prochains Tetriminos
    drawNextTetriminos();

    // Dessine les blocs fixés dans la grille
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = grid[y][x];
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = "black";
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (!currentTetrimino) return;

    switch (event.code) {
        case "ArrowLeft":
            if (currentTetrimino.canMove(-1, 0, grid)) currentTetrimino.move(-1, 0);
            break;
        case "ArrowRight":
            if (currentTetrimino.canMove(1, 0, grid)) currentTetrimino.move(1, 0);
            break;
        case "ArrowDown":
            if (currentTetrimino.canMove(0, 1, grid)) currentTetrimino.move(0, 1);
            break;
        case "ArrowUp":
            currentTetrimino.rotate(grid);
            break;
        case "Space":
            while (currentTetrimino.canMove(0, 1, grid)) {
                currentTetrimino.move(0, 1);
            }
            break;
    }

    renderGame();
});

function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    renderGame();
}

// Gérer le bouton Play/Pause
playPauseButton.addEventListener("click", () => {
    if (gameRunning) {
        gameRunning = false;
        playPauseButton.innerHTML = `<span class="icon"><i class="fas fa-play"></i></span> <span>Play</span>`;
        playPauseButton.classList.remove("is-danger")
        playPauseButton.classList.add("is-primary")
    } else {
        gameRunning = true;
        playPauseButton.innerHTML = `<span class="icon"><i class="fas fa-pause"></i></span> <span>Pause</span>`;
        playPauseButton.classList.remove("is-primary")
        playPauseButton.classList.add("is-danger")
        gameLoop();
    }
    playPauseButton.blur(); // Retirer le focus après le clic
});

// Gérer le bouton Reset
resetButton.addEventListener("click", () => {
    resetGame();
    playPauseButton.innerHTML = `<span class="icon"><i class="fas fa-pause"></i></span> <span>Pause</span>`;
    playPauseButton.classList.remove("is-primary")
    playPauseButton.classList.add("is-danger")
    resetButton.blur();
});

function endGame() {
    gameRunning = false;
    clearInterval(gameLoopInterval); // Arrête la boucle de jeu

    document.getElementById("final-score").innerText = `Your score: ${score}`;
    const modal = document.getElementById("game-over-modal");
    modal.classList.add("is-active");

    document.getElementById("retry-button").addEventListener("click", () => {
        modal.classList.remove("is-active");
        resetGame();
    });
}


function resetGame() {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    score = 0;
    scoreValue.value = score;
    gameRunning = true;

    clearInterval(gameLoopInterval); // S'assure qu'il n'y a pas d'anciens intervalles actifs
    init(); // Relance le jeu
}

/**
 * Cette fonction initialise la partie.
 */
function init() {
    generateNextTetriminos();
    spawnTetrimino();
    gameLoopInterval = setInterval(gameLoop, 1000 / FPS);
}

init();
