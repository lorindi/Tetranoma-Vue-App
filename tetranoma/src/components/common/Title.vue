<script setup>
import { useMotion } from "@vueuse/motion"
import { computed, ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true
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

</script>

<template>
  <h1 ref="titleRef" class="font-semibold text-2xl sm:text-3xl md:text-4xl text-[#00BD7E] mb-1 md:mb-8 text-center">{{ title }}
  </h1>
</template>