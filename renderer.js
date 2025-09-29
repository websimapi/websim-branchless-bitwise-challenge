export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.time = 0;
    }
    
    render = async (player, entities) => {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawPlayer(player);
        entities.forEach(entity => this.drawEntity(entity));
        
        this.drawGrid();
        
        this.time++;
        
        return this;
    };
    
    drawPlayer = (player) => {
        const gradient = this.ctx.createRadialGradient(
            player.x + player.size/2, player.y + player.size/2, 0,
            player.x + player.size/2, player.y + player.size/2, player.size
        );
        
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#0080ff');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(player.x, player.y, player.size, player.size);
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(player.x, player.y, player.size, player.size);
    };
    
    drawEntity = (entity) => {
        const color = entity.type ? '#00ff80' : '#ff0040';
        const alpha = 0.8 + (Math.sin(this.time * 0.1) * 0.2);
        
        this.ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        this.ctx.beginPath();
        this.ctx.arc(entity.x + entity.size/2, entity.y + entity.size/2, entity.size/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    };
    
    drawGrid = () => {
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 1;
        
        const drawLines = (start, end, step, vertical) => {
            const drawLine = (i) => {
                this.ctx.beginPath();
                vertical 
                    ? (this.ctx.moveTo(i, 0), this.ctx.lineTo(i, this.canvas.height))
                    : (this.ctx.moveTo(0, i), this.ctx.lineTo(this.canvas.width, i));
                this.ctx.stroke();
                return i + step < end ? drawLine(i + step) : i;
            };
            return drawLine(start);
        };
        
        drawLines(0, this.canvas.width, 50, true);
        drawLines(0, this.canvas.height, 50, false);
    };
}

