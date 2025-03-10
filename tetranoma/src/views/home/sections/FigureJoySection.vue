<script setup>
import Paragraph from '@/components/ui/Paragraph.vue';
import homeCover from '/img/3dPrintingCover.jpg'

const benefits = [
  "Each 3D figure is unique, adding a personal touch to your décor.",
  "They inspire creativity and spark conversations, making your home feel more lively.",
  "Perfect for any space - from your living room to your office."
];

</script>

<template>
  <section class="flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-full max-w-[1336px] min-h-[700px] px-[20px] my-[40px] lg:px-[40px] xl:rounded-2xl">
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-3xl"></div>

    <div class="relative flex flex-col lg:flex-row items-center justify-between gap-[40px] py-[40px] h-full">
      <!-- Left section - image with enhanced styling -->
      <div class="flex-1 w-full">
        <div class="relative group">
          <img 
            :src="homeCover"
            class="w-full h-[300px] lg:h-[500px] object-cover object-center rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] dark:opacity-90" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
      </div>

      <!-- Right section - content with enhanced typography -->
      <div class="flex-1 flex flex-col gap-[25px] lg:px-[30px]">
        <h2 class="text-2xl lg:text-4xl font-bold bg-gradient-to-r text-center from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Why 3D Figures Are Perfect for Your Home
        </h2>

        <div class="flex flex-col gap-[15px]">
          <Paragraph color="primary">
            3D figures add personality and charm to any room. Whether it's a favorite character or a custom-made
            piece, they bring a sense of joy and creativity to your living space.
          </Paragraph>

          <ul class="hidden lg:block space-y-4">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-[#00BD7E]"></div>
              <Paragraph color="transparent">{{ benefit }}</Paragraph>
            </li>
          </ul>

          <Paragraph color="primary">
            Bring happiness and style into your home with these fun and creative pieces today!
          </Paragraph>
        </div>
      </div>
    </div>
  </section>
</template>
