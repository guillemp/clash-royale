
function Node(i, j, value) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.value = value;
    
    this.isRigid = function() {
        return (this.value == 1 || this.value == 2);
    }
    
    this.show = function(aaa) {
        fill(255);
        if (aaa !== undefined) {
            fill(aaa);
        } else {
            if (this.value == 1) {
                fill(0);
            } else if (this.value == 2) {
                fill(color(255, 200, 0));
            }
        }
        stroke(0);
        rect(this.x * w, this.y * h, w - 1, h - 1);
    }
}