# CaptchaInput

移动端接收验证码输入框

## Usage

```vue
<script setup lang="ts">
import CaptchaInput from "@zxk/components/Captchainput";
import { ref } from "vue";

const captcha = ref();

const onEditor = () => {
  captcha.value.onFocus();
};
const onComplete = (value: string) => {
  console.log({ value });
};
</script>

<template>
  <CaptchaInput
    ref="captcha"
    v-slot="{ message }"
    default-value="123456"
    @complete="onComplete"
  >
    <span class="item" v-for="num in message" @click="onEditor">{{ num }}</span>
  </CaptchaInput>

  <CaptchaInput v-slot="{ message }" default-value="123456" items-type="string">
    {{ message }}
  </CaptchaInput>
</template>
```
