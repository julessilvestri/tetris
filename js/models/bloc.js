const BLOCK_SIZE = 30;

class Bloc {
    constructor(x, y, color) {
        this.x = x; // Position X du bloc dans la grille
        this.y = y; // Position Y du bloc dans la grille
        this.color = color; // Couleur du bloc (tetrimino)
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}
