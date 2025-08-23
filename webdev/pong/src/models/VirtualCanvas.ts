import { GAME_CONFIG } from '../config';

export class VirtualCanvas {
    private physicalWidth: number = 0;
    private physicalHeight: number = 0;
    public scaleFactor: number = 1;
    
    // Base (virtual) dimensions - 1024x768 for Pong
    readonly baseWidth: number = GAME_CONFIG.BASE_WIDTH;
    readonly baseHeight: number = GAME_CONFIG.BASE_HEIGHT;

    update(physicalWidth: number, physicalHeight: number) {
        this.physicalWidth = physicalWidth;
        this.physicalHeight = physicalHeight;
        
        // Calculate scale while maintaining aspect ratio
        const widthScale = physicalWidth / this.baseWidth;
        const heightScale = physicalHeight / this.baseHeight;
        this.scaleFactor = Math.min(widthScale, heightScale);
    }

    // Conversion methods
    toPhysicalX(virtualX: number): number { return virtualX * this.scaleFactor; }
    toPhysicalY(virtualY: number): number { return virtualY * this.scaleFactor; }
    toPhysicalSize(size: number): number { return size * this.scaleFactor; }

    // For collision detection in virtual space
    get currentVirtualWidth(): number { return this.baseWidth; }
    get currentVirtualHeight(): number { return this.baseHeight; }

	getPhysicalDimensions(): { width: number, height: number } {
    	return { width: this.physicalWidth, height: this.physicalHeight };
	}
}
