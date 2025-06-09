const canvas = document.getElementById("pong_table") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const keysPressed: { [key: string]: boolean } = {};

const leftScoreElem = document.getElementById("left-score")!;
const rightScoreElem = document.getElementById("right-score")!;
let leftPlayerScore = 0;
let rightPlayerScore = 0;
const maxScore = 5;
let isPaused = false;

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

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 5,
	speedX: 2,
	speedY: 2
};

document.addEventListener("keydown", (event) => {
	keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
	if (event.code !== 'Space')
		keysPressed[event.key] = false;
});

function collision_with_paddle()
{
	if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height)
		ball.speedX = -ball.speedX;
  
  	if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)
		ball.speedX = -ball.speedX;
}

let direction = 1;
function resetBall()
{
	direction *= -1;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.speedX = direction * ball.speedX;
}

function count_score()
{
	ctx.fillStyle = 'white';
	ctx.font = '30px Arial';
	ctx.fillText(leftPlayerScore.toString(), canvas.width * 0.25, 50);
	ctx.fillText(rightPlayerScore.toString(), canvas.width * 0.75, 50);
}

function count_and_reset_ball()
{
	if (ball.x + ball.radius < 0)
	{
		rightPlayerScore++;
		rightScoreElem.textContent = rightPlayerScore.toString();
		resetBall();
	}
	else if (ball.x - ball.radius > canvas.width)
	{
		leftPlayerScore++;
		leftScoreElem.textContent = leftPlayerScore.toString();
		resetBall();
	}
}

function update()
{
	if ((keysPressed["w"] || keysPressed["W"]) && (leftPaddle.y > 0))
	  leftPaddle.y -= 12.5; // Up
	if ((keysPressed["s"] || keysPressed["S"]) && (leftPaddle.y < canvas.height - leftPaddle.height))
	  leftPaddle.y += 12.5; // Down
	if ((keysPressed["ArrowUp"]) && (rightPaddle.y > 0))
		rightPaddle.y -= 12.5;
	if ((keysPressed["ArrowDown"]) && (rightPaddle.y < canvas.height - rightPaddle.height))
		rightPaddle.y += 12.5;

	ball.x += ball.speedX * 3;
	ball.y += ball.speedY * 3;
	if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
		ball.speedY = -ball.speedY;
	collision_with_paddle();
	count_and_reset_ball();
}

// document.getElementById('pauseBtn')!.addEventListener('click', () => {
// 	isPaused = !isPaused;
// });

document.addEventListener("keydown", (event) => {
	if (event.code === 'Space')
	{
		if (!event.repeat)
			isPaused = !isPaused;
		return ;
	}
	keysPressed[event.key] = true;
});

export function draw()
{
	if (!isPaused)
	{
		update();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	
		ctx.fillStyle = 'white';
		ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
		ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
		
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	if (leftPlayerScore >= maxScore)
		return(setTimeout(() => {alert("Left Player won!")}, 0));
	if (rightPlayerScore >= maxScore)
		return(setTimeout(() => {alert("Right Player won!")}, 0));
	
	requestAnimationFrame(draw);
}