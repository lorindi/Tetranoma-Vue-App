<script setup>
import NavigationLinks from '../NavigationLinks.vue'

</script>
<template>
    <footer class="flex w-full max-w-[1336px] items-start justify-between p-[30px]">

        <div class="flex flex-col gap-[30px]">
            <div class="">
                <h2 class="">Tetranoma</h2>
                <p class="text-gray-600 mt-2 text-center md:text-left">
                    Your one-stop solution for 3D printed figures.
                </p>
            </div>

            <div class="">
                <div class="">
                    <p>Privacy Policy | Terms of Service | FAQ</p>
                </div>
                <div class="">
                    <p>&copy; 2024 Tetranoma. All rights reserved.</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-[10px]">
            <NavigationLinks />
        </div>

        <div class="flex gap-[20px]">
            <a href="#" class="text-gray-700 hover:text-[#42BB8B]">
                <i class="pi pi-facebook text-3xl"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-[#42BB8B]">
                <i class="pi pi-twitter text-3xl"></i>
            </a>
            <a href="#" class="text-gray-700 hover:text-[#42BB8B]">
                <i class="pi pi-instagram text-3xl"></i> 
            </a>
        </div>

    </footer>
</template>
