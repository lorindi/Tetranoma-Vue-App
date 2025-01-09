<script setup>
import { ref, onMounted, computed } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import { useToast } from "vue-toastification"

const adminStore = useAdminStore()
const toast = useToast()

console.log("Initializing AdminOrders component")

// States
const filters = ref({
  status: "",
  startDate: "",
  endDate: "",
  search: ""
})

// Computed values
const orderStatusOptions = computed(() => [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" }
])

const statusColors = {
  pending: "bg-orange-100 text-orange-600",
  paid: "bg-green-100 text-green-600",
  shipped: "bg-blue-100 text-blue-600",
  delivered: "bg-emerald-100 text-emerald-600"
}

const statusTranslations = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered"
}

// Methods
const handleStatusChange = async (orderId, newStatus) => {
  console.log("Updating order status", { orderId, newStatus })
  try {
    await adminStore.updateOrderStatus(orderId, newStatus)
    toast.success("Status updated successfully")
  } catch (error) {
    console.error("Error updating status:", error)
    toast.error("Error updating status")
  }
}

const applyFilters = async () => {
  console.log("Applying filters:", filters.value)
  try {
    await adminStore.getAllOrders(filters.value)
  } catch (error) {
    console.error("Error applying filters:", error)
    toast.error("Error filtering orders")
  }
}

const resetFilters = () => {
  console.log("Resetting filters")
  filters.value = {
    status: "",
    startDate: "",
    endDate: "",
    search: ""
  }
  applyFilters()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

// Initialization
onMounted(async () => {
  console.log("Loading orders data")
  try {
    await adminStore.getAllOrders()
  } catch (error) {
    console.error("Error loading orders:", error)
    toast.error("Error loading orders")
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select v-model="filters.status" class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <option v-for="option in orderStatusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
          <input type="date" v-model="filters.startDate" class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
          <input type="date" v-model="filters.endDate" class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <input type="text" v-model="filters.search" placeholder="Search by name or email..." 
                 class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700">
        </div>
      </div>

      <div class="mt-4 flex justify-end space-x-4">
        <button @click="resetFilters" 
                class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          Clear
        </button>
        <button @click="applyFilters" 
                class="px-4 py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a]">
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Orders List -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="order in adminStore.orders" :key="order._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ order._id.slice(-6).toUpperCase() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {{ order.userId?.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ order.userId?.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[statusColors[order.status], 'px-3 py-1 rounded-full text-xs font-semibold']">
                  {{ statusTranslations[order.status] }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ order.totalPrice.toFixed(2) }} BGN
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <select 
                  :value="order.status"
                  @change="handleStatusChange(order._id, $event.target.value)"
                  class="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option v-for="option in orderStatusOptions.filter(o => o.value)" 
                          :key="option.value" 
                          :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>