<script setup>
import Mobile from './Mobile.vue'
import Tablet from './Tablet.vue'
import Web from './Web.vue'

import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()

const excludedPaths = [
    "/admin"
]

const showNavbar = computed(() => {
    const isExcluded = excludedPaths.some(path => route.path.startsWith(path))
    return !isExcluded
})
</script>

<template>
    <div v-if="showNavbar"
        class="hidden w-full h-full sm:flex-col xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Mobile />
    </div>
    <div v-if="showNavbar"
        class="hidden w-full h-full md:flex sm:hidden lg:hidden xl:hidden 2xl:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Tablet />
    </div>
    <div v-if="showNavbar"
        class="hidden w-full h-full items-center justify-center lg:flex xl:flex 2xl:flex md:hidden sm:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Web />
    </div>
</template>
