<script setup>
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import Logo from './Logo.vue';
import NaviIcons from './NaviIcons.vue';

</script>

<template>
    <div class="flex items-center justify-between  max-w-[1336px] w-full h-full px-[30px]">
        <Logo />
        <div class="flex items-center gap-[35px] text-lg">
            <NavigationLinks />
        </div>

        <NaviIcons />
    </div>
</template>