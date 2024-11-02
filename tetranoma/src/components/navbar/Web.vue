<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/logo.jpg'

const isActiveLink = (routePath) => {
    const route = useRoute()
    return route.path === routePath
}
</script>

<template>
    <div class="flex items-center justify-between  max-w-[1336px] w-full h-full px-[30px]">
        <RouterLink to="/" class="">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>
        <div class="flex gap-[50px] text-lg">
            <RouterLink to="/about"
                :class="[isActiveLink('/about') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide']">About
            </RouterLink>
            <RouterLink to="/contact"
                :class="[isActiveLink('/contact') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide']">
                Contact
            </RouterLink>
            <RouterLink to="/list"
                :class="[isActiveLink('/list') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide']">List
            </RouterLink>
            <RouterLink to="/add"
                :class="[isActiveLink('/add') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide']">Add
            </RouterLink>
        </div>
    </div>
</template>
