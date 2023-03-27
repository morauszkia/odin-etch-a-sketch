/* GRID */
const gridContainer = document.getElementById('grid-container');
/* SIZE INPUT */
const sizeInputEl = document.getElementById('grid-size-input');
const sizeDisplayEl = document.getElementById('size-display');
const sizeControlBtnEl = document.getElementById('size-control-btn');
/* ERASE */
const eraseBtnEl = document.getElementById('erase-btn');
const resetBtnEl = document.getElementById('reset-btn');

const DEFAULT_VALUES = {
  size: 16,
  color: '#333',
  isDrawing: false,
};

let state = { ...DEFAULT_VALUES };

/* BASIC FUNCTIONALITY */
const draw = (e) => {
  if (e.type === 'mouseover' && !state.isDrawing) return;

  e.target.style.backgroundColor = state.color;
};

const createGrid = () => {
  let numOfSquares = state.size ** 2;

  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${state.size}, 1fr)`;

  for (let i = 0; i < numOfSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    square.addEventListener('mouseover', draw);
    gridContainer.appendChild(square);
  }
};

/* CHANGE GRID SIZE */
const handleSizeChange = (e) => {
  const { value } = e.target;
  sizeDisplayEl.innerText = `${value}x${value}`;
  state.size = value;
};

/* CHANGE COLOR */

/*
- pick a color: color picker input
- eraser
- shades
- random color
*/

/* RESET DEFAULTS */
const resetApp = () => {
  state = { ...DEFAULT_VALUES };
  sizeInputEl.value = state.size;
  sizeDisplayEl.innerText = `${state.size}x${state.size}`;
  createGrid();
};

/* EVENT LISTENERS */
document.body.addEventListener('mousedown', () => (state.isDrawing = true));
document.body.addEventListener('mouseup', () => (state.isDrawing = false));

sizeInputEl.addEventListener('change', handleSizeChange);
sizeControlBtnEl.addEventListener('click', createGrid);

eraseBtnEl.addEventListener('click', createGrid);
resetBtnEl.addEventListener('click', resetApp);

/* INITIALIZE */
createGrid();
