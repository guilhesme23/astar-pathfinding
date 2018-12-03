// Global variables
var w = 60
var cols, rows
var maze = []
var current;

function setup() {
  createCanvas(601, 601)
  cols = floor(width / w)
  rows = floor(height / w)

  for (let j=0; j<rows; j++) {
    for (let i=0; i<cols; i++) {
      let cell = new MazeCell(i,j)
      maze.push(cell)
    }
  }

  current = maze[0]
}

function draw() {
  background(33)

  for (let i in maze) {
    maze[i].show()
  }
}