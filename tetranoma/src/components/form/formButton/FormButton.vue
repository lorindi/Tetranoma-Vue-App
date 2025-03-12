<script setup>
import { computed } from "vue"

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "submit"
    }, 
    align: {
        type: String,
        default: "center",
        validator: (value) => ["start", "center", "end"].includes(value)
    },
    size: {
        type: String,
        default: "full",
        validator: (value) => ["full", "1/2", "1/3", "1/4"].includes(value)
    },
    variant: {
        type: String,
        default: "primary",
        validator: (value) => ["primary", "secondary", "outline"].includes(value)
    }
})

const getIcon = () => {
    if (props.icon !== "") {
        return `pi pi-${props.icon}`
    }
}

const justifyClass = computed(() => {
    const alignMap = {
        start: "justify-center md:justify-start",
        center: "justify-center md:justify-center",
        end: "justify-center md:justify-end"
    }
    return alignMap[props.align] || "justify-center"
})

const sizeClass = computed(() => {
    const sizeMap = {
        full: "w-full",
        "1/2": "w-full md:w-1/2",
        "1/3": "w-full md:w-1/3",
        "1/4": "w-full md:w-1/4"
    }
    return sizeMap[props.size] || "w-full"
})

const variantClass = computed(() => {
    const variantMap = {
        primary: "bg-[#00BD7E] text-white",
        secondary: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white",
        outline: "bg-transparent border border-[#00BD7E] text-[#00BD7E] dark:text-[#00BD7E]"
    }
    return variantMap[props.variant] || "bg-[#00BD7E] text-white"
})
</script>

<template>
    <div class="flex items-center" :class="justifyClass">
        <button :type="type" class="group h-10 md:h-12
                 py-2 px-4 md:px-6
                 rounded-lg
                 text-sm md:text-base
                 hover:shadow-lg
                 active:scale-[0.98] transform transition-all duration-200
                 font-medium relative overflow-hidden flex items-center justify-center gap-2" 
                 :class="[sizeClass, variantClass]">
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full
                      group-hover:translate-x-full transition-transform duration-700"></div>
            <i v-if="icon" :class="getIcon()" class="mr-1"></i>
            <span v-if="text">{{ text }}</span>
            <slot></slot>
        </button>
    </div>
</template>