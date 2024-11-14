<script setup>
import FiguresList from '../lists/FiguresList.vue';
import HeaderWithLink from '../HeaderWithLink.vue';

</script>
<template>
    <div class="flex flex-col w-full max-w-[1336px] lg:my-[70px] items-center">
        <HeaderWithLink title="Top Rated" link="/figures" linkText="Explore" />
        <FiguresList :limit="4" />
    </div>

</template>