<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/useAuthStore"
import { useAdminStore } from "@/stores/useAdminStore"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const adminStore = useAdminStore()

console.log("Admin layout initialized")

const navigation = ref([
  { 
    name: "Dashboard", 
    icon: "pi-chart-bar",
    path: "/admin",
    component: "AdminDashboard" 
  },
  { 
    name: "Users", 
    icon: "pi-users",
    path: "/admin/users",
    component: "AdminUsers"
  },
  { 
    name: "Orders", 
    icon: "pi-shopping-cart",
    path: "/admin/orders",
    component: "AdminOrders"
  },
  { 
    name: "Figures", 
    icon: "pi-box",
    path: "/admin/figures", 
    component: "AdminFigures"
  }
])

const handleLogout = async () => {
  try {
    await authStore.signOut()
    toast.success("Successfully logged out")
    router.push("/sign-in")
  } catch (error) {
    console.error("Error during logout:", error)
    toast.error("Error logging out")
  }
}
</script>

<template>
  <div class="flex h-[100vh] bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 border-b dark:border-gray-700">
          <span class="text-xl font-bold text-[#00BD7E]">Admin Panel</span>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <router-link
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-[#00BD7E]/10 text-[#00BD7E]': $route.path === item.path }"
          >
            <i :class="['pi', item.icon, 'mr-3 text-lg']"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t dark:border-gray-700">
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
          >
            <i class="pi pi-sign-out mr-3 text-lg"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-900 shadow-md dark:shadow-none">
        <div class="px-6 py-4">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
            {{ navigation.find(item => item.path === $route.path)?.name || "Admin Panel" }}
          </h1>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>