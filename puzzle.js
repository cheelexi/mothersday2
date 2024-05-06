const puzzleContainer = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffle-btn');

const pieces = [];

// Create puzzle pieces
for (let i = 0; i < 6; i++) { // Changed to 6 pieces
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

// Shuffle puzzle pieces
shufflePieces();

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        puzzleContainer.insertBefore(pieces[i], pieces[j]);
    }
}

// Listen for drop event on puzzle container
puzzleContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData('text');
    const piece = document.getElementById(pieceId);
    if (piece) {
        puzzleContainer.appendChild(piece);
    }
});

// Listen for dragover event on puzzle container
puzzleContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
});

// Check if puzzle is solved correctly
function checkPuzzle() {
    // Get all puzzle pieces
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    
    // Check if all puzzle pieces are in correct order
    let isSolved = true;
    for (let i = 0; i < puzzlePieces.length; i++) {
        if (puzzlePieces[i] !== pieces[i]) {
            isSolved = false;
            break;
        }
    }

    // If puzzle is solved, dispatch the puzzleSolved event
    if (isSolved) {
        const event = new Event('puzzleSolved');
        document.dispatchEvent(event);
    }
}
