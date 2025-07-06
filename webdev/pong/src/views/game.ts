// game.ts

class Game {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  private ball = { x: 100, y: 100, radius: 10 };
  private dx = 2;
  private dy = 2;
  private speed = 2;
  private keysPressed: Record<string, boolean> = {};
  private paddleWidth = 10;
  private paddleHeight = 80;
  
  private leftPaddle = { x: 0, y: 100 };
  private rightPaddle = { x: 0, y: 100 };
  private paddleSpeed = 5;

  private scorePlayer1 = 0;
  private scorePlayer2 = 0;


  init() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.startLoop();
  }

  setSpeed(newSpeed: number): void {
    this.speed = newSpeed;
    // Normalize and scale dx, dy based on current direction
    const angle = Math.atan2(this.dy, this.dx);
    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;
  }

  render(): string {
    return `
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full h-full overflow-auto">
      <canvas 
        id="game-canvas" 
        class="border-4 border-white bg-black 
               min-w-[600px] min-h-[450px] 
               max-w-[1024px] max-h-[768px] 
               aspect-video">
      </canvas>
    </div>
    `;
  }
  update(): void {
    // Move ball
    this.ball.x += this.dx;
    this.ball.y += this.dy;

	this.checkGoal();

    // Bounce logic...
    if (
      this.ball.x - this.ball.radius <= 0 ||
      this.ball.x + this.ball.radius >= this.canvas.width
    ) {
      this.dx = -this.dx;
    }
    if (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.canvas.height
    ) {
      this.dy = -this.dy;
    }
	if (this.keysPressed['w']) {
      this.leftPaddle.y = Math.max(0, this.leftPaddle.y - this.paddleSpeed);
    }
    if (this.keysPressed['s']) {
      this.leftPaddle.y = Math.min(
        this.canvas.height - this.paddleHeight,
        this.leftPaddle.y + this.paddleSpeed
      );
    }
    if (this.keysPressed['ArrowUp']) {
      this.rightPaddle.y = Math.max(0, this.rightPaddle.y - this.paddleSpeed);
    }
    if (this.keysPressed['ArrowDown']) {
      this.rightPaddle.y = Math.min(
        this.canvas.height - this.paddleHeight,
        this.rightPaddle.y + this.paddleSpeed
      );
    }
  }

  draw(): void {
	// Background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// Draw dashed center line
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 4;
    const segmentLength = 20;
    const gap = 15;
    for (let y = 0; y < this.canvas.height; y += segmentLength + gap) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2, y);
      this.ctx.lineTo(this.canvas.width / 2, y + segmentLength);
      this.ctx.stroke();
    }
    // Draw ball
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
	// Scoreboard
	this.ctx.font = '48px DSEG7ClassicMini, monospace';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    
    this.ctx.fillText(this.scorePlayer1.toString(), this.canvas.width / 4, 60);
    this.ctx.fillText(this.scorePlayer2.toString(), (this.canvas.width * 3) / 4, 60);

	// Draw paddles
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.leftPaddle.x, this.leftPaddle.y, this.paddleWidth, this.paddleHeight);
    this.ctx.fillRect(this.rightPaddle.x, this.rightPaddle.y, this.paddleWidth, this.paddleHeight);

  }

  startLoop(): void {
    const loop = () => {
      this.update();
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }
  
  private checkGoal(): void {
    if (this.ball.x - this.ball.radius <= 0) {
      this.scorePlayer2++;
      this.resetBall();
    } else if (this.ball.x + this.ball.radius >= this.canvas.width) {
      this.scorePlayer1++;
      this.resetBall();
    }
	if (this.scorePlayer1 == 21 || this.scorePlayer2 == 21)
	{
		this.scorePlayer1 = 0;
		this.scorePlayer2 = 0;
	}
  }

  private resetBall(): void {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.dx = -this.dx;
  }

  resizeCanvas(): void {
    const parent = this.canvas.parentElement!;
    const availableWidth = parent.clientWidth - 20; // 10px margin on each side
    const availableHeight = parent.clientHeight - 20;
  
    // Maintain 4:3 aspect ratio
    let width = Math.min(Math.max(600, availableWidth), 1024);
    let height = Math.min(Math.max(450, (width * 3) / 4), 768);
  
    // If height exceeds available height, recalculate based on height
    if (height > availableHeight) {
      height = Math.min(Math.max(450, availableHeight), 768);
      width = (height * 4) / 3;
    }
  
    this.canvas.width = width;
    this.canvas.height = height;
  
    // Adjust paddle positions to new width
    this.leftPaddle.x = 30;
    this.rightPaddle.x = this.canvas.width - 30 - this.paddleWidth;
  }

  setKey(key: string, pressed: boolean) {
    this.keysPressed[key] = pressed;
  }
  stop(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}


// Create a single instance and expose rendering/initialization
const game = new Game();

export const GameView = {
  renderGameCanvas(): string {
    return game.render();
  },
  initGameCanvas(): void {
    game.init();
  },
  stop(): void {
    game.stop();
  },
  setBallSpeed(speed: number): void {
    game.setSpeed(speed); // This must call your Game instance
  },

  handleKeyDown(key: string): void {
    game.setKey(key, true);
  },

  handleKeyUp(key: string): void {
    game.setKey(key, false);
  }
};
