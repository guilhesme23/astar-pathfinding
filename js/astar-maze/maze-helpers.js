function evalMaze() {
    current.visited = true;
    drawMaze()

    current.highlight();
    let next = current.pickNeighbor();
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWall(current, next);
        current = next;
        return false;
    } else if (stack.length > 0) {
        current = stack.pop();
        return false;
    } else {
        console.log("DONE MAZE");
        current.show();
        return true;
    }
}

function drawMaze() {
    for (let i in maze) {
        maze[i].show();
    }
}

function removeWall(first, second) {
    let vertical = first.j - second.j
    let horizontal = first.i - second.i

    if (vertical === 1) {
        // Second is the up neighbor
        first.walls.top = false
        second.walls.bottom = false

    } else if (vertical === -1) {
        // Second is the bottom neighbor
        first.walls.bottom = false
        second.walls.top = false

    } else if (horizontal === 1) {
        // Second is the left neighbor
        first.walls.left = false
        second.walls.right = false

    } else if (horizontal === -1) {
        // Second is the right neighbor
        first.walls.right = false
        second.walls.left = false

    }

}

function setupMaze() {
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new MazeCell(i, j)
            maze.push(cell)
        }
    }

    for (let i in maze) {
        maze[i].buildNeighbors()
    }

    current = maze[0]
    current.start = true
    maze[maze.length - 1].end = true
}

function setupAstar() {
    h = w

    // Initialize grid
    grid = new Array(cols)
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j)
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
      grid[i][j].linkNeighbours(grid);
    }
  }
}


function guess(node) {
  // This is the heuristic function, in our case, we evaluate the distance
  // between the current node and the goal
  let d = dist(node.i, node.j, end.i, end.j);
  return d;
}

function buildPath(node) {
  currPath = [];
  let temp = node;
  while (temp !== undefined) {
    currPath.push(temp);
    temp = temp.prev;
  }
}

function evalAstar() {
    // Emulate the outer loop
    if (openSet.length > 0) {
        
        // get the lowest node in the openSet
        let lower = 0;
        for (let i in openSet) {
            if (openSet[i].f < openSet[lower].f) {
                lower = i
            }
        }

        let currAstar = openSet[lower]

        buildPath(currAstar) // Build the optimal path until now
        // If currAstar is goal, then we're done
        if (currAstar === end) {
            console.log('DONE');
            currAstar.isEnd = true
            noLoop()
        }

        // Remove currAstar from the list of opens, and push it in closed
        openSet.splice(lower, 1)
        closedSet.push(currAstar)

        let neighbours = currAstar.neighbours
        for (let i in neighbours) {
            let neighbour = neighbours[i];
            if (!closedSet.includes(neighbour)) {
                let possibleG = currAstar.g + 1

                // Check if neighbour already was evaluated
                if (!openSet.includes(neighbour)) {
                    openSet.push(neighbour) // If not then adds it to openSet
                } else if (possibleG >= neighbour.g) {
                    continue // If possibleG is greater than currAstar neighbour.g -> pass
                }

                // If we get here, then we found a good path
                // Let's save this!
                neighbour.prev = currAstar
                neighbour.g = possibleG
                neighbour.f = neighbour.g + guess(neighbour)
            }
        }
    } else {
        // Ended with no solution
        console.log('END');
        noLoop()
        // return
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