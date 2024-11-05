type Color = "red" | "green" | "yellow";

export interface Light {
  color: Color;
  lasts: number;
}

export default class TrafficLight {
  private source: Light[] = [];
  private currentIndex: number = 0;
  private totalTime: number = 0;
  private currentTime: number = Date.now();

  constructor(source: Light[]) {
    this.source = source;
    this.totalTime = source.reduce((pre, next) => {
      return pre + next.lasts;
    }, 0);
  }

  get currentLight() {
    return this.source[this.currentIndex];
  }

  //   经过的时间
  private disTime() {
    return (Date.now() - this.currentTime) / 1000;
  }

  private updating() {
    if (!this.totalTime) return 0;
    let dt = this.disTime();
    let m = dt % this.totalTime;
    this.currentTime += this.totalTime * Math.floor(m / this.totalTime) * 1000;
    while (1) {
      m -= this.currentLight.lasts;
      if (m < 0) break;
      else {
        this.currentTime += this.currentLight.lasts * 1000;
        this.currentIndex = (this.currentIndex + 1) % this.source.length;
      }
    }
  }

  update(callback: (light: { color: Color; remain: number }) => void) {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        this.updating();
        callback({
          color: this.currentLight.color,
          remain: Math.ceil(this.currentLight.lasts - this.disTime())
        });
        this.update(callback);
      });
    }
  }
}
