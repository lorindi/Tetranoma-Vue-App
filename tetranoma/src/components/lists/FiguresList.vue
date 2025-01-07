<script setup>
import CardFigure from "../cards/CardFigure.vue"
import { computed, watch } from "vue"
import { useToast } from "vue-toastification"
import { useAuthStore } from "@/stores/useAuthStore"
import { storeToRefs } from "pinia"
import { useFiguresStore } from "@/stores/useFiguresStore"

// Stores & Utils
const toast = useToast()
const authStore = useAuthStore()
const figuresStore = useFiguresStore()
const { user } = storeToRefs(authStore)

// Props
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
})

// Computed
const currentUserId = computed(() => user.value?._id)

const limitedFigures = computed(() => {
  const maxLimit = props.limit ?? props.figures.length
  return props.figures.slice(0, maxLimit)
})

// Methods
const updateFigureFavorites = (figure, shouldAdd) => {
  if (!figure.favorites) figure.favorites = []
  
  if (shouldAdd) {
    figure.favorites.push(currentUserId.value)
  } else {
    figure.favorites = figure.favorites.filter(id => id !== currentUserId.value)
  }
}

const handleToggleFavorite = async (figureId) => {
  try {
    const figureIndex = props.figures.findIndex(f => f._id === figureId)
    
    if (figureIndex !== -1) {
      const figure = props.figures[figureIndex]
      const isFavorited = figure.favorites?.includes(currentUserId.value)
      updateFigureFavorites(figure, !isFavorited)
    }

    await figuresStore.toggleFavorite(figureId)
    toast.success("Favorites updated successfully")
  } catch (error) {
    console.error("Error toggling favorite:", error)
    
    // Revert changes on error
    const figureIndex = props.figures.findIndex(f => f._id === figureId)
    if (figureIndex !== -1) {
      const figure = props.figures[figureIndex]
      const isFavorited = figure.favorites?.includes(currentUserId.value)
      updateFigureFavorites(figure, isFavorited)
    }

    if (error.message === "Please sign in to add to favorites") {
      toast.warning("Please sign in to add to favorites")
    } else {
      toast.error("Error updating favorites. Please try again.")
    }
  }
}

// Watchers
watch(() => figuresStore.figures, (newFigures) => {
  console.log("Figures store updated:", newFigures)
}, { deep: true })
</script>

<template>
  <div class="grid grid-cols-2 w-[95%] justify-items-center my-[15px] max-w-[1336px] xl:grid xl:grid-cols-4">
    <CardFigure 
      v-for="figure in limitedFigures" 
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