<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Search from '../search/Search.vue'
import logo from '@/assets/logo.jpg'
import NavigationLinks from '../NavigationLinks.vue'
import ToggleButton from './ToggleButton.vue';

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="flex w-full h-full items-center justify-between px-[10px] relative">
        <RouterLink to="/" class="">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>

        <ToggleButton :isOpen="isOpen" @toggle="toggleMenu" />

        <nav v-motion :initial="{ opacity: 0, translateX: -20 }" :enter="{ opacity: 1, translateX: 0 }"
            :leave="{ opacity: 0, translateX: -20 }"
            :transition="{ enter: { duration: 0.5 }, leave: { duration: 1.0 } }" v-if="isOpen"
            class="absolute flex flex-col w-[100%] items-center justify-center top-[125px] left-0 bg bg-[#fafafa] h-auto gap-[50px] py-[30px] z-[5] rounded-br-lg rounded-bl-lg shadow-lg shadow-gray-400">

            <Search size="default" />
          

            <NavigationLinks />
        </nav>
    </div>

</template>