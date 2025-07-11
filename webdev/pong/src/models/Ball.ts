import { GAME_CONFIG } from '../config';

export class Ball {
    // All coordinates in virtual space (1024×768)
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    speed: number;
    color: string;

	constructor() {
        // Initialize in virtual coordinates
        this.x = GAME_CONFIG.BASE_WIDTH / 2;  // 1024/2
        this.y = GAME_CONFIG.BASE_HEIGHT / 2;  // 768/2
        this.radius = 10;
        this.speed = GAME_CONFIG.BALL_SPEED;
        this.dx = 2 * (Math.random() > 0.5 ? 1 : -1);
        this.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
        this.color = 'white';
    }

	reset() {
        // Initialize in virtual coordinates
        this.x = GAME_CONFIG.BASE_WIDTH / 2;  // 1024/2
        this.y = GAME_CONFIG.BASE_HEIGHT / 2;  // 768/2
        this.radius = 10;
        this.speed = GAME_CONFIG.BALL_SPEED;
        this.dx = 2 * (Math.random() > 0.5 ? 1 : -1);
        this.dy = 2 * (Math.random() > 0.5 ? 1 : -1);
        this.color = 'white';
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

	handlePaddleCollision(angle: number, isRightPaddle: boolean) {
        this.dx = Math.cos(angle) * this.speed * (isRightPaddle ? -1 : 1);
        this.dy = Math.sin(angle) * this.speed;
        this.speed = Math.min(this.speed * 1.05, GAME_CONFIG.MAX_BALL_SPEED);
    }
}