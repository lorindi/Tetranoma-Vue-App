<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

// Dummy data
const tableData = ref([
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Sam Brown", age: 40 },
]);

// Columns definition
const columns = ref([
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "age", header: "Age" },
]);

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
};

const isExpanded = (rowData) => {
  return expandedRows.value.some(d => d.id === rowData.id);
};

// CRUD operations
const deleteDialog = ref(false);
const itemToDelete = ref(null);

const createNew = () => {
  console.log("Creating new item");
  // Add logic for creating a new record here
  // For example, opening a dialog or redirecting to a form
};

const editItem = (item) => {
  console.log("Editing item:", item);
  // Add logic for editing a record here
  // For example, opening a dialog with an edit form
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
  console.log("Confirming delete for item:", item);
};

const deleteItem = () => {
  if (itemToDelete.value) {
    // Delete record from the array
    tableData.value = tableData.value.filter(item => item.id !== itemToDelete.value.id);
    console.log("Item deleted:", itemToDelete.value);
    
    // Close the dialog
    deleteDialog.value = false;
    itemToDelete.value = null;
  }
};


</script>


<template>
  <div class="flex flex-col gap-3">
    <!-- Create button outside the table -->
    <div class="flex justify-end">
      <Button 
        icon="pi pi-plus" 
        label="Create new" 
        @click="createNew" 
        class="p-button-success"

      />
    </div>

    <DataTable 
    :value="tableData" 
      v-model:expandedRows="expandedRows"
      rowExpandMode="row"
      class="bg-gray-700" 
    >


      <!-- Toggle column -->
      <Column :expander="true" headerStyle="width: 3rem" class="bg-gray-700">
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

      <!-- Other columns -->
      <Column 
        v-for="(col, index) in columns"
        :key="index"
        :field="col.field"
        :header="col.header"
        :sortable="true"
        class="bg-gray-700" 
      />

      <!-- Actions column -->
      <Column header="Actions" :exportable="false" class="bg-gray-700">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button 
              icon="pi pi-pencil" 
              @click="editItem(slotProps.data)" 
              class="p-button-rounded p-button-success p-button-sm" 
              title="Edit"
            />
            <Button 
              icon="pi pi-trash" 
              @click="confirmDelete(slotProps.data)" 
              class="p-button-rounded p-button-danger p-button-sm" 
              title="Delete"
            />
          </div>
        </template>
      </Column>

      <!-- Expanded content slot -->
      <template #expansion="slotProps">
        <div class="p-3 bg-surface-100">
          <h5>Details for {{ slotProps.data.name }}</h5>
          <p>Additional information here...</p>
          <pre>{{ JSON.stringify(slotProps.data, null, 2) }}</pre>
        </div>
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