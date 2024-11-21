import { Application } from "pixi.js";

export const GAME_Y = window.innerHeight;
export const GAME_X = window.innerWidth;

export const positionX = (width, scale) => {
    return GAME_X + width * scale
}
export const positionY = (height, scale) => {
    return GAME_Y - height * scale
}
export default class Game {
    app: Application;
    constructor() {
        this.app = new Application();
    }
    async init() {
        await this.app.init({ background: '#33A6B8', resizeTo: window })
        document.body.appendChild(this.app.canvas)
    }

    reset() {
        this.app.destroy(true)
    }
}


export const game = new Game()