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
        <RouterLink to="/" class="z-10">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>

        <ToggleButton :isOpen="isOpen" @toggle="toggleMenu" />
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-[4]" @click="toggleMenu"></div>

        <nav v-motion :initial="{ opacity: 0, translateX: -20 }" :enter="{ opacity: 1, translateX: 0 }"
            :leave="{ opacity: 0, translateX: -20 }"
            :transition="{ enter: { duration: 0.5 }, leave: { duration: 1.0 } }" v-if="isOpen"
            class="absolute flex flex-col w-[100%] items-center justify-center top-[0px] left-0 bg bg-[#fafafa] h-screen gap-[50px] py-[30px] z-[5] rounded-br-lg rounded-bl-lg shadow-lg shadow-gray-400">

            <Search size="default" />
          

            <NavigationLinks :toggleMenu="toggleMenu" />
        </nav>
    </div>

</template>