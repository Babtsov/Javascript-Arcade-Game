// Enemies our player must avoid
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
// Draw the enemy on the screen, required method for game
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
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
}
Player.prototype.update = function() { //detect collusion
    //TODO
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            break;
        case 'up':
            break;
        case 'right':
            break;
        case 'down':
            break;
    }
}

var player = new Player(2,4);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
