<script setup>
const props = defineProps({
  columns: {
    type: Object,
    default: () => ({
      default: 1,
      md: 2
    })
  },
  gap: {
    type: Object,
    default: () => ({
      default: 4,
      md: 4
    })
  },
  width: {
    type: String,
    default: "full"
  }
})

console.log("GridContainer props:", props)

const gridClasses = computed(() => {
  const baseClasses = ["grid"]
  
  // Add columns classes
  baseClasses.push(`grid-cols-${props.columns.default}`)
  if (props.columns.sm) baseClasses.push(`sm:grid-cols-${props.columns.sm}`)
  if (props.columns.md) baseClasses.push(`md:grid-cols-${props.columns.md}`)
  if (props.columns.lg) baseClasses.push(`lg:grid-cols-${props.columns.lg}`)
  if (props.columns.xl) baseClasses.push(`xl:grid-cols-${props.columns.xl}`)
  
  // Add gap classes
  baseClasses.push(`gap-${props.gap.default}`)
  if (props.gap.sm) baseClasses.push(`sm:gap-${props.gap.sm}`)
  if (props.gap.md) baseClasses.push(`md:gap-${props.gap.md}`)
  if (props.gap.lg) baseClasses.push(`lg:gap-${props.gap.lg}`)
  if (props.gap.xl) baseClasses.push(`xl:gap-${props.gap.xl}`)
  
  // Add width
  baseClasses.push(`w-${props.width}`)
  
  return baseClasses.join(" ")
})
</script>

<template>
  <div :class="gridClasses">
    <slot></slot>
  </div>
</template>