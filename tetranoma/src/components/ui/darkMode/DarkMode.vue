<script setup>

import { useDark } from "@vueuse/core"
import { ref, watch } from "vue"

const isDark = useDark()
const toggleRef = ref(null)

watch(isDark, (newValue) => {
  console.log("Dark mode changed:", newValue)
  console.log("Icons should be visible now")
})

</script>

<template>
  <div class="fixed bottom-[30px] right-[30px] z-50">
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        ref="toggleRef"
        type="checkbox"
        v-model="isDark"
        class="sr-only peer"
      />
      <div
        class="relative w-16 h-9 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
               peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
               peer dark:bg-gray-700 peer-checked:after:translate-x-full 
               peer-checked:after:border-white after:content-[''] 
               after:absolute after:top-[4px] after:left-[4px] after:bg-white 
               after:border-gray-300 after:border after:rounded-full after:h-7 
               after:w-7 after:transition-all dark:border-gray-600 
               peer-checked:bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-5 h-5 left-[6px] top-[7px] z-10 transition-opacity duration-200 ease-in-out"
          :class="{ 'opacity-100': !isDark, 'opacity-0': isDark }"
          viewBox="0 0 24 24"
          stroke="#00BD7E"
        >
          <circle cx="12" cy="12" r="3" stroke="#00BD7E" fill="#00BD7E" stroke-width="2"/>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M17 7l1.4-1.4M5.6 18.4l1.4-1.4"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-5 h-5 right-[6px] top-[7px] z-10 transition-opacity duration-200 ease-in-out"
          :class="{ 'opacity-0': !isDark, 'opacity-100': isDark }"
          viewBox="0 0 24 24"
          stroke="#00BD7E"
          fill="#00BD7E"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </label>
  </div>
</template>

