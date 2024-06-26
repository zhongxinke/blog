<script setup lang="ts">
import { useData } from "vitepress";

const { theme } = useData();

const nav = theme.value.nav.map(item => ({
  ...item,
  src: "/blog" + item.link.replace(".md", ".html")
}));
</script>

<template>
  <div class="list">
    <a :href="item.src" v-for="item in nav" :key="item.text">{{ item.text }}</a>
  </div>
</template>

<style lang="scss" scoped>
.list {
  position: fixed;
  left: 35px;
  top: 35px;
  z-index: 99;
  color: #a3a9aa;
  > a {
    display: block;
    font-size: 10px;
    margin-bottom: 15px;
    &:hover {
      color: #fff;
    }
  }
}
</style>
