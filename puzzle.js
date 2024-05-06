// Function to initialize the puzzle
function initializePuzzle() {
    // Show the puzzle container and shuffle button
    document.getElementById("puzzle-container").style.display = "block";
    document.getElementById("shuffle-btn").style.display = "block";
    // Create and display the puzzle pieces
    createPuzzle();
}

// Function to create and display puzzle pieces
function createPuzzle() {
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

        // If puzzle is solved, execute main functionality
        if (isSolved) {
            // Your code to execute main functionality goes here
            console.log("Puzzle solved correctly! Main functionality will now execute.");
            // Dispatch a custom event to signal puzzle solved
            const puzzleSolvedEvent = new Event('puzzleSolved');
            document.dispatchEvent(puzzleSolvedEvent);
        }
    }
}
