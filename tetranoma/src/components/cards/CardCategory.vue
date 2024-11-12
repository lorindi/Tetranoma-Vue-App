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

</script>
<template>
    <RouterLink :to="`/figures`" 
    class="flex flex-col items-center justify-around py-[10px] px-[5px] mx-[3px] my-[10px] shadow-md 
    w-[90px] h-[90px]
    sm:w-[125px] sm:h-[125px] 
    md:w-[125px] md:h-[125px] md:mx-[10px]
    lg:flex-row lg:w-[280px] lg:h-[150px] lg:gap-[20px] lg:py-[10px] lg:px-[15px] lg:items-center lg:justify-center lg:shadow-none 
    ">
        <i :class="`pi ${icon} text-[#00BD7E] text-2xl bg-white p-0 rounded-md
        sm:text-3xl
        md:text-2xl md:text-white md:bg-[#00BD7E] md:p-3
        lg:
        xl:
        2xl:
        
        `"></i>
        <div class="flex flex-col items-center lg:items-start">
            <h4 class="text-sm 
            sm:text-base 
            md:text-base
            lg:font-semibold
            ">{{ title }}</h4>
            <p class="hidden w-full lg:flex lg:max-w-[200px] xl:flex 2xl:flex">{{ desc }}</p>
        </div>
    </RouterLink>
</template>