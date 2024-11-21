import Game, { GAME_X, GAME_Y } from "./Game";

export default class TimeLine {
    private spaces = 720;
    private long = 20;
    private width = 6;
    private startTime = 2015;
    private speed = 2;
    private endTime = new Date().getFullYear();
    private yearLine: any[] = [];
    private y: number = 0;
    drawLine(game: Game, y: number) {
        const realPath = new PIXI.Graphics();
        this.y = y;
        realPath.rect(0, y, GAME_X, GAME_Y);
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