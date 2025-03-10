<script setup>
import Paragraph from '@/components/ui/Paragraph.vue';

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
    <Paragraph color="transparent" size="small" align="left">{{ description }}</Paragraph>

  </div>
</template>