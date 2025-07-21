// src/models/Paddle.ts
import { GAME_CONFIG } from '../config';

export class Paddle {
  // Virtual coordinates
  x: number;
  y: number;
  
  // Dimensions (in virtual units)
  readonly width: number;
  public height: number;
  
  // Movement
  readonly speed: number;
  private targetY: number; // For smooth AI/network play

  constructor(isLeft: boolean) {
    this.width = GAME_CONFIG.PADDLE_WIDTH;
    this.height = GAME_CONFIG.PADDLE_HEIGHT;
    this.speed = GAME_CONFIG.PADDLE_SPEED;
    this.targetY = GAME_CONFIG.BASE_HEIGHT / 2 - this.height / 2;
    
    // Set initial position
    this.x = isLeft 
      ? GAME_CONFIG.PADDLE_OFFSET 
      : GAME_CONFIG.BASE_WIDTH - GAME_CONFIG.PADDLE_OFFSET - this.width;
    
    this.y = this.targetY;
  }

  setPaddleHeight(paddleHeight: number) {
	this.height = paddleHeight;
  }

  // Movement methods
  move(direction: -1 | 0 | 1) {
    const moveAmount = direction * this.speed;
    this.targetY = Math.max(0,
      Math.min(GAME_CONFIG.BASE_HEIGHT - this.height, 
      this.targetY + moveAmount));
    
    // For immediate response (comment out for smooth movement)
    this.y = this.targetY;
  }

  // For AI/network play (optional)
  update(deltaTime: number) {
    // Smooth movement toward target
    const distance = this.targetY - this.y;
    const maxMove = this.speed * deltaTime;
    this.y += Math.sign(distance) * Math.min(maxMove, Math.abs(distance));
  }

  // Reset position (after scoring)
  reset() {
    this.y = GAME_CONFIG.BASE_HEIGHT / 2 - this.height / 2;
    this.targetY = this.y;
  }

  // Collision detection (uses virtual coordinates)
  checkBallCollision(ballX: number, ballY: number, ballRadius: number): number {
    // First check basic collision
    if (
      ballX + ballRadius < this.x ||
      ballX - ballRadius > this.x + this.width ||
      ballY + ballRadius < this.y ||
      ballY - ballRadius > this.y + this.height
    ) {
      return 0; // No collision
    }

    // Calculate impact zone (1-8 from top to bottom)
    const segmentHeight = this.height / 8;
    const relativeY = ballY - this.y;
    let zone = Math.floor(relativeY / segmentHeight) + 1;

    // Clamp to 1-8 range (in case of edge cases)
    zone = Math.max(1, Math.min(8, zone));

    // Return zone with collision vector adjustment
    return zone;
  }

  getDeflectionAngle(zone: number): number {
    // Zone 1: -45deg (top) 
    // Zone 4: 0deg (center)
    // Zone 8: +45deg (bottom)
    const angles = GAME_CONFIG.DEFLECTION_ANGLES;
    return angles[zone - 1] * (Math.PI / 180); // Convert to radians
  }
}