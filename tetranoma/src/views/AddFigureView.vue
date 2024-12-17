<script setup>
import { ref } from "vue"
import { useForm } from "vee-validate"
import * as yup from "yup"
import { useToast } from "vue-toastification"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useMotion } from "@vueuse/motion"
import "primeicons/primeicons.css"
const toast = useToast()
const figuresStore = useFiguresStore()
const formRef = ref(null)
const categories = [
  "film", "game", "comic", "fantasy", "miniatures",
  "sci-fi", "historical", "animals", "architecture",
  "educational", "decor"
]

const schema = yup.object({
  title: yup.string().required("Title is required").min(1, "Title must be at least 1 character"),
  description: yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
  category: yup.string().required("Category is required").oneOf(categories, "Invalid category"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  stock: yup.number().required("Stock is required").min(0, "Stock cannot be negative"),
  images: yup.array().min(1, "At least one image is required")
})

const { handleSubmit, errors, values } = useForm({
  validationSchema: schema,
  initialValues: {
    title: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    images: []
  }
})

const imageUrls = ref("")

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted with values:", values)
  try {
    // Convert comma-separated image URLs to array
    const formData = {
      ...values,
      images: imageUrls.value.split(",").map(url => url.trim())
    }

    await figuresStore.createFigure(formData)
    toast.success("Figure created successfully!")
    // Reset form or redirect
  } catch (error) {
    console.error("Error submitting form:", error)
    toast.error(error.response?.data?.message || "Error creating figure")
  }
})

const titleMotion = useMotion(ref(null), {
  initial: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0, transition: { duration: 800, type: "spring" } }
})

const formMotion = useMotion(formRef, {
  initial: { opacity: 0, scale: 0.95 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 500, delay: 200 }
  }
})
</script>
<template>
  <div class="w-full min-h-screen p-4 xs:p-6 sm:p-8 flex items-center justify-center">
    <div class="w-full max-w-[95%] xs:max-w-[90%] sm:max-w-2xl lg:max-w-4xl 
                bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl xs:rounded-3xl 
                shadow-2xl p-4 xs:p-6 sm:p-8 
                border border-gray-100 dark:border-gray-700">

      <!-- Animated Title -->
      <h1 ref="titleMotion.target" class="text-2xl xs:text-3xl sm:text-4xl font-black 
                 mb-6 xs:mb-8 sm:mb-12 text-center 
                 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                 bg-clip-text text-transparent pb-2 tracking-tight">
        <i class="pi pi-plus-circle mr-2 xs:mr-3 animate-pulse"></i>
        <span class="hidden xs:inline">Create New Figure</span>
        <span class="xs:hidden">New Figure</span>
      </h1>

      <!-- Animated Form -->
      <form ref="formRef" @submit="onSubmit" class="space-y-4 xs:space-y-6 sm:space-y-8">

        <!-- Title Input -->
        <div class="group relative">
          <label class="px-2 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <i class="pi pi-pencil absolute left-2 xs:left-3 top-[50px] -translate-y-1/2 
                    text-gray-400 group-focus-within:text-blue-500 transition-colors
                    text-sm xs:text-base"></i>
          <input v-model="values.title" type="text" class="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
                   py-3 xs:py-3.5 sm:py-4 
                   text-sm xs:text-base
                   bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   dark:text-white transition-all duration-300
                   placeholder:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/70"
            placeholder="Enter figure title" />
          <span class="absolute -bottom-5 left-0 text-red-500 text-xs">{{ errors.title }}</span>
        </div>

        <!-- Description with Icon -->
        <div class="group relative">
          <i class="pi pi-align-left absolute left-2 xs:left-3 top-4 xs:top-6 
                    text-gray-400 group-focus-within:text-blue-500 transition-colors
                    text-sm xs:text-base"></i>
          <textarea v-model="values.description" class="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
                   py-3 xs:py-3.5 sm:py-4
                   text-sm xs:text-base
                   bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                   border border-gray-200 dark:border-gray-700 
                   min-h-[100px] xs:min-h-[120px]
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   dark:text-white transition-all duration-300
                   placeholder:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/70"
            placeholder="Describe your figure"></textarea>
          <span class="absolute -bottom-5 left-0 text-red-500 text-xs">{{ errors.description
            }}</span>
        </div>

        <!-- Category Select -->
        <div class="group relative">
          <i class="pi pi-tags absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 
                    text-gray-400 group-focus-within:text-blue-500 transition-colors
                    text-sm xs:text-base"></i>
          <select v-model="values.category" class="w-full pl-8 xs:pl-10 pr-8 xs:pr-10 
                   py-3 xs:py-3.5 sm:py-4
                   text-sm xs:text-base
                   bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                   border border-gray-200 dark:border-gray-700 appearance-none
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   dark:text-white transition-all duration-300">
            <option value="">Select category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category.charAt(0).toUpperCase() + category.slice(1) }}
            </option>
          </select>
          <i class="pi pi-chevron-down absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 
                    text-gray-400 group-focus-within:text-blue-500 transition-colors 
                    pointer-events-none text-sm xs:text-base"></i>
        </div>

        <!-- Price and Stock Grid -->
        <div class="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6">
          <!-- Price Input -->
          <div class="group relative">
            <i class="pi pi-dollar absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 
                      text-gray-400 group-focus-within:text-blue-500 transition-colors
                      text-sm xs:text-base"></i>
            <input v-model.number="values.price" type="number" step="0.01" class="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
                     py-3 xs:py-3.5 sm:py-4
                     text-sm xs:text-base
                     bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                     border border-gray-200 dark:border-gray-700
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:text-white transition-all duration-300" placeholder="Price" />
          </div>

          <!-- Stock Input -->
          <div class="group relative">
            <i class="pi pi-box absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 
                      text-gray-400 group-focus-within:text-blue-500 transition-colors
                      text-sm xs:text-base"></i>
            <input v-model.number="values.stock" type="number" class="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
                     py-3 xs:py-3.5 sm:py-4
                     text-sm xs:text-base
                     bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                     border border-gray-200 dark:border-gray-700
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:text-white transition-all duration-300" placeholder="Stock" />
          </div>
        </div>

        <!-- Image URLs -->
        <div class="group relative">
          <i class="pi pi-images absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 
                    text-gray-400 group-focus-within:text-blue-500 transition-colors
                    text-sm xs:text-base"></i>
          <input v-model="imageUrls" type="text" class="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
                   py-3 xs:py-3.5 sm:py-4
                   text-sm xs:text-base
                   bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
                   border border-gray-200 dark:border-gray-700
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   dark:text-white transition-all duration-300" placeholder="http://image1.jpg, http://image2.jpg" />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                 text-white py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6
                 rounded-lg xs:rounded-xl
                 text-sm xs:text-base sm:text-lg
                 hover:shadow-lg hover:shadow-blue-500/30
                 active:scale-[0.98] transform transition-all duration-200
                 font-medium relative overflow-hidden">
          <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full
                      group-hover:translate-x-full transition-transform duration-700"></div>
          <i class="pi pi-check mr-2"></i>
          Create Figure
        </button>
      </form>
    </div>
  </div>
</template>