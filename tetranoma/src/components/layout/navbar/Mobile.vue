<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Search from '@/components/ui/Search.vue'
import logo from '@/assets/logo.jpg'
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import ToggleButton from './ToggleButton.vue';

const isOpen = ref(false)

watch(isOpen, (newValue) => {
    console.log("Mobile menu state changed:", newValue)
    if (newValue) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }
})


const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

onUnmounted(() => {
    document.body.style.overflow = "auto"
})
</script>

<template>
    <div class="flex w-full h-full items-center justify-between px-[10px] relative">
        <RouterLink to="/" class="z-30">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>

        <ToggleButton :isOpen="isOpen" @toggle="toggleMenu" />
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-15" @click="toggleMenu"></div>

        <nav v-motion :initial="{ opacity: 0, translateX: -20 }" :enter="{ opacity: 1, translateX: 0 }"
            :leave="{ opacity: 0, translateX: -20 }"
            :transition="{ enter: { duration: 0.5 }, leave: { duration: 1.0 } }" v-if="isOpen"
            class="fixed flex flex-col w-[100%] items-center justify-center pt-[100px] top-[0px] left-0 bg bg-[#fafafa] h-screen gap-[30px] py-[30px] z-20 rounded-br-lg rounded-bl-lg shadow-lg dark:bg-gray-900">

            <NavigationLinks :toggleMenu="toggleMenu" />
            <div class="mt-[30px]">
                <Search size="default" />
            </div>
        </nav>
    </div>

</template>