class Tetrimino {
    constructor(shape, color) {
        this.shape = shape; // Forme du tetrimino (un tableau de blocs relatifs)
        this.color = color; // Couleur du tetrimino
        this.blocs = []; // Tableau des blocs qui composent la pièce

        this.initBlocks();
    }

    // Initialise les blocs du tetrimino à partir de sa forme
    initBlocks() {
        this.blocs = this.shape.map(([dx, dy]) => {
            return new Bloc(dx, dy, this.color);
        });
    }

    // Dessine tous les blocs du tetrimino
    draw(ctx) {
        this.blocs.forEach(bloc => {
            bloc.draw(ctx, BLOCK_SIZE);
        });
    }

    move(dx, dy) {
        this.blocs.forEach(bloc => {
            bloc.x += dx;
            bloc.y += dy;
        });
    }

    canMove(dx, dy, grid) {
        return this.blocs.every(bloc => {
            const newX = bloc.x + dx;
            const newY = bloc.y + dy;
            return (
                newX >= 0 &&
                newX < COLS &&
                newY < ROWS &&
                (!grid[newY] || !grid[newY][newX])
            );
        });
    }

    rotate(grid) {
        if (this.color != "#fde100") {
            const center = this.blocs[1];
            const newShape = this.blocs.map(bloc => {
                const dx = bloc.x - center.x;
                const dy = bloc.y - center.y;
                return new Bloc(center.x - dy, center.y + dx, this.color);
            });

            if (newShape.every(bloc => {
                const newX = bloc.x;
                const newY = bloc.y;
                return (
                    newX >= 0 &&
                    newX < COLS &&
                    newY < ROWS &&
                    (!grid[newY] || !grid[newY][newX])
                );
            })) {
                this.blocs = newShape;
            }
        }
    }
}
