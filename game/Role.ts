import { AnimatedSprite, Application, Assets, Container, Rectangle, Texture } from "pixi.js";
import Game from "./Game";

export default class Role {
    public explosion: AnimatedSprite;
    private speed = 2;
    private initX = 0;
    private scaleValue = 0.1;
    private animationSpeed = 0.09;

    async init() {
        await Assets.load('/blogImg/me.json');
        // Create an array to store the textures
        const explosionTextures: Texture[] = [];
        let i;

        for (i = 0; i < 2; i++) {
            const texture = Texture.from(`ani${i + 1}.png`);
            explosionTextures.push(texture);
        }

        // Create and randomly place the animated explosion sprites on the stage
        this.explosion = new AnimatedSprite(explosionTextures);
        this.explosion.animationSpeed = this.animationSpeed;
        this.explosion.x = this.initX = -this.explosion.width * this.scaleValue;
        this.explosion.y = window.innerHeight - this.explosion.height * this.scaleValue;
        this.explosion.scale.set(0.1);
        this.explosion.anchor.set(1);
        this.explosion.play();
    }

    playing() {
        if (this.explosion.x <= window.innerWidth / 3) {
            this.explosion.x += this.speed;
        }
    }

    reset() {
        this.explosion.x = this.initX;
    }
}