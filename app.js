/* GRID */
const gridContainer = document.getElementById('grid-container');
/* SIZE INPUT */
const sizeInputEl = document.getElementById('grid-size-input');
const sizeDisplayEl = document.getElementById('size-display');
const sizeControlBtnEl = document.getElementById('size-control-btn');
/* COLOR INPUT */
const modeInputElList = document.querySelectorAll('.input-mode');
const colorPickerEl = document.getElementById('color-picker');
const colorPickerCircleEl = document.querySelector('.circle-pick');

/* ERASE */
const eraseBtnEl = document.getElementById('erase-btn');
const resetBtnEl = document.getElementById('reset-btn');

const DEFAULT_VALUES = {
  size: 16,
  mode: 'pick',
  color: '#333333',
  isDrawing: false,
};

let state = { ...DEFAULT_VALUES };

/* BASIC FUNCTIONALITY */
const draw = (e) => {
  if (e.type === 'mouseover' && !state.isDrawing) return;

  if (state.mode === 'pick') {
    e.target.style.backgroundColor = state.color;
  } else if (state.mode === 'eraser') {
    e.target.style.backgroundColor = '#ffffff';
  }
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

/* CHANGE HANDLERS */
const sizeChangeHandler = (e) => {
  const { value } = e.target;
  sizeDisplayEl.innerText = `${value}x${value}`;
  state.size = value;
};

const modeChangeHandler = (e) => {
  state.mode = e.target.value;

  if (e.target.value === 'pick') {
    colorPickerEl.style.visibility = 'visible';
  } else {
    colorPickerEl.style.visibility = 'hidden';
  }
};

/* HANDLE COLOR PICK */
const colorPickerChangeHandler = (event) => {
  const pickedColor = event.target.value;
  colorPickerCircleEl.style.backgroundColor = pickedColor;
  state.color = pickedColor;
};

/*
- random color
- shades
*/

/* RESET DEFAULTS */
const resetApp = () => {
  state = { ...DEFAULT_VALUES };
  sizeInputEl.value = state.size;
  sizeDisplayEl.innerText = `${state.size}x${state.size}`;
  colorPickerEl.value = state.color;
  colorPickerCircleEl.style.backgroundColor = state.color;
  modeInputElList.forEach((inputEl) => {
    inputEl.checked = inputEl.value === 'pick' ? true : false;
  });

  createGrid();
};

/* EVENT LISTENERS */
document.body.addEventListener('mousedown', () => (state.isDrawing = true));
document.body.addEventListener('mouseup', () => (state.isDrawing = false));

sizeInputEl.addEventListener('change', sizeChangeHandler);
sizeControlBtnEl.addEventListener('click', createGrid);

modeInputElList.forEach((modeInputEl) =>
  modeInputEl.addEventListener('change', modeChangeHandler)
);

colorPickerEl.addEventListener('change', colorPickerChangeHandler);

eraseBtnEl.addEventListener('click', createGrid);
resetBtnEl.addEventListener('click', resetApp);

/* INITIALIZE */

resetApp();
createGrid();
