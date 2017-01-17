
var rows = grid.length;
var cols = grid[0].length;
var w, h;

var heroes = [];

function setup() {
    createCanvas(400, 600);
    console.log('Clash Royale');
    
    w = width / cols;
    h = height / rows;
    
    for (var i=0; i<rows; i++) {
        for (var j=0; j<cols; j++) {
            grid[i][j] = new Node(j, i, grid[i][j]);
        }
    }
    
    var hero = new Hero();
    heroes.push(hero);
    
    heroes[0].start();
}

function draw() {
    background(0);
    
    for (var i=0; i<rows; i++) {
        for (var j=0; j<cols; j++) {
            grid[i][j].show();
        }
    }
    
    heroes[0].move();
    heroes[0].show();
    
    /*
    
    if (finished) {
        var new_path = [];
        var currentNode = endNode;
        
        while (currentNode != startNode) {
            new_path.push(currentNode);
            currentNode = currentNode.parent;
        }
        new_path.reverse();
        
        for (var i=0; i<new_path.length; i++) {
            new_path[i].show(color(0, 0, 255));
            
            
            for (var j=0; j<heroes.length; j++) {
                heroes[j].move(new_path[i].x, new_path[i].y);
                heroes[j].show();
            }
        
        }
    }
    */
}

