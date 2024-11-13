<script setup>
import Hero from '@/components/homeSections/Hero.vue';
import Search from '../components/search/Search.vue'
import Categories from '@/components/homeSections/Categories.vue';
import CardFigure from '@/components/cards/CardFigure.vue';

</script>

<template>

    <Hero />
    <Categories />

    <CardFigure 
        link="/example-link"
        imgUrl="https://images.unsplash.com/photo-1601255596436-3d600117f19e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Example Card Loren" 
        description="This is a description jkdgndkg." 
        rating="4.5" 
        type="cardRating" 
    />

</template>
