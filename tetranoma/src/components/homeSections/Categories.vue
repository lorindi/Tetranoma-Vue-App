<script setup>

import CategoriesList from './CategoriesList.vue';
</script>

<template>
  <div class="xs:flex sm:flex md:flex">
    <CategoriesList :limit="4" type="list" />
  </div>
</template>
