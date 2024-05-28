<script setup lang="ts">
import CaptchaInput from "./index.vue";
import { ref } from "vue";

const captcha = ref();

const onEditor = () => {
  console.log("captcha.value", captcha.value);
  captcha.value.onFocus();
};
const onComplete = (value: string) => {
  console.log({ value });
};
</script>

<template>
  <p>
    <strong>数组</strong>
    <CaptchaInput
      v-slot="{ message }"
      default-value="123456"
      @complete="onComplete"
    >
      <span class="item" v-for="num in message" @click="onEditor">{{
        num
      }}</span>
    </CaptchaInput>
  </p>

  <p>
    <strong>字符串</strong>
    <CaptchaInput
      v-slot="{ message }"
      default-value="123456"
      items-type="string"
      :auto-focus="false"
    >
      {{ message }}
    </CaptchaInput>
  </p>
</template>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: aquamarine;
  margin: 0 10px;
  text-align: center;
  line-height: 30px;
}
</style>
