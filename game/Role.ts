import { GAME_X, GAME_Y } from "./Game";

export default class Role {
    public explosion: any;
    private speed = 2;
    private initX = 0;
    private scaleValue = 0.1;
    private animationSpeed = 0.09;

    async init() {
        await PIXI.Assets.load('/blogImg/me.json');
        // Create an array to store the textures
        const explosionTextures: PIXI.Texture[] = [];
        let i;

        for (i = 0; i < 2; i++) {
            const texture = PIXI.Texture.from(`ani${i + 1}.png`);
            explosionTextures.push(texture);
        }

        // Create and randomly place the animated explosion sprites on the stage
        this.explosion = new PIXI.AnimatedSprite(explosionTextures);
        this.explosion.animationSpeed = this.animationSpeed;
        this.explosion.x = this.initX = -this.explosion.width * this.scaleValue;
        this.explosion.y = GAME_Y - this.explosion.height * this.scaleValue;
        this.explosion.scale.set(0.1);
        this.explosion.anchor.set(1);
        this.explosion.play();
    }

    playing() {
        if (this.explosion.x <= GAME_X / 3) {
            this.explosion.x += this.speed;
        }
    }

    reset() {
        this.explosion.x = this.initX;
    }
}