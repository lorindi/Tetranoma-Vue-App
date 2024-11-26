<script setup>
import { useDark } from "@vueuse/core"
import { ref, watch } from "vue"

const isDark = useDark()
const toggleRef = ref(null)

watch(isDark, (newValue) => {
  console.log("Dark mode changed:", newValue)
})
</script>

<template>
  <div class="fixed top-4 right-4">
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        ref="toggleRef"
        type="checkbox"
        v-model="isDark"
        class="sr-only peer"
      />
      <div
        class="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
               peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
               peer dark:bg-gray-700 peer-checked:after:translate-x-full 
               peer-checked:after:border-white after:content-['☀️'] dark:after:content-['🌙'] 
               after:absolute after:top-[2px] after:left-[4px] after:bg-white 
               after:border-gray-300 after:border after:rounded-full after:h-7 
               after:w-7 after:transition-all dark:border-gray-600 
               peer-checked:bg-blue-600 after:flex after:items-center 
               after:justify-center after:text-lg"
      ></div>
    </label>
  </div>
</template>

