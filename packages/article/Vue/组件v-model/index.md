# 组件v-model

v-model 可以在组件上使用以实现双向绑定

从Vue3.4开始，提供了defineModel()宏，更加简洁地实现双向绑定

官网提供的demo，看起来简单易懂

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel();
function update() {
  model.value++;
}
</script>
<template>
  <div>Parent bound v-model is: {{ model }}</div>
</template>
```

父组件可以使用v-model绑定一个值

```vue
<!-- Parent.vue -->
<Child v-model="countModel" />
```

**要注意的一点，defineModel返回的值是一个ref**

## 底层机制

defineModel是一个便利宏，实际按照如下方式实现

```vue
<script setup>
const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);
</script>
<template>
  <input
    :value="props.modelValue"
    @input="emit('update', $event.target.value)"
  />
</template>
```

**参数**

```vue
<!-- Child -->
<script setup>
const model = defineModel("title");
function update() {
  model.value++;
}
</script>
<template>
  <div>Parent bound v-model is: {{ model }}</div>
</template>

<!-- Parent -->
<Child v-model:title="value" />
```

**修饰符**

```vue
<!-- Child -->
<script setup>
const [model, modifiers] = defineModel("title");
console.log({ modifiers }); // {capitalize: true, trim: true}
</script>
<template>
  <div>Parent bound v-model is: {{ model }}</div>
</template>

<!-- Parent -->
<Child v-model.capitalize.trim="value" />
```

**多个绑定**

```vue
<!-- Child -->
<script setup>
const [firstName, firstModifiers] = defineModel("firstName");
const [lastName, lastModifiers] = defineModel("lastName");
</script>
<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>

<!-- Parent -->
<Child v-model:firstName.trim="value" />
<Child v-model:lastName.trim="value" />
```
