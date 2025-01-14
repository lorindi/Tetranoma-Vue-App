<script setup>
import { ref, onMounted, computed } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import { useToast } from "vue-toastification"

const adminStore = useAdminStore()
const toast = useToast()


// State
const filters = ref({
  role: "",
  search: ""
})

const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedUser = ref(null)
const newUser = ref({
  name: "",
  email: "",
  password: "",
  role: "user"
})

// Computed
const filteredUsers = computed(() => {
  return adminStore.users
})

const roleOptions = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" }
]

// Methods
const handleSearch = async () => {
  try {
    await adminStore.getAllUsersWithActivity(filters.value)
  } catch (error) {
    console.error("Search error:", error)
  }
}

const handleCreateUser = async () => {
  try {
    await adminStore.createUser(newUser.value)
    showCreateModal.value = false
    await adminStore.getAllUsersWithActivity()
    newUser.value = { name: "", email: "", password: "", role: "user" }
  } catch (error) {
    console.error("Create user error:", error)
  }
}

const handleEditUser = (user) => {
  selectedUser.value = { ...user }
  showEditModal.value = true
}

const handleUpdateUser = async () => {
  try {
    await adminStore.updateUser(selectedUser.value._id, selectedUser.value)
    showEditModal.value = false
    await adminStore.getAllUsersWithActivity()
  } catch (error) {
    console.error("Update user error:", error)
  }
}

const handleDeleteUser = async (userId) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await adminStore.deleteUser(userId)
      await adminStore.getAllUsersWithActivity()
    } catch (error) {
      console.error("Delete user error:", error)
    }
  }
}

const handleRoleChange = async (userId, newRole) => {
  try {
    await adminStore.updateUserRole(userId, newRole)
  } catch (error) {
    console.error("Role change error:", error)
  }
}

onMounted(async () => {
  try {
    await adminStore.getAllUsersWithActivity()
  } catch (error) {
    console.error("Error loading users:", error)
    toast.error("Error loading users")
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Filters and Search -->
    <div class="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
      <div class="flex-1">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search by name or email..."
          class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          @input="handleSearch"
        />
      </div>
      <div class="w-full md:w-48">
        <select
          v-model="filters.role"
          class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          @change="handleSearch"
        >
          <option value="">All roles</option>
          <option v-for="option in roleOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <button
        @click="showCreateModal = true"
        class="px-6 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00BD7E]/90 transition-colors"
      >
        <i class="pi pi-plus mr-2"></i>
        New User
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Activity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr v-for="user in filteredUsers" :key="user._id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-[#00BD7E]/10 flex items-center justify-center">
                    <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="w-full h-full object-cover rounded-full" />
                    <i v-else class="pi pi-user text-[#00BD7E]"></i>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div>Orders: {{ user.activity?.ordersCount || 0 }}</div>
                  <div>Figures: {{ user.activity?.figuresCount || 0 }}</div>
                  <div>Total Spent: {{ user.activity?.totalSpent?.toFixed(2) || 0 }} BGN</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <select
                  :value="user.role"
                  @change="handleRoleChange(user._id, $event.target.value)"
                  class="px-3 py-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                >
                  <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    @click="handleEditUser(user)"
                    class="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button
                    @click="handleDeleteUser(user._id)"
                    class="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create User Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">New User</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="newUser.name"
              type="text"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <input
              v-model="newUser.password"
              type="password"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Role</label>
            <select
              v-model="newUser.role"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            @click="handleCreateUser"
            class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00BD7E]/90"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="selectedUser.name"
              type="text"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="selectedUser.email"
              type="email"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Role</label>
            <select
              v-model="selectedUser.role"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button
            @click="showEditModal = false"
            class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            @click="handleUpdateUser"
            class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00BD7E]/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>