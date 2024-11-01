<script setup>
import Mobile from './Mobile.vue'
import Tablet from './Tablet.vue'
import Web from './Web.vue'
</script>

<template>
    <div class="hidden w-full h-full sm:flex-col sm:flex">
        <Mobile />
    </div>
    <div class="hidden w-full h-full md:flex">
        <Tablet />
    </div>
    <div class="hidden w-full h-full items-center justify-center lg:flex xl:flex 2xl:flex">
        <Web />
    </div>
</template>
