<script setup>
import CardCategory from '@/components/cards/CardCategory.vue';

const categories = [
  { category: 'film', icon: 'pi-video', title: 'Film', desc: 'Explore iconic movie-themed 3D figures.' },
  { category: 'game', icon: 'pi-star', title: 'Game', desc: 'Game-inspired models for every fan.' },
  { category: 'comic', icon: 'pi-book', title: 'Comic', desc: 'Your favorite comic characters in 3D.' },
  { category: 'fantasy', icon: 'pi-globe', title: 'Fantasy', desc: 'Step into magical worlds with unique designs.' },
  { category: 'miniatures', icon: 'pi-box', title: 'Miniatures', desc: 'Detailed miniatures for collectors and hobbyists.' },
  { category: 'sci-fi', icon: 'pi-cog', title: 'Sci-Fi', desc: 'Futuristic models inspired by science fiction.' },
  { category: 'historical', icon: 'pi-history', title: 'Historical', desc: 'Relive history with accurate 3D replicas.' },
  { category: 'animals', icon: 'pi-heart', title: 'Animals', desc: 'Lifelike animal figures for nature enthusiasts.' },
  { category: 'architecture', icon: 'pi-building', title: 'Architecture', desc: 'Famous buildings and structures in miniature.' },
  { category: 'educational', icon: 'pi-graduation-cap', title: 'Educational', desc: '3D models for learning and teaching.' },
  { category: 'decor', icon: 'pi-palette', title: 'Decor', desc: 'Stylish 3D designs to enhance your space.' },
];

defineProps({
  limit: {
    type: Number,
    default: 11,
  },
  type: {
    type: String,
    default: 'list',
    validator: (value) => ['list'].includes(value),
  },
});
</script>

<template>

  <section if="type === 'list'"
    class="w-full max-w-[1336px] px-[10px] grid grid-cols-2 justify-items-center  xl:flex flex-wrap xl:items-center xl:justify-evenly gap-[5px] md:gap-[10px]">
    <CardCategory v-for="(category, index) in categories.slice(0, limit)" :key="index" :category="category.category"
      :icon="category.icon" :title="category.title" :desc="category.desc" />
  </section>

</template>
