<script setup>
import { onUnmounted, ref, watch } from 'vue'
import Search from '@/components/ui/Search.vue'
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import ToggleButton from './ToggleButton.vue';
import NaviIcons from './NaviIcons.vue'
import Logo from './Logo.vue';


const isOpen = ref(false)

watch(isOpen, (newValue) => {
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
    <div class="flex w-full h-full items-center justify-between px-[10px] relative z-15">
        <Logo />

        <NaviIcons />

        <div class="flex items-center gap-4 z-20">
            <ToggleButton :isOpen="isOpen" @toggle="toggleMenu" />
        </div>

        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-15" @click="toggleMenu"></div>

        <nav v-motion :initial="{ opacity: 0, translateY: -20 }" :enter="{ opacity: 1, translateY: 0 }"
            :leave="{ opacity: 0, translateY: -20 }" :transition="{
                enter: { duration: 0.5 },
                leave: { duration: 1.0 }
            }" v-if="isOpen"
            class="absolute flex flex-col w-[100%] pt-[100px] items-center justify-center top-[0px] left-0 bg bg-[#fafafa] h-[550px] gap-[50px] py-[30px] z-[5] rounded-br-lg rounded-bl-lg shadow-lg dark:bg-gray-900">
            <div class="flex gap-10">
                <NavigationLinks :toggleMenu="toggleMenu" />
            </div>
            <Search size="default" />

        </nav>
    </div>

</template>
