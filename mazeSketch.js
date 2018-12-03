// Global variables
var w = 60
var cols, rows
var maze = []
var current;

var pos = 0

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

  current = maze[0]
}

function draw() {
  background(33)
  // pos = pos % maze.length
  // current = maze[pos]
  
  current.visited = true
  current.show()
  // for (let i in current.neighbors) {
  //   current.neighbors[i].show()
  // }
  let next = current.pickNeighbor()
  if (next) {
    next.visited = true
    current = next
  }

  for (let i in maze) {
    maze[i].show()
  }

  // pos++
  frameRate(5)
}