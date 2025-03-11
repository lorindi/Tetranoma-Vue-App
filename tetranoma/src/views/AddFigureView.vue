<script setup>
import { useToast } from "vue-toastification"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useRouter } from "vue-router"
import Title from "@/components/ui/Title.vue"
import FigureForm from "@/components/form/figureForm/FigureForm.vue"

const router = useRouter()
const toast = useToast()
const figuresStore = useFiguresStore()

const handleSubmit = async (formData) => {
  console.log("Handling form submission:", formData)
  try {
    await figuresStore.createFigure(formData)
    toast.success("Figure created successfully!")
    router.push("/figures")
  } catch (error) {
    console.error("Error submitting form:", error)
    toast.error(error.response?.data?.message || "Error creating figure")
  }
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-125px)] md:p-8 flex flex-col items-center justify-center">
    <Title>Create New Figure</Title>

    <div
      class="w-full lg:max-w-4xl md:bg-white/80 md:dark:bg-gray-800/90 md:backdrop-blur-lg rounded-2xl xs:rounded-3xl md:shadow-2xl p-4 xs:p-6 sm:p-8 md:border md:border-gray-100 md:dark:border-gray-700">
      <FigureForm submit-button-text="Add Figure" @submit="handleSubmit" />
    </div>
  </div>
</template>