<script setup>
import NavigationLinks from '@/components/common/NavigationLinks.vue'
import { useRoute } from "vue-router"
import { computed } from "vue"
import Paragraph from '@/components/ui/Paragraph.vue'

const route = useRoute()

const excludedPaths = [
    "/add-figure",
    "/about",
    "/contact",
    "/faq",
    "/figures",
    "/sign-in",
    "/sign-up",
    "/create-account",
    "/search-figure",
    "/profile",
    "/admin"
]

const showFooter = computed(() => {
    const isExcluded = excludedPaths.some(path => route.path.startsWith(path))
    return !isExcluded
})
</script>
<template>
    <footer v-if="showFooter" class="flex w-full max-w-[1336px] items-start p-[10px]
    xs:flex-col-reverse xs:justify-center xs:items-center
    sm:flex-row sm:justify-between sm:items-start
    md:flex-row md:justify-between md:items-start
    lg:flex-row lg:justify-between lg:items-start lg:p-[30px]
    xl:flex-row xl:justify-between xl:items-start xl:p-[30px]
    2xl:flex-row 2xl:justify-between 2xl:items-start 2xl:p-[30px]
    ">

        <div class="flex flex-col gap-[30px] 
        ">
            <div class="">
                <h2 class="text-center sm:text-left text-3xl text-[#8865BD]">Tetranoma</h2>
                <Paragraph color="transparent" size="small" align="left">
                    Your one-stop solution for 3D printed figures.
                </Paragraph>


            </div>

            <div class="">
                <Paragraph color="transparent" size="small" align="left">
                    Privacy Policy | Terms of Service | FAQ
                </Paragraph>
                <Paragraph color="transparent" size="small" align="left">
                    &copy; 2024 Tetranoma. All rights reserved.
                </Paragraph>

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
