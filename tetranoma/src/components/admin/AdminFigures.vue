<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminStore } from "@/stores/useAdminStore";
import { useFiguresStore } from "@/stores/useFiguresStore";
import { useToast } from "vue-toastification";
import FigureForm from "@/components/form/figureForm/FigureForm.vue";
import Table from "@/components/ui/Table.vue";
import TableFilter from "@/components/ui/TableFilter.vue";
import FormField from "../form/formField/FormField.vue";
import FormButton from "../form/formButton/FormButton.vue";
import Title from "../ui/Title.vue";
import Paragraph from "../ui/Paragraph.vue";

const adminStore = useAdminStore();
const figuresStore = useFiguresStore();
const toast = useToast();

console.log("Initializing AdminFigures component");

// States
const filters = ref({
  category: "",
  search: "",
  minPrice: "",
  maxPrice: "",
});

const filterOptions = [
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "All categories", value: "" },
      { label: "Anime", value: "anime" },
      { label: "Games", value: "games" },
      { label: "Movies", value: "film" }
    ]
  },
  {
    key: "minPrice",
    label: "Minimum Price",
    type: "number"
  },
  {
    key: "maxPrice",
    label: "Maximum Price",
    type: "number"
  },
  {
    key: "search",
    label: "Search",
    type: "text",
    placeholder: "Search by title..."
  }
];

const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedFigure = ref(null);
const selectedUserId = ref("");
const users = ref([]);

// Table columns definition
const columns = ref([
  {
    field: "images",
    header: "Image",
    template: (data) => `<img src="${data.images[0]}" alt="Figure" class="h-16 w-16 object-cover rounded-lg">`,
    style: "width: 100px"
  },
  {
    field: "title",
    header: "Title",
    sortable: true
  },
  {
    field: "category",
    header: "Category",
    template: (data) => {
      const classes = {
        'anime': 'bg-purple-100 text-purple-800',
        'games': 'bg-blue-100 text-blue-800',
        'movies': 'bg-orange-100 text-orange-800'
      };
      return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes[data.category] || ''}">${data.category}</span>`;
    }
  },
  {
    field: "price",
    header: "Price",
    template: (data) => `${data.price} BGN`
  },
  {
    field: "stock",
    header: "Stock",
    template: (data) => {
      const classes = {
        high: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-red-100 text-red-800'
      };
      const stockLevel = data.stock > 10 ? 'high' : (data.stock > 0 ? 'medium' : 'low');
      return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes[stockLevel]}">${data.stock} pcs</span>`;
    }
  },
  {
    field: "userId",
    header: "Owner",
    template: (data) => {
      const user = users.value.find(u => u._id === data.userId);
      return user ? user.name : 'Unknown';
    }
  }
]);

// Computed values
const filteredFigures = computed(() => {
  console.log("Filtering figures");
  return figuresStore.figures.filter(figure => {
    const matchesSearch = !filters.value.search ||
      figure.title.toLowerCase().includes(filters.value.search.toLowerCase());
    const matchesCategory = !filters.value.category ||
      figure.category === filters.value.category;
    const matchesMinPrice = !filters.value.minPrice ||
      figure.price >= Number(filters.value.minPrice);
    const matchesMaxPrice = !filters.value.maxPrice ||
      figure.price <= Number(filters.value.maxPrice);

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
});

// Methods
const loadUsers = async () => {
  console.log("Loading users for figure assignment");
  try {
    const response = await adminStore.getAllUsersWithActivity();
    users.value = response.users;
  } catch (error) {
    console.error("Error loading users:", error);
    toast.error("Error loading users");
  }
};

const handleSearch = async () => {
  console.log("Searching figures with filters:", filters.value);
  try {
    await figuresStore.getFigures(1, filters.value);
  } catch (error) {
    console.error("Error during search:", error);
    toast.error("Error during search");
  }
};

const handleResetFilters = () => {
  filters.value = {
    category: "",
    search: "",
    minPrice: "",
    maxPrice: "",
  };
  handleSearch();
};

const handleCreateFigure = async (formData) => {
  console.log("Creating new figure for user:", selectedUserId.value);
  if (!selectedUserId.value) {
    toast.error("Please select a user");
    return;
  }

  try {
    await adminStore.createFigureAdmin({
      ...formData,
      targetUserId: selectedUserId.value
    });
    showCreateModal.value = false;
    selectedUserId.value = "";
    await figuresStore.getFigures();
    toast.success("Figure created successfully!");
  } catch (error) {
    console.error("Error creating figure:", error);
    toast.error("Error creating figure");
  }
};

const handleEditFigure = (figure) => {
  console.log("Opening edit modal for figure:", figure.title);
  selectedFigure.value = { ...figure };
  selectedUserId.value = figure.userId;
  showEditModal.value = true;
};

const handleUpdateFigure = async (formData) => {
  console.log("Updating figure:", selectedFigure.value.title);
  try {
    await adminStore.updateFigureAdmin(selectedFigure.value._id, {
      ...formData,
      targetUserId: selectedUserId.value
    });
    showEditModal.value = false;
    selectedUserId.value = "";
    await figuresStore.getFigures();
    toast.success("Figure updated successfully!");
  } catch (error) {
    console.error("Error updating figure:", error);
    toast.error("Error updating figure");
  }
};

const handleDeleteFigure = async (figure) => {
  console.log("Deleting figure:", figure._id);
  try {
    await adminStore.deleteFigureAdmin(figure._id, {
      targetUserId: figure.userId
    });
    await figuresStore.getFigures();
    toast.success("Figure deleted successfully!");
  } catch (error) {
    console.error("Error deleting figure:", error);
    toast.error("Error deleting figure");
  }
};

onMounted(async () => {
  console.log("Loading initial data");
  try {
    await Promise.all([
      figuresStore.getFigures(),
      loadUsers()
    ]);
  } catch (error) {
    console.error("Error loading data:", error);
    toast.error("Error loading data");
  }
});
</script>
<template>
  <div class="space-y-6">
    <!-- Page Title -->
    <Title type="subtitle" color="dark">Figures Management</Title>
    <Paragraph size="small" color="transparent">
      Manage all figures in the system. You can create, edit, and delete figures.
    </Paragraph>

    <!-- Filters -->
    <TableFilter :filters="filters" :filterOptions="filterOptions" @filter="handleSearch" @reset="handleResetFilters"
      @create="showCreateModal = true">
      <template #createButton>New Figure</template>
    </TableFilter>

    <!-- Figure List -->
    <Table :data="filteredFigures" :columns="columns" :expandable="true" tableClass="text-gray-800 dark:text-white bg-white dark:bg-gray-800"
      @edit="handleEditFigure" @delete="handleDeleteFigure">
      <!-- ... existing slots ... -->
    </Table>

    <!-- Create Figure Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-4xl">
        <Title type="subsubtitle" color="dark">Create New Figure</Title>

        <!-- User Selection -->
        <div class="my-4">
          <FormField v-model="selectedUserId" label="Select User" type="select" placeholder="Select user" icon="user"
            :options="users.map(user => ({ label: `${user.name} (${user.email})`, value: user._id }))" required />
        </div>

        <FigureForm submit-button-text="Create Figure" cancel-button-text="Cancel" @submit="handleCreateFigure"
          @cancel="showCreateModal = false" />
      </div>
    </div>

    <!-- Edit Figure Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-4xl">
        <Title type="subsubtitle" color="dark">Edit Figure</Title>

        <!-- User Selection -->
        <div class="my-4">
          <FormField v-model="selectedUserId" label="Transfer to Another User" type="select" icon="user"
            :options="users.map(user => ({ label: `${user.name} (${user.email})`, value: user._id }))" />
        </div>

        <FigureForm v-if="selectedFigure" :initial-data="selectedFigure" submit-button-text="Update Figure"
          cancel-button-text="Cancel" @submit="handleUpdateFigure" @cancel="showEditModal = false" />

      </div>
    </div>
  </div>
</template>