// Global variables
var cols = 10;
var rows = 10;
var w;
var h;
var maze = []

function setup() {
  createCanvas(601, 601);
  w = floor(width / cols);
  h = floor(height / rows);

  // Create grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let spot = new MazeSpot(i,j)
      maze.push(spot)
    }
  }

}

function draw() {
  background(30);
  
  for (let i in maze) {
    maze[i].show()
  }
}
