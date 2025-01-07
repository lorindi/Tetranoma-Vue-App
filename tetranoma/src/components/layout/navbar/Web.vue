<script setup>
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/logo.jpg'
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import { ref } from 'vue';
import CartSidebar from '@/components/CartSidebar.vue';

const cartSidebarRef = ref(null)
</script>

<template>
    <div class="flex items-center justify-between  max-w-[1336px] w-full h-full px-[30px]">
        <RouterLink to="/" class="">
            <img :src="logo" alt="" class="rounded-full p-[10px] w-[125px] " />
        </RouterLink>
        <div class="flex items-center gap-[35px] text-lg">
            <NavigationLinks />
            <CartSidebar ref="cartSidebarRef" />
        </div>
    </div>
</template>
