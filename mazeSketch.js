// Global variables
var cols = 10;
var rows = 10;
var w;
var h;
var grid;
var openSet = [];
var closedSet = [];
var start;
var end;
var currPath = [];
var currentMaze;

function setup() {
  createCanvas(601, 601);
  w = floor(width / cols);
  h = floor(height / rows);

  // Initialize grid
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Make the initial cell the current and set as visited
  currentMaze = grid[0][0].maze;
}

function draw() {
  background(30);
  for (let i in grid) {
    for (let j in grid[i]) {
      grid[i][j].maze.show();
    }
  }

  currentMaze.visited = true;
}
