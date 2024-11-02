<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

// Define component props
const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
});

// Computed property for container classes
const containerClasses = computed(() => {
  if (props.size === 'small') {
    return 'p-1 w-[250px]';
  } else if (props.size === 'large') {
    return 'px-2 py-1 w-[600px]';
  } else {
    return 'px-1 py-1 w-[350px]';
  }
});

// Computed property for input classes
const inputClasses = computed(() => {
  if (props.size === 'small') {
    return 'text-xs p-1';
  } else if (props.size === 'large') {
    return 'text-lg p-3';
  } else {
    return 'text-base p-2';
  }
});

// Computed property for button classes
const buttonClasses = computed(() => {
  if (props.size === 'small') {
    return 'p-1';
  } else if (props.size === 'large') {
    return 'p-3';
  } else {
    return 'p-2';
  }
});

// Computed property for icon classes
const iconClasses = computed(() => {
  if (props.size === 'small') {
    return 'text-base';
  } else if (props.size === 'large') {
    return 'text-3xl';
  } else {
    return 'text-2xl';
  }
});
</script>

<template>
  <div :class="['flex items-center border border-gray-300 bg-[#FAFAFA]', containerClasses]">
    <input
      type="text"
      :class="['flex-grow border-none outline-none', inputClasses]"
    />
    <button :class="['ml-2', buttonClasses]">
      <i :class="['pi pi-search text-[#117277]', iconClasses]"></i>
    </button>
  </div>
   <!-- <Search size="small" />
    <Search size="medium" />
    <Search size="large" /> -->
</template>
