let currentGrid;
let numberOfColumns;
let numberOfRows;
let resolution = 10;

function createGrid() {
  let array = new Array(numberOfColumns);

  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(numberOfRows);
  }

  return array;
}

function countNeightbors(x, y) {
  let neightbors = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let _i = x + i;
      let _j = y + j;

      if (_i >= 0 && _i < numberOfColumns && _j >=0 && _j < numberOfRows) {
        neightbors += currentGrid[_i][_j];
      }
    }
  }

  return neightbors - currentGrid[x][y];
}

function setup() {
  let vw = max(document.documentElement.clientWidth, window.innerWidth || 0);
  let vh = max(document.documentElement.clientHeight, window.innerHeight || 0);
  createCanvas(vw, vh);

  numberOfColumns = floor(width / resolution);
  numberOfRows = floor(height / resolution);

  currentGrid = createGrid();

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      currentGrid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  let nextGrid = createGrid();

  for (let i = 0; i < numberOfColumns; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let neightbors = countNeightbors(i, j);

      if (currentGrid[i][j] === 1) {
        // Draw a green square
        fill(0, 255, 0);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);

        if (neightbors < 2 || neightbors > 3) {
          // Die on next generation
          nextGrid[i][j] = 0;
        } else {
          // Stay alive
          nextGrid[i][j] = 1;
        }
      } else if (neightbors === 3) {
        // Born on next generation
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = 0;
      }
    }
  }

  currentGrid = nextGrid;
}
