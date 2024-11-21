export const GAME_Y = globalThis.innerHeight;
export const GAME_X = globalThis.innerWidth;

export const positionX = (width, scale) => {
    return GAME_X + width * scale
}
export const positionY = (height, scale) => {
    return GAME_Y - height * scale
}
export default class Game {
    app: any;
    constructor() {
    }
    async init() {
        this.app = new PIXI.Application();
        await this.app.init({ background: '#33A6B8', resizeTo: globalThis })
        document.body.appendChild(this.app.canvas)
    }

    reset() {
        this.app.destroy(true)
    }
}


export const game = new Game()