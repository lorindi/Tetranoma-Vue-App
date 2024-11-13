<script setup>

import { RouterLink } from 'vue-router';
import CategoriesList from '../CategoriesList.vue';
</script>

<template>
    <div class="flex flex-col w-full max-w-[1336px] min-h-[350px] gap-14 my-[20px]">
        <div class="flex items-start justify-between px-[15px] lg:px-[30px]">
            <h4 class=" font-semibold text-base lg:text-xl ">Most popular categories</h4>
            <RouterLink to="/search-figure" class="flex gap-2 items-center">
                <p class="font-medium text-base lg:text-lg">See all</p> <i class="pi pi-arrow-right text-[#8F3DBF] font-medium text-base lg:text-lg" />
            </RouterLink>
        </div>
        <div class="">
            <CategoriesList :limit="3" type="list" />
        </div>
    </div>
</template>
