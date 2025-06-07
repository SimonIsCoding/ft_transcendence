const canvas = document.getElementById("pong_table") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keysPressed: { [key: string]: boolean } = {};

document.addEventListener("keydown", (event) => {
	keysPressed[event.key] = true;
});
  
document.addEventListener("keyup", (event) => {
	keysPressed[event.key] = false;
});
  
const leftPaddle = {
	x: 0,
	y: 0,
	width: 10,
	height: 125
};

const rightPaddle = {
	x: canvas.width - 10,
	y: 0,
	width: 10,
	height: 125
};

function update()
{
	if ((keysPressed["w"] || keysPressed["W"]) && (leftPaddle.y > 0))
	  leftPaddle.y -= 25; // Haut
	if ((keysPressed["s"] || keysPressed["S"]) && (leftPaddle.y < canvas.height - leftPaddle.height))
	  leftPaddle.y += 25; // Bas
	if ((keysPressed["ArrowUp"]) && (rightPaddle.y > 0))
		rightPaddle.y -= 25;
	if ((keysPressed["ArrowDown"]) && (rightPaddle.y < canvas.height - rightPaddle.height))
		rightPaddle.y += 25;
}

function draw()
{
	update();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  
	ctx.fillStyle = 'white';
	ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
	ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  
	requestAnimationFrame(draw);
}

draw();