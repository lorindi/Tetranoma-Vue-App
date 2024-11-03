<script setup>
import Search from '../components/search/Search.vue'
import HomeCover from '/img/homeCover.jpg'
</script>

<template>
    <section class="flex flex-col-reverse w-full max-w-[1336px] h-[calc(100vh-125px)] items-center justify-between p-[15px] mt-[30px]
    lg:flex-row lg:p-[30px] lg:mt-[0px]
    xl:flex-row xl:p-[30px] xl:mt-[0px]
    2xl:flex-row 2xl:p-[30px] 2xl:mt-[0px]
    ">
        <div class="flex flex-col-reverse  gap-[50px] w-full
        lg:flex-col
        xl:flex-col
        2xl:flex-col
        ">
            <h1 class="text-5xl">Title</h1>
            <p class="text-2xl text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit ipsum dolor, sit
                amet consectetur adipisicing elitipsum dolor, sit amet consectetur adipisicing elit.</p>
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
