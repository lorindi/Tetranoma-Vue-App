<!-- NavigationLinks.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router'

const links = [
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/list', label: 'List' },
  { path: '/add', label: 'Add' },
]

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <RouterLink to="/"
    :class="[isActiveLink('/') ? 'text-[#42BB8B]' : '', 'xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden  hover:text-[#117277] tracking-wide text-lg']">
    <i :class="['pi pi-home text-[#117277]', iconClasses]"></i>

  </RouterLink>
  <RouterLink v-for="link in links" :key="link.path" :to="link.path"
    :class="[isActiveLink(link.path) ? 'text-[#42BB8B]' : '', 'hover:text-[#117277]', 'tracking-wide']">
    {{ link.label }}
  </RouterLink>
</template>
