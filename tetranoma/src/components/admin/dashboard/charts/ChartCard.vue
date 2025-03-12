<script setup>
import Title from '@/components/ui/Title.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  chartComponent: {
    type: Object,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  colspan: {
    type: String,
    default: "col-span-1"
  }
})

</script>

<template>
  <section :class="['bg-white dark:bg-gray-800 p-2 md:p-6 rounded-xl shadow-lg', colspan]">
    <header>
      <Title type="minortitle" align="left" color="gray">{{ title }}</Title>
    </header>
    <figure class="h-[300px]">
      <component :is="chartComponent" :data="data" :options="options" />
    </figure>
  </section>
</template>