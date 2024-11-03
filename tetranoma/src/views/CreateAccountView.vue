<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex items-center justify-center  min-h-[calc(100vh-125px)] ">

        <div class="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full shadow-gray-400 ">
            <h2 class="text-2xl font-bold text-center text-[#42BB8B] mb-6">Create Account</h2>
            <form>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
                    <input type="name" id="name" placeholder="Enter your name"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" id="email" placeholder="Enter your email"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
                    <input type="password" id="password" placeholder="Enter your password"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Repeat Password</label>
                    <input type="password" id="password" placeholder="Enter your password"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required />
                </div>
                <button type="submit"
                    class="w-full bg-[#42BB8B] text-white font-bold py-2 rounded hover:bg-[#36a36b] transition duration-300">
                    Create Account
                </button>
            </form>
            <p class="text-center text-gray-600 mt-4">
                You already have an account? <RouterLink to="/sign-in" class="text-[#42BB8B] hover:underline">Sign In</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
</style>