<script setup>
defineProps({
  images: {
    type: Array,
    required: true
  },
  currentImageIndex: {
    type: Number,
    required: true
  },
  hasMultipleImages: {
    type: Boolean,
    required: true
  },
  totalImages: {
    type: Number,
    required: true
  },
  figure: {
    type: Object,
    required: true
  }
})

defineEmits(["prevImage", "nextImage", "handleImageClick"])
</script>

<template>
  <div class="w-full md:w-1/2 p-4">
    <!-- Main Image Container -->
    <div class="relative w-full h-[400px] mb-5">
      <img :src="images[currentImageIndex]" :alt="`${figure.title} - Image ${currentImageIndex + 1}`"
        class="w-full h-full object-cover rounded-lg shadow-md" />

      <!-- Navigation Arrows -->
      <button v-if="hasMultipleImages" @click="$emit('prevImage')"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200">
        <i class="pi pi-chevron-left"></i>
      </button>
      <button v-if="hasMultipleImages" @click="$emit('nextImage')"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200">
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>

    <!-- Thumbnails Grid -->
    <div v-if="hasMultipleImages" :class="[
      'w-full',
      {
        'grid grid-cols-2 gap-2': totalImages === 2,
        'overflow-x-auto touch-pan-x': totalImages > 2
      }
    ]">
      <template v-if="totalImages === 2">
        <img v-for="(image, index) in images" :key="index" :src="image" :alt="`${figure.title} - Thumbnail ${index + 1}`"
          @click="$emit('handleImageClick', index)" :class="[
            'w-full h-[80px] object-cover rounded-lg cursor-pointer transition-all duration-200',
            currentImageIndex === index ? 'ring-2 ring-[#00BD7E] opacity-100' : 'opacity-70 hover:opacity-100'
          ]" />
      </template>

      <div v-else class="flex gap-2 h-[100px] overflow-x-auto touch-pan-x scrollbar-hide thumbnails-container">
        <img v-for="(image, index) in images" :key="index" :src="image" :alt="`${figure.title} - Thumbnail ${index + 1}`"
          @click="$emit('handleImageClick', index)" :class="[
            'flex-none w-[80px] h-[80px] object-cover rounded-lg cursor-pointer transition-all duration-200',
            currentImageIndex === index ? 'ring-2 ring-[#00BD7E] opacity-100' : 'opacity-70 hover:opacity-100'
          ]" />
      </div>
    </div>
  </div>
</template>