<script setup>
import { computed } from "vue";
const props = defineProps({

  color: {
    type: String,
    default: "default",
    validator: (value) => ["primary", "transparent"].includes(value)
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
<p class="text-base lg:text-lg " :class="[colorText]"><slot></slot></p>
</template>