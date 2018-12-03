// Global variables
var w = 25
var cols, rows
var maze = []
var current;
var stack = []
var endedMaze = false

// A*
var h;
var grid;
var openSet = [];
var closedSet = [];
var start;
var end;
var currPath = [];
var startedAstar = false

var pos = 0

function setup() {
    createCanvas(601, 601)
    cols = floor(width / w)
    rows = floor(height / w)

    setupMaze()
}

function draw() {
    background(33)
    if (!endedMaze) {
        endedMaze = evalMaze()
    } else if (!startedAstar) {
        setupAstar();
        startedAstar = true
    } else {
        // drawMaze()
        evalAstar()
    }
}