<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FormField from "../form/formField/FormField.vue";
import FormButton from "../form/formButton/FormButton.vue";
import FormGridContainer from "../form/formGridContainer/FormGridContainer.vue";
import Title from "./Title.vue";
import Paragraph from "./Paragraph.vue";

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  filterOptions: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["filter", "reset", "create"]);

console.log("TableFilter component initialized with options:", props.filterOptions);

const handleFilter = () => {
  console.log("Applying filters:", props.filters);
  emit("filter", props.filters);
};

const handleReset = () => {
  console.log("Resetting filters");
  emit("reset");
};

const handleCreate = () => {
  console.log("Create button clicked");
  emit("create");
};

// Преобразуване на опциите за FormField
const getIconForType = (type) => {
  switch(type) {
    case 'select': return 'list';
    case 'date': return 'calendar';
    case 'number': return 'hashtag';
    default: return 'search';
  }
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg">
    <!-- Заглавие и описание, ако са предоставени -->
    <div v-if="title || description" class="mb-4">
      <Title v-if="title" type="subsubtitle" color="dark">{{ title }}</Title>
      <Paragraph v-if="description" size="small" color="transparent">{{ description }}</Paragraph>
    </div>

    <!-- Филтри с FormGridContainer и FormField -->
    <FormGridContainer :columns="4" :gap="4" :mobileColumns="1">
      <div v-for="(option, index) in filterOptions" :key="index">
        <FormField
          v-model="filters[option.key]"
          :label="option.label"
          :type="option.type"
          :placeholder="option.placeholder || ''"
          :icon="getIconForType(option.type)"
          :options="option.options || []"
        />
      </div>
    </FormGridContainer>

    <!-- Бутони за действия -->
    <div class="mt-6 flex justify-between items-center">
  <div>
    <FormButton 
      v-if="$slots.createButton"
      text=""
      @click="handleCreate"
      align="center"
      size="full"
      icon="plus"
      type="button"
    >
      <template #default>
        <slot name="createButton">Create New</slot>
      </template>
    </FormButton>
  </div>
  
  <div class="flex gap-2">
    <FormButton 
      text="Clear"
      @click="handleReset"
      align="center"
      size="full"
      variant="secondary"
      type="button"
    />
    
    <FormButton 
      text="Apply"
      @click="handleFilter"
      align="center"
      size="full"
      icon="filter"
      type="button"
    />
  </div>
</div>
  </div>
</template>