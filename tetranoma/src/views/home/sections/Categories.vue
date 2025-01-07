<script setup>

import { RouterLink } from 'vue-router';
import CategoriesList from '@/components/lists/CategoriesList.vue';
import HeaderWithLink from '@/components/common/HeaderWithLink.vue';
</script>

<template>
    <div class="flex flex-col w-full max-w-[1336px] min-h-[350px] gap-14 my-[20px]">
        <HeaderWithLink title="Most popular categories" link="/search-figure" linkText="See all" />

        <div class="">
            <CategoriesList type="home" />
        </div>
    </div>
</template>
