<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
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
    validator: (value) => ['card', 'cardRating'].includes(value),
  },
});

const isRatingVisible = computed(() => props.type === 'cardRating' && props.rating !== null);
</script>

<template>
<div class="bg-white shadow-md rounded-lg overflow-hidden w-[100%] sm:w-[250px] md:w-[300px] lg:w-[350px] h-auto">
    <RouterLink :to="`/figures/${link}`" class="flex flex-col h-full w-full">
      <img :src="imgUrl" alt="Card image" class="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] object-cover opacity-90" />
      <div class="p-4">
        <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{{ title.length > 17 ? title.slice(0, 17) + '...' : title }}</h2>
        <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-2">{{ description.length > 28 ? description.slice(0, 28) + '...' : description }}</p>
        <div v-if="isRatingVisible" class="flex items-center">
          <span class="text-yellow-500 mr-1 text-sm sm:text-base md:text-lg">★</span>
          <span class="text-gray-700 text-sm sm:text-base md:text-lg">{{ rating }}</span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
