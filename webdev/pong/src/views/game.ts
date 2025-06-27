export const GameView = {
  renderGameCanvas(): string {
    return `
      <div class="flex justify-center items-center h-full">
        <canvas 
          id="game-canvas" 
          class="bg-gray-200 rounded-lg shadow-lg max-w-full"
        ></canvas>
      </div>
    `;
  },

  initGameCanvas(): void {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.width = Math.max(800, canvas.offsetWidth);
      canvas.height = canvas.offsetHeight;
    }
  }
};