import Game, { GAME_X, positionX, positionY } from "./Game";
import gsap from "gsap"

const companyData = [
    {
        name: "扬悦博众",
        technology: ["HTML", "CSS", "JavaScript", "Threejs", "JQ", "Laya"],
        date: ['20215-10', '2018-11']
    },
    {
        name: '品高软件',
        technology: ["React", "Webpack", "AntDesign", "Sass", "Echarts"],
        date: ['2018-12', '2020-09']
    },
    {
        name: '玖的数码科技',
        technology: ["Uniapp", "Vue", "Krpano", "Vant"],
        date: ['2020-09', '2021-03']
    },
    {
        name: '兔展智能科技',
        technology: ["Uniapp", "Vue", "React", "Threejs", "Typescript", "Nodejs"],
        date: ['2021-04', '2022-08']
    },
    {
        name: '云珊科技',
        technology: ["Uniapp", "Vue3", "Typescript", "ElementPlus"],
        date: ['2023-10', '2024-05']
    },
    {
        name: '畅供数字技术',
        technology: ["Umi", "React", "AntDesign", "Typescript"],
        date: ['2024-06', '2024-10']
    }
]

export default class Company {
    loop: number = 0;
    private initX: number = 0
    private scale = 0.5;
    private img: any;
    private speed = 3;
    private trigger = false;
    group: any;
    private companyName: Text;

    async init() {
        const texture = await PIXI.Assets.load('/blogImg/company.png');
        this.group = new PIXI.Container()

        this.img = new PIXI.Sprite(texture)
        this.img.anchor.set(0.5)
        this.img.scale.set(this.scale)

        this.companyName = new PIXI.Text({ text: companyData[0].name, anchor: 0.5 })
        this.companyName.y = -this.img.height * this.scale - this.companyName.height

        this.group.x = this.initX = positionX(this.img.width, this.scale) + GAME_X / 3;
        this.group.y = positionY(this.img.height, this.scale);
        this.group.addChild(this.img, this.companyName)
    }

    showTechnology(game: Game) {
        const texts = companyData[this.loop].technology
        texts.forEach((text, index) => {
            const t = new PIXI.Text({ text, anchor: 0.5 })
            t.x = game.app.screen.width / 3;
            t.y = game.app.screen.height / 2;
            t.alpha = 0
            game.app.stage.addChild(t)
            gsap.timeline()
                .to(t, {
                    y: t.y - 50,
                    alpha: 1,
                    duration: 1,
                    delay: index * 0.5
                })
                .to(t, {
                    y: t.y - 60,
                    alpha: 0,
                    duration: 0.5,
                })
                .eventCallback("onComplete", () => {
                    game.app.stage.removeChild(t)
                })
        })
        this.loop = (this.loop + 1) % companyData.length
    }

    playing(fn) {
        if (this.group) {
            if (!this.trigger && this.group.x <= (GAME_X / 3 + this.img.width * this.scale)) {
                this.trigger = true
                console.log("show technology")
                fn?.()
            }
            if (this.group.x < -this.img.width * this.scale) {
                this.group.x = this.initX
                this.trigger = false
                this.companyName.text = companyData[this.loop].name
            }
            this.group.x -= this.speed
        }

    }

    reset() {
        this.group.x = this.initX
        this.trigger = false
        this.companyName.text = companyData[0].name
        this.loop = 0
    }
}