<script setup>
import { defineProps } from 'vue';

// Define component props
const props = defineProps({
  size: {
    type: String,
    default: 'default',
    // validator: (value) => ['default'].includes(value),
  },
});

const containerClasses = 'p-1 w-full max-w-[250px] md:px-1 md:py-1 md:max-w-[350px] lg:px-2 lg:py-1 lg:max-w-[600px] xl:px-2 xl:py-1 xl:max-w-[600px] 2xl:px-2 2xl:py-1 2xl:max-w-[600px]'
const inputClasses = 'bg-[#FAFAFA] text-xs p-1 md:text-base md:p-2 lg:text-lg lg:p-3 xl:text-lg xl:p-3 2xl:text-lg 2xl:p-3'
const buttonClasses = 'p-1 md:p-2 lg:p-3 xl:p-3 2xl:p-3'
const iconClasses = 'text-base md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl'

</script>

<template>
  <div :class="['flex items-center border border-gray-300 bg-[#FAFAFA] rounded-md', containerClasses]">
    <input type="text" :class="['flex-grow border-none outline-none', inputClasses]" />
    <button :class="['ml-2', buttonClasses]">
      <i :class="['pi pi-search text-[#117277]', iconClasses]"></i>
    </button>
  </div>

</template>
