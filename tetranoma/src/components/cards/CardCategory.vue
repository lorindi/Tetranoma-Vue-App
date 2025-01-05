<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
defineProps({
    category: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    }
})

const handleCategoryClick = () => {
    console.log("Navigating to figures with category:", props.category)
    router.push({
        path: "/figures",
        query: { category: props.category }
    })
}
</script>
<template>
     <router-link 
        :to="{ 
            path: '/figures',
            query: { category: category }
        }" class="flex flex-col items-center justify-around py-[10px] px-[5px] mx-[3px] my-[10px] shadow-md bg-white rounded-lg dark:bg-gray-800 z-10
    w-[90px] h-[90px]
    sm:w-[125px] sm:h-[125px] 
    md:w-[150px] md:h-[125px] md:mx-[10px] md:flex-row
    lg:flex-row lg:w-[280px] lg:h-[150px] lg:gap-[20px] lg:py-[10px] lg:px-[15px] lg:items-center lg:justify-center 
    ">
        <i :class="`pi ${icon} text-[#00BD7E] text-2xl bg-white p-0 rounded-md  dark:bg-gray-800
        sm:text-3xl
        md:text-2xl md:text-white md:bg-[#00BD7E] md:p-3
        lg:dark:text-[#00BD7E] 
        xl:
        2xl:
        
        `"></i>
        <div class="flex flex-col items-center lg:items-start">
            <h4 class="text-sm 
            sm:text-base 
            md:text-base
            lg:font-semibold
            ">{{ title }}</h4>
            <p class="hidden w-full lg:flex lg:max-w-[200px] xl:flex 2xl:flex dark:text-gray-400">{{ desc }}</p>
        </div>
    </router-link>
</template>