<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-500 dark:text-gray-400">{{ title }}</p>
        <h3 class="text-base lg:text-2xl font-bold">{{ value }}</h3>
      </div>
      <i :class="['pi', icon, 'text-[#00BD7E] !text-xl lg:!text-2xl']"></i>
    </div>
  </div>
</template>