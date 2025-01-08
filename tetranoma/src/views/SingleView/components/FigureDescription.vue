<script setup>
defineProps({
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="p-6 border-t border-gray-200 dark:border-gray-700">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Description</h2>
    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>