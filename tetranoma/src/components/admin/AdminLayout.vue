<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/useAuthStore"
import { useAdminStore } from "@/stores/useAdminStore"
import { useToast } from "vue-toastification"
import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"

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
    console.log("Logging out...")
    await authStore.signOut()
    toast.success("Successfully logged out")
    router.push("/sign-in")
  } catch (error) {
    console.error("Error during logout:", error)
    toast.error("Error logging out")
  }
}

const toggleSidebar = () => {
  console.log("Toggling sidebar")
  sidebar.value = !sidebar.value
}
</script>

<template>
  <div class="flex w-full h-screen bg-gray-100 dark:bg-gray-900 relative">

    <!--Mobile sidebar button-->
    <FormButton 
      text=""
      icon="bars"
      @click="toggleSidebar"
      variant="secondary"
      size="1/4"
      type="button"
      class="md:hidden fixed top-4 right-4 z-50"
      v-if="!sidebar"
    />
    
    <FormButton 
      text=""
      icon="times"
      @click="toggleSidebar"
      variant="secondary"
      size="1/4"
      type="button"
      class="md:hidden fixed top-4 right-4 z-50"
      v-else
    />

    <!--Sidebar with conditional classes-->
    <div :class="[
      'flex flex-col w-[300px] bg-white dark:bg-gray-800 shadow-lg h-screen transition-all duration-300',
      'fixed md:relative',
      sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
      <!--Logo-->
      <div class="flex items-center justify-center border-b dark:border-gray-700 p-4">
        <Title type="subsubtitle" color="primary" align="center">Admin Panel</Title>
      </div>

      <div class="flex flex-col justify-between h-full">

        <!--Navigation-->
        <nav class="px-4 py-6 space-y-2 ">
          <router-link v-for="item in navigation" :key="item.path" :to="item.path"
            class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-[#00BD7E]/10 text-[#00BD7E]': $route.path === item.path }">
            <i :class="['pi', item.icon, 'mr-3 text-lg']"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>

         <!--Exit button-->
        <div class="p-4 border-t dark:border-gray-700">
          <FormButton 
            text="Logout"
            icon="sign-out"
            @click="handleLogout"
            variant="outline"
            size="full"
            type="button"
            class="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500"
          />
        </div>
      </div>
    </div>

    <!--Main content-->
    <div class="h-full w-full">
      <!--Header-->
      <header class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 ">
        <div class="px-6 py-[26px]">
          <Title type="subsubtitle" color="dark">
            {{ navigation.find(item => item.path === $route.path)?.name || "Admin Panel" }}
          </Title>
          <Paragraph v-if="$route.meta?.description" size="small" color="transparent">
            {{ $route.meta.description }}
          </Paragraph>
        </div>
      </header>

      <!--Content-->
      <main class="w-full p-6 h-[calc(100vh-85px)] overflow-y-auto 
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
        scrollbar-track-gray-100 dark:scrollbar-track-gray-800 
        hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>