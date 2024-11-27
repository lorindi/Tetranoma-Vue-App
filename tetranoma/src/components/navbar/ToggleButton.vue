<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    isOpen: Boolean
});
const emit = defineEmits(['toggle']);

const handleClick = () => {
    emit('toggle');
};
</script>

<template>
    <button @click="handleClick" class="flex flex-col gap-[4.5px] cursor-pointer z-30">
        <div
            :class="['w-6 h-1 bg-[#42BB8B] rounded-sm origin-left ease-in-out duration-500', isOpen ? 'rotate-45' : '']">
        </div>
        <div :class="['w-6 h-1 bg-[#42BB8B] rounded-sm ease-in-out duration-500', isOpen ? 'opacity-0' : '']">
        </div>
        <div
            :class="['w-6 h-1 bg-[#42BB8B] rounded-sm origin-left ease-in-out duration-500', isOpen ? '-rotate-45' : '']">
        </div>
    </button>
</template>
