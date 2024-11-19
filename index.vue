<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Game from "./game/Game";
import Nav from "./nav.vue";
import { MouseTrail } from "./game/MouseTrail";
import Role from "./game/Role";


onMounted(async () => {
  await Game.instance.init(document.getElementById("container") as HTMLElement)
  const mouseTrail = new MouseTrail()
  // const role = new Role()
  mouseTrail.init()
  Game.instance.app.ticker.add(() => {
    mouseTrail.update()
  })
})

</script>

<template>
  <div id="container"></div>
  <Nav />
</template>

<style lang="scss" scoped>
#container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
