<script setup>
import homeCover from '/img/3dPrintingCover.jpg'
</script>

<template>
    <section
        class="flex flex-col gap-[30px] items-center justify-center h-full lg:flex-row bg-gray-50 w-full max-w-[1336px] lg:min-h-[300px] px-[15px] my-[30px] lg:px-[30px] ">
        <!-- Left section - image -->
        <div class="flex items-center justify-center w-full flex-1">

            <img :src="homeCover"
                class="h-full max-h-[300px] lg:max-h-[600px] w-full rounded-lg shadow-lg object-cover object-center " />
        </div>


        <!-- Right section - content -->
        <div class="flex flex-col flex-1 w-[80%] lg:text-left lg:gap-[15px] lg:text-xl lg:px-[15px]">

            <h2 class="font-semibold text-center lg:text-3xl">Why 3D Figures Are Perfect
                for Your Home</h2>
            <p class="">
                3D figures add personality and charm to any room. Whether it`s a favorite character or a custom-made
                piece, they bring a sense of joy and creativity to your living space.
            </p>

            <p class="hidden lg:block">Each 3D figure is unique, adding a personal touch to your décor.</p>
            <p class="hidden lg:block">They inspire creativity and spark conversations, making your home feel more lively.</p>
            <p class="hidden lg:block">Perfect for any space - from your living room to your office, 3D figures complement any home
                decor.</p>

            <p class="">
                Bring happiness and style into your home with these fun and creative pieces today!
            </p>
        </div>

    </section>
</template>
