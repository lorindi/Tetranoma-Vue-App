<script setup>

import FiguresList from '@/components/lists/FiguresList.vue';
import Search from '@/components/ui/search/Search.vue';
import { useFiguresStore } from '@/stores/useFiguresStore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const figuresStore = useFiguresStore()
console.log('figuresStore.figures', figuresStore);



onMounted(() => {
    console.log("FiguresView mounted, checking URL params")
    const { category, sortBy, sortOrder } = route.query
    const filters = {}
    
    if (category) filters.category = category
    if (sortBy) filters.sortBy = sortBy
    if (sortOrder) filters.sortOrder = sortOrder
    
    if (Object.keys(filters).length > 0) {
        console.log("Applying filters from URL:", filters)
        figuresStore.updateFilters(filters)
    } else {
        figuresStore.getFigures()
    }
})

watch(
    () => route.query,
    (newQuery) => {
        console.log("Route query changed:", newQuery)
        const filters = {}
        if (newQuery.category) filters.category = newQuery.category
        if (newQuery.sortBy) filters.sortBy = newQuery.sortBy
        if (newQuery.sortOrder) filters.sortOrder = newQuery.sortOrder
        
        if (Object.keys(filters).length > 0) {
            figuresStore.updateFilters(filters)
        }
    }
)

const handleSearch = (searchData) => {
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