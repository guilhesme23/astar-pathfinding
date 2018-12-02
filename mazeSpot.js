class MazeSpot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * h;
    this.visited = false;
    this.walls = [true, true, true, true];
  }

  show() {
    let grid = this.walls;
    let x = this.x;
    let y = this.y;

    if (this.visited) {
      fill(157, 0, 157, 150);
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
}
