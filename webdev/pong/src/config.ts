// Environment-based configuration
export const GAME_CONFIG = {
    BASE_WIDTH: 1024,
    BASE_HEIGHT: 768,
    // Other tunable parameters
    PADDLE_WIDTH: 8,          // Base paddle width
    PADDLE_HEIGHT: 60,         // Base paddle height
    PADDLE_SPEED: 10,           // Base movement speed
    PADDLE_OFFSET: 30,         // Distance from side walls
    DEFLECTION_ANGLES: [-45, -30, -15, 0, 0, 15, 30, 45], // Deflection angle for each zone in paddle 
  // Vertical speed in height/s
    VERTICAL_SPEED: [-2.08/3, -1.39/3, -0.678/3, 0, 0, -0.684/3, -1.36/3, -2.04/3],
  // Horizontal speed in width/s
    HORIZONTAL_SPEED: [1/4, 1.6/4, 2.1/4],
	FPS: 60
};
