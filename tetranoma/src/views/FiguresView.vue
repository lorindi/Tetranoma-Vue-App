<script setup>
import CategoriesList from '@/components/lists/CategoriesList.vue';
import FiguresList from '@/components/FiguresList.vue';
import Search from '@/components/search/Search.vue';



</script>
<template>
    <div class="flex flex-col w-full max-w-[1336px] items-center justify-center my-[50px]">
        <Search size="default" />
        <FiguresList />
    </div>
</template>