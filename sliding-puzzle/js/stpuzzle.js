/* Developed by Nevil Wan */
let emptytilePosRow = 1;
let emptytilePosCol = 2;
let cellDisplacement = "69px";

function moveTile()
{
    // Gets the position of the current element
    let pos = $(this).attr('data-pos');
    let posRow = parseInt(pos.split(',')[0]);
    let posCol = parseInt(pos.split(',')[1]);

    // Move Up
    if (posRow + 1 == emptytilePosRow && posCol == emptytilePosCol)
    {
        $(this).animate({
            'top' : "+=" + cellDisplacement // moves up
        });

        $('#empty').animate({
            'top' : "-=" + cellDisplacement // moves down
        });

        emptytilePosRow -= 1;
        $(this).attr('data-pos',(posRow + 1) + "," + posCol);
    }

    // Move Down
    if (posRow - 1 == emptytilePosRow && posCol == emptytilePosCol)
    {
        $(this).animate({
            'top' : "-=" + cellDisplacement // moves down
        });

        $('#empty').animate({
            'top' : "+=" + cellDisplacement // moves up
        });

        emptytilePosRow += 1;
        $(this).attr('data-pos',(posRow - 1) + "," + posCol);
    }

    // Move Left
    if (posRow == emptytilePosRow && posCol + 1 == emptytilePosCol)
    {
        $(this).animate({
            'right' : "-=" + cellDisplacement // moves right
        });

        $('#empty').animate({
            'right' : "+=" + cellDisplacement // moves left
        });

        emptytilePosCol -= 1;
        $(this).attr('data-pos', posRow + "," + (posCol + 1));
    }

    // Move Right
    if (posRow == emptytilePosRow && posCol - 1 == emptytilePosCol)
    {
        $(this).animate({
            'right' : "+=" + cellDisplacement // moves left
        });

        $('#empty').animate({
            'right' : "-=" + cellDisplacement // moves right
        });

        emptytilePosCol += 1;
        $(this).attr('data-pos', posRow + "," + (posCol - 1));
    }

    // Update empty position
    $('#empty').attr('data-pos', emptytilePosRow + "," + emptytilePosCol);
}

function Node(value, state, emptyRow, emptyCol, depth) {
    this.value = value
    this.state = state
    this.emptyCol = emptyCol
    this.emptyRow = emptyRow
    this.depth = depth
    this.strRepresentation = ""
    this.path = ""
 
    // String representation of the state in CSV format
    for (var i = 0; i < state.length; i++)
    {
       // We assume the state is a square
       if (state[i].length != state.length) {
          alert('Number of rows differs from number of columns')
          return false
       }
 
       for (var j = 0; j < state[i].length; j++)
         this.strRepresentation += state[i][j] + ",";
    }
    this.size = this.state.length
 }
 function AStar(initial, goal, empty) {
    this.initial = initial
    this.goal = goal
    this.empty = empty
    this.queue = new PriorityQueue({ comparator: function(a, b) { 
         if (a.value > b.value)
             return 1
         if (a.value < b.value)
             return -1
         return 0
     }});
     this.queue.queue(initial);
     this.visited = new HashSet();
 }
 AStar.prototype.execute = function () 
 {
    // Add current state to visited list
    this.visited.add(this.initial.strRepresentation)
 
    while (this.queue.length > 0) 
    {
       var current = this.queue.dequeue()
 
       if (current.strRepresentation == this.goal.strRepresentation) 
         return current
 
       this.expandNode(current)
    }
 }
 AStar.prototype.expandNode = function (node) 
 {
    var temp = ’
    var newState = ’
    var col = node.emptyCol
    var row = node.emptyRow
    var newNode = ’
 
    // Up
    if (row > 0)
    {
       newState = node.state.clone();
       temp = newState[row - 1][col]
       newState[row - 1][col] = this.empty
       newState[row][col] = temp
       newNode = new Node(0, newState, row - 1, col,  node.depth + 1)
 
       if (!this.visited.contains(newNode.strRepresentation))
       {
       newNode.value = newNode.depth + this.heuristic(newNode)
       newNode.path = node.path + "U"
       this.queue.queue(newNode)
       this.visited.add(newNode.strRepresentation)
       }
    }
 
    // Down
   if (row < node.size - 1)
   {
       newState = node.state.clone();
       temp = newState[row + 1][col]
       newState[row + 1][col] = this.empty
       newState[row][col] = temp
       newNode = new Node(0, newState, row + 1, col, node.depth + 1)
 
       if (!this.visited.contains(newNode.strRepresentation))
       {
          newNode.value = newNode.depth + this.heuristic(newNode)
      newNode.path = node.path + "D"
          this.queue.queue(newNode)
          this.visited.add(newNode.strRepresentation)
       }
    }
 
    // Left
    if (col > 0)
    {
        newState = node.state.clone();
        temp = newState[row][col - 1]
        newState[row][col - 1] = this.empty
        newState[row][col] = temp
        newNode = new Node(0, newState, row, col - 1, node.depth + 1)
 
        if (!this.visited.contains(newNode.strRepresentation))
        {
          newNode.value = newNode.depth + this.heuristic(newNode)
      newNode.path = node.path + "L"
          this.queue.queue(newNode)
          this.visited.add(newNode.strRepresentation)
        }
    }
 
    // Right
    if (col < node.size - 1)
    {
       newState = node.state.clone();
       temp = newState[row][col + 1]
       newState[row][col + 1] = this.empty
       newState[row][col] = temp
       newNode = new Node(0, newState, row, col + 1, node.depth + 1)
 
       if (!this.visited.contains(newNode.strRepresentation))
       {
          newNode.value = newNode.depth + this.heuristic(newNode)
          newNode.path = node.path + "R"
          this.queue.queue(newNode)
          this.visited.add(newNode.strRepresentation)
       }
    }
 }
 Array.prototype.clone = function() 
 {
    return JSON.parse(JSON.stringify(this))
 }
 AStar.prototype.heuristic = function (node)
 {
    return this.manhattanDistance(node);
 }
 function start() {
    var init = new Node(0, [[6,4,7],[8,5,0],[3,2,1]], 1, 2, 0)
    var goal = new Node(0, [[1,2,3],[4,5,6],[7,8,0]], 2, 2, 0)
 
    var astar = new AStar(init, goal, 0)
    // To measure time taken by the algorithm
    var startTime = new Date()
    // Execute AStar
    var result = astar.execute()
    // To measure time taken by the algorithm
    var endTime = new Date()
    alert('Completed in: ' + (endTime - startTime) + ' milliseconds')
 
    var panel = document.getElementById('panel')
    panel.innerHTML = 'Solution: ' + result.path + ' Total steps: ' + result.path.length + '
 '
    solution = result.path
 }
 AStar.prototype.misplacedTiles = function (node) 
 {
    var result = 0;
 
    for (var i = 0; i < node.state.length; i++)
    {
       for (var j = 0; j < node.state[i].length; j++)
       if (node.state[i][j] != this.goal.state[i][j] && node.state[i][j] != this.empty)
       result++;
    }
 
    return result;
 }
       