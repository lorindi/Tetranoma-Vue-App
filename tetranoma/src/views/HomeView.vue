<script setup>
import Search from '../components/search/Search.vue'
import HomeCover from '/img/homeCover.jpg'
</script>

<template>
    <section class="flex flex-col-reverse w-full max-w-[1336px] h-auto gap-[30px] items-center justify-between p-[15px] mt-[30px]
    lg:flex-row lg:p-[30px] lg:mt-[0px] lg:h-[calc(100vh-125px)]
    xl:flex-row xl:p-[30px] xl:mt-[0px] xl:h-[calc(100vh-125px)]
    2xl:flex-row 2xl:p-[30px] 2xl:mt-[0px] 2xl:h-[calc(100vh-125px)]
    ">
        <div class="flex flex-col-reverse gap-[50px] w-full items-center
        lg:flex-col lg:items-start
        xl:flex-col xl:items-start
        2xl:flex-col 2xl:items-start
        ">
            <div class="flex flex-col gap-[30px] items-center
                lg:items-start
                xl:items-start
                2xl:items-start
            ">
                <h1 class="text-3xl tracking-wide
                lg:text-5xl
                xl:text-5xl
                2xl:text-5xl
                ">Title</h1>
                <p class="text-base text-gray-700 tracking-wide
                md:text-lg
                lg:text-2xl
                xl:text-2xl
                2xl:text-2xl
                ">Lorem ipsum dolor, sit amet consectetur adipisicing elit ipsum dolor,
                    sit
                    amet consectetur adipisicing elitipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <Search type="default" />

        </div>

        <img :src="HomeCover" alt="HomeCover" class=" object-cover h-[200px] w-full opacity-80 rounded-lg

        lg:h-[600px] lg:w-[500px]
        xl:h-[600px] xl:w-[500px]
        2xl:h-[600px] 2xl:w-[500px]
        ">

    </section>

    <section class="flex">

    </section>

    <section class="flex">

    </section>

</template>
