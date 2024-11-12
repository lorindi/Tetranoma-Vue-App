<script>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';

export default {
    props: {
        link: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: null,
        },
        type: {
            type: String,
            default: 'card',
            validator: (value) => {
                return ['card', 'cardRating'].includes(value);
            },
        },
    },
    computed: {
        isRatingVisible() {
            return this.type === 'cardRating' && this.rating !== null;
        },
    },
};
</script>

<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <RouterLink :to="link" class="block">
            <img :src="imgUrl" alt="Card image" class="w-full h-48 object-cover" />
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
                <p class="text-gray-700 mb-2">{{ description }}</p>
                <div v-if="isRatingVisible" class="flex items-center">
                    <span class="text-yellow-500 mr-1">★</span>
                    <span class="text-gray-700">{{ rating }}</span>
                </div>
            </div>
        </RouterLink>
    </div>


    <!-- <Card
      v-for="(item, index) in cardsData"
      :key="index"
      :link="item.link"
      :imgUrl="item.imgUrl"
      :title="item.title"
      :description="item.description"
      :rating="item.rating"
      :type="item.type"
    /> -->
</template>