<script setup>
import { RouterLink } from 'vue-router';
import { computed, watch } from 'vue';
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Paragraph from '../ui/Paragraph.vue';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const currentUserId = computed(() => user.value?._id);


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
  totalRatings: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'card',
    validator: (value) => ['card', 'cardRating'].includes(value),
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  favoritesCount: {
    type: Number,
    default: 0
  }, showFavoriteButton: {
    type: Boolean,
    default: true
  }
});

const favoriteStatus = computed(() => props.isFavorite)

watch(favoriteStatus, (newValue) => {
  console.log("Favorite status changed:", newValue)
})

const emit = defineEmits(["toggleFavorite"])

const handleFavoriteClick = (e) => {
  e.preventDefault()
  if (!currentUserId.value) {
    toast.warning("Please sign in to add to favorites")
    router.push("/sign-in")
    return
  }
  emit("toggleFavorite")
}
const isRatingVisible = computed(() => props.type === 'cardRating');
</script>

<template>
  <RouterLink :to="`/figures/${link}`" class="relative flex flex-col bg-white shadow-md rounded-lg overflow-hidden h-[200px] w-[140px] my-[10px] dark:bg-gray-800 dark:shadow-black-500 z-5
    sm:w-[250px] sm:h-[300px] 
    md:w-[300px] md:h-[350px] 
    lg:w-[300px] lg:h-[360px] lg:my-[15px]
    ">
    <!-- Favorite Button -->
    <button v-if="showFavoriteButton" @click="handleFavoriteClick"
      class="absolute z-10 top-2 right-2 px-2 pt-2 pb-1 rounded-full bg-white/80 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
      <i :class="[
        'pi',
        isFavorite ? 'pi-heart-fill text-[#00BD7E]' : 'pi-heart text-gray-600 dark:text-gray-400',
        'text-xl'
      ]"></i>
    </button>


    <img :src="imgUrl" alt="Card image"
      class="w-full z-0 h-[50%] sm: md: lg: object-cover opacity-90 dark:h-[60%] dark:rounded-lg dark:opacity-80 dark:hover:opacity-100" />
    <div
      class="flex flex-col justify-evenly h-[50%] py-1 px-2 md:px-3 lg:px-5 dark:py-2 dark:lg:px-3 dark:justify-center dark:h-[40%]">
      <h2 class="text-sm sm:text-xl md:text-2xl font-semibold mb-[3px] dark:mb-[2px]">{{ title.length > 17 ?
        title.slice(0, 17) + '.' : title }}</h2>

      <Paragraph color="transparent" size="small" align="left" customClass="text-xs sm:text-sm md:text-lg leading-none ">{{
        description.length > 28 ? description.slice(0, 28) + '.' : description }}</Paragraph>
      <!-- <p class="text-xs sm:text-sm md:text-lg text-gray-700 mb-[3px] dark:mb-[2px] dark:text-gray-400 leading-none">{{
        description.length > 28 ? description.slice(0, 28) + '.' : description }}</p> -->
      <div v-if="isRatingVisible" class="flex items-center">
        <span class="text-[#00BD7E] mr-1 text-sm sm:text-base md:text-lg ">★</span>
        <span class="text-gray-700 text-sm sm:text-base md:text-lg dark:text-white">{{ rating }} </span>
      </div>
    </div>
  </RouterLink>
</template>
