class MazeCell {
  constructor(i,j) {
    this.i = i
    this.j = j

    this.visited = false

    this.neighbors = []

    // Order: Top, Bottom, Left, Right
    this.walls = [true, true, true, true]
  }

  index(i,j) {
    if (i<0 || j<0 || i > cols - 1 || j > rows - 1) {
      return -1
    } else {
      return (i + (j * cols))
    }
  }

  buildNeighbors() {
    let top = maze[this.index(this.i, this.j - 1)]
    let bottom = maze[this.index(this.i, this.j + 1)]
    let left = maze[this.index(this.i - 1, this.j)]
    let right = maze[this.index(this.i + 1, this.j)]

    if (top) {
      this.neighbors.push(top)
    }
    if (bottom) {
      this.neighbors.push(bottom)
    }
    if (left) {
      this.neighbors.push(left)
    }
    if (right) {
      this.neighbors.push(right)
    }
  }

  pickNeighbor() {
    let unvisited = []
    for (let i in this.neighbors) {
      if (!this.neighbors[i].visited) {
        unvisited.push(this.neighbors[i])
      }
    }

    if (unvisited.length > 0) {
      let idx = floor(random(0, unvisited.length))
      return unvisited[idx]
    } else {
      return undefined
    }
  }

  show() {
    let x = this.i * w
    let y = this.j * w

    if (this.visited) {
      noStroke()
      fill(180,0,180)
      rect(x,y, w, w)
    }

    noFill()
    stroke(255,0,0)
    if (this.walls[0]) {
      // TOP
      line(x,y,x+w,y)
    }

    if (this.walls[1]) {
      // BOTTOM
      line(x,y+w,x+w,y+w)
    }

    if (this.walls[2]) {
      // LEFT
      line(x,y,x,y+w)
    }

    if (this.walls[2]) {
      // RIGHT
      line(x+w,y,x+w,y+w)
    }

  }
}