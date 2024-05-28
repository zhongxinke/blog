import type { App } from "vue";

interface Debounce extends HTMLElement {
  _debounceHandler?: () => void;
  _timer?: NodeJS.Timeout | null;
}
export default (app: App) => {
  app.directive("debounce", {
    mounted: (el: Debounce, binding) => {
      if (typeof binding.value !== "function") {
        throw new Error(
          "v-debounce directive exepects a function as the value"
        );
      }

      const delay = binding.arg === "immediate" ? 500 : binding.arg || 500;
      const immediate =
        binding.arg === "immediate" || binding.modifiers.immediate;

      el._debounceHandler = () => {
        if (el._timer) clearTimeout(el._timer);

        if (immediate && !el._timer) {
          binding.value();
        }

        el._timer = setTimeout(() => {
          if (!immediate) {
            binding.value();
          }
          el._timer = null;
        }, +delay);
      };
      el.addEventListener("click", el._debounceHandler);
    },
    unmounted: (el: Debounce) => {
      if (el._timer) {
        clearTimeout(el._timer);
      }
      if (el._debounceHandler) {
        el.removeEventListener("click", el._debounceHandler);
        delete el._debounceHandler;
      }
    }
  });
};
