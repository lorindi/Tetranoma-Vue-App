<script setup>
import CategoriesList from '@/components/lists/CategoriesList.vue';



</script>
<template>
    <div class="flex min-h-[calc(100vh-100px)] items-center justify-center w-full max-w-[1336px]">
        <CategoriesList type="list" :limit="11" />
    </div>
</template>