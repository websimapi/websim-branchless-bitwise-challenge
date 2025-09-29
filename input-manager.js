export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.joystick = { x: 0, y: 0, active: false };
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.setupControls();
    }
    
    setupControls = () => {
        const joystickBase = document.getElementById('joystick-base');
        const joystickStick = document.getElementById('joystick-stick');
        
        const handleStart = (e) => {
            e.preventDefault();
            this.joystick.active = true;
            this.updateJoystick(e);
        };
        
        const handleMove = (e) => {
            if (!this.joystick.active) return;
            e.preventDefault();
            this.updateJoystick(e);
        };
        
        const handleEnd = () => {
            this.joystick.active = false;
            this.joystick.x = 0;
            this.joystick.y = 0;
            joystickStick.style.transform = 'translate(0, 0)';
        };
        
        joystickBase.addEventListener('touchstart', handleStart);
        joystickBase.addEventListener('mousedown', handleStart);
        
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('mousemove', handleMove);
        
        document.addEventListener('touchend', handleEnd);
        document.addEventListener('mouseup', handleEnd);
        
        window.addEventListener('deviceorientation', (e) => {
            if (window.orientation !== undefined) {
                this.joystick.x = Math.sin(e.gamma * Math.PI / 180) * 2;
                this.joystick.y = Math.sin(e.beta * Math.PI / 180) * 2;
            }
        });
    };
    
    updateJoystick = (e) => {
        const joystickBase = document.getElementById('joystick-base');
        const joystickStick = document.getElementById('joystick-stick');
        const rect = joystickBase.getBoundingClientRect();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = rect.width / 2;
        
        const clampedDistance = Math.min(distance, maxDistance);
        const angle = Math.atan2(deltaY, deltaX);
        
        this.joystick.x = (clampedDistance / maxDistance) * Math.cos(angle);
        this.joystick.y = (clampedDistance / maxDistance) * Math.sin(angle);
        
        const stickX = this.joystick.x * (maxDistance - 20);
        const stickY = this.joystick.y * (maxDistance - 20);
        
        joystickStick.style.transform = `translate(${stickX}px, ${stickY}px)`;
    };
    
    getMovement = () => {
        const keyboardX = (this.keys?.d | 0) - (this.keys?.a | 0);
        const keyboardY = (this.keys?.s | 0) - (this.keys?.w | 0);
        
        return {
            x: this.joystick.x || keyboardX,
            y: this.joystick.y || keyboardY
        };
    };
}

