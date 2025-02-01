const COLS = 10; // Nombre de colonnes
const ROWS = 22; // Nombre de lignes
const FPS = 3; // Images par seconde (vitesse de la boucle du jeu)

let gameRunning = true;
let score = 0;

let gameCanvas = document.getElementById("game-canvas"); // Zone de dessin
let ctx = gameCanvas.getContext("2d"); // Contexte de rendu

let scoreValue = document.getElementById("score-value")

let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

let currentTetrimino = null;

/**
 * Cette fonction dessine une grille sur le canvas.
 * La grille est composée de lignes verticales et horizontales qui délimitent les cellules de la grille de jeu.
 */
function drawGrid() {
    ctx.strokeStyle = "#333333";
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

// Génère un Tetrimino aléatoire
function spawnTetrimino() {
    const tetriminos = [
        new Tetrimino([[0, 0], [1, 0], [2, 0], [2, 1]], "#f89622"),
        new Tetrimino([[0, 0], [1, 0], [2, 0], [0, 1]], "#005a9d"),
        new Tetrimino([[0, 0], [1, 0], [2, 0], [3, 0]], "#2bace2"),
        new Tetrimino([[0, 0], [1, 0], [0, 1], [1, 1]], "#fde100"),
        new Tetrimino([[0, 0], [1, 0], [2, 0], [1, 1]], "#922b8c"),
        new Tetrimino([[0, 0], [1, 0], [1, 1], [2, 1]], "#ee2733"),
        new Tetrimino([[0, 1], [1, 1], [1, 0], [2, 0]], "#4eb748"),
    ];

    let newTetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];

    // Calculer la position de départ pour centrer la pièce horizontalement
    const startX = Math.floor(COLS / 2) - Math.floor(Math.max(...newTetrimino.blocs.map(b => b.x)) / 2)-1;
    const startY = 0; // Commencer légèrement au-dessus de la grille

    // Déplacer les blocs du Tetrimino à la nouvelle position de départ
    newTetrimino.blocs.forEach(bloc => {
        bloc.x += startX;
        bloc.y += startY;
    });

    const canSpawn = newTetrimino.blocs.every(bloc => {
        return (
            bloc.x >= 0 &&
            bloc.x < COLS &&
            bloc.y >= 0 &&
            bloc.y < ROWS &&
            !grid[bloc.y][bloc.x]
        );
    });

    if (!canSpawn) {
        endGame();
    } else {
        currentTetrimino = newTetrimino;
    }
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

// Redessine le jeu
function renderGame() {
    clearCanvas();
    drawGrid();

    // Dessine le Tetrimino actif
    if (currentTetrimino) {
        currentTetrimino.draw(ctx);
    }

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

function endGame() {
    gameRunning = false;
    alert("Game Over!");
}

/**
 * Cette fonction initialise la partie.
 */
function init() {
    spawnTetrimino();
    setInterval(gameLoop, 1000 / FPS);
}

init();