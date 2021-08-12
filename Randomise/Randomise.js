var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x, y, radius, dx, dy, color){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = color;
		c.fill();
	}
	
	this.update = function(){
		this.draw();
		if(this.x > innerWidth || this.x < 0){
			this.dx = -this.dx;
		}
		if(this.y > innerHeight || this.y  < 0){
			this.dy = -this.dy;
			/*if(this.radius<50){
			this.radius += 1;
			}else if(radius >3){
				this.radius -= 1;
			}*/
		}
		this.dx = this.dx + 0.6;
		this.x += this.dx;
		this.dy = this.dy + 0.6;
		this.y += this.dy;
	}
}

var circleArr = [];
var circle;
var x;
var y;
var radius;
var dx;
var dy;
var colorArr = ['red','green','blue'];
var color;
var noOfCircle = 300;
function init(){
	for(var i=0;i<noOfCircle;i++){
		x = Math.random() * innerWidth;
		y = Math.random() * innerHeight;
		dx = (Math.random() - 0.5) * 4;
		dy = (Math.random() - 0.5) * 4;
		radius = 10;
		color = colorArr[Math.floor(Math.random() * colorArr.length)];
		
		circle = new Circle(x, y, radius, dx, dy, color);
		
		circleArr.push(circle);
	}
}
//circle = new Circle(x, y, radius, dx, dy, color);
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	
	//circle.update();
	for(var i = 0; i < noOfCircle; i++){
		circleArr[i].update();
	}
}

init();
animate();