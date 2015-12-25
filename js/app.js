const XSTEP = 101;
const YSTEP = 82;

// Super class to represent all objects in the game
var GameObject = function(initX,initY) {
    this.x = this.gridXToPixels(initX);
    this.y = this.gridYToPixels(initY);
}
GameObject.prototype.gridXToPixels = function(gridX) {
    return XSTEP * gridX;
}
GameObject.prototype.gridYToPixels = function(gridY) {
    return -20 + YSTEP * gridY;
}
GameObject.prototype.getRandomNumber = function(min,max) {
    return Math.floor((Math.random() * max) + min);
}

// -------------- Enemy Class -------------------
var Enemy = function(initX,initY) {
    GameObject.call(this,initX,initY)
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.getRandomNumber(50,300);
};
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position. Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplying any movement by dt ensures the game runs at the same speed for all computers.
    this.x += this.speed*dt;
};
// Draw the enemy on the screen (used by the engine).
Enemy.prototype.render = function() {
    if (this.x > this.gridXToPixels(5)) {
        this.x = this.gridYToPixels(-1); // move the enemy 
        this.speed = this.getRandomNumber(50,300);
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// -------------- Player Class -------------------
var Player = function(initX,initY) {
    GameObject.call(this,initX,initY)
    this.sprite = 'images/char-boy.png';
}
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
Player.prototype.reachedGoal = function() {
    if (this.y == this.gridYToPixels(0)) {
        return true;
    }
    return false;
}
Player.prototype.update = function() { 
    if (this.reachedGoal()) {
        this.x = this.gridXToPixels(2);
        this.y = this.gridYToPixels(4);
    }
};
// Draw the player on the screen (used by the engine).
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            this.x -= XSTEP;
            break;
        case 'up':
            this.y -= YSTEP;
            break;
        case 'right':
            this.x += XSTEP;
            break;
        case 'down':
            this.y += YSTEP;
            break;
    }
    if (this.x < this.gridXToPixels(0)) this.x = this.gridXToPixels(0);
    else if (this.x > this.gridXToPixels(4)) this.x = this.gridXToPixels(4);
    else if (this.y < this.gridYToPixels(0)) this.y = this.gridYToPixels(0);
    else if (this.y > this.gridYToPixels(5)) this.y = this.gridYToPixels(5);
    else { /* We are inside the grid bounds. Do nothing */ }
}

var allEnemies =[new Enemy(-2,1), new Enemy(-1,2), new Enemy(-1,3), new Enemy(-5,2)];
var player = new Player(2,4);

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
