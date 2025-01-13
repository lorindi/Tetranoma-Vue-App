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
const sidebar = ref(false)

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

const toggleSidebar = () => {
  sidebar.value = !sidebar.value
}
</script>

<template>
  <div class="flex w-full h-screen bg-gray-100 dark:bg-gray-900 relative">

    <button @click="toggleSidebar"
      class="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
      <i :class="[
        'pi',
        sidebar ? 'pi-times' : 'pi-bars',
        'text-gray-600 dark:text-gray-300'
      ]"></i>
    </button>
    <!-- Sidebar with conditional classes -->
    <div :class="[
      'flex flex-col w-[300px] bg-white dark:bg-gray-800 shadow-lg h-screen transition-all duration-300',
      'fixed md:relative',
      sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="flex items-center justify-center border-b dark:border-gray-700 p-4">
        <span class="text-xl font-bold text-[#00BD7E] px-4 py-3">Admin Panel</span>

      </div>

      <div class="flex flex-col justify-between h-full">

        <!-- Navigation -->
        <nav class="px-4 py-6 space-y-2 ">
          <router-link v-for="item in navigation" :key="item.path" :to="item.path"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-[#00BD7E]/10 text-[#00BD7E]': $route.path === item.path }">
            <i :class="['pi', item.icon, 'mr-3 text-lg']"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t dark:border-gray-700">
          <button @click="handleLogout"
            class="flex items-center w-full px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors">
            <i class="pi pi-sign-out mr-3 text-lg"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="h-full w-full">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 ">
        <div class="px-6 py-[26px]">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
            {{ navigation.find(item => item.path === $route.path)?.name || "Admin Panel" }}
          </h1>
        </div>
      </header>

      <!-- Page Content -->
      <main class="w-full p-6 h-[calc(100vh-85px)] overflow-y-auto 
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
        scrollbar-track-gray-100 dark:scrollbar-track-gray-800 
        hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>