<script setup>

import { RouterLink } from 'vue-router';
import CategoriesList from '../CategoriesList.vue';
import HeaderWithLink from '../HeaderWithLink.vue';
</script>

<template>
    <div class="flex flex-col w-full max-w-[1336px] min-h-[350px] gap-14 my-[20px]">
        <HeaderWithLink title="Most popular categories" link="/figures" linkText="See all" />

        <div class="">
            <CategoriesList :limit="4" type="list" />
        </div>
    </div>
</template>
