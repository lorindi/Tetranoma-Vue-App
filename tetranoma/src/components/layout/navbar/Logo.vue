<script setup>
import { RouterLink } from "vue-router"

</script>

<template>
    <RouterLink to="/" class="z-30">
        <div class="flex flex-col items-center justify-center w-[125px] h-[125px]">
            <svg 
                viewBox="0 0 24 24" 
                class="w-[90%] h-[90%] mb-[-22.5px]"
            >
                <path 
                    d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" 
                    fill="#117277"
                />
                <path 
                    d="M12 8l-4.5 8h9L12 8z" 
                    fill="#1a4548"
                />
            </svg>
            <p class="text-[16px] font-bold text-gray-500 dark:text-[#117277]">TETRANOMA</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.router-link-active svg path:first-child {
    fill: #1a4548;
}

.router-link-active svg path:last-child {
    fill: #117277;
}
</style>