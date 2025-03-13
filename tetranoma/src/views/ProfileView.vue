<script setup>
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from "@/stores/useAuthStore"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { storeToRefs } from "pinia"
import FiguresList from "@/components/lists/FiguresList.vue"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"

import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"
import FormField from "@/components/form/formField/FormField.vue"


const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const figuresStore = useFiguresStore()
const { user } = storeToRefs(authStore)

const activeTab = ref("favorites")
const isEditing = ref(false)
const editedUser = ref({})

const userFavorites = ref([])
const userCreatedFigures = ref([])
const userStats = ref({
    figuresCount: 0,
    ordersCount: 0
})

const tabs = [
    { id: "favorites", label: "Favorite Figures", icon: "pi-heart" },
    { id: "created", label: "Created Figures", icon: "pi-box" },
    { id: "info", label: "Profile Information", icon: "pi-user" }
]

onMounted(async () => {
    try {
        // Load profile information
        const profileResponse = await authStore.getProfile()
        userStats.value = profileResponse.user.stats

        // Load favorite figures
        const favoritesResponse = await figuresStore.getFavorites()
        userFavorites.value = favoritesResponse?.favorites || []

        // Load created figures
        const myFiguresResponse = await figuresStore.getMyFigures()
        userCreatedFigures.value = myFiguresResponse || []

        editedUser.value = { ...user.value }
    } catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Error loading data")
    }
})

const handleEditProfile = () => {
    isEditing.value = true
    editedUser.value = { ...user.value }
}

const handleSaveProfile = async () => {
    try {
        await authStore.updateProfile(editedUser.value)
        isEditing.value = false
        toast.success("Profile updated successfully")
    } catch (error) {
        console.error("Error updating profile:", error)
        toast.error("Error updating profile")
    }
}

const handleLogout = async () => {
    try {
        await authStore.signOut()
        toast.success("Successfully logged out")
        router.push("/sign-in")
    } catch (error) {
        console.error("Error logging out:", error)
        toast.error("Error logging out")
    }
}

const handleDeleteProfile = async () => {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
        try {
            await authStore.deleteProfile()
            toast.success("Profile deleted successfully")
            router.push("/")
        } catch (error) {
            console.error("Error deleting profile:", error)
            toast.error("Error deleting profile")
        }
    }
}
</script>

<template>
    <div class="flex flex-col w-full max-w-[1336px] min-h-[80vh] p-4 mt-[30px] md:p-8">
        <!-- Profile Header -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="w-32 h-32 rounded-full bg-[#00BD7E]/10 flex items-center justify-center">
                    <img v-if="user.avatar" :src="user.avatar" :alt="user.name"
                        class="w-full h-full object-cover rounded-full" />
                    <i v-else class="pi pi-user text-[#00BD7E] text-4xl"></i>
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-2xl font-bold mb-2">{{ user.name }}</h1>
                    <p class="text-gray-600 dark:text-gray-400">{{ user.email }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-500">
                        Joined on {{ new Date(user.createdAt).toLocaleDateString() }}
                    </p>
                    <div class="flex gap-4 mt-4 justify-center md:justify-start">
                        <div class="text-center">
                            <p class="font-bold text-[#00BD7E]">{{ userStats.figuresCount }}</p>
                            <p class="text-sm text-gray-500">Figures</p>
                        </div>
                        <div class="text-center">
                            <p class="font-bold text-[#00BD7E]">{{ userStats.ordersCount }}</p>
                            <p class="text-sm text-gray-500">Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="bg-white dark:bg-gray-800 rounded-xl rounded-b-none shadow-lg mb-8">
            <div class="flex overflow-x-auto">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'flex-1 px-4 py-3 text-center transition-colors',
                    activeTab === tab.id
                        ? 'text-[#00BD7E] border-b-2 border-[#00BD7E]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#00BD7E]'
                ]">
                    <i :class="['pi', tab.icon, 'mr-2']"></i>
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Tab Content -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 dark:shadow-none">
            <!-- Favorites Tab -->
            <div v-if="activeTab === 'favorites'" class="space-y-6">
                <h2 class="text-xl font-semibold mb-4">Favorite Figures</h2>
                <FiguresList v-if="userFavorites?.length" :figures="userFavorites" />
                <p v-else class="text-center text-gray-600 dark:text-gray-400">
                    You don't have any favorite figures yet
                </p>
            </div>

            <!-- Created Figures Tab -->
            <div v-if="activeTab === 'created'" class="space-y-6">
                <h2 class="text-xl font-semibold mb-4">Created Figures</h2>
                <FiguresList v-if="userCreatedFigures?.length" :figures="userCreatedFigures" />
                <p v-else class="text-center text-gray-600 dark:text-gray-400">
                    You haven't created any figures yet
                </p>
            </div>

            <!-- Profile Info Tab -->
            <div v-if="activeTab === 'info'" class="max-w-2xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold">Profile Information</h2>
                    <div class="flex gap-2">
                        <button v-if="!isEditing" @click="handleEditProfile"
                            class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
                            <i class="pi pi-pencil mr-2"></i>
                            Edit
                        </button>
                        <button @click="handleLogout"
                            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            <i class="pi pi-sign-out mr-2"></i>
                            Logout
                        </button>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Avatar Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Avatar
                        </label>
                        <div class="flex items-center gap-4">
                            <div
                                class="w-24 h-24 rounded-full bg-[#00BD7E]/10 flex items-center justify-center overflow-hidden">
                                <img v-if="isEditing ? editedUser.avatar : user.avatar"
                                    :src="isEditing ? editedUser.avatar : user.avatar" :alt="user.name"
                                    class="w-full h-full object-cover" />
                                <i v-else class="pi pi-user text-[#00BD7E] text-2xl"></i>
                            </div>
                            <div v-if="isEditing" class="flex-1">
                                <input v-model="editedUser.avatar" placeholder="Enter avatar URL"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BD7E] dark:bg-gray-700" />
                                <p class="text-sm text-gray-500 mt-1">Enter the URL of your avatar image</p>
                            </div>
                        </div>
                    </div>

                    <!-- Name and Email Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input v-if="isEditing" v-model="editedUser.name"
                                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BD7E] dark:bg-gray-700" />
                            <p v-else class="text-gray-900 dark:text-gray-100">{{ user.name }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input v-if="isEditing" v-model="editedUser.email"
                                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BD7E] dark:bg-gray-700" />
                            <p v-else class="text-gray-900 dark:text-gray-100">{{ user.email }}</p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div v-if="isEditing" class="flex justify-end gap-4">
                        <button @click="isEditing = false"
                            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                            Cancel
                        </button>
                        <button @click="handleSaveProfile"
                            class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
                            Save
                        </button>
                    </div>

                    <!-- Delete Profile Button -->
                    <div class="border-t pt-6 mt-6">
                        <button @click="handleDeleteProfile"
                            class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
                            <i class="pi pi-trash mr-2"></i>
                            Delete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>