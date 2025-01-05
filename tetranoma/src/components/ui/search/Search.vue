<script setup>
import { onMounted, ref, watch } from "vue"
import { useWindowSize } from "@vueuse/core"
import { debounce } from "lodash"
import { useRoute } from "vue-router"

const route = useRoute()
const { width } = useWindowSize()
const isAdvancedSearch = ref(false)

const searchData = ref({
  title: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  sortBy: "createdAt",
  sortOrder: "desc"
})

const sortOptions = [
  { label: "Latest", value: "createdAt-desc" },
  { label: "Oldest", value: "createdAt-asc" },
  { label: "Top Rated", value: "rating-desc" },
  { label: "Lowest Rated", value: "rating-asc" },
  { label: "Most Expensive", value: "price-desc" },
  { label: "Cheapest", value: "price-asc" }
]

const handleSortChange = (sortString) => {
  console.log("Handling sort change:", sortString)
  const [sortBy, sortOrder] = sortString.split("-")
  searchData.value.sortBy = sortBy
  searchData.value.sortOrder = sortOrder
  handleSearch()
}
onMounted(() => {
    console.log("Search component mounted, checking URL params")
    const { category, sortBy, sortOrder } = route.query
    
    if (category) {
        console.log("Setting category from URL:", category)
        searchData.value.category = category
    }
    
    if (sortBy && sortOrder) {
        console.log("Setting sort from URL:", sortBy, sortOrder)
        searchData.value.sortBy = sortBy
        searchData.value.sortOrder = sortOrder
    }
})

watch(
    () => route.query,
    (newQuery) => {
        console.log("Route query changed:", newQuery)
        if (newQuery.category) {
            searchData.value.category = newQuery.category
        }
        if (newQuery.sortBy && newQuery.sortOrder) {
            searchData.value.sortBy = newQuery.sortBy
            searchData.value.sortOrder = newQuery.sortOrder
        }
    }
)
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


const debouncedSearch = debounce(() => {
  emit("search", searchData.value)
}, 500)

watch(searchData, () => {
  debouncedSearch()
}, { deep: true })

const handleSearch = () => {
  emit("search", searchData.value)
}

const containerClasses = "w-full max-w-[250px] md:max-w-[550px] lg:max-w-[768px] mx-auto md:border md:border-gray-300 md:rounded-md md:dark:bg-gray-900 relative"
const inputClasses = "flex-1 min-w-0 bg-[#FAFAFA] p-2  outline-none dark:bg-gray-900"
const buttonClasses = 'p-1 rounded-md md:p-2 lg:p-3 xl:p-3 2xl:p-3 '
const iconClasses = 'text-[#117277] hover:text-[#00BD7E] text-base md:text-2xl lg:text-3xl dark:hover:text-[#00BD7E]'

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
      <div v-if="isAdvancedSearch"
        class="grid grid-cols-2 gap-1 p-2 rounded-md shadow-md border border-gray-300 absolute top-12 left-0 bg-[#FAFAFA] dark:bg-gray-900 z-10">
        <select v-model="searchData.category" :class="inputClasses">
          <option value="">Category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </option>
        </select>
        <input type="number" v-model="searchData.minPrice" :class="inputClasses" placeholder="Min price" />
        <input type="number" v-model="searchData.maxPrice" :class="inputClasses" placeholder="Max price" />
        <select :class="inputClasses" @change="handleSortChange($event.target.value)"
          :value="`${searchData.sortBy}-${searchData.sortOrder}`">
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>



    <!-- Desktop View (≥ 1024px) -->
    <div v-else
      class="flex px-2 gap-2 [&>*]:px-2 [&>*:not(:nth-last-child(-n+2))]:border-r [&>*:not(:nth-last-child(-n+2))]:border-gray-300 [&>*:not(:nth-last-child(-n+2))]:dark:border-gray-800">
      <input type="text" v-model="searchData.title" :class="inputClasses" placeholder="Search" />
      <select v-model="searchData.category" :class="inputClasses">
        <option value="">Category</option>
        <option v-for="category in categories" :key="category" :value="category" class="">
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </option>
      </select>
      <select :class="inputClasses" @change="handleSortChange($event.target.value)"
        :value="`${searchData.sortBy}-${searchData.sortOrder}`">
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <input type="number" v-model="searchData.minPrice" :class="inputClasses" placeholder="Min " />
      <input type="number" v-model="searchData.maxPrice" :class="inputClasses" placeholder="Max" />
      <button :class="buttonClasses" @click="handleSearch">
        <i class="pi pi-search" :class="iconClasses"></i>
      </button>
    </div>
  </div>
</template>