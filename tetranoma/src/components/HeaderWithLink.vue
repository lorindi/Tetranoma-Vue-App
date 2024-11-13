<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    default: 'See all',
  },
  iconColor: {
    type: String,
    default: 'text-[#8F3DBF]',
  },
});
</script>

<template>
  <div class="flex items-start justify-between px-[15px] lg:px-[30px] w-full">
    <h4 class="font-semibold text-base lg:text-xl">{{ title }}</h4>
    <RouterLink :to="link" class="flex gap-2 items-center">
      <p class="font-medium text-base lg:text-lg">{{ linkText }}</p>
      <i :class="`pi pi-arrow-right ${iconColor} font-medium text-base lg:text-lg`"></i>
    </RouterLink>
  </div>
</template>
