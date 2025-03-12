<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminStore } from "@/stores/useAdminStore";
import { useToast } from "vue-toastification";
import Table from "@/components/ui/Table.vue";
import TableFilter from "@/components/ui/TableFilter.vue";

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

const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedUser = ref(null);
const newUser = ref({
  name: "",
  email: "",
  password: "",
  role: "user"
});

// Role options
const roleOptions = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" }
];

// Methods
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

const handleCreateUser = async () => {
  console.log("Creating new user");
  try {
    await adminStore.createUser(newUser.value);
    showCreateModal.value = false;
    await adminStore.getAllUsersWithActivity();
    newUser.value = { name: "", email: "", password: "", role: "user" };
    toast.success("User created successfully");
  } catch (error) {
    console.error("Create user error:", error);
    toast.error("Error creating user");
  }
};

const handleEditUser = (user) => {
  console.log("Editing user:", user.name);
  selectedUser.value = { ...user };
  showEditModal.value = true;
};

const handleUpdateUser = async () => {
  console.log("Updating user:", selectedUser.value.name);
  try {
    await adminStore.updateUser(selectedUser.value._id, selectedUser.value);
    showEditModal.value = false;
    await adminStore.getAllUsersWithActivity();
    toast.success("User updated successfully");
  } catch (error) {
    console.error("Update user error:", error);
    toast.error("Error updating user");
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
      @create="showCreateModal = true"
    >
      <template #createButton>New User</template>
    </TableFilter>

    <!-- Users Table -->
    <Table 
      :data="adminStore.users" 
      :columns="columns"
      tableClass="text-gray-800 dark:text-white bg-white dark:bg-gray-800"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
    >
      <!-- Custom role column -->
      <template #column-role="{ data }">
        <select
          :value="data.role"
          @change="handleRoleChange(data, $event.target.value)"
          class="px-3 py-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
        >
          <option v-for="option in roleOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </template>
    </Table>

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