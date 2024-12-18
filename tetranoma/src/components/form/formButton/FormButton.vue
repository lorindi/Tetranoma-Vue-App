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
    }, align: {
        type: String,
        default: "center",
        validator: (value) => ["start", "center", "end"].includes(value)
    },size: {
        type: String,
        default: "full",
        validator: (value) => ["full", "1/2", "1/3", "1/4"].includes(value)
    }

})


const getIcon = () => {
    if (props.icon !== "") {
        return `pi pi-${props.icon}`
    }
}

const justifyClass = computed(() => {
    console.log("Current align value:", props.align)
    const alignMap = {
        start: "justify-center md:justify-start",
        center: "justify-center md:justify-center",
        end: "justify-center md:justify-end"
    }
    return alignMap[props.align] || "justify-center"
})

const sizeClass = computed(() => {
    console.log("Current size value:", props.size)
    const sizeMap = {
        full: "w-full",
        "1/2": "w-full md:w-1/2",
        "1/3": "w-full md:w-1/3",
        "1/4": "w-full md:w-1/4"
    }
    return sizeMap[props.size] || "w-full"
})
</script>

<template>
    <div class="flex items-center w-full" :class="justifyClass">
        <button type="submit" class="group my-4
                 text-white py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6
                 rounded-lg xs:rounded-xl
                 text-sm xs:text-base sm:text-lg
                 hover:shadow-lg
                 active:scale-[0.98] transform transition-all duration-200
                 font-medium relative overflow-hidden bg-[#00BD7E]" :class="sizeClass">
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full
                      group-hover:translate-x-full transition-transform duration-700"></div>
            <i :class="getIcon()"></i>
            {{ text }}
        </button>
    </div>
</template>