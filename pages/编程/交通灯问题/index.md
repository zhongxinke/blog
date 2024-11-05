# 交通灯

<script setup>
import Demo from './demo.vue'
</script>
<Demo />
## 源码

```ts
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
```

## Usage

```vue
<script setup lang="ts">
import { reactive } from "vue";
import Flex from "@ys/components/Flex/index.vue";
import TrafficLight from "./index";
import type { Light } from "./index";
const source: Light[] = [
  {
    color: "red",
    lasts: 3
  },
  {
    color: "green",
    lasts: 5
  },
  {
    color: "yellow",
    lasts: 2
  }
];
const trafficLight = new TrafficLight(source);

const light = reactive({
  color: source[0].color,
  remain: source[0].lasts
});

trafficLight.update(({ color, remain }) => {
  light.color = color;
  light.remain = remain;
});
</script>

<template>
  <Flex direction="row" :class="light.color">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </Flex>
  <Flex class="remain"> {{ light.remain }} </Flex>
</template>

<style lang="scss" scoped>
.item {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 10px;
  background-color: gray;
}

.red > div:nth-child(1) {
  background-color: red;
}
.green > div:nth-child(2) {
  background-color: green;
}
.yellow > div:nth-child(3) {
  background-color: yellow;
}

.remain {
  margin-top: 30px;
  font-size: 28px;
  font-weight: bold;
}
</style>
```
