// Enemies our player must avoid
var Enemy = function(initX,initY) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 101*initX;
    this.y = -20+82*initY;
    this.speed = this.getRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
};

Enemy.prototype.getRandomSpeed = function(){
    return Math.floor((Math.random() * 300) + 50);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x > 500) {
        this.x = -101;
        this.speed = this.getRandomSpeed();
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initX,initY) {
    this.sprite = 'images/char-boy.png'
    this.x = 101*initX;
    this.y = -20+82*initY;
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
            this.x -= 101;
            break;
        case 'up':
            this.y -= 82;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 82;
            break;
    }
}

var allEnemies =[new Enemy(-2,1,200),new Enemy(-1,2,30),new Enemy(-1,3,50), new Enemy(-5,2,100)];
var player = new Player(2,4);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
