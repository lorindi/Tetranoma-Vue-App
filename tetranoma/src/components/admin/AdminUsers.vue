<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminStore } from "@/stores/useAdminStore";
import { useToast } from "vue-toastification";
import Table from "@/components/ui/Table.vue";
import TableFilter from "@/components/ui/TableFilter.vue";
import AdminUserModal from "@/components/admin/AdminUserModal.vue";

const adminStore = useAdminStore();
const toast = useToast();

// State
const filters = ref({
  role: "",
  search: ""
});

// Filter options
const filterOptions = [
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "All roles", value: "" },
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" }
    ]
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
    field: "user", 
    header: "User",
    template: (data) => {
      return `
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-[#00BD7E]/10 flex items-center justify-center">
            ${data.avatar ? 
              `<img src="${data.avatar}" alt="${data.name}" class="w-full h-full object-cover rounded-full" />` : 
              '<i class="pi pi-user text-[#00BD7E]"></i>'}
          </div>
          <div class="ml-4">
            <div class="font-medium text-gray-900 dark:text-white">${data.name}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${data.email}</div>
          </div>
        </div>
      `;
    }
  },
  { 
    field: "activity", 
    header: "Activity",
    template: (data) => {
      return `
        <div class="text-sm">
          <div>Orders: ${data.activity?.ordersCount || 0}</div>
          <div>Figures: ${data.activity?.figuresCount || 0}</div>
          <div>Total Spent: ${data.activity?.totalSpent?.toFixed(2) || 0} BGN</div>
        </div>
      `;
    }
  }
]);

// Модални състояния
const showModal = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);

// Полета за формата
const userFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter user name",
    icon: "user",
    required: true
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter user email",
    icon: "envelope",
    required: true
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    icon: "lock",
    required: false
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select role",
    icon: "id-card",
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" }
    ],
    required: true
  }
];

// Изчислени свойства за модала
const modalTitle = computed(() => isEditMode.value ? "Edit User" : "Create User");
const modalSubmitText = computed(() => isEditMode.value ? "Update" : "Create");

// Методи
const handleSearch = async () => {
  console.log("Searching with filters:", filters.value);
  try {
    await adminStore.getAllUsersWithActivity(filters.value);
  } catch (error) {
    console.error("Search error:", error);
    toast.error("Error searching users");
  }
};

const resetFilters = () => {
  console.log("Resetting filters");
  filters.value = {
    role: "",
    search: ""
  };
  handleSearch();
};

const openCreateModal = () => {
  console.log("Opening create modal");
  isEditMode.value = false;
  selectedUser.value = {
    name: "",
    email: "",
    password: "",
    role: "user"
  };
  showModal.value = true;
};

const openEditModal = (user) => {
  console.log("Opening edit modal for user:", user.name);
  isEditMode.value = true;
  selectedUser.value = { ...user };
  showModal.value = true;
};

const handleSubmit = async (formData) => {
  console.log("Form submitted:", formData);
  try {
    if (isEditMode.value) {
      // Обновяване на потребител
      await adminStore.updateUser(formData._id, formData);
      toast.success("User updated successfully");
    } else {
      // Създаване на нов потребител
      await adminStore.createUser(formData);
      toast.success("User created successfully");
    }
    // Презареждане на данните
    await adminStore.getAllUsersWithActivity();
  } catch (error) {
    console.error("User operation error:", error);
    toast.error(isEditMode.value ? "Error updating user" : "Error creating user");
  }
};

const handleDeleteUser = async (user) => {
  console.log("Deleting user:", user.name);
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await adminStore.deleteUser(user._id);
      await adminStore.getAllUsersWithActivity();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Error deleting user");
    }
  }
};

const handleRoleChange = async (user, newRole) => {
  console.log("Changing role for user:", user.name, "to:", newRole);
  try {
    await adminStore.updateUserRole(user._id, newRole);
    toast.success("Role updated successfully");
  } catch (error) {
    console.error("Role change error:", error);
    toast.error("Error updating role");
  }
};

onMounted(async () => {
  console.log("Loading users data");
  try {
    await adminStore.getAllUsersWithActivity();
  } catch (error) {
    console.error("Error loading users:", error);
    toast.error("Error loading users");
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Filters -->
    <TableFilter 
      :filters="filters" 
      :filterOptions="filterOptions"
      @filter="handleSearch"
      @reset="resetFilters"
      @create="openCreateModal"
    >
      <template #createButton>New User</template>
    </TableFilter>

    <!-- Users Table -->
    <Table 
      :data="adminStore.users" 
      :columns="columns"
      tableClass="text-gray-800 dark:text-white bg-white dark:bg-gray-800"
      @edit="openEditModal"
      @delete="handleDeleteUser"
    >
      <!-- Custom role column -->
      <template #column-role="{ data }">
        <select
          :value="data.role"
          @change="handleRoleChange(data, $event.target.value)"
          class="px-3 py-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
        >
          <option v-for="option in userFields[3].options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </template>
    </Table>

    <!-- Reusable modal component -->
    <AdminUserModal
      v-model="showModal"
      :title="modalTitle"
      description="Manage user information"
      v-model:form-data="selectedUser"
      :fields="userFields"
      :submit-button-text="modalSubmitText"
      cancel-button-text="Cancel"
      @submit="handleSubmit"
    />
  </div>
</template>