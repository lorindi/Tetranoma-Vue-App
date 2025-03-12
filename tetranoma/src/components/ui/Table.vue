<script setup>
import { ref, defineEmits } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const props = defineProps({
  // Table data
  data: {
    type: Array,
    required: true
  },
  // Column definitions
  columns: {
    type: Array,
    required: true
  },
  // Enable row expansion
  expandable: {
    type: Boolean,
    default: false
  },
  // Enable actions column
  actions: {
    type: Boolean,
    default: true
  },
  // Enable row selection
  selectable: {
    type: Boolean,
    default: false
  },
  // Table style
  tableClass: {
    type: String,
    default: "bg-gray-700"
  },
  // Loading state
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["edit", "delete", "create", "row-toggle", "status-change", "row-select"]);

// Row expansion logic
const expandedRows = ref([]);

const toggleRow = (rowData) => {
  const index = expandedRows.value.findIndex(d => d.id === rowData.id);
  if (index >= 0) {
    expandedRows.value.splice(index, 1);
    console.log("Row collapsed:", rowData.id);
  } else {
    expandedRows.value.push(rowData);
    console.log("Row expanded:", rowData.id);
  }
  emit("row-toggle", rowData, expandedRows.value);
};

const isExpanded = (rowData) => {
  return expandedRows.value.some(d => d.id === rowData.id);
};

// CRUD operations
const deleteDialog = ref(false);
const itemToDelete = ref(null);

const createNew = () => {
  console.log("Creating new item");
  emit("create");
};

const editItem = (item) => {
  console.log("Editing item:", item);
  emit("edit", item);
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
  console.log("Confirming delete for item:", item);
};

const deleteItem = () => {
  if (itemToDelete.value) {
    console.log("Item deleted:", itemToDelete.value);
    emit("delete", itemToDelete.value);
    
    // Close the dialog
    deleteDialog.value = false;
    itemToDelete.value = null;
  }
};

// Handle status change
const handleStatusChange = (item, newStatus) => {
  console.log("Status changed for item:", item, "New status:", newStatus);
  emit("status-change", item, newStatus);
};

// Handle row selection
const onRowSelect = (event) => {
  console.log("Row selected:", event.data);
  emit("row-select", event.data);
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Create button outside the table -->
    <div v-if="$slots.createButton" class="flex justify-end">
      <slot name="createButton">
        <Button 
          icon="pi pi-plus" 
          label="Create new" 
          @click="createNew" 
          class="p-button-success"
        />
      </slot>
    </div>

    <DataTable 
      :value="data" 
      v-model:expandedRows="expandedRows"
      :rowClass="$attrs.rowClass"
      :selection="selectable ? $attrs.selection : null"
      :selectionMode="selectable ? 'single' : null"
      @row-select="onRowSelect"
      rowExpandMode="row"
      :class="tableClass"
      :loading="loading"
      v-bind="$attrs"
    >
      <!-- Toggle column for expandable rows -->
      <Column v-if="expandable" :expander="true" headerStyle="width: 3rem" :class="tableClass">
        <template #body="slotProps">
          <button 
            @click="toggleRow(slotProps.data)"
            class="p-link"
          >
            <i class="pi" :class="{
              'pi-chevron-down': !isExpanded(slotProps.data),
              'pi-chevron-up': isExpanded(slotProps.data)
            }"></i>
          </button>
        </template>
      </Column>

      <!-- Dynamic columns -->
      <template v-for="(col, index) in columns" :key="index">
        <!-- Column with custom template -->
        <Column 
          v-if="col.template"
          :field="col.field" 
          :header="col.header"
          :sortable="col.sortable !== false"
          :class="tableClass"
          :style="col.style"
          :headerStyle="col.headerStyle"
        >
          <template #body="slotProps">
            <slot :name="`column-${col.field}`" :data="slotProps.data" :column="col">
              <!-- Default rendering if no slot provided -->
              <div v-html="col.template(slotProps.data)"></div>
            </slot>
          </template>
        </Column>
        
        <!-- Standard column -->
        <Column 
          v-else
          :field="col.field" 
          :header="col.header"
          :sortable="col.sortable !== false"
          :class="tableClass"
          :style="col.style"
          :headerStyle="col.headerStyle"
        />
      </template>

      <!-- Actions column -->
      <Column v-if="actions" header="Actions" :exportable="false" :class="tableClass">
        <template #body="slotProps">
          <slot name="actions" :data="slotProps.data">
            <div class="flex gap-2">
              <Button 
                icon="pi pi-pencil" 
                @click="editItem(slotProps.data)" 
                class="p-button-success p-button-sm" 
                title="Edit"
              />
              <Button 
                icon="pi pi-trash" 
                @click="confirmDelete(slotProps.data)" 
                class="p-button-danger p-button-sm" 
                title="Delete"
              />
            </div>
          </slot>
        </template>
      </Column>

      <!-- Status column with dropdown -->
      <Column v-if="$slots.status" header="Status" :exportable="false" :class="tableClass">
        <template #body="slotProps">
          <slot name="status" :data="slotProps.data" :onChange="handleStatusChange" />
        </template>
      </Column>

      <!-- Expanded content slot -->
      <template #expansion="slotProps">
        <slot name="expansion" :data="slotProps.data">
          <div class="p-3 bg-gray-800">
            <h5>Details for {{ slotProps.data.name || slotProps.data.title }}</h5>
            <p>Additional information here...</p>
            <pre>{{ JSON.stringify(slotProps.data, null, 2) }}</pre>
          </div>
        </slot>
      </template>

      <!-- Empty state -->
      <template #empty>
        <slot name="empty">
          <div class="p-4 text-center text-gray-500 dark:text-gray-400">
            No records found
          </div>
        </slot>
      </template>

      <!-- Loading state -->
      <template #loading>
        <slot name="loading">
          <div class="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading data...
          </div>
        </slot>
      </template>
    </DataTable>

    <!-- Delete confirmation dialog -->
    <Dialog 
      v-model:visible="deleteDialog" 
      :style="{width: '450px'}" 
      header="Confirmation" 
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete this record?</span>
      </div>
      <template #footer>
        <Button 
          label="No" 
          icon="pi pi-times" 
          @click="deleteDialog = false" 
          class="p-button-text" 
        />
        <Button 
          label="Yes" 
          icon="pi pi-check" 
          @click="deleteItem" 
          class="p-button-danger" 
        />
      </template>
    </Dialog>
  </div>
</template>

<style>
.p-button-sm {
  width: 2rem;
  height: 2rem;
}

/* Styles for table header */
.p-datatable .p-datatable-thead > tr > th {
  @apply bg-gray-700;
}

/* Styles for expanded row */
.p-datatable .p-datatable-tbody > tr.p-datatable-row-expansion > td {
  @apply bg-gray-800;
}
</style>