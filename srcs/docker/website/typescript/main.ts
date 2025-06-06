window.addEventListener("load", () => {
	const canvas = document.getElementById("pong_table") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	if (ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(50, 50, 100, 100);
	}
});
