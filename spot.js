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
        if (random(1) < 0.25 && allowObstacle === undefined ) {
            this.obstacle = true
        }

        this.maze = new MazeSpot(this.i, this.j)
    }

    show(col) {
        fill(col)
        noStroke()
        if (this.obstacle) {
            // Obstacles are always black
            fill(0)
        }
        rect(this.x, this.y, w - 1, h - 1)
    }

    linkNeighbours(grid) {
        let i = this.i
        let j = this.j

        if (j > 0) {
            // Top
            this.addNeighbour(grid[i][j - 1]);
        }
        if (j < rows - 1) {
            // Bottom
            this.addNeighbour(grid[i][j + 1])
        }
        if (i > 0) {
            // Left
            this.addNeighbour(grid[i - 1][j])
        }
        if (i < cols - 1) {
            // Right
            this.addNeighbour(grid[i + 1][j])
        }
    }

    addNeighbour(node) {
        // Only link to a neighbour if it isn't an obstacle!!
        if (!node.obstacle) {
            this.neighbours.push(node)
        }
    }
}