import { GameEngine } from './game-engine.js';
import { InputManager } from './input-manager.js';
import { Renderer } from './renderer.js';

const init = () => new Promise(resolve => 
    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', resolve) 
        : resolve()
);

init().then(() => {
    const canvas = document.getElementById('game-canvas');
    const scoreElement = document.getElementById('score');
    
    const renderer = new Renderer(canvas);
    const inputManager = new InputManager(canvas);
    const gameEngine = new GameEngine(renderer, inputManager, scoreElement);
    
    gameEngine.start();
});

