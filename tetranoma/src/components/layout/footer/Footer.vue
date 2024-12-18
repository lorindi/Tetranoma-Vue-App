<script setup>
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import { useRoute } from "vue-router"
import { computed } from "vue"

// Get current route
const route = useRoute()

// Compute whether footer should be visible
const showFooter = computed(() => {
    console.log("Current route:", route.path)
    return route.path !== "/add-figure"
})
</script>
<template>
    <footer v-if="showFooter" class="flex flex-col-reverse w-full max-w-[1336px] items-start justify-center p-[10px]
    
    md:flex-row md:justify-between
    lg:flex-row lg:justify-between lg:p-[30px]
    xl:flex-row xl:justify-between xl:p-[30px]
    2xl:flex-row 2xl:justify-between 2xl:p-[30px]
    ">

        <div class="flex flex-col gap-[30px] 
        ">
            <div class="">
                <h2 class="text-3xl text-[#8865BD]">Tetranoma</h2>
                <p class="text-gray-600 mt-2 text-center md:text-left text-sm
            lg:text-base
            xl:text-base
            2xl:text-lg">
                    Your one-stop solution for 3D printed figures.
                </p>
            </div>

            <div class="">
                <p class="text-sm
                    lg:text-base
                    xl:text-base
                    2xl:text-lg
            ">Privacy Policy | Terms of Service | FAQ</p>
                <p class="text-sm
                    lg:text-base
                    xl:text-base
                    2xl:text-lg
            ">&copy; 2024 Tetranoma. All rights reserved.</p>
            </div>
        </div>

        <div class="flex flex-col gap-[10px] xs:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
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
