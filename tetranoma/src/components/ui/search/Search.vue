<!-- <script setup>
import { ref } from 'vue';


const props = defineProps({
  size: {
    type: String,
    default: 'default',
    // validator: (value) => ['default'].includes(value),
  },
});

// Form data
const searchData = ref({
  title: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  minRating: ""
})

const categories = [
  "film",
  "game",
  "comic",
  "fantasy",
  "miniatures",
  "sci-fi",
  "historical",
  "animals",
  "architecture",
  "educational",
  "decor"
]

// Emit search event
const emit = defineEmits(["search"])

const handleSearch = () => {
  console.log("Search data:", searchData.value)
  emit("search", searchData.value)
}

const containerClasses = 'flex items-center border border-gray-300 bg-[#FAFAFA] rounded-md dark:bg-gray-900 p-1 w-full max-w-[250px] md:px-1 md:py-1 md:max-w-[350px] lg:px-2 lg:py-1 lg:max-w-[600px] xl:px-2 xl:py-1 xl:max-w-[600px] 2xl:px-2 2xl:py-1 2xl:max-w-[600px]'
const inputClasses = 'flex-1 min-w-0 border-none outline-none bg-[#FAFAFA] text-xs md:text-base md:p-2 lg:text-lg lg:p-3 xl:text-lg xl:p-3 2xl:text-lg 2xl:p-3 dark:bg-gray-900'
const buttonClasses = 'p-1 md:p-2 lg:p-3 xl:p-3 2xl:p-3'
const iconClasses = 'text-base md:text-2xl lg:text-3xl'

</script>

<template>
  <div :class="[containerClasses]">
    <input type="text" :class="['flex-grow border-none outline-none', inputClasses]" placeholder="Search..."/>
    <input type="text" v-model="searchData.title" :class="inputClasses" placeholder="Search by title" />
    <select v-model="searchData.category" :class="inputClasses">
      <option value="">Select category</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>
    <input type="number" v-model="searchData.minRating" :class="inputClasses" placeholder="Min rating" min="0"
      max="5" step="0.1" />
    <input type="number" v-model="searchData.minPrice" :class="inputClasses" placeholder="Min price" min="0" />
    <input type="number" v-model="searchData.maxPrice" :class="inputClasses" placeholder="Max price" min="0" />
    <button :class="['ml-2', buttonClasses]">
      <i :class="['pi pi-search text-[#117277]', iconClasses]"></i>
    </button>
  </div>

</template> -->



<script setup>
import { ref } from "vue"
import { useWindowSize } from "@vueuse/core" // Add this utility

const { width } = useWindowSize()
const isAdvancedSearch = ref(false)

const searchData = ref({
  title: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  minRating: ""
})

const categories = [
  "film",
  "game",
  "comic",
  "fantasy",
  "miniatures",
  "sci-fi",
  "historical",
  "animals",
  "architecture",
  "educational",
  "decor"
]

const emit = defineEmits(["search"])

const handleSearch = () => {
  console.log("Search data:", searchData.value)
  emit("search", searchData.value)
}

// const containerClasses = 'flex items-center border border-gray-300 bg-[#FAFAFA] rounded-md dark:bg-gray-900 p-1 w-full max-w-[250px] md:px-1 md:py-1 md:max-w-[350px] lg:px-2 lg:py-1 lg:max-w-[600px] xl:px-2 xl:py-1 xl:max-w-[600px] 2xl:px-2 2xl:py-1 2xl:max-w-[600px]'
// const inputClasses = 'flex-1 min-w-0 border-none outline-none bg-[#FAFAFA] text-xs md:text-base md:p-2 lg:text-lg lg:p-3 xl:text-lg xl:p-3 2xl:text-lg 2xl:p-3 dark:bg-gray-900'


const containerClasses = "w-full max-w-[250px] md:max-w-[550px] lg:max-w-[768px] mx-auto lg:border md:border-gray-300 lg:rounded-md md:dark:bg-gray-900 relative"
const inputClasses = "flex-1 min-w-0 bg-[#FAFAFA] p-2 rounded-md outline-none dark:bg-gray-900"
const buttonClasses = 'p-1 hover:bg-gray-100 rounded-md md:p-2 lg:p-3 xl:p-3 2xl:p-3'
const iconClasses = 'text-[#117277] text-base md:text-2xl lg:text-3xl'

</script>

<template>
  <div :class="containerClasses">
    <!-- Mobile View (< 768px) -->
    <div v-if="width < 768" class="space-y-2">
      <div class="flex gap-2">
        <input type="text" v-model="searchData.title" :class="inputClasses" placeholder="Search" />
        <button :class="buttonClasses" @click="isAdvancedSearch = !isAdvancedSearch">
          <i class="pi pi-sliders-h" :class="iconClasses"></i>
        </button>
        <button :class="buttonClasses" @click="handleSearch">
          <i class="pi pi-search" :class="iconClasses"></i>
        </button>
      </div>

      <!-- Mobile Advanced Search -->
      <div v-if="isAdvancedSearch" class="grid grid-cols-2 gap-1 p-2 rounded-md shadow-md border border-gray-300 absolute top-12 left-0 bg-[#FAFAFA] dark:bg-gray-900">
        <select v-model="searchData.category" :class="inputClasses">
          <option value="">Select category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </option>
        </select>
        <input type="number" v-model="searchData.minPrice" :class="inputClasses" placeholder="Min price" />
        <input type="number" v-model="searchData.maxPrice" :class="inputClasses" placeholder="Max price" />
        <input type="number" v-model="searchData.minRating" :class="inputClasses" placeholder="Min rating" min="0"
          max="5" step="0.1" />
      </div>
    </div>



    <!-- Desktop View (≥ 1024px) -->
    <div v-else class="flex gap-2">
      <input type="text" v-model="searchData.title" :class="inputClasses" placeholder="Search by title" />
      <select v-model="searchData.category" :class="inputClasses">
        <option value="">Category</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </option>
      </select>
      <input type="number" v-model="searchData.minRating" :class="inputClasses" placeholder="Rating" />
      <input type="number" v-model="searchData.minPrice" :class="inputClasses" placeholder="Min €" />
      <input type="number" v-model="searchData.maxPrice" :class="inputClasses" placeholder="Max €" />
      <button :class="buttonClasses" @click="handleSearch">
        <i class="pi pi-search" :class="iconClasses"></i>
      </button>
    </div>
  </div>
</template>