<script setup>
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

console.log("Initializing ChartCard component")
</script>

<template>
  <div :class="['bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg', colspan]">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div class="h-[300px]">
      <component :is="chartComponent" :data="data" :options="options" />
    </div>
  </div>
</template>