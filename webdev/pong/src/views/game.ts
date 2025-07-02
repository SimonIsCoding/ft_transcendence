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


  init() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
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
    <div class="flex justify-center items-center w-full h-full">
      <canvas id="game-canvas" class="border-4 border-white"></canvas>
    </div>
  `;
}

  update(): void {
    // Move ball
    this.ball.x += this.dx;
    this.ball.y += this.dy;

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
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw ball
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
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

  resizeCanvas(): void {
    const parent = this.canvas.parentElement!;
    const width = Math.max(parent.clientWidth, 1024);
    const height = (width * 3) / 4;
    this.canvas.width = width;
    this.canvas.height = height;
	this.leftPaddle.x = 30; // Margin from left
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
