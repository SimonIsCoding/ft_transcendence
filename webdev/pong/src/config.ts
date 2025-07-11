// Environment-based configuration
export const GAME_CONFIG = {
    BASE_WIDTH: 1024,
    BASE_HEIGHT: 768,
    // Other tunable parameters
    BALL_SPEED: 2,
	MAX_BALL_SPEED: 10,
	PADDLE_WIDTH: 10,          // Base paddle width
    PADDLE_HEIGHT: 80,         // Base paddle height
    PADDLE_SPEED: 5,           // Base movement speed
    PADDLE_OFFSET: 30,         // Distance from side walls
	DEFLECTION_ANGLES: [-45, -30, -15, 0, 0, 15, 30, 45] // Deflection angle for each zone in paddle 
};