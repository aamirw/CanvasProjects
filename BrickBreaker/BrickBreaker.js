var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.8;
canvas.style = 'border:1px solid; position:relative; left:50px;';

var cwidth = canvas.width;
var cheight = canvas.height;

var c;
var tempContext; 
var mouseY;
var keyPressed;

var x;
var y;
var radius;
var ballDx;
var ballDy;
var ballColor;

var ball;

var x1;
var y1;
var length;
var width;
var x2;
var y2;
var batColor;
var batDx;
var batDy;

var bat;

var resetFlag;
var gameControl;
var isClicked = false;
var animFlag = true;
var gameOverFlag = false;
var score = 0;
var targetArr = [];
var target;
var youWinFlag;

var tWidth;
var tHeight;

function Brick(x, y, width, height, color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.visibility = true;
	
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.getDistance = function(object){
		var centerX = this.x  + (this.width/2);
		var centerY = this.y + (this.height/2);
		var xDistance = centerX - (object.x + object.radius);
		var yDistance = centerY - (object.y + object.radius);
		
		return (Math.pow(xDistance,2) + Math.pow(yDistance,2));
	}
	
	this.detectCollision = function(object){
		var distance = this.getDistance(object);
		var maxFX = (object.x + object.radius) - (this.width/2);
		var maxFY = (object.y + object.radius) - (this.height/2);
		var maxFDistance = Math.sqrt(Math.pow(maxFX, 2) + Math.pow(maxFY, 2));
		var maxBX = (object.x - object.radius) - (this.width/2);
		var maxBY = (object.y - object.radius) - (this.height/2);
		var maxBDistance = Math.sqrt(Math.pow(maxBX, 2) + Math.pow(maxBY, 2));
		
		if((object.x >= this.x && object.x <= this.x + this.width) && (object.y >= this.y && object .y <= this.y + this.height) && (distance <= maxFDistance || distance <= maxBDistance)){
			object.dx = -object.dx;
			score += 1;
			if(object.dx > 0) 
				if(object.dx <= 10)
					object.dx += 0.5;
				else
					object.dx = 10;
			else if(object.dx < 0) 
				if(object.dx >= -10)
					object.dx -= 0.5;
				else
					object.dx = -10;
			this.visibility = false;
		}
		
		/*if(this.getDistance(object) < this.radius+object.radius){
			object.dx = -object.dx;
			score += 1;
			this.visibility = false;
			
			if(this.dx > 0 && this.dx <= 10)
				this.dx += 0.5;
			else if(this.dx < 0 && this.dx >= -10)
				this.dx -= 0.5;
		}*/
		
		if(this.visibility)	
			this.draw();
	}
}

function Target(){
	
	this.createTarget = function(tWidth, tHeight){
		var colorArr = /*['#FFBC67',*/['#1593A2'];//, '#AC6C82', '#685C79', '#455C7B'];
		var color = colorArr[Math.floor(Math.random()*colorArr.length)];
		var target;
		var noOfTargets = 50;
		var dia = 2*radius;
		for(var y=1; y<= cheight; y += tHeight + 1){
			for(var x = 3*cwidth/4; x <= cwidth - tWidth-1; x += tWidth + 1 ){
				color = colorArr[Math.floor(Math.random()*colorArr.length)];
				target = new Brick(x, y, tWidth, tHeight, color);
				targetArr.push(target);
			}
		}
		for(var i = 0; i < targetArr.length; i++){
			targetArr[i].draw();
		}
	}
}

function init(){
	cwidth = canvas.width;
	cheight = canvas.height;

	c = canvas.getContext('2d'); 
	tempContext = c;
	mouseY = undefined;
	keyPressed = undefined;
	
	radius = 10;
	x = (Math.random() * cwidth/3) + cwidth/6; 
	y = (Math.random() * cheight * 0.8) + cheight*0.1; 
	ballDx =  (Math.random() * -10) - 3;
	ballDy = (Math.random() - 0.5) * 7;
	ballColor = '#FD7400' ;

	ball = new Circle(x, y, radius, ballDx, ballDy, ballColor); 
	
	x1 = 0;
	y1 = 0;
	length = 100;
	width =20;
	x2 = x1 + width;
	y2 = y1 + length;
	batColor = '#004358';
	batDx = 5;
	batDy = 5;

	bat = new Bat(x1, y1, x2, y2, length, width, batDx, batDy, batColor);
	
	resetFlag = false;
	gameControl = new GameControl();
	gameControl.moveBat(bat);
	
	isClicked = false;
	animFlag = true;
	gameOverFlag = false;
	score = 0;
	
	tWidth = cwidth * 0.03;
	tHeight = cheight * 0.1;
	target = new Target();
	target.createTarget(tWidth, tHeight);
	youWinFlag = false;
	
}



function Circle(x, y, radius, dx, dy, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	this.visibility = true;
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = color;		
		c.fill();
		c.strokeStyle = color;
		c.stroke();
	}
	
	this.getDistance = function(object){
		var xDistance = this.x - object.x;
		var yDistance = this.y - object.y;
		
		return (Math.pow(xDistance,2) + Math.pow(yDistance,2));
	}
	
	this.checkCollision = function(object){
		if(this.getDistance(object) < this.radius+object.radius){
			object.dx = -object.dx;
			score += 1;
			this.visibility = false;
			
			if(this.dx > 0)
				this.dx += 0.5;
			else
				this.dx -= 0.5;
		}
		if(this.visibility)	
			this.draw();
	}
	
	this.update = function(){
		this.draw();
		
		if(this.x + this.radius > cwidth)
		{
			this.dx = -this.dx;
			if(this.dx > 0)
				this.dx += 0.5;
			else
				this.dx -= 0.5;
		}
		if(this.y + this.radius > cheight || this.y - this.radius < 0)
			this.dy = -this.dy;
		
		this.x += this.dx;
		this.y += this.dy;
	}
}

function Bat(x1, y1, x2, y2, length, width, dx, dy, color){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.length = length;
	
	this.y2 = this.length;
	
	this.width = width;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.color;
		c.fillRect(this.x1, this.y1, this.x2, this.y2)	;
	}
	
	this.update = function(){
		if(mouseY == undefined)
			mouseY = 0;
		this.y1 = mouseY;
		this.draw();	
	}
}


function  GameControl(){
	
	this.hitBall = function(ball,bat){
		if((ball.x - ball.radius < bat.x1 + bat.width) && (ball.y > bat.y1 && ball.y < bat.y1+bat.length)){
			ball.dx = -ball.dx;
			return true;
		}
		else if((ball.y + ball.radius > bat.y1) && (ball.y - ball.radius <= bat.y1 + bat.length) && (ball.x-ball.radius > bat.x1 && ball.x-radius < bat.x1+bat.width)){
			ball.dx = -ball.dx;
			return true;
		}
		return false;
	}
	
	this.youWin = function(){
		if(score == targetArr.length){
			c.font = '15px Arial';
			c.fillStyle = 'blue';
			c.fillText('You Win!', cwidth/2-20,cheight/2);
			c.font = '10px Arial';
			c.fillText('PRESS \'R\' TO Play Again.', cwidth/2-50,cheight/2+10);
			tempContext = c;
			c = undefined;
			return true;
		}
		return false;
	}	
	
	this.displayScore = function(){
		c.fillStyle = 'black';
		c.font = '20px Arial';
		c.fillText('Score: '+score, 50, 40);
	}
	
	this.gameOver = function(ball){
		if(ball.x-ball.radius <= 0){
			c.font = '10px Arial';
			c.fillStyle = 'blue';
			c.fillText('GAME OVER', cwidth/2-20,cheight/2);
			c.fillText('PRESS \'R\' TO RETRY.', cwidth/2-40,cheight/2+10);
			c = undefined;
			tempContext = c;
			return true;
		}
	}
	
	this.setAnimFlag = function(){
		if(keyPressed == 'p' || keyPressed == 'P'){
			animFlag = !animFlag;
		}
	}

	this.moveBat = function(bat){
		window.addEventListener('mousemove', function(event){
			if(event.y < cheight-bat.length && event.y > 0){
				mouseY = event.y;
			}
			else{
				if(event.y >= cheight-bat.length)
					mouseY = cheight-bat.length;
				else if(event.y <= 0)
					mouseY = 0;
			}
		});
	}
}



window.addEventListener('keydown', function(event){
	keyPressed = event.key;
	if(keyPressed == 'p' || keyPressed == 'P'){
		animFlag = !animFlag;
		if(animFlag == false){
			tempContext = c;
			c = undefined;
		}
		else{
			c = tempContext;
		}
	}else if(keyPressed == 'r' || keyPressed == 'R'){
		resetFlag = true;
		if(gameOverFlag == true){
			c = canvas.getContext('2d');
			init();
		}
		if(youWinFlag == true){
			c = canvas.getContext('2d');
			init();
		}
	}
	
});


window.addEventListener('click', function(){
	isClicked == true;
});

var tempArr = targetArr;

function animate(){
	requestAnimationFrame(animate);
	if(c!=undefined){
		c.clearRect(0, 0, cwidth, cheight);
	ball.update();
	bat.update();
	for(var i = 0; i < targetArr.length; i++){
		if(targetArr[i].visibility == true){
			targetArr[i].detectCollision(ball);
			
		}
	}
	gameControl.hitBall(ball, bat);
	gameControl.displayScore();
	if(gameControl.gameOver(ball))
		gameOverFlag = true;
	}
	if(gameControl.youWin()){
		youWinFlag = true;
	}
}

var brick = new Brick(100,200,10,30,'red');

init();
animate();
