<script setup>
import { computed } from "vue";
const props = defineProps({

  color: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "transparent"].includes(value)
  },
  size: {
    type: String,
    default: "small",
    validator: (value) => ["small", "medium", "large"].includes(value)
  },
  customClass: {
    type: [String, Object, Array],
    default: ""
  },
  align: {
    type: String,
    default: "left-center",
    validator: (value) => ["left", "left-center", "center"].includes(value)
  },
  
});

const alignText = computed(() => {
  switch (props.align) {
    case "left":
      return "text-left";
    case "left-center":
      return "text-center lg:text-left";
    case "center":
      return "text-center";
  }
});

const sizeText = computed(() => {
  switch (props.size) {
    case "small":
      return "text-sm md:text-base";
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
  <p class="font-medium tracking-wide w-full" :class="[colorText, sizeText, customClass, alignText]">
    <slot></slot>
  </p>
</template>