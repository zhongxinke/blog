import { Container, Graphics, Text } from "pixi.js";
import Game from "./Game";

export default class TimeLine {
    private spaces = 720;
    private long = 20;
    private width = 6;
    private startTime = 2015;
    private speed = 2;
    private endTime = new Date().getFullYear();
    private yearLine: Container[] = [];
    private y: number = 0;
    drawLine(game: Game, y: number) {
        const realPath = new Graphics();
        this.y = y;
        realPath.rect(0, y, window.innerWidth, window.innerHeight);
        realPath.fill(0x000000)
        realPath.zIndex = 1
        game.app.stage.addChild(realPath);
    }

    play() {
        this.yearLine.forEach(year => {
            year.x -= this.speed
        })
    }
}