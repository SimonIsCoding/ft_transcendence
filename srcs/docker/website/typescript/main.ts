const canvas = document.getElementById("pong_table") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const leftPaddle = {
	x: 0,
	y: 0,
	width: 10,
	height: 125
};

const interval = setInterval(() => {
  if (leftPaddle.y > 475)
	  return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);// Efface le canvas

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);// Redessine le fond

  ctx.fillStyle = 'white';
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);// Dessine la raquette
  leftPaddle.y += 25;
  console.log("valeur de leftPaddle.y = ", leftPaddle.y);
}, 10); // toutes les 10 ms


// // if (left_paddle) {
// // 		left_paddle.fillStyle = "white";
// // 	left_paddle.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height); //fillRect to draw
// // }
