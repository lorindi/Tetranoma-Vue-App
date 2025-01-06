<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { storeToRefs } from "pinia"
import { useToast } from "vue-toastification"

const route = useRoute()
const router = useRouter()
const toast = useToast()
const figuresStore = useFiguresStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const figure = ref(null)
const currentUserId = user.value?._id
const isLoading = ref(true)
const currentImageIndex = ref(0)


const handleImageClick = (index) => {
    console.log("Switching to image:", index)
    currentImageIndex.value = index
    scrollToThumbnail(index)
}

const scrollToThumbnail = (index) => {

    const container = document.querySelector(".thumbnails-container")
    const thumbnail = container.children[index]
    if (thumbnail) {
        const scrollLeft = thumbnail.offsetLeft - container.clientWidth / 2 + thumbnail.clientWidth / 2
        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth"
        })
    }
}


const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % figure.value.images.length
    scrollToThumbnail(currentImageIndex.value)
}

const prevImage = () => {
    console.log("Previous image")
    currentImageIndex.value = currentImageIndex.value === 0 
        ? figure.value.images.length - 1 
        : currentImageIndex.value - 1
    scrollToThumbnail(currentImageIndex.value)
}

const handleToggleFavorite = async () => {
    try {
        if (!currentUserId) {
            toast.warning("Please sign in to add to favorites")
            router.push("/sign-in")
            return
        }
        await figuresStore.toggleFavorite(figure.value._id)
        figure.value = {
            ...figure.value,
            favorites: figure.value.favorites?.includes(currentUserId)
                ? figure.value.favorites.filter(id => id !== currentUserId)
                : [...(figure.value.favorites || []), currentUserId]
        }
        toast.success("Successfully updated favorites")
    } catch (error) {
        console.error("Error toggling favorite:", error)
        toast.error("Error updating favorites")
    }
}

onMounted(async () => {
    try {
        const response = await figuresStore.getFigureById(route.params.id)
        figure.value = response.figure
    } catch (error) {
        console.error("Error fetching figure details:", error)
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
            <!-- Image Gallery and Main Info -->
            <div class="flex flex-col md:flex-row">
                <!-- Image Gallery -->
                <div class="w-full md:w-1/2 p-4">
                    <!-- Main Image Container -->
                    <div class="relative w-full h-[400px] mb-5">
                        <img 
                            :src="figure.images[currentImageIndex]" 
                            :alt="`${figure.title} - Image ${currentImageIndex + 1}`"
                            class="w-full h-full object-cover rounded-lg shadow-md" 
                        />
                        
                        <!-- Navigation Arrows -->
                        <button 
                            v-if="figure.images.length > 1"
                            @click="prevImage" 
                            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200">
                            <i class="pi pi-chevron-left"></i>
                        </button>
                        <button 
                            v-if="figure.images.length > 1"
                            @click="nextImage" 
                            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200">
                            <i class="pi pi-chevron-right"></i>
                        </button>
                    </div>

                    <!-- Thumbnails Grid -->
                    <div 
                        v-if="figure.images.length > 1"
                        :class="[
                            'w-full',
                            {
                                'grid grid-cols-2 gap-2': figure.images.length === 2,
                                'overflow-x-auto touch-pan-x': figure.images.length > 2
                            }
                        ]"
                    >
                        <!-- Two Images Layout -->
                        <template v-if="figure.images.length === 2">
                            <img 
                                v-for="(image, index) in figure.images" 
                                :key="index"
                                :src="image"
                                :alt="`${figure.title} - Thumbnail ${index + 1}`"
                                @click="handleImageClick(index)"
                                :class="[
                                    'w-full h-[80px] object-cover rounded-lg cursor-pointer transition-all duration-200',
                                    currentImageIndex === index 
                                        ? 'ring-2 ring-[#00BD7E] opacity-100' 
                                        : 'opacity-70 hover:opacity-100'
                                ]"
                            />
                        </template>

                        <!-- Three or More Images Layout with Touch Scroll -->
                        <div 
                            v-else
                            class="flex gap-2 h-[100px] overflow-x-auto touch-pan-x scrollbar-hide thumbnails-container"
                        >
                            <img 
                                v-for="(image, index) in figure.images" 
                                :key="index"
                                :src="image"
                                :alt="`${figure.title} - Thumbnail ${index + 1}`"
                                @click="handleImageClick(index)"
                                :class="[
                                    'flex-none w-[80px] h-[80px] object-cover rounded-lg cursor-pointer transition-all duration-200',
                                    currentImageIndex === index 
                                        ? 'ring-2 ring-[#00BD7E] opacity-100' 
                                        : 'opacity-70 hover:opacity-100'
                                ]"
                            />
                        </div>
                    </div>
                </div>

                <!-- Main Info -->
                <div class="w-full md:w-1/2 p-6 space-y-4">
                    <div class="flex justify-between items-start">
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                            {{ figure.title }}
                        </h1>
                        <button @click="handleToggleFavorite"
                            class="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-md">
                            <i :class="[
                                'pi',
                                figure.favorites?.includes(currentUserId) ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-600 dark:text-gray-400',
                                'text-xl'
                            ]"></i>
                        </button>
                    </div>

                    <!-- Rating -->
                    <div class="flex items-center space-x-2">
                        <span class="text-[#00BD7E] text-xl">★</span>
                        <span class="text-gray-700 dark:text-gray-300">
                            {{ figure.rating?.averageRating || "No rating" }}
                            ({{ figure.rating?.totalRatings || 0 }} ratings)
                        </span>
                    </div>

                    <!-- Category -->
                    <div class="flex items-center space-x-2">
                        <i class="pi pi-tag text-[#00BD7E]"></i>
                        <span class="text-gray-600 dark:text-gray-400 capitalize">
                            {{ figure.category }}
                        </span>
                    </div>

                    <!-- Price -->
                    <div class="text-2xl font-bold text-[#00BD7E]">
                        ${{ figure.price.toFixed(2) }}
                    </div>

                    <!-- Stock -->
                    <div class="flex items-center space-x-2">
                        <i class="pi pi-box text-[#00BD7E]"></i>
                        <span class="text-gray-600 dark:text-gray-400">
                            In Stock: {{ figure.stock }} pcs
                        </span>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="p-6 border-t border-gray-200 dark:border-gray-700">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Description</h2>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ figure.description }}
                </p>
            </div>
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