const gridContainer = document.getElementById('grid-container');

let size = 16;
let color = '#333';

const hoverHandler = (e) => {
  e.target.style.backgroundColor = color;
};

const createGrid = (size) => {
  let numOfSquares = size ** 2;

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < numOfSquares; i++) {
    const square = document.createElement('div');
    console.log('created!');
    square.classList.add('grid-square');
    square.addEventListener('mouseenter', hoverHandler);
    gridContainer.appendChild(square);
  }
};

createGrid(size);
