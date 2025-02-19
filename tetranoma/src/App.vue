<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/layout/navbar/Navbar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import DarkMode from './components/ui/DarkMode.vue';
// import MouseGradient from './components/effects/MouseGradient.vue';
</script>

<template>
    <div class="w-full h-full flex flex-col items-center text-gray-900 bg-[#FAFAFA] dark:bg-gray-900 dark:text-white">
        <!-- <MouseGradient />    -->
        <DarkMode />
        <Navbar />
        <RouterView class="w-full h-full my-15 flex justify-start max-w-[1336px]
        " />
        <Footer />
    </div>
</template>
