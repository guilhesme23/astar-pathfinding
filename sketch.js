// Function: f(n) = g(n) + h(n)
// Global variables
var cols = 15
var rows = 15
var w;
var h;
var grid;
var openSet = []
var closedSet = []
var start
var end
var currPath = []

function setup() {
    // put setup code here
    createCanvas(600, 600)
    w = width / cols
    h = height / rows

    // Initialize grid
    grid = new Array(cols)
    for (let i=0; i<cols; i++) {
        grid[i] = new Array(rows)
    }

    for (let i = 0; i < cols; i++) {
        for (let j=0; j<rows; j++) {
            grid[i][j] = new Spot(i,j)
        }
    }

    // Link all neighbours
    addNeighbours()

    // The starting node for the algorithm
    start = grid[0][0]
    start.g = 0 // start g value is 0
    start.f = 0 // start f value is 0
    start.obstacle = false // The start can never be an obstacle!
    openSet.push(start)

    // The ending node of the algorithm
    end = grid[cols - 1][rows - 1]
}

function addNeighbours() {
    // Populating the neighbours lists
    for (let i in grid) {
        for (let j in grid[i]) {
            grid[i][j].linkNeighbours(grid)
        }
    }
}

function guess(node) {
    // This is the heuristic function, in our case, we evaluate the distance
    // between the current node and the goal
    let d = dist(node.i, node.j, end.i, end.j)
    return d
}

function buildPath(node) {
    currPath = []
    let temp = node
    while (temp !== undefined) {
        currPath.push(temp)
        temp = temp.prev
    }
}

function draw() {
    // Emulate the outer loop
    if (openSet.length > 0) {
        // get the lowest node in the openSet
        let lower = 0;
        for (let i in openSet) {
            if (openSet[i].f < openSet[lower].f) {
                lower = i
            }
        }

        let current = openSet[lower]

        buildPath(current) // Build the optimal path until now
        // If current is goal, then we're done
        if (current === end){
            console.log('DONE');
            noLoop()
        }

        // Remove current from the list of opens, and push it in closed
        openSet.splice(lower, 1)
        closedSet.push(current)

        let neighbours = current.neighbours
        for (let i in neighbours) {
            let neighbour = neighbours[i];
            if (!closedSet.includes(neighbour)) {
                let possibleG = current.g + 1
                
                // Check if neighbour already was evaluated
                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour) // If not then adds it to openSet
                } else if (possibleG >= neighbour.g) {
                    continue // If possibleG is greater than current neighbour.g -> pass
                }

                // If we get here, then we found a good path
                // Let's save this!
                neighbour.prev = current
                neighbour.g = possibleG
                neighbour.f = neighbour.g + guess(neighbour)
            }
        }
    } else {
        // Ended with no solution
        console.log('END');
        noLoop()
        return
    }

    background(30)

    for (let i in grid) {
        for (let j in grid) {
            grid[i][j].show(color(255))
        }
    }

    for (let i in closedSet) {
        closedSet[i].show(color("#D56F3E"));
    }

    for (let i in openSet) {
        openSet[i].show(color("#C7EF00"));
    }

    for (let i in currPath) {
        currPath[i].show(color("#2D728F"));
    }

}