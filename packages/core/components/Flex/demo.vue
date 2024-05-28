<script setup lang="ts">
import { reactive } from "vue";
import Flex from "./index.vue";

const directionProps = ["column", "row"] as const;
const alignProps = ["center", "start", "end"] as const;
const justifyProps = ["center", "start", "end", "around", "between"] as const;

const props = reactive<{
  direction: (typeof directionProps)[number];
  justify: (typeof justifyProps)[number];
  align: (typeof alignProps)[number];
}>({
  direction: "column",
  justify: "center",
  align: "center"
});
</script>

<template>
  <Flex justify="start" direction="row">
    <Flex
      class="demo-container"
      :direction="props.direction"
      :justify="props.justify"
      :align="props.align"
    >
      <div>item</div>
      <div>item</div>
    </Flex>
    <div class="options">
      <div>
        <p><strong>direction</strong></p>
        <template v-for="item in directionProps">
          <input
            v-model="props.direction"
            type="radio"
            name="direction"
            :id="item"
            :value="item"
          /><label :for="item">{{ item }}</label
          >&nbsp;
        </template>
      </div>
      <div>
        <p><strong>justify</strong></p>
        <template v-for="item in justifyProps">
          <input
            v-model="props.justify"
            type="radio"
            :id="item"
            :value="item"
            name="justify"
          /><label :for="item">{{ item }}</label
          >&nbsp;
        </template>
      </div>
      <div>
        <p><strong>align</strong></p>
        <template v-for="item in alignProps">
          <input
            v-model="props.align"
            type="radio"
            :id="item"
            :value="item"
            name="align"
          /><label :for="item">{{ item }}</label
          >&nbsp;
        </template>
      </div>
    </div>
  </Flex>
</template>

<style lang="scss" scoped>
input {
  margin: 0;
  margin-right: 5px;
  vertical-align: middle;
}
.demo-container {
  width: 200px;
  height: 200px;
  background-color: aquamarine;
}
.options {
  margin-left: 40px;
}
</style>
