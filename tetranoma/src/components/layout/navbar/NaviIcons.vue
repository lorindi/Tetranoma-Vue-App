<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"
import CartSidebar from "@/components/CartSidebar.vue"

const cartSidebarRef = ref(null)

console.log("NavIcons component initialized")
</script>

<template>
    <div class="flex items-center gap-[10px] md:gap-[30px] text-lg">
        <RouterLink to="/profile" class="hover:text-[#117277] tracking-wide text-lg">
            <i class="pi pi-heart mr-2"></i>
        </RouterLink>
        <RouterLink to="/figures" class="hover:text-[#117277] tracking-wide text-lg">
            <i class="pi pi-shopping-bag mr-2"></i>
        </RouterLink>
        <CartSidebar ref="cartSidebarRef" />
    </div>
</template>