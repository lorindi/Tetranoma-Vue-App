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
    <RouterLink :to="`/figures/${link}`" class="flex flex-col bg-white shadow-md rounded-lg overflow-hidden h-[200px] w-[150px] my-[10px]
    sm:w-[250px] sm:h-[300px] 
    md:w-[300px] md:h-[350px] 
    lg:w-[300px] lg:h-[360px] lg:my-[15px]
    ">
      <img :src="imgUrl" alt="Card image" class="w-full h-[50%] sm: md: lg: object-cover opacity-90" />
      <div class="flex flex-col justify-evenly h-[50%] py-1 px-2 md:px-3 lg:px-5">
        <h2 class="text-sm sm:text-xl md:text-2xl font-semibold mb-[3px]">{{ title.length > 17 ? title.slice(0, 17) + '...' : title }}</h2>
        <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-[3px]">{{ description.length > 28 ? description.slice(0, 28) + '...' : description }}</p>
        <div v-if="isRatingVisible" class="flex items-center">
          <span class="text-yellow-500 mr-1 text-sm sm:text-base md:text-lg">★</span>
          <span class="text-gray-700 text-sm sm:text-base md:text-lg">{{ rating }}</span>
        </div>
      </div>
    </RouterLink>
</template>
