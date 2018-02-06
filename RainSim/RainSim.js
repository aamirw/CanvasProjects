var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var flag = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

window.addEventListener('dblclick', function(){
	if(flag==3){
		flag = 0;
	}else
		flag++;
	console.log(flag);
	init(flag);
});

function Line(x1, y1, x2, y2, dx, dy, color){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.remX1 = x1;
	this.remY1 = y1;
	this.remX2 = x2;
	this.remY2 = y2;
	
	//setting default color black
	if(color == undefined)
		color = 'black';
	if(dx == undefined)
		dx = 1;
	if(dy == undefined)
		dy = 1;
	
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	
	//console.log(color);
	
	//method to draw a line
	this.draw = function(){
		c.beginPath();
		c.moveTo(this.x1,this.y1);
		c.lineTo(this.x2,this.y2);
		c.strokeStyle = color;
		c.fill();
		c.stroke();
	}
	
	//method to update line position
	this.update = function(){
		this.draw();
		
		
		if(this.x1 == this.x2){
			if(this.y1 > innerHeight*0.75){
				this.x1 = this.x2 = this.remX1;
				this.y1 = this.remY1;
				this.y2 = this.remY2
			}
				//this.dy = -this.dy;
			this.y1 += this.dy;
			this.y2 += this.dy;
			
		}else if(this.y1 == this.y2){
			//if(this.x1 > innerWidth || this.x1 < 0)
			//	this.dx = -this.dx;
			this.x2 += this.dx;
			this.x1 += this.dx;
		}else{
			/*if(this.x1 > innerWidth || this.x1 < 0)
				this.dx = -this.dx;
			if(this.y1 > innerHeight || this.y1 < 0)
				this.dy = -this.dy;*/
			this.x1 += this.dx;
			this.y1 += this.dy;
			this.x2 += this.dx;
			this.y2 += this.dy;
		}
	}
	
}

var colorArr = ['#A7C7C5', '#09504F', '#172A40', '#FFF7DC', '#D9383A'];
var lineArr = [];
var noOfLines = 2000;

function init(flag){	
	var line;
	var x1 = 0;
	var y1 = 0;
	var x2;
	var y2;
	var dx;
	var dy;
	var color;
	var possibility;
	lineArr = [];
	
	for(var i = 0; i < noOfLines; i++){
		
		x1 = (Math.random() * innerWidth * 0.95) + innerWidth * 0.025;
		y1 = 0;
		x2 = Math.random() * innerWidth;
		y2 = Math.random() * innerHeight * 0.02;
		dx = Math.random() * 7;
		dy = Math.random() * 3;
		//color = colorArr[Math.floor(Math.random()*colorArr.length)];
		color = 'SkyBlue';
		line = new Line(x1, y1, x1, y2, dx, dy, color);
		
		
		console.log(flag);
		lineArr.push(line);
	}
	
	
	
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for(var j = 0; j < lineArr.length; j++){
		lineArr[j].update();
	}
}

init(flag);
animate();
//console.log(lineArr);

