<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
</script>

<template>
    <div class="w-full h-full flex flex-col items-center  bg-[#FAFAFA]">

        <Navbar />
        <RouterView class="w-full h-full flex justify-center max-w-[1336px]" />
        <Footer />
    </div>
</template>
