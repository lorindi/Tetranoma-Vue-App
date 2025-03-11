<script setup>
import { ref, onMounted } from "vue"
import { useToast } from "vue-toastification"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useRouter, useRoute } from "vue-router"
import Title from "@/components/ui/Title.vue"
import FigureForm from "@/components/form/figureForm/FigureForm.vue"
import { useAuthStore } from "@/stores/useAuthStore"
import { storeToRefs } from "pinia"

const router = useRouter()
const route = useRoute()
const toast = useToast()
const figuresStore = useFiguresStore()
const figureData = ref(null)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(async () => {
    try {
        const response = await figuresStore.getFigureById(route.params.id)
        if (!response?.figure) {
            throw new Error("Figure not found")
        }
        
        if (response.figure.userId !== user.value?._id) {
            toast.error("You don't have permission to edit this figure")
            router.push("/figures")
            return
        }
        
        figureData.value = response.figure
    } catch (error) {
        console.error("Error loading figure:", error)
        toast.error("Error loading data")
        router.push("/figures")
    }
})

const handleSubmit = async (formData) => {
    try {
        await figuresStore.updateFigure(route.params.id, formData)
        toast.success("Figure updated successfully!")
        router.push("/figures")
    } catch (error) {
        console.error("Error updating figure:", error)
        toast.error("Error updating figure")
    }
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-125px)] md:p-8 flex flex-col items-center justify-center">
    <Title title="Update Figure" />
    <div class="w-full lg:max-w-4xl md:bg-white/80 md:dark:bg-gray-800/90 md:backdrop-blur-lg rounded-2xl xs:rounded-3xl md:shadow-2xl p-4 xs:p-6 sm:p-8 md:border md:border-gray-100 md:dark:border-gray-700">
      <FigureForm 
        v-if="figureData" 
        :initial-data="figureData" 
        submit-button-text="Update Figure" 
        @submit="handleSubmit" 
      />
    </div>
  </div>
</template>