<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: "",
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text",
    validator: (value) => ["text", "number", "textarea", "select", "url"].includes(value)
  },
  placeholder: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: ""
  },
  options: {
    type: Array,
    default: () => []
  },
  step: {
    type: String,
    default: "1"
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue", "blur"])

const updateValue = (event) => {
  let value = event.target.value
  
  if (props.type === "number") {
    value = Number(value)
  } else if (props.type === "url") {
    value = value.trim()
  }
  
  emit("update:modelValue", value)
}

const handleBlur = () => {
  console.log("Field blur triggered")
  emit("blur")
}

const inputClasses = computed(() => `
  w-full pl-8 xs:pl-10 pr-3 xs:pr-4 
  py-3 xs:py-3.5 sm:py-4 
  text-sm xs:text-base
  bg-gray-50 dark:bg-gray-900/50 rounded-lg xs:rounded-xl
  border border-gray-200 dark:border-gray-700
  focus:ring-2 focus:ring-blue-500 focus:border-transparent
  dark:text-white transition-all duration-300
  placeholder:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/70
  ${props.type === "select" ? "appearance-none pr-8 xs:pr-10" : ""}
  ${props.type === "textarea" ? "min-h-[100px] xs:min-h-[120px]" : ""}
`)

// Проверка дали опциите са обекти или низове
const isObjectOptions = computed(() => {
  return props.options.length > 0 && typeof props.options[0] === 'object' && props.options[0] !== null;
})
</script>

<template>
  <div class="group relative w-full">
    <label v-if="label" class="px-2 text-sm xs:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <i :class="`pi pi-${icon} absolute left-2 xs:left-3 
              top-[52.5px] -translate-y-1/2
              text-gray-400 group-focus-within:text-blue-500 transition-colors
              text-sm xs:text-base`"></i>

    <template v-if="type === 'textarea'">
      <textarea :value="modelValue" @input="updateValue" @blur="handleBlur" :placeholder="placeholder"
        :class="inputClasses"></textarea>
    </template>

    <template v-else-if="type === 'select'">
      <select :value="modelValue" @change="updateValue" @blur="handleBlur" :class="inputClasses">
        <option value="">{{ placeholder }}</option>
        <!-- Обработка на опции като обекти -->
        <template v-if="isObjectOptions">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </template>
        <!-- Обработка на опции като низове -->
        <template v-else>
          <option v-for="option in options" :key="option" :value="option">
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
          </option>
        </template>
      </select>
      <i class="pi pi-chevron-down absolute right-2 xs:right-3 top-[52.5px] -translate-y-1/2 
                text-gray-400 group-focus-within:text-blue-500 transition-colors 
                pointer-events-none text-sm xs:text-base"></i>
    </template>

    <template v-else>
      <input :value="modelValue" @input="updateValue" @blur="handleBlur" :type="type"
        :step="type === 'number' ? step : undefined" :placeholder="placeholder" :class="inputClasses" />
    </template>

    <span v-if="error" class="absolute -bottom-5 left-0 text-red-500 text-xs">{{ error }}</span>
  </div>
</template>