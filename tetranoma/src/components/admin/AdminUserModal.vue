<script setup>
import { ref, computed, watch } from "vue";
import Title from "@/components/ui/Title.vue";
import Paragraph from "@/components/ui/Paragraph.vue";
import FormButton from "@/components/form/formButton/FormButton.vue";
import FormField from "@/components/form/formField/FormField.vue";
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  fields: {
    type: Array,
    required: true
  },
  submitButtonText: {
    type: String,
    default: "Запази"
  },
  cancelButtonText: {
    type: String,
    default: "Отказ"
  },
  columns: {
    type: Number,
    default: 1
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value)
  }
});

const emit = defineEmits(["update:modelValue", "update:formData", "submit", "cancel"]);

// Local copy of the form data
const localFormData = ref({...props.formData});

// Tracking changes in external data
watch(() => props.formData, (newVal) => {
  console.log("formData changed:", newVal);
  localFormData.value = {...newVal};
}, { deep: true });

// Tracking changes in modal visibility
watch(() => props.modelValue, (isOpen) => {
  console.log("Modal visibility changed:", isOpen);
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

// Calculating the modal size
const modalSizeClass = computed(() => {
  console.log("Computing modal size");
  switch (props.size) {
    case "small":
      return "max-w-md";
    case "medium":
      return "max-w-lg";
    case "large":
      return "max-w-2xl";
    default:
      return "max-w-lg";
  }
});

// Updating the field value
const updateField = (field, value) => {
  console.log(`Updating field ${field} with value:`, value);
  localFormData.value[field] = value;
  emit("update:formData", {...localFormData.value});
};

// Closing the modal
const closeModal = () => {
  console.log("Closing modal");
  emit("update:modelValue", false);
  emit("cancel");
};

// Sending the form
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted with data:", localFormData.value);
  emit("submit", {...localFormData.value});
  closeModal();
};

// Closing when clicking outside the modal
const handleBackdropClick = (e) => {
  if (e.target.classList.contains("modal-backdrop")) {
    console.log("Backdrop clicked, closing modal");
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" 
         class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-backdrop"
         @click="handleBackdropClick">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full p-6 m-4 shadow-xl transform transition-all duration-300"
           :class="modalSizeClass">
        
        <!-- Title and description -->
        <div class="mb-6">
          <Title type="subtitle" color="dark">{{ title }}</Title>
          <Paragraph v-if="description" color="transparent" size="small" class="mt-2">
            {{ description }}
          </Paragraph>
        </div>
        
        <!-- Form -->
        <form @submit="handleSubmit">
          <FormGridContainer :columns="columns" :gap="6">
            <div v-for="field in fields" :key="field.name">
              <FormField
                :model-value="localFormData[field.name] || ''"
                @update:model-value="(value) => updateField(field.name, value)"
                :label="field.label"
                :type="field.type || 'text'"
                :placeholder="field.placeholder || ''"
                :icon="field.icon || 'pencil'"
                :error="field.error || ''"
                :options="field.options || []"
                :required="field.required || false"
                :name="field.name"
              />
            </div>
          </FormGridContainer>
          
          <!-- Buttons -->
          <div class="flex justify-end gap-4 mt-8">
            <FormButton 
              :text="cancelButtonText" 
              type="button" 
              variant="outline" 
              size="1/4"
              align="end"
              @click="closeModal"
            />
            <FormButton 
              :text="submitButtonText" 
              type="submit" 
              variant="primary" 
              size="1/4"
              align="end"
            />
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  backdrop-filter: blur(2px);
}
</style>