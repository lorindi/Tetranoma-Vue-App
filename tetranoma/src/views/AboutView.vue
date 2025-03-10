<script setup>
import { ref } from "vue"
import Title from "@/components/common/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue";


const features = ref([
  {
    title: "Quality 3D Figures",
    description: "Our 3D figures are crafted with premium materials and precise printing technology.",
    icon: "pi-star"
  },
  {
    title: "Customization",
    description: "We offer the ability to customize figures according to your requirements and preferences.",
    icon: "pi-user"
  },
  {
    title: "Fast Delivery",
    description: "We guarantee quick and secure delivery of your orders nationwide.",
    icon: "pi-send"
  },
  {
    title: "24/7 Support",
    description: "Our team is available around the clock to answer all your questions.",
    icon: "pi-clock"
  }
])
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full max-w-[1336px] min-h-screen p-4 md:p-8">
    <Title title="Discover Our Story" />

    <div class="w-full max-w-4xl space-y-8 mt-8">
      <!-- History -->
      <section class="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-[#00BD7E] mb-4">Our History</h2>
        <Paragraph color="primary" align="left">
          Tetranoma was founded by a group of 3D printing enthusiasts united by their passion for creating unique and quality figures. Our mission is to make 3D printing accessible to anyone who wants to own unique and personalized figures.
        </Paragraph>
      </section>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="feature in features" :key="feature.title" 
          class="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105 dark:bg-gray-800">
          <div class="flex items-center mb-4">
            <i :class="`pi ${feature.icon} text-[#00BD7E] text-2xl mr-3`"></i>
            <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
          </div>
          <Paragraph color="primary" align="left">{{ feature.description }}</Paragraph>
        </div>
      </div>

      <!-- Vision -->
      <section class="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-[#00BD7E] mb-4">Our Vision</h2>
        <Paragraph color="primary" align="left">
          We strive to be the leading platform for 3D printed figures, offering innovative solutions and superior quality. We believe in the power of personalization and the ability for everyone to own unique items that reflect their individuality.
        </Paragraph>
     
      </section>
    </div>
  </div>
</template>