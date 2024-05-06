const puzzleContainer = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffle-btn');

const pieces = [];

// Create puzzle pieces
for (let i = 0; i < 16; i++) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.backgroundImage = `url('img/mom_picture.jpg')`; // Replace 'mom_picture.jpg' with the actual filename of your mom's picture
    piece.style.backgroundPosition = `${-100 * (i % 4)}px ${-100 * Math.floor(i / 4)}px`;
    piece.style.width = '100px';
    piece.style.height = '100px';
    piece.style.top = `${100 * Math.floor(i / 4)}px`;
    piece.style.left = `${100 * (i % 4)}px`;
    piece.draggable = true;

    piece.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);
    });

    pieces.push(piece);
    puzzleContainer.appendChild(piece);
}

// Shuffle puzzle pieces
shuffleBtn.addEventListener('click', shufflePieces);

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i].style.left, pieces[j].style.left] = [pieces[j].style.left, pieces[i].style.left];
        [pieces[i].style.top, pieces[j].style.top] = [pieces[j].style.top, pieces[i].style.top];
    }
}
