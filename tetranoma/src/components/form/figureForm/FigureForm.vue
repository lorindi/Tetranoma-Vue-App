<script setup>
import { ref, onMounted } from "vue"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useMotion } from "@vueuse/motion"
import FormField from "@/components/form/formField/FormField.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: []
    })
  },
  submitButtonText: {
    type: String,
    default: "Submit"
  },
  cancelButtonText: {
    type: String,
    default: "Cancel"
  },
  showCancelButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["submit", "cancel"])

const formRef = ref(null)
const categories = [
  "film", "game", "comic", "fantasy", "miniatures",
  "sci-fi", "historical", "animals", "architecture",
  "educational", "decor"
]
const imageUrls = ref("")


const schema = yup.object({
  title: yup.string().required("Title is required").min(1, "Title must be at least 1 character"),
  description: yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
  category: yup.string().required("Category is required").oneOf(categories, "Invalid category"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  stock: yup.number().required("Stock is required").min(0, "Stock cannot be negative"),
  images: yup.string()
    .required("At least one image URL is required")
    .test("urls", "Invalid URL format", function (value) {
      if (!value) return false
      const urls = value.split(",").map(url => url.trim())
      return urls.every(url => url.match(/^(http|https):\/\/[^ "]+$/))
    })
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    ...props.initialData,
    images: props.initialData.images?.join(", ") || ""
  }
})

const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField("title")
const { value: description, errorMessage: descriptionError, handleBlur: descriptionBlur } = useField("description")
const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField("category")
const { value: price, errorMessage: priceError, handleBlur: priceBlur } = useField("price")
const { value: stock, errorMessage: stockError, handleBlur: stockBlur } = useField("stock")
const { value: images, errorMessage: imagesError, handleBlur: imagesBlur } = useField("images")

onMounted(() => {
  if (props.initialData.images?.length) {
    imageUrls.value = props.initialData.images.join(", ")
  }
  console.log("FigureForm component mounted with initial data:", props.initialData)
})

const onSubmit = handleSubmit((values) => {
  const formData = {
    title: values.title,
    description: values.description,
    category: values.category,
    price: Number(values.price),
    stock: Number(values.stock),
    images: values.images.split(",").map(url => url.trim()).filter(url => url)
  }
  console.log("Form submitted with values:", formData)
  emit("submit", formData)
})

const onCancel = () => {
  console.log("Form cancelled")
  emit("cancel")
}

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
  <form ref="formRef" @submit="onSubmit" class="space-y-4 xs:space-y-6 sm:space-y-8">
    <FormGridContainer>
      <FormField v-model="title" label="Title" type="text" icon="pencil" placeholder="Enter figure title"
        :error="titleError" @blur="titleBlur" required />
      <FormField v-model="category" label="Category" type="select" icon="tags" placeholder="Select category"
        :options="categories" :error="categoryError" @blur="categoryBlur" required />
    </FormGridContainer>

    <FormField v-model="description" label="Description" type="textarea" icon="align-left"
      placeholder="Describe your figure" :error="descriptionError" @blur="descriptionBlur" required />

    <FormGridContainer :columns="3" :gap="4">
      <FormField v-model="price" label="Price" type="number" icon="dollar" placeholder="Enter price" :error="priceError"
        @blur="priceBlur" required />
      <FormField v-model="stock" label="Stock" type="number" icon="box" placeholder="Enter stock" :error="stockError"
        @blur="stockBlur" required />
      <FormField v-model="images" label="Images" type="text" icon="images"
        placeholder="Enter image URLs (comma-separated)" :error="imagesError" @blur="imagesBlur" required />
    </FormGridContainer>

    <div class="flex justify-end gap-2">
      <FormButton 
        v-if="showCancelButton" 
        :text="cancelButtonText" 
        size="full" 
        align="center" 
        variant="secondary" 
        type="button"
        @click="onCancel" 
      />
      <FormButton :text="submitButtonText" size="full" align="center" type="submit" />
    </div>
  </form>
</template>