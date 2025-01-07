<script setup>
import Hero from '@/views/home/sections/Hero.vue';
import Categories from '@/views/home/sections/Categories.vue';
import MostPreferredFigures from '@/views/home/sections/MostPreferredFigures.vue';
// import Guide from '@/components/Guide.vue';
import FigureJoySection from '@/views/home/sections/FigureJoySection.vue';

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <Hero />
        <Categories />
        <FigureJoySection/>
        <MostPreferredFigures />
    </div>
</template>
