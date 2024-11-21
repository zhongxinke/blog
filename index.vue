<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Game from "./game/Game";
import Nav from "./nav.vue";
import { MouseTrail } from "./game/MouseTrail";
import Role from "./game/Role";
import TimeLine from "./game/TimeLine";
import Company from "./game/Company";

const game = new Game()
const role = new Role()
const company = new Company()
const timeLine = new TimeLine()
const mouseTrail = new MouseTrail()


onMounted(async () => {
  await game.init()
  await role.init()
  await company.init()
  await mouseTrail.init(game)

  game.app.stage.addChild(role.explosion, company.group)

  timeLine.drawLine(game, role.explosion.y)



  const handle = () => {
    mouseTrail.update()
    role.playing()
    company.playing(() => {
      company.showTechnology(game)
    })
  }
  game.app.ticker.add(handle)
  
})

onUnmounted(() => {
  game.reset()
  company.reset()
  role.reset()
})

</script>

<template>
    <Nav />
</template>

<style lang="scss" scoped>
#container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
