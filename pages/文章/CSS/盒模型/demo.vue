<script setup lang="ts">
import { ref, computed, onUpdated, nextTick } from "vue";
import Flex from "@ys/components/Flex/index.vue";
const box = ref("content-box");
const div = ref<HTMLElement>();
const boxItems = ["content-box", "border-box"];

// const getWidth = async () => {
//   await nextTick();
//   return div.value?.offsetWidth;
// };
</script>

<template>
  <Flex direction="row" justify="around" class="container">
    <!-- {{ getWidth() }}px -->
    <div class="item" ref="div" :style="{ boxSizing: box }">
      <div>{{ box }}</div>
    </div>
    <div>
      <template v-for="item in boxItems">
        <input
          v-model="box"
          type="radio"
          :id="item"
          :value="item"
          name="box"
        /><label :for="item">{{ item }}</label
        >&nbsp;
      </template>
    </div>
  </Flex>
</template>

<style lang="scss" scoped>
.container {
  height: 300px;
}
.item {
  width: 200px;
  height: 200px;
  border: 10px solid green;
  padding: 10px;
  //   margin: 10px;
  background-color: chocolate;
}
</style>
