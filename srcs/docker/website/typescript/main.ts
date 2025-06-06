const canvas = document.getElementById("pong_table") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const leftPaddle = {
	x: 0,
	y: 0,
	width: 10,
	height: 125
};

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event: KeyboardEvent)
{
	if ((event.key === "w" || event.key === "W") && (leftPaddle.y > 0))
	  leftPaddle.y -= 25; // Haut
	else if ((event.key === "s" || event.key === "S") && (leftPaddle.y < canvas.height - leftPaddle.height))
	  leftPaddle.y += 25; // Bas
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  
	ctx.fillStyle = 'white';
	ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  
	requestAnimationFrame(draw);
}

draw();
