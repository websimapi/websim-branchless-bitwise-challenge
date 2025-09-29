export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.setupListeners();
    }
    
    setupListeners = () => {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.targetX = e.clientX - rect.left;
            this.targetY = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.targetX = touch.clientX - rect.left;
            this.targetY = touch.clientY - rect.top;
        });
    };
    
    getDeltaX = () => {
        const delta = (this.targetX - 400) / 50;
        this.targetX = this.targetX + ((400 - this.targetX) >> 31) & (400 - this.targetX);
        return delta;
    };
    
    getDeltaY = () => {
        const delta = (this.targetY - 300) / 50;
        this.targetY = this.targetY + ((300 - this.targetY) >> 31) & (300 - this.targetY);
        return delta;
    };
}

