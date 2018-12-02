class MazeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * h;
    this.visited = false;
    // List of walls: Top, Bottom, Left, Right
    this.walls = [true, true, true, true];
  }

  show() {
    let grid = this.walls;
    let x = this.x;
    let y = this.y;

    if (this.visited) {
      fill(157, 0, 157);
      rect(x, y, x + w, y + h);
      
    }
    stroke(255, 0, 1);
    if (grid[0]) {
      // Top
      line(x, y, x + w, y);
    }
    if (grid[1]) {
      // Bottom
      line(x, y + h, x + w, y + h);
    }
    if (grid[2]) {
      // Left
      line(x, y, x, y + h);
    }
    if (grid[3]) {
      // Right
      line(x + w, y, x + w, y + h);
    }
  }

  highlight() {
    let x = this.x
    let y = this.y
    fill(255, 10, 157);
    rect(x, y, x + w, y + h);
  }

  evalIndex(grid, i, j) {
    if (i < 0 || j < 0 || i >= cols || j >= rows) {
      return undefined
    } else {
      return grid[i][j].maze
    }
  }

  pickNeighbour(grid) {
    // Pick a random unvisited neighbour
    let neighbours = []
    let i = this.i
    let j = this.j

    // Neighbours
    let top = this.evalIndex(grid, i, j - 1)
    let bottom = this.evalIndex(grid, i, j + 1);
    let left = this.evalIndex(grid, i - 1, j);
    let right = this.evalIndex(grid, i + 1, j);

    if (top && !top.visited) {
      neighbours.push(top)
    }
    if (bottom && !bottom.visited) {
      neighbours.push(bottom)
    }
    if (left && !left.visited) {
      neighbours.push(left)
    }
    if (right && !right.visited) {
      neighbours.push(right)
    }

    // Pick a random unvisited neighbour
    if (neighbours.length > 0) {
      let index = floor(random(0, neighbours.length))
      return neighbours[index]
    } else {
      return undefined
    }
  }
}
