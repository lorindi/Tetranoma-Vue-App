<script setup>
import { ref } from "vue"
import { useForm } from "vee-validate"
import * as yup from "yup"
import { useToast } from "vue-toastification"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useMotion } from "@vueuse/motion"
import "primeicons/primeicons.css"
import FormField from "@/components/form/formField/FormField.vue"
import Title from "@/components/common/title/Title.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"


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
    const formData = {
      ...values,
      images: imageUrls.value.split(",").map(url => url.trim())
    }
    await figuresStore.createFigure(formData)
    toast.success("Figure created successfully!")
  } catch (error) {
    console.error("Error submitting form:", error)
    toast.error(error.response?.data?.message || "Error creating figure")
  }
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
  <div class="w-full h-full md:p-8 flex flex-col items-center justify-center my-14">
    <Title 
        title="Create New Figure" 
      />

    <div class="w-full lg:max-w-4xl 
                md:bg-white/80 md:dark:bg-gray-800/90 md:backdrop-blur-lg rounded-2xl xs:rounded-3xl 
                md:shadow-2xl p-4 xs:p-6 sm:p-8 
                md:border md:border-gray-100 md:dark:border-gray-700">



      <form ref="formRef" @submit="onSubmit" class="space-y-4 xs:space-y-6 sm:space-y-8">

        <FormGridContainer>
          <FormField v-model="values.title" label="Title" type="text" icon="pencil" placeholder="Enter figure title"
            :error="errors.title" required />
          <FormField v-model="values.category" label="Category" type="select" icon="tags" placeholder="Select category"
            :options="categories" :error="errors.category" required />
        </FormGridContainer>


        <FormField v-model="values.description" label="Description" type="textarea" icon="align-left"
          placeholder="Describe your figure" :error="errors.description" required />


        <FormGridContainer :columns="2" :gap="4">
          <FormField v-model="values.price" label="Price" type="number" icon="dollar" placeholder="Enter price"
            :error="errors.price" required />

          <FormField v-model="values.stock" label="Stock" type="number" icon="box" placeholder="Enter stock"
            :error="errors.stock" required />
        </FormGridContainer>

        <FormField v-model="values.images" label="Images" type="text" icon="images" placeholder="Enter image URLs"
          :error="errors.images" required />



        <div>
          <FormButton text="Add Figure" size="1/2" align="end"/>
        </div>
      </form>
    </div>
  </div>
</template>