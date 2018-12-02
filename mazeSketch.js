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
var curr;

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
  curr = grid[0][0].maze;
}

function draw() {
  background(30);
  frameRate(1)

  curr.visited = true;
  curr.highlight()
  let next = curr.pickNeighbour(grid);
  if (next) {
    console.log(next)
    next.visited = true
    curr = next
  } else {
    noLoop()
  }

  for (let i in grid) {
    for (let j in grid[i]) {
      grid[i][j].maze.show();
    }
  }
}
