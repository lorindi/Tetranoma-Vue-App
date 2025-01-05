<script setup>
import CardFigure from '../cards/CardFigure.vue';
import { computed } from 'vue';


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
            :key="figure._id || index"
            :link="figure._id"
            :imgUrl="figure.images?.[0]"
            :title="figure.title"
            :description="figure.description"
            :price="figure.price"
            :type="'cardRating'" 
            :rating="figure.rating?.averageRating"
            :totalRatings="figure.rating?.totalRatings"
            />
    </div>
</template>
