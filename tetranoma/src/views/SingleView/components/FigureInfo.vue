<script setup>
defineProps({
  figure: {
    type: Object,
    required: true
  },
  currentUserId: {
    type: String,
    required: true
  },
  isFavorited: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  cartStore: {
    type: Object,
    required: true
  }
})

defineEmits(["toggleFavorite", "deleteFigure", "updateQuantity", "addToCart"])
</script>

<template>
  <div class="w-full md:w-1/2 p-6 space-y-4">
    <div class="flex justify-between items-start">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        {{ figure.title }}
      </h1>
      <div class="flex gap-4">
        <button v-if="currentUserId === figure.userId" @click="$router.push(`/update-figure/${figure._id}`)"
          class="px-2 pt-2 pb-1 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-md"
          title="Edit Figure">
          <i class="pi pi-pencil text-[#00BD7E] text-xl"></i>
        </button>
        <button v-if="currentUserId === figure.userId" @click="$emit('deleteFigure')"
          class="px-2 pt-2 pb-1 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-md"
          title="Delete Figure">
          <i class="pi pi-trash text-[#00BD7E] text-xl"></i>
        </button>
        <button @click="$emit('toggleFavorite')"
          class="px-2 pt-2 pb-1 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-md">
          <i :class="[
            'pi',
            isFavorited ? 'pi-heart-fill text-[#00BD7E]' : 'pi-heart text-gray-600 dark:text-gray-400',
            'text-xl'
          ]"></i>
        </button>
      </div>
    </div>

    <!-- Rating -->
    <div class="flex items-center space-x-2">
      <span class="text-[#00BD7E] text-xl">★</span>
      <span class="text-gray-700 dark:text-gray-300">
        {{ figure.rating?.averageRating || "No rating" }}
        ({{ figure.rating?.totalRatings || 0 }} ratings)
      </span>
    </div>

    <!-- Category -->
    <div class="flex items-center space-x-2">
      <i class="pi pi-tag text-[#00BD7E]"></i>
      <span class="text-gray-600 dark:text-gray-400 capitalize">
        {{ figure.category }}
      </span>
    </div>

    <!-- Price -->
    <div class="text-2xl font-bold text-[#00BD7E]">
      ${{ figure.price.toFixed(2) }}
    </div>

    <!-- Stock -->
    <div class="flex items-center space-x-2">
      <i class="pi pi-box text-[#00BD7E]"></i>
      <span class="text-gray-600 dark:text-gray-400">
        In Stock: {{ figure.stock }} pcs
      </span>
    </div>

    <div class="flex items-center gap-4 mt-4">
      <input type="number" v-model="quantity" min="1" :max="figure.stock"
        class="w-20 p-2 border rounded dark:bg-gray-800" @input="$emit('updateQuantity', $event.target.value)" />
      <button @click="$emit('addToCart')"
        class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a] transition-colors"
        :disabled="cartStore.loading">
        <i class="pi pi-shopping-cart mr-2"></i>
        Add to Cart
      </button>
    </div>
  </div>
</template>