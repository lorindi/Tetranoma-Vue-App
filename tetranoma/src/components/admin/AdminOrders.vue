<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminStore } from "@/stores/useAdminStore";
import { useToast } from "vue-toastification";
import Table from "@/components/ui/Table.vue";
import TableFilter from "@/components/ui/TableFilter.vue";
import Title from "@/components/ui/Title.vue";
import Paragraph from "@/components/ui/Paragraph.vue";
import FormField from "@/components/form/formField/FormField.vue";

const adminStore = useAdminStore();
const toast = useToast();

console.log("Initializing AdminOrders component");

// States
const filters = ref({
  status: "",
  startDate: "",
  endDate: "",
  search: ""
});

// Filter options
const filterOptions = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      // { label: "All", value: "all" },
      { label: "Pending", value: "pending" },
      { label: "Paid", value: "paid" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" }
    ]
  },
  {
    key: "startDate",
    label: "From Date",
    type: "date"
  },
  {
    key: "endDate",
    label: "To Date",
    type: "date"
  },
  {
    key: "search",
    label: "Search",
    type: "text",
    placeholder: "Search by name or email..."
  }
];

// Table columns
const columns = ref([
  { 
    field: "_id", 
    header: "Order ID",
    template: (data) => data._id.slice(-6).toUpperCase()
  },
  { 
    field: "userId", 
    header: "Customer",
    template: (data) => {
      return `
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-300">
            ${data.userId?.name || 'Unknown'}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            ${data.userId?.email || 'No email'}
          </div>
        </div>
      `;
    }
  },
  { 
    field: "createdAt", 
    header: "Date",
    template: (data) => formatDate(data.createdAt)
  },
  { 
    field: "status", 
    header: "Status",
    template: (data) => {
      const statusColors = {
        pending: "bg-orange-100 text-orange-600",
        paid: "bg-green-100 text-green-600",
        shipped: "bg-blue-100 text-blue-600",
        delivered: "bg-emerald-100 text-emerald-600"
      };
      
      const statusTranslations = {
        pending: "Pending",
        paid: "Paid",
        shipped: "Shipped",
        delivered: "Delivered"
      };
      
      return `<span class="${statusColors[data.status]} px-3 py-1 rounded-full text-xs font-semibold">
        ${statusTranslations[data.status]}
      </span>`;
    }
  },
  { 
    field: "totalPrice", 
    header: "Amount",
    template: (data) => `${data.totalPrice.toFixed(2)} BGN`
  }
]);

// Status options for dropdown
const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" }
];

// Methods
const handleStatusChange = async (order, newStatus) => {
  console.log("Updating order status", { orderId: order._id, newStatus });
  try {
    await adminStore.updateOrderStatus(order._id, newStatus);
    toast.success("Status updated successfully");
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Error updating status");
  }
};

const applyFilters = async () => {
  console.log("Applying filters:", filters.value);
  try {
    await adminStore.getAllOrders(filters.value);
  } catch (error) {
    console.error("Error applying filters:", error);
    toast.error("Error filtering orders");
  }
};

const resetFilters = () => {
  console.log("Resetting filters");
  filters.value = {
    status: "",
    startDate: "",
    endDate: "",
    search: ""
  };
  applyFilters();
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Initialization
onMounted(async () => {
  console.log("Loading orders data");
  try {
    await adminStore.getAllOrders();
  } catch (error) {
    console.error("Error loading orders:", error);
    toast.error("Error loading orders");
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Title -->
    <Title type="subtitle" color="dark">Orders Management</Title>
    <Paragraph size="small" color="transparent">
      View and manage all orders in the system. You can update order status and filter orders by various criteria.
    </Paragraph>

    <!-- Filters -->
    <TableFilter 
      :filters="filters" 
      :filterOptions="filterOptions"
      @filter="applyFilters"
      @reset="resetFilters"
    />

    <!-- Orders Table -->
    <Table 
      :data="adminStore.orders" 
      :columns="columns"
      tableClass="text-gray-800 dark:text-white bg-white dark:bg-gray-800"
      :actions="false"
    >
      <!-- Custom status column -->
      <template #status="{ data, onChange }">
        <FormField
          :modelValue="data.status"
          @update:modelValue="handleStatusChange(data, $event)"
          type="select"
          icon="tag"
          :options="statusOptions"
          class="status-select"
        />
      </template>
    </Table>
  </div>
</template>

<style scoped>


/* Коригиране на позицията на иконата */
.status-select :deep(.pi-tag) {
  top: 50%;
}

/* Коригиране на позицията на стрелката надолу */
.status-select :deep(.pi-chevron-down) {
  top: 50%;
}
</style>