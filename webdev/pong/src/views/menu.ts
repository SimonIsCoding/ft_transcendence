// export const MenuView = {
//   renderMenu: () => `
//     <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      
//       <!-- Gauche -->
//       <div class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
//         <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">LOGIN</button>
//         <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">REGISTER</button>
//       </div>

//       <!-- Droite -->
//       <div class="w-1/2 flex items-center justify-center bg-black">
//         <canvas id="game-canvas" class="block" style="width: 100%; height: 100%;"></canvas>
//       </div>
//     </div>
//   `,
// }

export function drawCenterLine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function initCanvas() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  drawCenterLine(canvas, ctx);
}
