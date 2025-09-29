import { GameEngine } from './game-engine.js';
import { InputManager } from './input-manager.js';
import { Renderer } from './renderer.js';
import { MultiplayerManager } from './multiplayer-manager.js';

const init = () => new Promise(resolve => 
    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', resolve) 
        : resolve()
);

init().then(async () => {
    const canvas = document.getElementById('game-canvas');
    const scoreElement = document.getElementById('score');
    const playerCountElement = document.getElementById('player-count');
    
    const renderer = new Renderer(canvas);
    const inputManager = new InputManager(canvas);
    const multiplayerManager = new MultiplayerManager();
    const gameEngine = new GameEngine(renderer, inputManager, scoreElement, multiplayerManager);
    
    await multiplayerManager.initialize();
    multiplayerManager.onPlayerCountUpdate = (count) => playerCountElement.textContent = count;
    
    gameEngine.start();
});