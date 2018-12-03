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
  
  for (let i in maze) {
    maze[i].buildNeighbors()
  }

  current = maze[45]
}

function draw() {
  background(33)


  current.show()
  for (let i in current.neighbors) {
    current.neighbors[i].show()
  }
  // for (let i in maze) {
  //   maze[i].show()
  // }
}