// JavaScript Document
$(document).ready(function(){
	
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}


launchFullScreen(document.getElementById("myCanvas"));
var increaseSpeed;
var animation,dev;
var score = 0;
var gameOn = false;
var start = false;
var collision = document.getElementById("collide");
var canvas = document.getElementById("myCanvas");
var trackPadx = 0
var ctx = canvas.getContext("2d");
var cw = window.innerWidth,
ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;
var paddles = {
	width: 200,
	height: 8,
	xpos :500
};


	canvas.addEventListener('click',function()
	{
		if(!(start))
		{
			resetall();
		startOn();
		}
		},false);
		
		
var ball = {
	rad : 8,
	inix : 500,
	iniy : paddles.height+8,
	vx : 10,
	vy : 10,
	x : 500,
	y : paddles.height+8
}

function resetall()
{console.log('reseting');
	canvas.width = cw;
canvas.height = ch;
ctx  = canvas.getContext("2d");
	ball.x = ball.inix;
	ball.y = ball.iniy;
	ball.vx = 10;
	ball.vy = 10;
	paddles.xpos = ball.inix;
	score = 0;
	clearInterval(increaseSpeed);
}
function init()
{
	draw();
		ctx.font = "40px Arial";
	ctx.textAlign = 'center';
	ctx.fillStyle = "#faf3f2";
	ctx.textBaseline = "middle";
	ctx.fillText("Start",canvas.width/2, canvas.height/2);
	ctx.lineWidth = 4;
		ctx.strokeStyle = "#faf3f2";
	ctx.strokeRect(cw/2-100, ch/2-50, 200,100);

	
}

function startOn()
{
increaseSpeed = setInterval(function(){
	ball.vy*= 1.25;
//	console.log(ball.vy);
}, 10000);

	start = true; 
	gameOn = true;
		animation = setInterval(animate,1000/60);
}


function gameOver()
{

clearInterval(animation);	
	gameOn = false;
	start = false;
	
	
}



function drawBall()
{
	ctx.beginPath();
ctx.fillStyle = "#faf3f2";
ctx.arc(ball.x,ball.y,ball.rad,0,Math.PI*2,false);
ctx.closePath();
ctx.fill();
}
function drawPaddles()
{
ctx.fillStyle = "#faf3f2";
ctx.fillRect((paddles.xpos-paddles.width/2),0,paddles.width,paddles.height);
ctx.fillRect((paddles.xpos-paddles.width/2),(canvas.height-paddles.height),paddles.width,paddles.height);
}
function updatePaddles(ex)
{
	ex = Math.max(ex, paddles.width/2);
	ex = Math.min(canvas.width-paddles.width/2, ex);
	paddles.xpos = ex;
}
canvas.addEventListener("mousemove", function(e)
{
	
	var cx = $('#myCanvas').offset().left;
	if(gameOn)
	updatePaddles(e.pageX-cx);
	
}, false);

function draw()
{
		ctx.font = "30px Arial";
		ctx.fillStyle = "#faf3f2";
		ctx.fillText("Score : "+score, 100,100);
	drawPaddles();
	drawBall();
}

function paddleCollide(newx)
{
	return((newx>=paddles.xpos-(paddles.width/2)-20)&&(newx<=paddles.xpos+paddles.width/2+20))
}

function collide()
{
console.log("ball x : "+ball.vx+" paddlex : "+paddleV/5);
		collision.pause();
		collision.currentTime = 0;
	
		collision.play();
}

function updateX(newx, paddleV)
{
	/*dev = ((newx-paddles.xpos)/(paddles.width/2)*7.5)
	if((dev>0&&ball.vx>0)||(ball.vx<0&&dev<0))
		ball.vx+= dev;
		else
		ball.vx+= dev/5;*/
		if((ball.vx>0&&paddleV>0)||(ball.vx<0&&paddleV<0))
		ball.vx+= paddleV/5;
		else
		ball.vx+= paddleV/2;
}
var paddleV = 0;
function animate()
{

	var newx = ball.x+ball.vx;
	var newy = ball.y+ball.vy;
	
	
	
	if(newy<=(paddles.height+ball.rad))
	{
		if(paddleCollide(newx))
		{
			score++;
		newy = paddles.height+ball.rad;
		ball.vy = -(ball.vy);
		paddleV = (paddles.xpos-trackPadx)/(50/Math.abs(ball.vy));
		updateX(newx, paddleV);
		
		collide();
		}
		else
			gameOver();
		
	}
	else if(newy<=(paddles.height+ball.rad+Math.abs(ball.vy*10)))
	{
		trackPadx = paddles.xpos;
	}
	
	
	
	if(newy>=(canvas.height-paddles.height-ball.rad))
	{
		if(paddleCollide(newx))
		{
			score++;
		newy = canvas.height-paddles.height-ball.rad
		ball.vy = -(ball.vy);
		paddleV = (paddles.xpos-trackPadx)/(50/Math.abs(ball.vy));
				updateX(newx, paddleV);

		
		collide();
		}
		else
			gameOver();
		
		
	}
	else if(newy>=(canvas.height-paddles.height-ball.rad-Math.abs(ball.vy*10)))
	{
		trackPadx = paddles.xpos;
	}
	if(newx<=ball.rad)
	{
		newx = ball.rad;
		ball.vx = -(ball.vx);
	}
	if(newx>=(canvas.width-ball.rad))
	{
		newx = canvas.width-ball.rad;
		ball.vx = -(ball.vx);
	}
	
	ball.x = newx;
	ball.y = newy;
	
	

ctx.clearRect(0,0,canvas.width,canvas.height);
draw();
//requestAnimFrame(animate);


	
}
collision.addEventListener('canplay',function(){
	init();
}, false);

});