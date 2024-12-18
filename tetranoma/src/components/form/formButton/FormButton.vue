<script setup>
import { computed } from "vue"

const props = defineProps({
    from: {
        type: String,
        default: ""
    },
    via: {
        type: String,
        default: ""
    },
    to: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    }, text: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ""
    },
    align: {
        type: String,
        default: "center",
        validator: (value) => ["start", "center", "end"].includes(value)
    },
    width: {
        type: String,
        default: "full",
        validator: (value) => ["full", "1/2", "1/3", "1/4"].includes(value)
    }
})

const getButtonColor = () => {
    if (props.from !== "" && props.via !== "" && props.to !== "") {
        return `bg-gradient-to-r from-${props.from} via-${props.via} to-${props.to}`
    } else if (props.color !== "") {
        return `bg-${props.color}`
    } else {
        return `bg-[#00BD7E]`
    }
}

const getIcon = () => {
    if (props.icon !== "") {
        return `pi pi-${props.icon}`
    }
}

const getWidth = computed(() => {
    console.log("Computing width:", props.width)
    const widthMap = {
        "full": "w-full",
        "1/2": "w-1/2",
        "1/3": "w-1/3",
        "1/4": "w-1/4"
    }
    return widthMap[props.width]
})
</script>

<template>
    <div class="flex items-center w-full" :class="`justify-${align}`">
        <button type="submit" class="group w-full
                 text-white py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6
                 rounded-lg xs:rounded-xl
                 text-sm xs:text-base sm:text-lg
                 hover:shadow-lg
                 active:scale-[0.98] transform transition-all duration-200
                 font-medium relative overflow-hidden" :class="[getWidth, getButtonColor()]">
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full
                      group-hover:translate-x-full transition-transform duration-700"></div>
            <i :class="getIcon()"></i>
            {{ text }}
        </button>
    </div>
</template>