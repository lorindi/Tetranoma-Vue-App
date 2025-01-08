<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { storeToRefs } from "pinia"
import { useToast } from "vue-toastification"
import { useCartStore } from "@/stores/useCartStore"

import ImageGallery from "./components/ImageGallery.vue"
import FigureInfo from "./components/FigureInfo.vue"
import FigureDescription from "./components/FigureDescription.vue"

// Stores setup
const route = useRoute()
const router = useRouter()
const toast = useToast()
const figuresStore = useFiguresStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { user } = storeToRefs(authStore)

// State
const figure = ref(null)
const currentUserId = computed(() => user.value?._id)
const isLoading = ref(true)
const currentImageIndex = ref(0)
const quantity = ref(1)

// Computed properties
const isFavorited = computed(() => figure.value?.favorites?.includes(currentUserId.value))
const totalImages = computed(() => figure.value?.images?.length || 0)
const hasMultipleImages = computed(() => totalImages.value > 1)
const isOwner = computed(() => currentUserId.value === figure.value?.userId)

// Composables
const useImageHandling = () => {
    
    const handleImageClick = (index) => {
        currentImageIndex.value = index
        scrollToThumbnail(index)
    }

    const scrollToThumbnail = (index) => {
        const container = document.querySelector(".thumbnails-container")
        const thumbnail = container?.children[index]
        if (thumbnail) {
            const scrollLeft = thumbnail.offsetLeft - container.clientWidth / 2 + thumbnail.clientWidth / 2
            container.scrollTo({ left: scrollLeft, behavior: "smooth" })
        }
    }

    const nextImage = () => {
        if (!hasMultipleImages.value) return
        currentImageIndex.value = (currentImageIndex.value + 1) % totalImages.value
        scrollToThumbnail(currentImageIndex.value)
    }

    const prevImage = () => {
        if (!hasMultipleImages.value) return
        currentImageIndex.value = currentImageIndex.value === 0 
            ? totalImages.value - 1 
            : currentImageIndex.value - 1
        scrollToThumbnail(currentImageIndex.value)
    }

    return { handleImageClick, nextImage, prevImage }
}

// Actions
const handleAddToCart = async () => {
    if (!currentUserId.value) {
        toast.warning("Please sign in to add to cart")
        router.push("/sign-in")
        return
    }

    try {
        await cartStore.addToCart(figure.value._id, quantity.value)
        console.log("Successfully added to cart")
    } catch (error) {
        console.error("Error adding to cart:", error)
        toast.error("Failed to add item to cart")
    }
}

const handleToggleFavorite = async () => {
    try {
        if (!currentUserId.value) {
            toast.warning("Please sign in to add to favorites")
            router.push("/sign-in")
            return
        }

        await figuresStore.toggleFavorite(figure.value._id)
        
        figure.value = {
            ...figure.value,
            favorites: isFavorited.value
                ? figure.value.favorites.filter(id => id !== currentUserId.value)
                : [...(figure.value.favorites || []), currentUserId.value]
        }
        
        toast.success("Favorite status updated successfully")
    } catch (error) {
        console.error("Error in toggleFavorite:", error)
        toast.error("Error updating favorites")
    }
}

const handleDeleteFigure = async () => {
    try {
        if (confirm("Are you sure you want to delete this figure?")) {
            await figuresStore.deleteFigure(figure.value._id)
            toast.success("Figure deleted successfully")
            router.push("/figures")
        }
    } catch (error) {
        console.error("Error deleting figure:", error)
        toast.error("Error deleting figure")
    }
}

// Initialize
const { handleImageClick, nextImage, prevImage } = useImageHandling()

onMounted(async () => {
    console.log("Fetching figure details")
    try {
        const response = await figuresStore.getFigureById(route.params.id)
        if (!response?.figure) {
            throw new Error("Figure data not found")
        }
        figure.value = response.figure
    } catch (error) {
        console.error("Error loading figure:", error)
        toast.error("Error loading figure details")
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="flex flex-col w-full max-w-[1336px] items-center justify-center my-[50px] px-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center min-h-[400px]">
        <div class="text-2xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
  
      <!-- Error State -->
      <div v-else-if="!figure" class="flex items-center justify-center min-h-[400px]">
        <div class="text-2xl text-red-500">Figure not found</div>
      </div>
  
      <!-- Figure Details -->
      <div v-else class="w-full overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <ImageGallery :images="figure.images" :current-image-index="currentImageIndex"
            :has-multiple-images="hasMultipleImages" :total-images="totalImages" :figure="figure" @prev-image="prevImage"
            @next-image="nextImage" @handle-image-click="handleImageClick" />
  
          <FigureInfo :figure="figure" :current-user-id="currentUserId" :is-favorited="isFavorited" :quantity="quantity"
            :cart-store="cartStore" @toggle-favorite="handleToggleFavorite" @delete-figure="handleDeleteFigure"
            @update-quantity="quantity = $event" @add-to-cart="handleAddToCart" />
        </div>
  
        <FigureDescription :description="figure.description" />
      </div>
    </div>
  </template>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>