<script setup>
import FiguresList from '../FiguresList.vue';
import HeaderWithLink from '../HeaderWithLink.vue';

</script>
<template>
    <div class="w-full max-w-[1336px]">
        <HeaderWithLink title="Top Rated" link="/figures" linkText="Explore" />
        <FiguresList :limit="4" />
    </div>

</template>