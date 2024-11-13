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
  <div class="bg-white shadow-md rounded-lg overflow-hidden w-[250px] h-[300px]">
    <RouterLink :to="`/figures/${link}`" class="flex flex-col h-full w-full">
      <img :src="imgUrl" alt="Card image" class="flex-1 h-[60%] object-cover opacity-90" />
      <div class="p-4 flex-1 h-[40%]">
        <h2 class="text-xl font-semibold mb-2">{{ title.length > 17 ? title.slice(0, 17) + '' : title }}</h2>
        <p class="text-gray-700 mb-2">{{ description.length > 28 ? description.slice(0, 28) + '' : description }}</p>
        <div v-if="isRatingVisible" class="flex items-center">
          <span class="text-yellow-500 mr-1">★</span>
          <span class="text-gray-700">{{ rating }}</span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
