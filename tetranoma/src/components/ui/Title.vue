<script setup>
import { useMotion } from "@vueuse/motion"
import { computed, ref } from "vue"

const props = defineProps({

  type: {
    type: String,
    default: "title",
    validator: (value) => ["title", "subtitle", "subsubtitle", "minortitle"].includes(value)
  },
  align: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "left-center", "right"].includes(value)
  },
  color: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "dark", "gray"].includes(value)
  }

})
const alignClasses = {
  left: "text-left",
  center: "text-center",
  "left-center": "text-center lg:text-left",
  right: "text-right"
};

const colorClasses = {
  primary: "text-[#00BD7E]",
  dark: "text-gray-800 dark:text-gray-200",
  gray: "text-gray-600 dark:text-gray-400"
};
const titleRef = ref(null)

const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 2000, type: "spring" }
  }
})

</script>

<template>
  <h1 v-if="type === 'title'" ref="titleRef" :class="[
    'font-semibold text-2xl sm:text-3xl md:text-3xl',
    alignClasses[align],
    colorClasses[color]
  ]">
    <slot></slot>
  </h1>
  <h2 v-else-if="type === 'subtitle'" ref="titleRef" :class="[
    'font-semibold text-xl sm:text-2xl md:text-2xl',
    alignClasses[align],
    colorClasses[color]
  ]">
    <slot></slot>
  </h2>
  <h4 v-else-if="type === 'subsubtitle'" ref="titleRef" :class="[
    'font-semibold text-lg sm:text-xl md:text-xl',
    alignClasses[align],
    colorClasses[color]
  ]">
    <slot></slot>
  </h4>
  <h5 v-else-if="type === 'minortitle'" ref="titleRef" :class="[
    'font-semibold text-base sm:text-lg md:text-lg',
    alignClasses[align],
    colorClasses[color]
  ]">
    <slot></slot>
  </h5>
</template>