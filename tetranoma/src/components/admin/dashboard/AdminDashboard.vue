<script setup>
import { ref, onMounted, computed } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import StatCard from "./stats/StatCard.vue"
import ChartCard from "./charts/ChartCard.vue"
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
  BarElement,
  Filler
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
  BarElement,
  Filler
)

const adminStore = useAdminStore()

// Statistics
const stats = ref({
  totalUsers: 0,
  totalFigures: 0,
  totalOrders: 0,
  revenue: 0
})

// Computed values
const statCards = computed(() => [
  {
    title: "Total Users",
    value: stats.value.totalUsers,
    icon: "pi-users"
  },
  {
    title: "Total Figures",
    value: stats.value.totalFigures,
    icon: "pi-box"
  },
  {
    title: "Total Orders",
    value: stats.value.totalOrders,
    icon: "pi-shopping-cart"
  },
  {
    title: "Total Revenue",
    value: `${stats.value.revenue?.[0]?.total?.toFixed(2) || 0} BGN`,
    icon: "pi-money-bill"
  }
])

const chartConfigs = computed(() => ({
  revenue: {
    title: "Monthly Revenue",
    component: Line,
    data: revenueData.value,
    options: lineOptions,
    colspan: "col-span-2"
  },
  orders: {
    title: "Orders by Status",
    component: Pie,
    data: ordersByStatusData.value,
    options: pieOptions
  },
  users: {
    title: "Top Users by Orders",
    component: Bar,
    data: userActivityData.value,
    options: barOptions
  }
}))

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
    label: "Orders Count",
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
      <StatCard v-for="card in statCards" :key="card.title" v-bind="card" />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard v-for="(config, key) in chartConfigs" :key="key" :title="config.title"
        :chart-component="config.component" :data="config.data" :options="config.options" :colspan="config.colspan" />
    </div>
  </div>
</template>