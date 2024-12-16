<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const schema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email must be valid'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\W]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('Password is required'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Repeat Password is required')

})
const { handleSubmit } = useForm({
    validationSchema: schema
})
const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField('name')
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField('password')
const { value: repeatPassword, errorMessage: repeatPasswordError, handleBlur: repeatPasswordBlur } = useField('repeatPassword')

const onSubmit = handleSubmit(async (values) => {
    try {
        await authStore.createAccount(values)
        toast.success('Account created successfully')
        router.push('/sign-in')
    } catch (err) {
        console.error(err)
        toast.error('Failed to create account')
    }
})
</script>

<template>
    <div class="flex items-center justify-center  min-h-[calc(100vh-125px)] ">

        <div
            class="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full z-10 shadow-gray-400 dark:shadow-gray-900 dark:bg-gray-800 ">
            <h2 class="text-2xl font-bold text-center text-[#42BB8B] mb-6">Create Account</h2>
            <form @submit="onSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-medium mb-2 dark:text-white">Name</label>
                    <input type="name" id="name" placeholder="Enter your name" v-model="name" @blur="nameBlur"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <span v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</span>
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2 dark:text-white">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" v-model="email" @blur="emailBlur"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <span v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2 dark:text-white">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" v-model="password"
                        @blur="passwordBlur"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <span v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</span>
                </div>
                <div class="mb-6">
                    <label for="repeatPassword" class="block text-gray-700 font-medium mb-2 dark:text-white">Repeat
                        Password</label>
                    <input type="password" id="repeatPassword" placeholder="Enter your password" v-model="repeatPassword"
                        @blur="repeatPasswordBlur"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <span v-if="repeatPasswordError" class="text-red-500 text-sm mt-1">{{ repeatPasswordError }}</span>
                </div>
                <button type="submit"
                    class="w-full bg-[#42BB8B] text-white font-bold py-2 rounded hover:bg-[#36a36b] transition duration-300 dark:bg-gray-700 dark:text-white">
                    Create Account
                </button>
            </form>
            <p class="text-center text-gray-600 mt-4 dark:text-white">
                You already have an account? <RouterLink to="/sign-in" class="text-[#42BB8B] hover:underline">Sign In
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped></style>