<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo.jpg'
</script>

<template>
    <div class="flex items-center justify-between  max-w-[1336px] w-full h-full">
        <RouterLink to="/" class="">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>
        <div class="flex gap-[50px] lg:text-lg xl:text-lg 2xl:text-xl">
            <RouterLink to="/about" class="tracking-wide">About
            </RouterLink>
            <RouterLink to="/contact" class="tracking-wide">Contact
            </RouterLink>
            <RouterLink to="/list" class="tracking-wide">List
            </RouterLink>
            <RouterLink to="/add" class="tracking-wide">Add
            </RouterLink>
        </div>
    </div>
</template>
