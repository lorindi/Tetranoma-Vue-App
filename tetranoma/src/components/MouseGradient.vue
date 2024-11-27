<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (event) => {
  console.log("Mouse moved:", event.clientX, event.clientY)
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  console.log("MouseGradient component mounted")
  window.addEventListener("mousemove", handleMouseMove)
})

onUnmounted(() => {
  console.log("MouseGradient component unmounted")
  window.removeEventListener("mousemove", handleMouseMove)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-3 transition-opacity dark:bg-black" :style="{
    background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, 
    rgba(230, 180, 255, 0.25), 
    rgba(156, 217, 255, 0.25), 
    rgba(150, 255, 220, 0.25), 
    
        transparent 150%)`
  }" />
</template>