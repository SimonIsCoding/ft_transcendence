// Environment-based configuration
export const GAME_CONFIG = {
    BASE_WIDTH: 1024,
    BASE_HEIGHT: 768,
    // Other tunable parameters
    BALL_SPEED: 8,
    MAX_BALL_SPEED: 24,
    PADDLE_WIDTH: 8,          // Base paddle width
    PADDLE_HEIGHT: 40,         // Base paddle height
    PADDLE_SPEED: 5,           // Base movement speed
    PADDLE_OFFSET: 30,         // Distance from side walls
    DEFLECTION_ANGLES: [-45, -30, -15, 0, 0, 15, 30, 45], // Deflection angle for each zone in paddle 
  // Vertical speed in m/s for a 3m height screen
    DEFLECTION_SPEED: [2.08, 1.39, 0.678, 0, 0, -0.684, -1.36, -2.04],
  // Horizontal speed in m/s for a 4 m width sceen
    HORIZONTAL_SPEED: [1, 1.6, 2.1]
};
