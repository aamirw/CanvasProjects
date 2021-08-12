var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.8;
canvas.style = 'border:1px solid; position:relative; left:5%; top:0%; background-color : #D9E8F5;';

var c = canvas.getContext('2d');
var flag = true;
var keyPressed = undefined;
var tempContext = c;

window.addEventListener('keydown', function(event){
	keyPressed = event.key;
	console.log(flag);
	//console.log(c);
	if(keyPressed == 'p' || keyPressed == 'P'){
		console.log(keyPressed);
		flag = !flag;
		if(flag == false){
			tempContext = c;
			c = undefined;
		}
		else{
			c = tempContext;
		}
	}
	
});


function Snake(){
	this.length = 50;
	this.x1 = Math.random() * canvas.width * 0.8;
	this.y1 = Math.random() * canvas.height * 0.8;
	this.x2 = this.x1 + this.length;
	this.y2 = this.y1;
	this.dx = 1;
	this.dy = 1;
	this.memory = {length : this.length, x1 : this.x1, y1 : this.y1, x2 : this.x2, y2 : this.y2, dx : this.dx, dy : this.dy};
	this.state = 'right';
	this.edgeCase = false;
	
	this.draw = function(){
		c.beginPath();
		c.moveTo(this.x1, this.y1);
		c.lineTo(this.x2, this.y2);
		c.lineWidth = 2;
		//c.strokeStyle = '#F26101';
		c.stroke();
	}
	
	this.update = function(){
		snake.draw();
		if(this.x1 > canvas.width){
			if(this.state == 'up' || this.state == 'down'){
				this.x1 = 0;
				this.x2 = this.x1;
			}
			else{
				this.x1 = 0;
				this.x2 = this.x1 + this.length;
			}
		}
		else if(this.y1 > canvas.height){
			if(this.state == 'left' || this.state == 'right'){
				this.y1 = 0;
				this.y2 = this.y1;
			}else{
				this.y1 = 0;
				this.y2 = this.y1 + this.length;
			}
		}
		else if(this.x1 < 0){
			if(this.state == 'up' || this.state == 'down'){
				this.x1 = canvas.width;
				this.x2 = this.x1;
			}else{
				this.x1 = canvas.width;
				this.x2 = this.x1 - this.length;
			}
		}
		else if(this.y1 < 0){
			if(this.state == 'left' || this.state == 'right'){
				this.y1 = canvas.height;
				this.y2 = this.y1;
			}else{
				this.y1 = canvas.height;
				this.y2 = this.y1 - this.length;
			}
		}
		
		if(this.state == 'right'){
			if( keyPressed == 'ArrowDown'){
				this.state = 'down';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1;
				this.y2 = this.y1 + this.length;
			}
			else if( keyPressed == 'ArrowUp'){
				this.state = 'up';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1;
				this.y2 = this.y1 - this.length;
			}
			else if( keyPressed == 'ArrowLeft'){
				this.state = 'left';
				var tempX1 = this.x1;
				var tempY1 = this.y1;
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = tempX1;
				this.y2 = tempY1;
			}
		}
		else if(this.state == 'left'){
			/*if(this.x1 != this.x2)
				this.x2 = this.x1;*/
			if( keyPressed == 'ArrowDown'){
				this.state = 'down';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1;
				this.y2 = this.y1 + this.length;
			}
			else if( keyPressed == 'ArrowUp'){
				this.state = 'up';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1;
				this.y2 = this.y1 - this.length;
			}
			else if( keyPressed == 'ArrowRight'){
				this.state = 'right';
				var tempX1 = this.x1;
				var tempY1 = this.y1;
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = tempX1;
				this.y2 = tempY1;
			}
		}
		else if(this.state == 'up'){
			/*if(this.y1 != this.y2)
				this.y2 = this.y1;*/
			if( keyPressed == 'ArrowDown'){
				this.state = 'down';
				var tempX1 = this.x1;
				var tempY1 = this.y1;
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = tempX1;
				this.y2 = tempY1;
			}
			else if( keyPressed == 'ArrowLeft' ){
				this.state = 'left';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1 - this.length;
				this.y2 = this.y1;
			}
			else if( keyPressed == 'ArrowRight'){
				this.state = 'right';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1 + this.length;
				this.y2 = this.y1;
			}
		}
		else if(this.state == 'down'){
			/*if(this.y1 != this.y2)
				this.y2 = this.y1;*/
			if( keyPressed == 'ArrowUp'){
				this.state = 'up';
				var tempX1 = this.x1;
				var tempY1 = this.y1;
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = tempX1;
				this.y2 = tempY1;
			}
			else if( keyPressed == 'ArrowLeft'){
				this.state = 'left';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1 - this.length;
				this.y2 = this.y1;
			}
			else if( keyPressed == 'ArrowRight'){
				this.state = 'right';
				this.x1 = this.x2;
				this.y1 = this.y2;
				this.x2 = this.x1 + this.length;
				this.y2 = this.y1;
			}
		}
		
		
		if(this.state == 'right'){
			this.x1 +=  this.dx;
			this.x2 += this.dx;
		}
		else if(this.state == 'left'){
			this.x1 -=  this.dx;
			this.x2 -= this.dx;
		}
		else if(this.state == 'up'){
			this.y1 -=  this.dy;
			this.y2 -= this.dy;
		}
		else if(this.state == 'down'){
			this.y1 +=  this.dy;
			this.y2 += this.dy;
		}
			
	}
}

function Food(x1, y1, x2, y2){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	
	this.draw = function(){
		c.beginPath();
		//c.arc(this.x, this.y, 0.1, 0, Math.PI * 2, false);
		//c.fillStyle = '#F26101';
		c.fillRect(this.x1, this.y1, this.x2, this.y2);
		//c.stroke();
	}
}

function getDistance(snake, food){
	var x1Distance = snake.x1 - (food.x1 + (food.x2/2));
	var y1Distance = snake.y1 - (food.y1 + (food.y2/2));
	var distance1 = Math.sqrt(Math.pow(x1Distance, 2) + Math.pow(y1Distance, 2));
	
	var x2Distance = snake.x2 - (food.x1 + (food.x2/2));
	var y2Distance = snake.y2 - (food.y1 + (food.y2/2));
	var distance2 = Math.sqrt(Math.pow(x2Distance, 2) + Math.pow(y2Distance, 2));
	
	var distance = distance2; 
	
	if(distance1 < distance2)
		distance = distance1;
	
	return distance;
}

var x1 = Math.random() * canvas.width * 0.8;
var y1 = Math.random() * canvas.height * 0.8;
var x2 = 10;
var y2 = 10;
var snake = new Snake();
var food = new Food(x1, y1, x2, y2);
var score = 0;

food.draw();
c.font = '30px Arial';

function animate(){
	requestAnimationFrame(animate);
	if(c != undefined){
		c.clearRect(0, 0, canvas.width, canvas.height);
		snake.update();
		//console.log(Math.floor(snake.x1)+', '+Math.floor(snake.y1)+', '+Math.floor(snake.x2)+', '+Math.floor(snake.y2))
		if(Math.floor(getDistance(snake, food)) < 10){
			//console.log(Math.floor(getDistance(snake, food)));
			x1 = Math.random() * canvas.width * 0.8;
			y1 = Math.random() * canvas.height * 0.8;
			if(snake.length < canvas.width-50 || snake.length < canvas.height-50)
				snake.length += 2;
			if(snake.dx<7)
				snake.dx += 0.2;
			if(snake.dy<7)
				snake.dy += 0.2;
			score += 1;
		}
		//c.fillStyle = '#F26101';
		c.fillText(score, canvas.width - 100, 50);
		//console.log(score);
		food = new Food(x1, y1, x2, y2);
		food.draw();
	}
}

animate();
