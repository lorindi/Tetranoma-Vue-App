<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission here
  console.log({ email: email.value, password: password.value });
};
</script>

<template>
    <div class="flex items-center justify-center  min-h-[calc(100vh-125px)] ">

        <div class="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full shadow-gray-400 ">
            <h2 class="text-2xl font-bold text-center text-[#42BB8B] mb-6">Sign In</h2>
            <form @submit="handleSubmit">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                    <input 
                        v-model="email"
                        type="email" 
                        id="email" 
                        placeholder="Enter your email"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required 
                    />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
                    <input 
                        v-model="password"
                        type="password" 
                        id="password" 
                        placeholder="Enter your password"
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#42BB8B] focus:border-transparent"
                        required 
                    />
                </div>

                <button type="submit"
                    class="w-full bg-[#42BB8B] text-white font-bold py-2 rounded hover:bg-[#36a36b] transition duration-300">
                    Sign In
                </button>
            </form>
            <p class="text-center text-gray-600 mt-4">
                Don't have an account? <RouterLink to="/create-account" class="text-[#42BB8B] hover:underline">Create
                    Account</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped></style>