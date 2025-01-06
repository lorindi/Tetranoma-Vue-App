<script setup>
import FiguresList from "@/components/lists/FiguresList.vue"
import HeaderWithLink from "@/components/HeaderWithLink.vue"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const figuresStore = useFiguresStore()

const handleExplore = () => {
    console.log("Navigating to figures with top rated sort")
    router.push({
        path: "/figures",
        query: {
            sortBy: "rating",
            sortOrder: "desc"
        }
    })
}

onMounted(async () => {
    await figuresStore.getFigures(1, {
        sortBy: "rating",
        sortOrder: "desc"
    })
})
</script>
<template>
    <div class="flex flex-col w-full max-w-[1336px] lg:my-[70px] items-center">
        <HeaderWithLink title="Top Rated" linkText="Explore" @click="handleExplore" />
        <div v-if="figuresStore.loading" class="text-center py-4">
            Loading...
        </div>
        <FiguresList v-else :figures="figuresStore.figures" sortBy="rating" sortOrder="desc" :limit="4" />
    </div>
</template>