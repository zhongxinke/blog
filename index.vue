<script setup lang="ts">
import { onMounted } from "vue";
import ThreeUtils from "./index";
import Nav from "./nav.vue";
import { useData, useRouter, withBase } from "vitepress";

const {theme} = useData()
const router = useRouter()
const nav = [
  {
    ...theme.value.nav[1],
    image: "/blogImg/fangao.png",
    x: 0,
    y: 0
  },
  {
    ...theme.value.nav[2],
    image: "/blogImg/bixiong.png",
    x: 20,
    y: 0
  },
  {
    ...theme.value.nav[3],
    image: "/blogImg/mao.png",
    x: -20,
    y: 0
  },
]

onMounted(() => {
  const utils = new ThreeUtils(document.getElementById("container")!, {
    nav,
    onClick(link) {
      router.go(withBase(link))
    }
  });
});
</script>

<template>
  <div id="vignette"></div>
  <div id="container"></div>

  <Nav />
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  background-color: #0b3037;
}
#vignette {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-attachment: fixed;
  background-image: -webkit-radial-gradient(
    50% 50%,
    ellipse closest-side,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.3) 120%
  );
}
</style>
