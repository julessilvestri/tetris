const BLOCK_SIZE = 30;

class Bloc {
    constructor(x, y, color) {
        this.x = x; // Position X du bloc dans la grille
        this.y = y; // Position Y du bloc dans la grille
        this.color = color; // Couleur du bloc (tetrimino)
    }

    // Fonction pour dessiner le bloc SVG dans le canvas
    // draw(ctx) {
    //     // SVG du bloc avec un dégradé personnalisé
    //     const svg = `
    //         <svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
    //             <defs>
    //                 <!-- Gradient de relief avec une transition plus nette -->
    //                 <linearGradient id="relief" x1="0" y1="0" x2="1" y2="1">
    //                     <!-- Couleur dynamique pour le remplissage -->
    //                     <stop offset="0%" stop-color="${this.color}" stop-opacity="0.9"/> <!-- Haut et gauche -->
    //                     <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8"/> <!-- Bas et droit -->
    //                 </linearGradient>
    //                 <!-- Gradient pour les bords avec des couleurs plus contrastées et une opacité -->
    //                 <linearGradient id="borderRelief" x1="0" y1="0" x2="1" y2="1">
    //                     <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/> <!-- Bord haut et gauche -->
    //                     <stop offset="100%" stop-color="${this.color}" stop-opacity="0.5"/> <!-- Bord bas et droit -->
    //                 </linearGradient>
    //             </defs>
    //             <!-- Rectangle avec des bords de 4px -->
    //             <rect x="0" y="0" width="29" height="29" fill="url(#relief)" stroke="url(#borderRelief)" stroke-width="8"/>
    //         </svg>
    //     `;

    //     // Créer une image à partir du SVG
    //     const svgImage = new Image();
    //     const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    //     const url = URL.createObjectURL(svgBlob);
    //     svgImage.src = url;

    //     // Dessiner l'image sur le canvas une fois qu'elle est chargée
    //     svgImage.onload = () => {
    //         ctx.drawImage(svgImage, this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    //         URL.revokeObjectURL(url); // Libérer l'URL une fois utilisée
    //     };
    // }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}
