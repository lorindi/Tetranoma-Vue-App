<script setup>
import { useMotion } from "@vueuse/motion"
import { computed, ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  mobileTitle: {
    type: String,
    default: ""
  },
  isGradient: {
    type: Boolean,
    default: false
  },
  from: {
    type: String,
    default: "blue-600"
  },
  via: {
    type: String,
    default: "purple-600"
  },
  to: {
    type: String,
    default: "pink-600"
  },
  color: {
    type: String,
    default: "gray-900"
  }
})


const titleRef = ref(null)

const titleMotion = useMotion(titleRef, {
  initial: { opacity: 0, y: -50 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 800, type: "spring" } 
  }
})

const titleClasses = computed(() => {
  const baseClasses = "text-2xl xs:text-3xl sm:text-4xl font-black text-center tracking-tight md:mb-14"
  
  if (props.isGradient) {
    return `${baseClasses} bg-gradient-to-r from-${props.from} via-${props.via} to-${props.to} bg-clip-text text-transparent`
  }
  
  return `${baseClasses} text-${props.color} dark:text-white`
})
</script>

<template>
  <h1 
    ref="titleRef"
    :class="titleClasses"
  >
    <span class="md:block xs:hidden">{{ title }}</span>
    <span class="md:hidden block">{{ mobileTitle || title }}</span>
  </h1>
</template>