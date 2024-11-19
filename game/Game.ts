import { Application, Container, Loader, Sprite, Texture } from "pixi.js";
import { SingletonFactory } from "./Single";

interface GameOptions {
    width?: number;
    height?: number;
}
export default class Game extends SingletonFactory<Game>() {
    app: Application = new Application();
    stage = this.app.stage;
    async init(container: HTMLElement) {
        await this.app.init({ background: '#33A6B8', resizeTo: container })
        container.appendChild(this.app.canvas)
    }
}