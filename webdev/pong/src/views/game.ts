import { VirtualCanvas } from '../models/VirtualCanvas';
import { Ball } from '../models/Ball';
import { Paddle } from '../models/Paddle';
import { GAME_CONFIG } from '../config';

class Game {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private virtualCanvas = new VirtualCanvas();
  private ball = new Ball();
  private leftPaddle = new Paddle(true);
  private rightPaddle = new Paddle(false);
  private animationFrameId: number = 0;
  private scorePlayer1 = 0;
  private scorePlayer2 = 0;
  private keysPressed: Record<string, boolean> = {};
  private showCollisionZones = false;

  init() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.startLoop();
  }

  private resizeCanvas() {
    const parent = this.canvas.parentElement!;
    const style = window.getComputedStyle(parent);
    
    const availableWidth = parent.clientWidth - 
      (parseFloat(style.paddingLeft) + parseFloat(style.paddingRight));
    const availableHeight = parent.clientHeight - 
      (parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));

    this.virtualCanvas.update(availableWidth, availableHeight);
    
    this.canvas.width = availableWidth;
    this.canvas.height = availableHeight;
    this.canvas.style.width = `${availableWidth}px`;
    this.canvas.style.height = `${availableHeight}px`;
  }

  private startLoop() {
    const loop = () => {
      this.update();
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  private update() {
    this.ball.move();

    if (this.ball.checkWallCollision()) {
      // Play sound if needed
    }

    this.checkPaddleCollision(this.leftPaddle);
    this.checkPaddleCollision(this.rightPaddle);
    this.checkGoal();

    if (this.keysPressed['w']) this.leftPaddle.move(-1);
    if (this.keysPressed['s']) this.leftPaddle.move(1);
    if (this.keysPressed['ArrowUp']) this.rightPaddle.move(-1);
    if (this.keysPressed['ArrowDown']) this.rightPaddle.move(1);
  }

  private checkPaddleCollision(paddle: Paddle) {
    const zone = paddle.checkBallCollision(
      this.ball.x,
      this.ball.y,
      this.ball.radius
    );

    if (zone > 0) {
      const angle = paddle.getDeflectionAngle(zone);
      this.ball.handlePaddleCollision(angle, paddle === this.rightPaddle);
      this.showCollisionZones = true;
      setTimeout(() => this.showCollisionZones = false, 100);
    }
  }

  private checkGoal() {
    if (this.ball.x - this.ball.radius <= 0) {
      this.scorePlayer2++;
      this.resetRound();
    } else if (this.ball.x + this.ball.radius >= GAME_CONFIG.BASE_WIDTH) {
      this.scorePlayer1++;
      this.resetRound();
    }

    if (this.scorePlayer1 >= 21 || this.scorePlayer2 >= 21) {
      this.scorePlayer1 = 0;
      this.scorePlayer2 = 0;
    }
  }

  private resetRound() {
    this.ball.reset();
    this.leftPaddle.reset();
    this.rightPaddle.reset();
  }

  // All drawing methods:
  private draw() {
    this.drawBackground();
    this.drawCenterLine();
    this.drawPaddle(this.leftPaddle);
    this.drawPaddle(this.rightPaddle);
    this.drawBall();
    this.drawScore();
  }

  private drawBackground() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawCenterLine() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = this.virtualCanvas.toPhysicalSize(2);
    this.ctx.setLineDash([
      this.virtualCanvas.toPhysicalSize(20),
      this.virtualCanvas.toPhysicalSize(15)
    ]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private drawPaddle(paddle: Paddle) {
    // Draw paddle body
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.virtualCanvas.toPhysicalX(paddle.x),
      this.virtualCanvas.toPhysicalY(paddle.y),
      this.virtualCanvas.toPhysicalSize(paddle.width),
      this.virtualCanvas.toPhysicalSize(paddle.height)
    );

    // Draw collision zones if enabled
    if (this.showCollisionZones) {
      const segmentHeight = paddle.height / 8;
      for (let i = 0; i < 8; i++) {
        this.ctx.fillStyle = `rgba(255, 0, 0, ${0.2 + (i * 0.1)})`;
        this.ctx.fillRect(
          this.virtualCanvas.toPhysicalX(paddle.x),
          this.virtualCanvas.toPhysicalY(paddle.y + i * segmentHeight),
          this.virtualCanvas.toPhysicalSize(paddle.width),
          this.virtualCanvas.toPhysicalSize(segmentHeight)
        );
      }
    }
  }

  private drawBall() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(
      this.virtualCanvas.toPhysicalX(this.ball.x),
      this.virtualCanvas.toPhysicalY(this.ball.y),
      this.virtualCanvas.toPhysicalSize(this.ball.radius),
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  private drawScore() {
    const fontSize = this.virtualCanvas.toPhysicalSize(48);
    this.ctx.font = `${fontSize}px 'Press Start 2P', monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    
    this.ctx.fillText(
      this.scorePlayer1.toString(),
      this.virtualCanvas.toPhysicalX(GAME_CONFIG.BASE_WIDTH / 4),
      this.virtualCanvas.toPhysicalY(60)
    );
    
    this.ctx.fillText(
      this.scorePlayer2.toString(),
      this.virtualCanvas.toPhysicalX((GAME_CONFIG.BASE_WIDTH * 3) / 4),
      this.virtualCanvas.toPhysicalY(60)
    );
  }

  // Public API remains unchanged
  setKey(key: string, pressed: boolean) {
    this.keysPressed[key] = pressed;
  }

  setBallSpeed(speed: number) {
    this.ball.speed = speed;
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }

  render(): string {
    return `
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full h-full overflow-auto">
      <canvas 
        id="game-canvas" 
        class="border-4 border-white bg-black 
               min-w-[600px] min-h-[450px] 
               max-w-[1024px] max-h-[768px] 
               w-full h-full object-contain">
      </canvas>
    </div>
    `;
  }
}

// Singleton export
const gameInstance = new Game();

export const GameView = {
  renderGameCanvas: () => gameInstance.render(),
  initGameCanvas: () => gameInstance.init(),
  stop: () => gameInstance.stop(),
  setBallSpeed: (speed: number) => gameInstance.setBallSpeed(speed),
  handleKeyDown: (key: string) => gameInstance.setKey(key, true),
  handleKeyUp: (key: string) => gameInstance.setKey(key, false)
};