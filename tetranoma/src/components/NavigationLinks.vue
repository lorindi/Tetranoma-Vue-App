<script setup>
import { RouterLink, useRoute } from 'vue-router'

const links = [
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/figures', label: 'Figures' },
  { path: '/add-figure', label: 'Add' },
]

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

defineProps(['toggleMenu'])
</script>

<template>
  <RouterLink to="/"
  @click="toggleMenu"
    :class="[isActiveLink('/') ? 'text-[#42BB8B]' : '', 'xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden  hover:text-[#117277] tracking-wide text-lg ']">
    <i :class="['pi pi-home text-[#117277]']"></i>
  </RouterLink>

  <RouterLink to="/sign-in"
  @click="toggleMenu"
    :class="[isActiveLink('/sign-in') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">
    Sign In
  </RouterLink>
  
  <RouterLink to="/create-account"
  @click="toggleMenu"
    :class="[isActiveLink('/create-account') ? 'text-[#42BB8B]' : '', 'hover:text-[#117277] tracking-wide text-lg']">
    Create Account
  </RouterLink>

  <RouterLink v-for="link in links" :key="link.path" :to="link.path"
  @click="toggleMenu"
    :class="[isActiveLink(link.path) ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide text-lg']">
    {{ link.label }}
  </RouterLink>
</template>
