<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex items-center justify-center  min-h-[calc(100vh-125px)] ">

        <div class="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full z-10 shadow-gray-400 dark:shadow-gray-900 dark:bg-gray-800 ">
            <h2 class="text-2xl font-bold text-center text-[#42BB8B] mb-6">Create Account</h2>
            <form>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-medium mb-2 dark:text-white">Name</label>
                    <input type="name" id="name" placeholder="Enter your name"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2 dark:text-white">Email</label>
                    <input type="email" id="email" placeholder="Enter your email"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2 dark:text-white">Password</label>
                    <input type="password" id="password" placeholder="Enter your password"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2 dark:text-white">Repeat Password</label>
                    <input type="password" id="password" placeholder="Enter your password"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required />
                </div>
                <button type="submit"
                    class="w-full bg-[#42BB8B] text-white font-bold py-2 rounded hover:bg-[#36a36b] transition duration-300 dark:bg-gray-700 dark:text-white">
                    Create Account
                </button>
            </form>
            <p class="text-center text-gray-600 mt-4 dark:text-white">
                You already have an account? <RouterLink to="/sign-in" class="text-[#42BB8B] hover:underline">Sign In</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>