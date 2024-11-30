<script setup>
import { RouterLink } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField("email")
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField("password")

console.log("Form fields state:", { email, emailError, password, passwordError })

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted with values:", values)
  try {
    await authStore.login(values)
    toast.success("Successfully logged in!")
    router.push("/")
  } catch (error) {
    console.error("Login error:", error)
    toast.error("Login failed. Please try again.")
  }
})
</script>

<template>
    <div class="flex items-center justify-center min-h-[calc(100vh-125px)]">
      <div class="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full z-10 shadow-gray-400 dark:shadow-gray-900 dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-center text-[#42BB8B] mb-6">Sign In</h2>
        
        <form @submit="onSubmit">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2 dark:text-white">Email</label>
            <input 
              v-model="email"
              type="email" 
              id="email" 
              placeholder="Enter your email"
              @blur="emailBlur"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <span v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
          </div>
  
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-2 dark:text-white">Password</label>
            <input 
              v-model="password"
              type="password" 
              id="password" 
              placeholder="Enter your password"
              @blur="passwordBlur"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
          </div>
  
          <button type="submit"
            class="w-full bg-[#42BB8B] text-white font-bold py-2 rounded hover:bg-[#36a36b] transition duration-300">
            Sign In
          </button>
        </form>
  
        <p class="text-center text-gray-600 mt-4">
          Don't have an account? 
          <RouterLink to="/create-account" class="text-[#42BB8B] hover:underline">
            Create Account
          </RouterLink>
        </p>
      </div>
    </div>
  </template>