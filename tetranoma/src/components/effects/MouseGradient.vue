<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
import { useDark } from "@vueuse/core"

const mouseX = ref(0)
const mouseY = ref(0)

const isDark = useDark()
console.log("Dark mode status:", isDark.value)

const gradientColors = computed(() => {
  console.log("Updating gradient colors based on theme")
  return isDark.value
    ? {
        // Dark colors with higher transparency for dark theme
        color1: "rgba(70, 180, 140, 0.15)",  // dark mint
        color2: "rgba(76, 137, 175, 0.15)",  // dark blue
        color3: "rgba(150, 100, 175, 0.15)", // dark purple
      }
    : {
        // Light colors with same transparency for light theme
        color1: "rgba(150, 255, 220, 0.25)", // light mint
        color2: "rgba(156, 217, 255, 0.25)", // light blue
        color3: "rgba(230, 180, 255, 0.25)", // light purple
      }
})

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
  <div 
    class="pointer-events-none fixed inset-0 z-1 transition-opacity"
    :style="{
      background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, 
      ${gradientColors.color3}, 
      ${gradientColors.color2}, 
      ${gradientColors.color1}, 
        transparent 150%)`
    }"
  />
</template>