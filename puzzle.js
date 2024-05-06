const puzzleContainer = document.getElementById('puzzle-container');
const targetArea = document.getElementById('target-area');
const pieces = [];

// Create puzzle pieces
for (let i = 0; i < 16; i++) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.backgroundImage = `url('img/gradme.jpeg')`; // Change the path to the image file you want to use for the puzzle
    piece.draggable = true;

    piece.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);
    });

    pieces.push(piece);
    puzzleContainer.appendChild(piece);
}

// Add event listeners to target area
targetArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

targetArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData('text');
    const piece = document.getElementById(pieceId);
    if (piece) {
        targetArea.appendChild(piece);
    }
});
