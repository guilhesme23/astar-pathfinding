// Function: f(n) = g(n) + h(n)
// Global variables
var cols = 5
var rows = 5
var w;
var h;
var grid;
var openSet = []
var closedSet = []
var start
var end

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

    // The starting node for the algorithm
    start = grid[0][0]
    openSet.push(start)

    // The ending node of the algorithm
    end = grid[cols - 1][rows - 1]
}

function draw() {

    background(30)

    for (let i in grid) {
        for (let j in grid) {
            grid[i][j].show(color(255))
        }
    }

    for (let i in closedSet) {
        closedSet[i].show(color(155,0,0))
    }

    for (let i in openSet) {
        openSet[i].show(color(50,180,0))
    }

}