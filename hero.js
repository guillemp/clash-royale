
function Hero() {
    this.openSet = [];
    this.closedSet = [];
    this.startNode = null;
    this.endNode = null;
    this.targetNode = null;
    this.finished = false;
    this.path = [];
    
    this.startNode = grid[2][1];
    this.targetNode = grid[31][18];
    this.openSet.push(this.startNode);
    
    this.x = this.startNode.x * w + w / 2;
    this.y = this.startNode.y * h + h / 2;
    this.diameter = w - 5;
    this.speed = 10;
    this.steps = 0.1;
    this.f = 0;
    
    this.start = function() {
        this.findPath();
    }
    
    this.move = function() {
        if (this.path.length > 0) {
            
            
            var destX = this.path[0].x;
            var destY = this.path[0].y;
            
        
            
            var destX = destX * w + w / 2;
            var destY = destY * h + h / 2;
            
            console.log(this.x, destX, destY);
            
            var dx = destX - this.x;
            var dy = destY - this.y;
            var dist = Math.abs(Math.sqrt(dx * dx + dy * dy));
            this.speed = this.steps / dist;
            
            this.f += this.speed;
            
            var x = this.x + (destX - this.x) * this.f;
            var y = this.y + (destY - this.y) * this.f;
            
            //console.log(x, y)
            
            this.x = x;
            this.y = y;
        }
    }
    
    this.show = function() {
        for (var i=0; i<this.closedSet.length; i++) {
            this.closedSet[i].show(color(255, 0, 0));
        }
        
        for (var i=0; i<this.openSet.length; i++) {
            this.openSet[i].show(color(0, 255, 0));
        }
        
        this.startNode.show(color(0, 0, 255));
        for (var i=0; i<this.path.length; i++) {
            this.path[i].show(color(0, 0, 255));
        }
        
        fill(color(200, 200, 200));
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
    
    this.findPath = function() {
        while (this.openSet.length > 0) {
            var node = this.openSet[0];
            for (var i=1; i<this.openSet.length; i++) {
                if (this.openSet[i].f < node.f || this.openSet[i].f == node.f) {
                    if (this.openSet[i].h < node.h) {
                        node = this.openSet[i];
                    }
                }
            }
            
            // remove node
            var index = this.openSet.indexOf(node);
            if (index > -1) this.openSet.splice(index, 1);
            
            // add node
            this.closedSet.push(node);
            
            // finish
            if (node == this.targetNode) {
                this.endNode = this.targetNode;
                var currentNode = this.endNode;
                while (currentNode != this.startNode) {
                    this.path.push(currentNode);
                    currentNode = currentNode.parent;
                }
                this.path.reverse();
                
                this.finished = true;
                console.log('path finished');
                return;
            }
            
            var neighbours = getNeighbours(node);
            for (var i=0; i<neighbours.length; i++) {
                var neighbour = neighbours[i];
                
                var index = this.closedSet.indexOf(neighbour);
                if (neighbour.isRigid() || index > -1) {
                    continue;
                }
                
                var index = this.openSet.indexOf(neighbour);
                var newCostToNeighbour = node.g + getDistance(node, neighbour);
                
                if (newCostToNeighbour < neighbour.g || index == -1) {
                    neighbour.g = newCostToNeighbour;
                    neighbour.h = getDistance(neighbour, this.targetNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = node;
                    this.openSet.push(neighbour);
                }
            }
        }
    }
}

// static methods

function retracePath(startNode, endNode) {
    var new_path = [];
    var currentNode = endNode;
    
    while (currentNode != startNode) {
        new_path.push(currentNode);
        currentNode = currentNode.parent;
    }
    new_path.reverse();
    console.log(new_path);
    
    for (var i=0; i<new_path.length; i++) {
        new_path[i].show(color(0, 0, 255));
    }
}

function getNeighbours(node) {
    var neighbours = [];
    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (x == 0 && y == 0) continue;
            
            var checkX = node.x + x;
            var checkY = node.y + y;
            
            if (checkX >= 0 && checkX < cols && checkY >= 0 && checkY < rows) {
                neighbours.push(grid[checkY][checkX]);
            }
        }
    }
    return neighbours;
}

function getDistance(nodeA, nodeB) {
    var dstX = Math.abs(nodeA.x - nodeB.x);
    var dstY = Math.abs(nodeA.y - nodeB.y);
    if (dstX > dstY) return 14 * dstY + 10 * (dstX-dstY);
    return 14 * dstX + 10 * (dstY-dstX);
}