<script setup>
import { computed } from "vue";
const props = defineProps({

  color: {
    type: String,
    default: "default",
    validator: (value) => ["primary", "transparent"].includes(value)
  },
  size: {
    type: String,
    default: "base",
    validator: (value) => ["small", "medium", "large"].includes(value)
  }
});

const sizeText = computed(() => {
  switch (props.size) {
    case "small":
      return "text-sm md:text-base lg:text-md xl:text-lg 2xl:text-xl";
    case "medium":
      return "text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl";
    case "large":
      return "text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl";
    default:
      return "text-base md:text-base lg:text-md xl:text-lg 2xl:text-xl";
  }
});

const colorText = computed(() => {
  switch (props.color) {
    case "primary":
      return "text-gray-800 dark:text-gray-300";
    case "transparent":
      return "text-gray-700 dark:text-gray-400";
    default:
      return "text-gray-700 dark:text-gray-300";
  }
})


</script>

<template>
  <p class="font-medium tracking-wide text-center lg:text-left w-full max-w-[600px]" :class="[colorText, sizeText]">
    <slot></slot>
  </p>
</template>