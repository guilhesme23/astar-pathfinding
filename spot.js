class Spot {
    constructor(i, j) {
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
    }

    show(col) {
        fill(col)
        noStroke()
        rect(this.x, this.y, w - 1, h - 1)
    }

    linkNeighbours(grid) {
        let i = this.i
        let j = this.j

        if (j > 0) {
            this.neighbours.push(grid[i][j - 1]);
        }
        if (j < rows - 1) {
            this.neighbours.push(grid[i][j + 1])
        }
        if (i > 0) {
            this.neighbours, push(grid[i - 1][j])
        }
        if (i < cols - 1) {
            this.neighbours.push(grid[i + 1][j])
        }
    }
}