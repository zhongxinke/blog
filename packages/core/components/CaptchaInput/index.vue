<script setup lang="ts">
import { emit } from "process";
import { ref, computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    length?: number;
    itemsType?: "string" | "list";
    autoFocus?: boolean;
  }>(),
  {
    length: 6,
    itemsType: "list",
    autoFocus: true
  }
);

const message = ref(props.defaultValue);
const input = ref<HTMLInputElement>();

const slotData = computed(() => {
  return props.itemsType === "list" ? message.value?.split("") : message.value;
});

const onBlur = () => {
  input.value?.blur();
};

const onFocus = () => {
  input.value?.focus();
};

const onChange = (el: Event) => {
  const value = (el.target as HTMLInputElement).value;

  if (value.length === props.length && value.length) {
    emits("complete", value);
    message.value = value;
  }
};

const emits = defineEmits(["complete"]);

defineExpose({
  onFocus,
  onBlur
});

// onMounted(() => {
//   if (props.autoFocus && props.itemsType === "list") {
//     onFocus();
//   }
// });
const vFocus = {
  mounted: el => {
    if (props.autoFocus) {
      el.focus();
    }
  }
};
</script>

<template>
  <input
    v-focus
    v-model="message"
    type="text"
    class="hide-input"
    :maxlength="length"
    @input="onChange"
  />
  <slot :message="slotData"></slot>
</template>

<style lang="scss" scoped>
.hide-input {
  position: fixed;
  top: -100vh;
  left: 0;
  opacity: 0;
}
</style>
