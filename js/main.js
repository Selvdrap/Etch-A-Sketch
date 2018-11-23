const d = document;
const screen = d.querySelector('.ipad-screen__content');
let cellSize = 32;
let gridRows = screen.getBoundingClientRect().height;
let gridCols = screen.getBoundingClientRect().width;
const homeButton = d.querySelector('.home-button');
const menu = d.querySelector('.ipad-screen-menu');
let cellColor = '#000';

if(gridRows * cellSize > screen.getBoundingClientRect().height) --gridRows;
if(gridCols * cellSize > screen.getBoundingClientRect().width) --gridCols;
for(let row = 0; row < gridRows; row++) {
  console.log(`gridRows: ${gridRows}. ScreenSize: ${screen.clientHeight}.`);
  for(let col = 0; col < gridCols; col++) {
    let cell = d.createElement('div');
    cell.classList.add('cell');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    screen.appendChild(cell);
  }
}

function hoverCell(e) {
  if(e.target != e.currentTarget) {
    e.target.style.backgroundColor = cellColor;
  }
  e.stopPropagation();
}

function getRandomColor() {
  function getRandomCodes() {
    let codes = [];
    for (let i = 0; i < 3; i++) {
      const code = Math.floor(Math.random() * 256);
      codes.push(code);
    }
    return codes;
  }
  const codesStr = getRandomCodes().join(',');
  return `rgb(${codesStr})`;
}

function setColor(erase) {
  cellColor = erase ? 'transparent' : getRandomColor();
}

function clickHomeButton(e) {
  e.stopPropagation();
  menu.classList.toggle('ipad-screen-menu--active');
}

screen.addEventListener('mouseover', hoverCell);
homeButton.addEventListener('click', clickHomeButton);