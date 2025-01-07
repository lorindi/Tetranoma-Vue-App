<script setup>
import { RouterLink } from "vue-router"

</script>

<template>
    <RouterLink to="/" class="z-30">
        <div class="flex items-center justify-center w-[125px] h-[125px] p-[10px]">
            <svg 
                viewBox="0 0 24 24" 
                class="w-full h-full"
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