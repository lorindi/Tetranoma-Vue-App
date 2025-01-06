<script setup>
import { ref, onMounted } from "vue"
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

console.log("FigureDetailsView mounted")

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
    console.log("Fetching figure details for ID:", route.params.id)
    try {
        const response = await figuresStore.getFigureById(route.params.id)
        figure.value = response.figure
        console.log("Figure details received:", figure.value)
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
                    <img :src="figure.images[0]" 
                         :alt="figure.title"
                         class="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md" />
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