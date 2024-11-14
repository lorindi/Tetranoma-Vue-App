<script setup>
import CardFigure from './cards/CardFigure.vue';
import { computed } from 'vue';

const figures = [
    {
        link: 'castle',
        imgUrl: 'https://tse4.mm.bing.net/th?id=OIP.oexULgujOphqI5kCyXdzZwHaE6&pid=Api',
        title: 'Castle',
        description: 'A medieval castle model.',
        rating: 4.6,
        type: 'cardRating',
    },
    {
        link: 'robot',
        imgUrl: 'https://tse3.mm.bing.net/th?id=OIP.sU-uj10S6p05niuTGnpkUgHaHv&pid=Api',
        title: 'Robot',
        description: 'A futuristic robot design.',
        rating: 4.9,
        type: 'cardRating',
    },
    {
        link: 'spaceship',
        imgUrl: 'https://tse1.mm.bing.net/th?id=OIP._4KtrQMlW2TKSlbDx7zSogHaE5&pid=Api',
        title: 'Spaceship',
        description: 'A sleek sci-fi spaceship.',
        rating: 5.0,
        type: 'cardRating',
    },
    {
        link: 'monster',
        imgUrl: 'https://tse4.mm.bing.net/th?id=OIP.BHGFWUFQo7AU-4U2D_hSMQHaLH&pid=Api',
        title: 'Monster',
        description: 'A scary monster figure.',
        rating: 4.3,
        type: 'cardRating',
    },
    {
        link: 'warrior',
        imgUrl: 'https://tse4.mm.bing.net/th?id=OIP.6OObaGNOtT-Yr8Dxo8hWjwHaLj&pid=Api',
        title: 'Warrior',
        description: 'A battle-hardened warrior.',
        rating: 4.7,
        type: 'cardRating',
    },
    {
        link: 'goblin',
        imgUrl: 'https://tse3.mm.bing.net/th?id=OIP.WPmFsyzEyOYAm3eOyMD_QAHaHa&pid=Api',
        title: 'Goblin',
        description: 'A mischievous goblin.',
        rating: 4.2,
        type: 'cardRating',
    },
];

const props = defineProps({
    limit: {
        type: Number,
    },
});

const limitedFigures = computed(() => {
    const maxLimit = props.limit ?? figures.length;
    return figures.slice(0, maxLimit);
});
</script>

<template>
        <div class="grid grid-cols-2 w-[95%] justify-items-center my-[15px] max-w-[1336px]
                    xl:grid xl:grid-cols-4">
            <CardFigure v-for="(figure, index) in limitedFigures" :key="index" :link="figure.link"
                :imgUrl="figure.imgUrl" :title="figure.title" :description="figure.description" :rating="figure.rating"
                :type="figure.type" />
        </div>
</template>
