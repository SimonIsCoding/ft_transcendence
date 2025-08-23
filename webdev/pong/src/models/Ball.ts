import { GAME_CONFIG } from '../config';

export class Ball {
    // All coordinates in virtual space (1024×768)
    x: number = 0;
    y: number = 0;
    radius: number = 0;
    dx: number = 0;
    dy: number = 0;
	speedMultiplier: number = 0;
    color: string = '';
	private static readonly ySpeed = GAME_CONFIG.VERTICAL_SPEED;
	private static readonly xSpeed = GAME_CONFIG.HORIZONTAL_SPEED;
	private paddleHits: number = 0;

	constructor() {
		this.speedMultiplier = 1;
        this.reset();
    }

	reset() {
        // Initialize in virtual coordinates
        this.x = GAME_CONFIG.BASE_WIDTH / 2;  // 1024/2
        this.y = GAME_CONFIG.BASE_HEIGHT / 2;  // 768/2
        this.radius = 10;

        this.color = 'white';
	this.paddleHits = 0;

        const randomHorizontalSpeed = Ball.xSpeed[0]; // Start with slowest
        const randomVerticalZone = Math.floor(Math.random() * 8); // 0-7

	this.dx = (randomHorizontalSpeed * GAME_CONFIG.BASE_WIDTH / GAME_CONFIG.FPS) * (Math.random() > 0.5 ? 1 : -1);

	this.dx *= this.speedMultiplier;
	this.dy = Ball.ySpeed[randomVerticalZone];
    }

    // All game logic uses virtual coordinates
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    checkWallCollision(): boolean {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= GAME_CONFIG.BASE_WIDTH;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= GAME_CONFIG.BASE_HEIGHT;

        if (hitLeft || hitRight) {
            this.dx = -this.dx;
            return true;
        }
        if (hitTop || hitBottom) {
            this.dy = -this.dy;
            return true;
        }
        return false;
    }

	handlePaddleCollision(zone: number, isRightPaddle: boolean) {
		this.paddleHits++;
	
	    let horizontalIndex;
        if (this.paddleHits < 4) horizontalIndex = 0;
        else if (this.paddleHits < 12) horizontalIndex = 1;
        else horizontalIndex = 2;

        const horizontalSpeedInPixelsPerSec = 
            Ball.xSpeed[horizontalIndex] * GAME_CONFIG.BASE_WIDTH;
        const dxPerFrame = horizontalSpeedInPixelsPerSec / GAME_CONFIG.FPS;

        // Calculate dy (vertical movement)
        const verticalSpeedInPixelsPerSec = 
            Ball.ySpeed[zone - 1] * GAME_CONFIG.BASE_HEIGHT;
        const dyPerFrame = verticalSpeedInPixelsPerSec / GAME_CONFIG.FPS;

        // Apply direction
        this.dx = dxPerFrame * (isRightPaddle ? -1 : 1);
        this.dy = dyPerFrame; // Add sign based on collision (e.g., upward/downward)

		this.dx *= this.speedMultiplier;
		this.dy *= this.speedMultiplier;

    }
}
