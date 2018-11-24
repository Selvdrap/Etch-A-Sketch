const d = document;
const screen = d.querySelector('.ipad-screen__content');
const homeButton = d.querySelector('.home-button');
const menu = d.querySelector('.ipad-screen-menu');
const grid = d.querySelector('.ipad-screen-menu__btn--grid');
const eraser = d.querySelector('.ipad-screen-menu__btn--eraser');
const palette = d.querySelector('.ipad-screen-menu__btn--palette');
const die = d.querySelector('.ipad-screen-menu__btn--die');
const borders = d.querySelector('.ipad-screen-menu__btn--borders');
const colorPicker = d.querySelector('.color-picker');
const gridRows = screen.getBoundingClientRect().height;
const gridCols = screen.getBoundingClientRect().width;
let cellColor = '#000';
let cellBorderColor = '#a399b2';

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
      screen.appendChild(cell);
    }
  }
  screen.classList.add('created');
  cellColor = '#000';
}

function clickScreen() {
  screen.style.cursor = 'crosshair';
  const cells = [...d.querySelectorAll('.cell')];
  cells.forEach(cell => {
    cell.addEventListener('mouseover', hoverCell);
  });
}

function hoverCell(e) {
  e.target.style.backgroundColor = cellColor;
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
  palette.style.backgroundColor = 'transparent';
  window.colorTimer = setInterval(function(){
    cellColor = `rgb(${getRandomCodes()})`;
  }, 200);
}

function clear() {
  if(window.colorTimer) clearInterval(window.colorTimer);
}

function setColor(hex) {
  cellColor = hex;
  palette.style.backgroundColor = cellColor;
}

function eraseColor() {
  if(cellColor === 'transparent') {
    cellColor = '#000';
    eraser.backgroundColor = 'none'; 
  }
  else {
    cellColor = 'transparent';
    eraser.backgroundColor = '#2c3e50';
    palette.style.backgroundColor = cellColor;
  }
}

function clickHomeButton(e) {
  e.stopPropagation();
  menu.classList.toggle('ipad-screen-menu--active');
}

function clickPalette() {
  colorPicker.classList.toggle('color-picker--visible');
  clear();
}

function clickBorders() {
  const cells = [...d.querySelectorAll('.cell')];
  cells.forEach(cell => {
    cell.classList.toggle('no-borders');
  });
}

function gridClick() {
  function getChoice() {
    let choice = null;
    while(choice < 9 || choice > 64) {
      choice = prompt('Enter grid size\(From 9 to 64\):', '16');
      if(choice == null) return null;
    }
    return +choice;
  }
  let gridSize = getChoice();
  if(gridSize) createGrid(gridSize);
}

function removeColorPicker(e) {
  if(!colorPicker.contains(e.target) && e.target !== palette) {
    colorPicker.classList.remove('color-picker--visible');
  }
}

homeButton.addEventListener('click', clickHomeButton);
palette.addEventListener('click', clickPalette);
borders.addEventListener('click', clickBorders);
eraser.addEventListener('click', () => {
  clear();
  eraseColor();
});
die.addEventListener('click', () => setRandomColor());
grid.addEventListener('click', gridClick);

// COLOR PICKER

ColorPicker(
  colorPicker,
  function(hex, hsv, rgb) {
    setColor(hex);
  }
);
window.addEventListener('click', removeColorPicker);

// START FIRST GRID
createGrid();

setInterval(() => {
  let mousedown = false;
  if(!mousedown) {
    screen.addEventListener('mousedown', clickScreen);
    screen.addEventListener('mouseup', () => {
      screen.removeEventListener('mousedown', clickScreen);
      const cells = [...d.querySelectorAll('.cell')];
      cells.forEach(cell => cell.removeEventListener('mouseover', hoverCell));
      mousedown = true;
      screen.style.cursor = 'default';
    });
  }
}, 500);