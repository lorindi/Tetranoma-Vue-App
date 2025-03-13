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
                    <Title type="subtitle" align="left" color="dark">{{ user.name }}</Title>
                    <Paragraph color="transparent" size="small">{{ user.email }}</Paragraph>
                    <Paragraph color="transparent" size="small">
                        Joined on {{ new Date(user.createdAt).toLocaleDateString() }}
                    </Paragraph>
                    <div class="flex gap-4 mt-4 justify-center md:justify-start">
                        <div class="text-center">
                            <Title type="minortitle" align="center" color="primary">{{ userStats.figuresCount }}</Title>
                            <Paragraph color="transparent" size="small" align="center">Figures</Paragraph>
                        </div>
                        <div class="text-center">
                            <Title type="minortitle" align="center" color="primary">{{ userStats.ordersCount }}</Title>
                            <Paragraph color="transparent" size="small" align="center">Orders</Paragraph>
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
                <Title type="subsubtitle" align="left" color="dark">Favorite Figures</Title>
                <FiguresList v-if="userFavorites?.length" :figures="userFavorites" />
                <Paragraph v-else color="transparent" size="medium" align="center">
                    You don't have any favorite figures yet
                </Paragraph>
            </div>

            <!-- Created Figures Tab -->
            <div v-if="activeTab === 'created'" class="space-y-6">
                <Title type="subsubtitle" align="left" color="dark">Created Figures</Title>
                <FiguresList v-if="userCreatedFigures?.length" :figures="userCreatedFigures" />
                <Paragraph v-else color="transparent" size="medium" align="center">
                    You haven't created any figures yet
                </Paragraph>
            </div>

            <!-- Profile Info Tab -->
            <div v-if="activeTab === 'info'" class="max-w-2xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <Title type="subsubtitle" align="left" color="dark">Profile Information</Title>
                    <div class="flex gap-2">
                        <FormButton 
                            v-if="!isEditing" 
                            @click="handleEditProfile"
                            text="Edit" 
                            icon="pencil" 
                            type="button"
                            variant="primary"
                            size="1/4"
                        />
                        <FormButton 
                            @click="handleLogout"
                            text="Logout" 
                            icon="sign-out" 
                            type="button"
                            variant="secondary"
                            size="1/4"
                        />
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Avatar Section -->
                    <div>
                        <Paragraph color="primary" size="small">Avatar</Paragraph>
                        <div class="flex items-center gap-4">
                            <div
                                class="w-24 h-24 rounded-full bg-[#00BD7E]/10 flex items-center justify-center overflow-hidden">
                                <img v-if="isEditing ? editedUser.avatar : user.avatar"
                                    :src="isEditing ? editedUser.avatar : user.avatar" :alt="user.name"
                                    class="w-full h-full object-cover" />
                                <i v-else class="pi pi-user text-[#00BD7E] text-2xl"></i>
                            </div>
                            <div v-if="isEditing" class="flex-1">
                                <FormField
                                    v-model="editedUser.avatar"
                                    placeholder="Enter avatar URL"
                                    icon="image"
                                    type="url"
                                />
                                <Paragraph color="transparent" size="small">Enter the URL of your avatar image</Paragraph>
                            </div>
                        </div>
                    </div>

                    <!-- Name and Email Fields -->
                    <FormGridContainer :columns="2" :gap="6">
                        <div>
                            <Paragraph color="primary" size="small">Name</Paragraph>
                            <FormField
                                v-if="isEditing"
                                v-model="editedUser.name"
                                placeholder="Your name"
                                icon="user"
                            />
                            <Paragraph v-else color="primary" size="medium">{{ user.name }}</Paragraph>
                        </div>

                        <div>
                            <Paragraph color="primary" size="small">Email</Paragraph>
                            <FormField
                                v-if="isEditing"
                                v-model="editedUser.email"
                                placeholder="Your email"
                                icon="envelope"
                                type="text"
                            />
                            <Paragraph v-else color="primary" size="medium">{{ user.email }}</Paragraph>
                        </div>
                    </FormGridContainer>

                    <!-- Action Buttons -->
                    <div v-if="isEditing" class="flex justify-end gap-4">
                        <FormButton 
                            @click="isEditing = false"
                            text="Cancel" 
                            type="button"
                            variant="outline"
                            size="1/4"
                            align="end"
                        />
                        <FormButton 
                            @click="handleSaveProfile"
                            text="Save" 
                            icon="check"
                            type="button"
                            variant="primary"
                            size="1/4"
                            align="end"
                        />
                    </div>

                    <!-- Delete Profile Button -->
                    <div class="border-t pt-6 mt-6">
                        <FormButton 
                            @click="handleDeleteProfile"
                            text="Delete Profile" 
                            icon="trash"
                            type="button"
                            variant="primary"
                            size="1/3"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>