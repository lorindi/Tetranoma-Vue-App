<script setup>

import FiguresList from '@/components/lists/FiguresList.vue';
import Search from '@/components/ui/search/Search.vue';
import { useFiguresStore } from '@/stores/useFiguresStore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const figuresStore = useFiguresStore()

onMounted(() => {
    console.log("Component mounted, checking for category in URL")
    const categoryFromUrl = route.query.category
    if (categoryFromUrl) {
        console.log("Found category in URL:", categoryFromUrl)
        figuresStore.updateFilters({ category: categoryFromUrl })
    } else {
        console.log("No category in URL, fetching all figures")
        figuresStore.getFigures()
    }
})

watch(
    () => route.query,
    (newQuery) => {
        console.log("URL query changed:", newQuery)
        if (newQuery.category) {
            figuresStore.updateFilters({ category: newQuery.category })
        }
    }
)

const handleSearch = (searchData) => {
    console.log("Search triggered with data:", searchData)
    const cleanedFilters = Object.fromEntries(
        Object.entries(searchData).filter(([_, value]) => value !== "" && value !== null)
    )
    figuresStore.updateFilters(cleanedFilters)
}
</script>
<template>
    <div class="flex flex-col w-full max-w-[1336px] items-center justify-center my-[50px]">
        <Search size="default" @search="handleSearch" />

        <div v-if="figuresStore.loading" class="text-center py-4">
            Loading...
        </div>
        
        <div v-else-if="figuresStore.error" class="text-red-500 text-center py-4">
            {{ figuresStore.error }}
        </div>
        
        <div v-else-if="figuresStore.figures.length === 0" class="text-center py-4">
            No figures found
        </div>
        
        <FiguresList :type="list" :figures="figuresStore.figures" />
    </div>
</template>