<script setup lang="ts">
const vFocus = {
  mounted: el => el?.focus()
};

const onClick = () => {
  console.log("click");
};
</script>

<template>
  <h5>输入框对焦</h5>
  <input type="text" placeholder="这里应该会对焦" v-focus />
  <br />
  <br />
  <br />
  <h5>v-debounce</h5>
  <button v-debounce:immediate="onClick">按钮</button>
</template>
