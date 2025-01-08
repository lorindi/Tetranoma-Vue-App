<script setup>
import { RouterLink } from 'vue-router';
import HomeCover from '/img/homeCover.jpg'
</script>

<template>
    <section class="flex flex-col-reverse w-full max-w-[1336px] h-auto gap-[30px] items-center justify-between p-[15px] my-[30px] bg-[#FAFAFA] dark:bg-gray-900 lg:rounded-xl
    lg:flex-row lg:p-[30px] lg:mt-[0px] lg:h-[calc(100vh-125px)]
    xl:flex-row xl:p-[30px] xl:mt-[0px] xl:h-[calc(100vh-125px)]
    2xl:flex-row 2xl:p-[30px] 2xl:mt-[0px] 2xl:h-[calc(100vh-125px)]
    ">
        <div class="flex flex-col gap-[30px] w-full items-center
        lg:flex-col lg:items-start
        xl:flex-col xl:items-start
        2xl:flex-col 2xl:items-start
        ">
            <div class="flex flex-col gap-[30px] items-center
                lg:items-start
                xl:items-start
                2xl:items-start
            ">
                <h1 class="text-2xl tracking-wide text-center font-bold text-gray-800 dark:text-gray-300
                lg:text-3xl lg:text-start
                xl:text-3xl xl:text-start
                2xl:text-4xl 2xl:text-start
                ">Discover the World of 3D Printing</h1>
                <p class="text-base text-gray-700 tracking-wide w-[95%] text-start dark:text-gray-400
                md:text-lg
                lg:text-2xl lg:text-start
                xl:text-2xl xl:text-start
                2xl:text-2xl 2xl:text-start
                "> Discover a world of 3D printed figures, from ready-made designs to fully custom creations. Whether
                    you're looking for unique models or want to bring your own ideas to life, we've got you covered.</p>
            </div>
       
            <RouterLink to="/"
                class="relative inline-block p-[3px] rounded-[10px] bg-gradient-to-r bg-[#00BD7E] hover:from-[#00AEDD] hover:to-[#00BD7E]">
                <span class="block bg-[#FAFAFA] text-gray-800 font-bold py-3 px-4 rounded-[8px] text-base dark:bg-gray-800 dark:text-white">
                    View 3D Figures
                </span>
            </RouterLink>


        </div>

        <img :src="HomeCover" alt="HomeCover" class=" object-cover h-[200px] w-full opacity-80 rounded-lg dark:opacity-80 dark:hover:opacity-90

        lg:h-[600px] lg:w-[500px]
        xl:h-[600px] xl:w-[500px]
        2xl:h-[600px] 2xl:w-[500px]
        ">

    </section>
</template>