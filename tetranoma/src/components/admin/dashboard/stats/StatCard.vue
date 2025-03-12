<script setup>
import Paragraph from '@/components/ui/Paragraph.vue';
import Title from '@/components/ui/Title.vue';

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
  <article class="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-lg">
    <header class="flex items-center justify-between">
      <div>
        <Paragraph color="transparent" align="left" size="small">{{ title }}</Paragraph>
        <Title type="minortitle" align="left" color="gray">{{ value }}</Title>
      </div>
      <figure class="flex items-center justify-center">
        <i :class="['pi', icon, 'text-[#00BD7E] !text-xl lg:!text-2xl']" aria-hidden="true"></i>
      </figure>
    </header>
  </article>
</template>