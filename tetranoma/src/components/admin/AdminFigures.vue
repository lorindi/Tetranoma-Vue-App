<script setup>
import { ref, onMounted, computed } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import { useFiguresStore } from "@/stores/useFiguresStore"
import { useToast } from "vue-toastification"
import FigureForm from "@/components/form/figureForm/FigureForm.vue"

const adminStore = useAdminStore()
const figuresStore = useFiguresStore()
const toast = useToast()

console.log("Initializing AdminFigures component")

// States
const filters = ref({
  category: "",
  search: "",
  minPrice: "",
  maxPrice: "",
})

const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedFigure = ref(null)
const selectedUserId = ref("")
const users = ref([])

// Computed values
const filteredFigures = computed(() => {
  console.log("Filtering figures")
  return figuresStore.figures.filter(figure => {
    const matchesSearch = !filters.value.search || 
      figure.title.toLowerCase().includes(filters.value.search.toLowerCase())
    const matchesCategory = !filters.value.category || 
      figure.category === filters.value.category
    const matchesMinPrice = !filters.value.minPrice || 
      figure.price >= Number(filters.value.minPrice)
    const matchesMaxPrice = !filters.value.maxPrice || 
      figure.price <= Number(filters.value.maxPrice)
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
  })
})

// Methods
const loadUsers = async () => {
  console.log("Loading users for figure assignment")
  try {
    const response = await adminStore.getAllUsersWithActivity()
    users.value = response.users
  } catch (error) {
    console.error("Error loading users:", error)
    toast.error("Error loading users")
  }
}

const handleSearch = async () => {
  console.log("Searching figures with filters:", filters.value)
  try {
    await figuresStore.getFigures(1, filters.value)
  } catch (error) {
    console.error("Error during search:", error)
    toast.error("Error during search")
  }
}

const handleCreateFigure = async (formData) => {
  console.log("Creating new figure for user:", selectedUserId.value)
  if (!selectedUserId.value) {
    toast.error("Please select a user")
    return
  }

  try {
    await adminStore.createFigureAdmin({
      ...formData,
      targetUserId: selectedUserId.value
    })
    showCreateModal.value = false
    selectedUserId.value = ""
    await figuresStore.getFigures()
    toast.success("Figure created successfully!")
  } catch (error) {
    console.error("Error creating figure:", error)
    toast.error("Error creating figure")
  }
}

const handleEditFigure = (figure) => {
  console.log("Opening edit modal for figure:", figure.title)
  selectedFigure.value = { ...figure }
  selectedUserId.value = figure.userId
  showEditModal.value = true
}

const handleUpdateFigure = async (formData) => {
  console.log("Updating figure:", selectedFigure.value.title)
  try {
    await adminStore.updateFigureAdmin(selectedFigure.value._id, {
      ...formData,
      targetUserId: selectedUserId.value
    })
    showEditModal.value = false
    selectedUserId.value = ""
    await figuresStore.getFigures()
    toast.success("Figure updated successfully!")
  } catch (error) {
    console.error("Error updating figure:", error)
    toast.error("Error updating figure")
  }
}

const handleDeleteFigure = async (figure) => {
  console.log("Deleting figure:", figure._id)
  if (confirm("Are you sure you want to delete this figure?")) {
    try {
      await adminStore.deleteFigureAdmin(figure._id, {
        targetUserId: figure.userId
      })
      await figuresStore.getFigures()
      toast.success("Figure deleted successfully!")
    } catch (error) {
      console.error("Error deleting figure:", error)
      toast.error("Error deleting figure")
    }
  }
}

onMounted(async () => {
  console.log("Loading initial data")
  try {
    await Promise.all([
      figuresStore.getFigures(),
      loadUsers()
    ])
  } catch (error) {
    console.error("Error loading data:", error)
    toast.error("Error loading data")
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select v-model="filters.category" 
                  class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option value="">All categories</option>
            <option value="anime">Anime</option>
            <option value="games">Games</option>
            <option value="film">Movies</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Minimum Price
          </label>
          <input type="number" v-model="filters.minPrice"
                 class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Maximum Price
          </label>
          <input type="number" v-model="filters.maxPrice"
                 class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <input type="text" v-model="filters.search" 
                 placeholder="Search by title..."
                 class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>
      </div>

      <div class="mt-4 flex justify-between">
        <button @click="showCreateModal = true"
                class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
          <i class="pi pi-plus mr-2"></i>
          New Figure
        </button>
        
        <div class="flex gap-4">
          <button @click="filters = {category: '', search: '', minPrice: '', maxPrice: ''}"
                  class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            Clear Filters
          </button>
          <button @click="handleSearch"
                  class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Figure List -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Owner
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="figure in filteredFigures" :key="figure._id" 
                class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="figure.images[0]" alt="Figure" 
                     class="h-16 w-16 object-cover rounded-lg">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-300">
                  {{ figure.title }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="{
                        'bg-purple-100 text-purple-800': figure.category === 'anime',
                        'bg-blue-100 text-blue-800': figure.category === 'games',
                        'bg-orange-100 text-orange-800': figure.category === 'movies'
                      }">
                  {{ figure.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ figure.price }} BGN
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': figure.stock > 10,
                        'bg-yellow-100 text-yellow-800': figure.stock <= 10 && figure.stock > 0,
                        'bg-red-100 text-red-800': figure.stock === 0
                      }">
                  {{ figure.stock }} pcs
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ users.find(u => u._id === figure.userId)?.name || 'Unknown' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="handleEditFigure(figure)"
                          class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button @click="handleDeleteFigure(figure)"
                          class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Figure Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-4xl">
        <h2 class="text-xl font-bold mb-4">Create New Figure</h2>
        
        <!-- User Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select User
          </label>
          <select v-model="selectedUserId" 
                  class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 mb-4">
            <option value="">Select user</option>
            <option v-for="user in users" :key="user._id" :value="user._id">
              {{ user.name }} ({{ user.email }})
            </option>
          </select>
        </div>

        <FigureForm 
          submit-button-text="Create Figure" 
          @submit="handleCreateFigure" 
        />
        <div class="flex justify-end mt-4">
          <button @click="showCreateModal = false" 
                  class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Figure Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-4xl">
        <h2 class="text-xl font-bold mb-4">Edit Figure</h2>
        
        <!-- User Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Transfer to Another User
          </label>
          <select v-model="selectedUserId" 
                  class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 mb-4">
            <option v-for="user in users" :key="user._id" :value="user._id">
              {{ user.name }} ({{ user.email }})
            </option>
          </select>
        </div>

        <FigureForm 
          v-if="selectedFigure"
          :initial-data="selectedFigure"
          submit-button-text="Update Figure" 
          @submit="handleUpdateFigure" 
        />
        <div class="flex justify-end mt-4">
          <button @click="showEditModal = false" 
                  class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>