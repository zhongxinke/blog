import { Assets, MeshRope, Point } from "pixi.js";
import Game from "./Game";

export class MouseTrail {
    private historyX: number[] = [];
    private historyY: number[] = [];
    private historySize = 20;
    private ropeSize = 100;
    private points: Point[] = [];
    private mouseposition: { x: number, y: number } | undefined;
    async init(game: Game) {
        const trailTexture = await Assets.load('https://pixijs.com/assets/trail.png');

        for (let i = 0; i < this.historySize; i++) {
            this.historyX.push(0);
            this.historyY.push(0);
        }

        for (let i = 0; i < this.ropeSize; i++) {
            this.points.push(new Point(0, 0))
        }

        const rope = new MeshRope({ texture: trailTexture, points: this.points })
        rope.tint = '#0089A7';
        rope.blendMode = 'add'

        game.app.stage.addChild(rope)


        game.app.stage.eventMode = 'static';
        game.app.stage.hitArea = game.app.screen;
        game.app.stage.on('mousemove', (event) => {
            this.mouseposition = this.mouseposition || { x: 0, y: 0 };
            this.mouseposition.x = event.global.x;
            this.mouseposition.y = event.global.y;
        })
    }
    update() {
        if (!this.mouseposition) return;

        this.historyX.pop();
        this.historyX.unshift(this.mouseposition.x);
        // Update the mouse values to historythis.historyX.pop();this.historyX.unshift(mouseposition.x);
        this.historyY.pop();
        this.historyY.unshift(this.mouseposition.y);
        // Update the points to correspond with history.
        for (let i = 0; i < this.ropeSize; i++) {
            const p = this.points[i];
            // Smooth the curve with cubic interpolation to prevent sharp edges.
            const ix = this.cubicInterpolation(this.historyX, (i / this.ropeSize) * this.historySize);
            const iy = this.cubicInterpolation(this.historyY, (i / this.ropeSize) * this.historySize);

            p.x = ix;
            p.y = iy;
        }
    }
    private clipInput(k, arr) {
        if (k < 0) k = 0;
        if (k > arr.length - 1) k = arr.length - 1;

        return arr[k];
    }
    private getTangent(k, factor, array) {
        return (factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array))) / 2;
    }
    private cubicInterpolation(array, t, tangentFactor = 1) {
        const k = Math.floor(t);
        const m = [this.getTangent(k, tangentFactor, array), this.getTangent(k + 1, tangentFactor, array)];
        const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];

        t -= k;
        const t2 = t * t;
        const t3 = t * t2;

        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }
}