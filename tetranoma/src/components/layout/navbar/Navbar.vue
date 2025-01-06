<script setup>
import Mobile from './Mobile.vue'
import Tablet from './Tablet.vue'
import Web from './Web.vue'
</script>

<template>
    <div class="hidden w-full h-full sm:flex-col xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Mobile />
    </div>
    <div class="hidden w-full h-full md:flex sm:hidden lg:hidden xl:hidden 2xl:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Tablet />
    </div>
    <div class="hidden w-full h-full items-center justify-center lg:flex xl:flex 2xl:flex md:hidden sm:hidden bg-[#FAFAFA] dark:bg-gray-900 z-50">
        <Web />
    </div>
</template>
