<script setup>
import { ref, onMounted, computed } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import { Line, Pie, Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

const adminStore = useAdminStore()
console.log("Initializing AdminDashboard")

// Statistics
const stats = ref({
  totalUsers: 0,
  totalFigures: 0,
  totalOrders: 0,
  revenue: 0
})

// Chart data
const ordersByStatusData = computed(() => ({
  labels: ["Pending", "Paid", "Shipped", "Delivered"],
  datasets: [{
    data: [
      adminStore.orders.filter(o => o.status === "pending").length,
      adminStore.orders.filter(o => o.status === "paid").length,
      adminStore.orders.filter(o => o.status === "shipped").length,
      adminStore.orders.filter(o => o.status === "delivered").length
    ],
    backgroundColor: [
      "#FFA500",
      "#00BD7E",
      "#4169E1",
      "#32CD32"
    ]
  }]
}))

const revenueData = computed(() => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    label: "Revenue (BGN)",
    data: calculateMonthlyRevenue(),
    borderColor: "#00BD7E",
    tension: 0.4,
    fill: true,
    backgroundColor: "rgba(0, 189, 126, 0.1)"
  }]
}))

const userActivityData = computed(() => ({
  labels: adminStore.users.slice(0, 5).map(u => u.name),
  datasets: [{
    label: "Orders",
    data: adminStore.users.slice(0, 5).map(u => u.activity?.ordersCount || 0),
    backgroundColor: "#00BD7E"
  }]
}))

// Helper functions
const calculateMonthlyRevenue = () => {
  const monthlyRevenue = new Array(12).fill(0)
  
  adminStore.orders.forEach(order => {
    if (order.status === "paid") {
      const month = new Date(order.createdAt).getMonth()
      monthlyRevenue[month] += order.totalPrice
    }
  })
  
  return monthlyRevenue
}

// Chart options
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top"
    }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top"
    }
  }
}

onMounted(async () => {
  console.log("Loading dashboard data")
  try {
    await Promise.all([
      adminStore.getDashboardStats(),
      adminStore.getAllOrders(),
      adminStore.getAllUsersWithActivity()
    ])
    
    stats.value = adminStore.stats
  } catch (error) {
    console.error("Error loading dashboard data:", error)
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 class="text-2xl font-bold">{{ stats.totalUsers }}</h3>
          </div>
          <i class="pi pi-users text-3xl text-[#00BD7E]"></i>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Total Figures</p>
            <h3 class="text-2xl font-bold">{{ stats.totalFigures }}</h3>
          </div>
          <i class="pi pi-box text-3xl text-[#00BD7E]"></i>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Total Orders</p>
            <h3 class="text-2xl font-bold">{{ stats.totalOrders }}</h3>
          </div>
          <i class="pi pi-shopping-cart text-3xl text-[#00BD7E]"></i>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Total Revenue</p>
            <h3 class="text-2xl font-bold">{{ stats.revenue?.[0]?.total?.toFixed(2) || 0 }} BGN</h3>
          </div>
          <i class="pi pi-money-bill text-3xl text-[#00BD7E]"></i>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Monthly Revenue -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Monthly Revenue</h3>
        <div class="h-[300px]">
          <Line :data="revenueData" :options="lineOptions" />
        </div>
      </div>

      <!-- Orders by Status -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Orders by Status</h3>
        <div class="h-[300px]">
          <Pie :data="ordersByStatusData" :options="pieOptions" />
        </div>
      </div>

      <!-- Top Users by Activity -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2">
        <h3 class="text-xl font-semibold mb-4">Top Users by Orders</h3>
        <div class="h-[300px]">
          <Bar :data="userActivityData" :options="barOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
