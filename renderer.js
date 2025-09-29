export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = window.innerWidth > 850 ? 800 : window.innerWidth - 50;
        this.canvas.height = this.canvas.width * 0.75;
        this.time = 0;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth > 850 ? 800 : window.innerWidth - 50;
            this.canvas.height = this.canvas.width * 0.75;
        });
    }
    
    render = async (player, entities, otherPlayers = {}) => {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        Object.values(otherPlayers).forEach(p => this.drawOtherPlayer(p));
        this.drawPlayer(player);
        entities.forEach(entity => this.drawEntity(entity));
        
        this.drawGrid();
        
        this.time++;
        
        return this;
    };
    
    drawPlayer = (player) => {
        const scale = this.canvas.width / 800;
        const x = player.x * scale;
        const y = player.y * scale;
        const size = player.size * scale;
        
        const gradient = this.ctx.createRadialGradient(
            x + size/2, y + size/2, 0,
            x + size/2, y + size/2, size
        );
        
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#0080ff');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2 * scale;
        this.ctx.strokeRect(x, y, size, size);
    };
    
    drawOtherPlayer = (player) => {
        const scale = this.canvas.width / 800;
        const x = player.x * scale;
        const y = player.y * scale;
        const size = (player.size || 20) * scale;
        
        this.ctx.fillStyle = '#ffaa00';
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1 * scale;
        this.ctx.strokeRect(x, y, size, size);
    };
    
    drawEntity = (entity) => {
        const scale = this.canvas.width / 800;
        const color = entity.type ? '#00ff80' : '#ff0040';
        const alpha = 0.8 + (Math.sin(this.time * 0.1) * 0.2);
        
        this.ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        this.ctx.beginPath();
        this.ctx.arc(
            entity.x * scale + entity.size * scale / 2, 
            entity.y * scale + entity.size * scale / 2, 
            entity.size * scale / 2, 
            0, Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1 * scale;
        this.ctx.stroke();
    };
    
    drawGrid = () => {
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 1;
        
        const scale = this.canvas.width / 800;
        const gridSize = 50 * scale;
        
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
        
        drawLines(0, this.canvas.width, gridSize, true);
        drawLines(0, this.canvas.height, gridSize, false);
    };
}

