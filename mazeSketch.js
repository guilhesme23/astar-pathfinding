// Global variables
var w = 60
var cols, rows
var maze = []
var current;
var stack = []

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
  for (let i in maze) {
    maze[i].show();
  }
  
  current.highlight()
  // for (let i in current.neighbors) {
  //   current.neighbors[i].show()
  // }
  let next = current.pickNeighbor()
  if (next) {
    next.visited = true
    removeWall(current, next)
    current = next
  }

  // pos++
  frameRate(1)
}

function removeWall(first, second) {
  let vertical = first.j - second.j
  let horizontal = first.i - second.i

  if (vertical === 1) {
    // Second is the up neighbor
    first.walls.top = false
    second.walls.bottom = false
    
  } else if (vertical === -1) {
    // Second is the bottom neighbor
    first.walls.bottom = false
    second.walls.top = false
    
  } else if (horizontal === 1) {
    // Second is the left neighbor
    first.walls.left = false
    second.walls.right = false
    
  } else if (horizontal === -1) {
    // Second is the right neighbor
    first.walls.right = false
    second.walls.left = false

  }

}