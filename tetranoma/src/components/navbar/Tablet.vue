<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Search from '../search/Search.vue'
import logo from '@/assets/logo.jpg'

const isActiveLink = (routePath) => {
    const route = useRoute()
    return route.path === routePath
}

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="flex w-full h-full items-center justify-between px-[30px] relative">
        <RouterLink to="/" class="">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>

        <button @click="toggleMenu" class="flex flex-col gap-[4.5px] cursor-pointer z-20">
            <div
                :class="['w-6 h-1 bg-[#42BB8B] rounded-sm origin-left ease-in-out duration-500', isOpen ? 'rotate-45' : '']">
            </div>

            <div :class="['w-6 h-1 bg-[#42BB8B] rounded-sm ease-in-out duration-500', isOpen ? 'opacity-0' : '']">
            </div>

            <div
                :class="['w-6 h-1 bg-[#42BB8B] rounded-sm origin-left ease-in-out duration-500', isOpen ? '-rotate-45' : '']">
            </div>
        </button>
        <nav v-if="isOpen"
            class="absolute flex flex-col w-[100%] items-center justify-center top-[125px] left-0 bg bg-[#fafafa] h-[250px] gap-[50px] py-[30px] z-[5] rounded-br-lg rounded-bl-lg shadow-lg shadow-gray-400">
            <!-- <div class="absolute bg-cover bg-center bg-custom-image h-full w-full z-[-5] opacity-30 shadow-inner shadow-[#FAFAFA] rounded-br-lg rounded-bl-lg"></div> -->
            <div class="flex gap-10">
                <RouterLink to="/about"
                    :class="[isActiveLink('/about') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">About
                </RouterLink>
                <RouterLink to="/contact"
                    :class="[isActiveLink('/contact') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">
                    Contact
                </RouterLink>
                <RouterLink to="/list"
                    :class="[isActiveLink('/list') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">List
                </RouterLink>
                <RouterLink to="/add"
                    :class="[isActiveLink('/add') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">Add
                </RouterLink>
            </div>
            <Search/>
        </nav>
    </div>

</template>
