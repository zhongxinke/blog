<script setup lang="ts">
import { reactive } from "vue";
import Flex from "@/components/Flex/index.vue";
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
