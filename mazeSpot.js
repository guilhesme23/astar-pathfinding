class MazeCell {
  constructor(i,j) {
    this.i = i
    this.j = j

    this.visited = false

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