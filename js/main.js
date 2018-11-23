const d = document;
const screen = d.querySelector('.ipad-screen__content');
const homeButton = d.querySelector('.home-button');
const menu = d.querySelector('.ipad-screen-menu');
const grid = d.querySelector('.ipad-screen-menu__btn--grid');
const eraser = d.querySelector('.ipad-screen-menu__btn--eraser');
const palette = d.querySelector('.ipad-screen-menu__btn--palette');
const die = d.querySelector('.ipad-screen-menu__btn--die');
const colorPicker = d.querySelector('.color-picker');
const gridRows = screen.getBoundingClientRect().height;
const gridCols = screen.getBoundingClientRect().width;
let cellColor = '#000';
function createGrid(gridSize = 16) {
  clear();
  let cells = [...d.querySelectorAll('.cell')];
  if(screen.classList.contains('created') && cells) {
    cells.forEach(cell => screen.removeChild(cell));
  }
  for(let row = 0; row < gridSize; row++) {
    for(let col = 0; col < gridSize; col++) {
      let cell = d.createElement('div');
      cell.classList.add('cell');
      cell.style.width = `${Math.floor(gridCols / gridSize)}px`;
      cell.style.height = `${Math.floor(gridRows / gridSize)}px`;
      cell.addEventListener('mouseover', hoverCell);
      screen.appendChild(cell);
    }
  }
  screen.classList.add('created');
  cellColor = '#000';
}

function hoverCell(e) {
  this.style.backgroundColor = cellColor;
  e.stopPropagation();
}

function setRandomColor() {
  function getRandomCodes() {
    let codes = [];
    for (let i = 0; i < 3; i++) {
      const code = Math.floor(Math.random() * 256);
      codes.push(code);
    }
    return codes.join(',');
  }
  window.colorTimer = setInterval(function(){
    cellColor = `rgb(${getRandomCodes()})`;
  }, 200);
}

function clear() {
  clearInterval(window.colorTimer);
}

function setColor(hex) {
  cellColor = hex;
  palette.style.backgroundColor = cellColor;
}

function eraseColor() {
  cellColor = 'transparent';
  palette.style.backgroundColor = cellColor;
}

function clickHomeButton(e) {
  e.stopPropagation();
  menu.classList.toggle('ipad-screen-menu--active');
}

function clickPalette() {
  colorPicker.classList.toggle('color-picker--visible');
  clear();
}

function removeColorPicker(e) {
  if(!colorPicker.contains(e.target) && e.target !== palette) {
    colorPicker.classList.remove('color-picker--visible');
  }
}

homeButton.addEventListener('click', clickHomeButton);
palette.addEventListener('click', clickPalette);
eraser.addEventListener('click', () => {
  clear();
  eraseColor();
});
die.addEventListener('click', () => setRandomColor());
grid.addEventListener('click', () => {
  function getChoice() {
    let choice = 0;
    while(choice < 9 || choice > 81) {
      choice = +prompt('Enter grid size\(From 9 to 81\):', '32');
    }
    return choice;
  }

  let gridSize = getChoice();
  createGrid(gridSize);
});

ColorPicker(
  colorPicker,
  function(hex, hsv, rgb) {
    setColor(hex);
  }
);

window.addEventListener('click', removeColorPicker);

// START FIRST GRID
createGrid();
