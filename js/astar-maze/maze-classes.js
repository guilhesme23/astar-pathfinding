class MazeCell {
    constructor(i, j) {
        this.i = i
        this.j = j

        this.start = false
        this.end = false

        this.visited = false

        this.neighbors = []

        // Order: Top, Bottom, Left, Right
        this.walls = {
            top: true,
            bottom: true,
            left: true,
            right: true
        }
    }

    index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
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

    highlight() {
        let x = this.i * w
        let y = this.j * w
        noStroke()
        fill(255, 80, 0)
        rect(x, y, w, w)
    }

    show(_noFill, col) {
        let x = this.i * w
        let y = this.j * w

        if (this.visited && !_noFill) {
            noStroke()
            if (stack.includes(this)) {
                fill(0, 100, 100)
            } else if (this.start || this.end) {
                fill(255, 0, 0)
            } else {
                fill(180, 0, 180)
            }
            rect(x, y, w, w)
        }

        noFill()
        if (!col) {
            stroke(202);
        } else {
            stroke(0)
        }
        if (this.walls.top) {
            // TOP
            line(x, y, x + w, y)
        }

        if (this.walls.bottom) {
            // BOTTOM
            line(x, y + w, x + w, y + w)
        }

        if (this.walls.left) {
            // LEFT
            line(x, y, x, y + w)
        }

        if (this.walls.right) {
            // RIGHT
            line(x + w, y, x + w, y + w)
        }

    }

}

class Spot {
    constructor(i, j, allowObstacle) {
        // Position in the 2d array
        this.i = i
        this.j = j

        // Scaled position in the canvas
        this.x = i * w
        this.y = j * h

        // Self result of the functions f(n), g(n) and h(n)
        this.f = Infinity
        this.g = Infinity
        this.h = 0

        // Adjacency list (All nodes that this node connect)
        this.neighbours = []

        // Previous node that leads to this
        this.prev = undefined

        // This node is an obstacle?
        this.obstacle = false
        // if (random(1) < 0.25 && allowObstacle === undefined) {
        //     this.obstacle = true
        // }

        this.isEnd = false

        let idx = this.i + this.j * cols
        if (maze) {
            this.mazeSpot = maze[idx];
        }

    }

    show(col) {
        fill(col)
        noStroke()
        if (this.obstacle) {
            // Obstacles are always black
            fill(0)
        } else if (this.isEnd) {
            fill(0,255,200)
        }
        rect(this.x, this.y, w, h)
        this.mazeSpot.show(true, true)
    }

    linkNeighbours(grid) {
        let i = this.i
        let j = this.j

        if (j > 0) {
            // Top
            if (!this.mazeSpot.walls.top) {
                this.addNeighbour(grid[i][j - 1]);
            }
        }
        if (j < rows - 1) {
            // Bottom
            if (!this.mazeSpot.walls.bottom) {
              this.addNeighbour(grid[i][j + 1]);
            }
        }
        if (i > 0) {
            // Left
            if (!this.mazeSpot.walls.left) {
              this.addNeighbour(grid[i - 1][j]);
            }
        }
        if (i < cols - 1) {
            // Right
            if (!this.mazeSpot.walls.right) {
              this.addNeighbour(grid[i + 1][j]);
            }
        }

        // this.neighbours = this.mazeSpot.neighbors
    }

    addNeighbour(node) {
        // Only link to a neighbour if it isn't an obstacle!!
        if (!node.obstacle) {
            this.neighbours.push(node)
        }
    }
}