import { AnimatedSprite, Assets, Texture } from "pixi.js";
import Game from "./Game";

export default class Role {
    constructor() {
        this.init()
    }
    async init() {
        const texture = await Assets.load('https://pixijs.com/assets/spritesheet/mc.json');

        // Create an array to store the textures
        const explosionTextures: Texture[] = [];
        let i;

        for (i = 0; i < 26; i++) {
            const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

            explosionTextures.push(texture);
        }

        // Create and randomly place the animated explosion sprites on the stage
        for (i = 0; i < 50; i++) {
            // Create an explosion AnimatedSprite
            const explosion = new AnimatedSprite(explosionTextures);

            explosion.x = Math.random() * Game.instance.app.screen.width;
            explosion.y = Math.random() * Game.instance.app.screen.height;
            explosion.anchor.set(0.5);
            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.set(0.75 + Math.random() * 0.5);
            // explosion.gotoAndPlay((Math.random() * 26) | 0);
            Game.instance.stage.addChild(explosion);
        }
    }
}