import { Assets, Sprite } from "pixi.js";
import Game, { GAME_X, GAME_Y, positionY } from "./Game";

export default class Architecture {
    sprite: Sprite;
    async load(path: string, y: number) {
        const texture = await Assets.load(path)
        this.sprite = new Sprite(texture)

        this.sprite.anchor.set(0.5)
        this.sprite.x = GAME_X / 2
        this.sprite.y = GAME_Y - this.sprite.height / 2 - y

        Game.instance.stage.addChild(this.sprite)
    }
}

export const createSprite = async (path: string, options = {}) => {
    const texture = await Assets.load(path)
    const sprite = new Sprite(texture)
    sprite.anchor.set(0.5)

    return sprite;
}