<script setup>
import { computed } from "vue"

const props = defineProps({
  columns: {
    type: Number,
    default: 2
  },
  gap: {
    type: Number,
    default: 4
  },
  mobileColumns: {
    type: Number,
    default: 1
  }
})

const gridClasses = computed(() => {
  const baseClasses = ["grid", "w-full"]
  
  // Mobile columns
  switch(props.mobileColumns) {
    case 1: baseClasses.push("grid-cols-1"); break;
    case 2: baseClasses.push("grid-cols-2"); break;
    case 3: baseClasses.push("grid-cols-3"); break;
    default: baseClasses.push("grid-cols-1");
  }
  
  // Desktop columns
  switch(props.columns) {
    case 1: baseClasses.push("md:grid-cols-1"); break;
    case 2: baseClasses.push("md:grid-cols-2"); break;
    case 3: baseClasses.push("md:grid-cols-3"); break;
    default: baseClasses.push("md:grid-cols-1");
  }
  
  // Gap
  switch(props.gap) {
    case 2: baseClasses.push("gap-2"); break;
    case 4: baseClasses.push("gap-4"); break;
    case 6: baseClasses.push("gap-6"); break;
    case 8: baseClasses.push("gap-8"); break;
    default: baseClasses.push("gap-4");
  }
  
  return baseClasses.join(" ")
})
</script>

<template>
  <div :class="gridClasses">
    <slot></slot>
  </div>
</template>