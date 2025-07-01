// game.ts

class Game {
  private ballEl!: HTMLElement;
  private areaEl!: HTMLElement;
  private x = 100;
  private y = 100;
  private dx = 2;
  private dy = 2;
  private readonly radius = 12;
  private animationFrameId: number | null = null;

  render(): string {
    return `
      <div class="flex items-center justify-center w-full h-full bg-black min-w-[1024px] min-h-[768px]">
        <div id="game-area" class="relative bg-black border-4 border-white aspect-[4/3] w-full max-w-[calc(100vh*4/3)] max-h-full overflow-hidden">
          <div id="ball" class="absolute w-6 h-6 rounded-full bg-red-500"></div>
        </div>
      </div>
    `;
  }

  init(): void {
    this.areaEl = document.getElementById("game-area")!;
    this.ballEl = document.getElementById("ball")!;
    this.startBouncing();
  }

  private startBouncing(): void {
    const update = () => {
      const rect = this.areaEl.getBoundingClientRect();

      this.x += this.dx;
      this.y += this.dy;

      if (this.x <= 0 || this.x + this.radius * 2 >= rect.width) this.dx *= -1;
      if (this.y <= 0 || this.y + this.radius * 2 >= rect.height) this.dy *= -1;

      this.ballEl.style.left = `${this.x}px`;
      this.ballEl.style.top = `${this.y}px`;

      this.animationFrameId = requestAnimationFrame(update);
    };

    update();
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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
  }
};
