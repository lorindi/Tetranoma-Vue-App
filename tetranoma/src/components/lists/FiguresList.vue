<script setup>
import CardFigure from '../cards/CardFigure.vue';
import { computed, watch } from 'vue';
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/useAuthStore"
import { storeToRefs } from "pinia"
import { useFiguresStore } from "@/stores/useFiguresStore"

const toast = useToast();
const authStore = useAuthStore()
const figuresStore = useFiguresStore()
const { user } = storeToRefs(authStore)

const currentUserId = user.value?._id

const handleToggleFavorite = async (figureId) => {
  try {
    await figuresStore.toggleFavorite(figureId)
    toast.success("Favorites updated successfully")
  } catch (error) {
    console.error("Error toggling favorite:", error)
    if (error.message === "Please sign in to add to favorites") {
      toast.warning(error.message)
    } else if (error.message === "Server error occurred. Please try again later.") {
      toast.error(error.message)
    } else {
      toast.error("Error updating favorites. Please try again.")
    }
  }
}


watch(() => figuresStore.figures, (newFigures) => {
  console.log("Figures updated:", newFigures)
}, { deep: true })

const props = defineProps({
    limit: {
        type: Number,
    },
    figures: {
        type: Array,
        required: true,
        default: () => []
    },
    sortBy: {
        type: String,
        default: "createdAt"
    },
    sortOrder: {
        type: String,
        default: "desc"
    }
});

const limitedFigures = computed(() => {
    const maxLimit = props.limit ?? props.figures.length
    return props.figures.slice(0, maxLimit)
});
</script>

<template>
    <div class="grid grid-cols-2 w-[95%] justify-items-center my-[15px] max-w-[1336px]
                    xl:grid xl:grid-cols-4">
        <CardFigure 
        v-for="(figure, index) in limitedFigures" 
        :key="figure._id"
        :link="figure._id"
        :imgUrl="figure.images?.[0]"
        :title="figure.title"
        :description="figure.description"
        :price="figure.price"
        :type="'cardRating'" 
        :rating="figure.rating?.averageRating"
        :totalRatings="figure.rating?.totalRatings"
        :isFavorite="figure.favorites?.includes(currentUserId)"
        :favoritesCount="figure.favorites?.length || 0"
        @toggleFavorite="() => handleToggleFavorite(figure._id)"

            />
    </div>
</template>
