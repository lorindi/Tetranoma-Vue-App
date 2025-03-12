<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const tableData = ref([
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Sam Brown", age: 40 },
]);

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
  </script>


<template>
  <DataTable 
    :value="tableData" 
    v-model:expandedRows="expandedRows"
    rowExpandMode="row"
  >
    <!-- Toggle column -->
    <Column :expander="true" headerStyle="width: 3rem">
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
      sortable
    />

    <!-- Expanded content -->
    <template #expansion="slotProps">
      <div class="p-3 bg-surface-100">
        <h5>Details for {{ slotProps.data.name }}</h5>
        <p>Additional information here...</p>
        <pre>{{ JSON.stringify(slotProps.data, null, 2) }}</pre>
      </div>
    </template>
  </DataTable>
  </template>

  
  
  <style>
  </style>