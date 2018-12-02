class Spot {
    constructor(i, j) {
        // Position in the 2d array
        this.i = i
        this.j = j
        
        // Scaled position in the canvas
        this.x = i * w
        this.y = j * h

        // Self result of the functions f(n), g(n) and h(n)
        this.f = 0
        this.g = 0
        this.h = 0

        // Adjacency list (All nodes that this node connect)
        this.neighbours = []

        // Previous node that leads to this
        this.prev
    }

    show(col) {
        fill(col)
        noStroke()
        rect(this.x, this.y, w - 1, h - 1)
    }
}