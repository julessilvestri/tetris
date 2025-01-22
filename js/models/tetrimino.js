class Tetrimino {
    constructor(shape, color) {
        this.shape = shape; // Forme du tetrimino (un tableau de blocs relatifs)
        this.color = color; // Couleur du tetrimino
        this.blocks = []; // Tableau des blocs qui composent la pièce

        this.initBlocks();
    }

    // Initialise les blocs du tetrimino à partir de sa forme
    initBlocks() {
        this.blocks = this.shape.map(([dx, dy]) => {
            return new Bloc(dx, dy, this.color);
        });
    }

    // Dessine tous les blocs du tetrimino
    draw(ctx) {
        this.blocks.forEach(block => {
            block.draw(ctx, BLOCK_SIZE);
        });
    }
}
