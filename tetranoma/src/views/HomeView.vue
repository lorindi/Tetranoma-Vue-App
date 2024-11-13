<script setup>
import Hero from '@/components/homeSections/Hero.vue';
import Search from '../components/search/Search.vue'
import Categories from '@/components/homeSections/Categories.vue';
import CardFigure from '@/components/cards/CardFigure.vue';
import FiguresList from '@/components/FiguresList.vue';

</script>

<template>

    <Hero />
    <Categories />

    <FiguresList :limit="4" />


</template>
