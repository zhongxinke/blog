<script setup lang="ts">
import { onMounted } from "vue";
import ThreeUtils from "./index";
import Nav from "./nav.vue";

onMounted(() => {
  const utils = new ThreeUtils(document.getElementById("container")!);
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
