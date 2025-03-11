<script setup>
import { ref } from "vue"
import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"

const categories = ref([
  {
    title: "General Questions",
    icon: "pi-info-circle",
    questions: [
      {
        question: "What is Tetranoma?",
        answer: "Tetranoma is a leading platform for 3D printed figures, offering high-quality custom designs and professional printing services.",
        isOpen: false
      },
      {
        question: "How do I place an order?",
        answer: "You can place an order by browsing our collection, selecting your desired figure, and following the checkout process. For custom orders, please use our contact form.",
        isOpen: false
      }
    ]
  },
  {
    title: "3D Printing Process",
    icon: "pi-print",
    questions: [
      {
        question: "What materials do you use?",
        answer: "We use high-quality PLA, PETG, and resin materials, specifically chosen for their durability and detail retention. Our materials are sourced from premium suppliers.",
        isOpen: false
      },
      {
        question: "How long does printing take?",
        answer: "Printing time varies depending on size and complexity. Small figures typically take 4-8 hours, while larger or more detailed pieces might take 12-24 hours.",
        isOpen: false
      },
      {
        question: "What is the maximum size you can print?",
        answer: "Our printers can accommodate objects up to 300x300x400mm. For larger pieces, we can split the model and assemble it after printing.",
        isOpen: false
      }
    ]
  },
  {
    title: "Orders & Shipping",
    icon: "pi-send",
    questions: [
      {
        question: "Do you ship internationally?",
        answer: "Yes, we offer worldwide shipping. Delivery times and costs vary depending on your location. You can calculate shipping costs at checkout.",
        isOpen: false
      },
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for any manufacturing defects. Please contact our support team within 30 days of receiving your order.",
        isOpen: false
      }
    ]
  },
  {
    title: "Custom Orders",
    icon: "pi-user",
    questions: [
      {
        question: "Can I request a custom design?",
        answer: "Yes! We welcome custom design requests. You can provide your own 3D model or work with our design team to bring your vision to life.",
        isOpen: false
      },
      {
        question: "How much do custom orders cost?",
        answer: "Custom order pricing depends on design complexity, size, and materials. Contact us for a detailed quote.",
        isOpen: false
      }
    ]
  }
])

const toggleQuestion = (categoryIndex, questionIndex) => {
  console.log("Toggling question:", categoryIndex, questionIndex)
  categories.value[categoryIndex].questions[questionIndex].isOpen = 
    !categories.value[categoryIndex].questions[questionIndex].isOpen
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-[30px] w-full max-w-[1336px] min-h-screen p-4 md:p-8">
    <Title>Frequently Asked Questions</Title>

    <!-- FAQ Categories -->
    <section class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <article 
        v-for="(category, categoryIndex) in categories" 
        :key="categoryIndex"
        class="space-y-4"
      >
        <!-- Category Header -->
        <header class="flex items-center space-x-3">
          <figure class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center">
            <i :class="`pi ${category.icon} text-[#00BD7E]`"></i>
          </figure>
          <Title type="minortitle" align="left" color="gray">{{ category.title }}</Title>
        </header>

        <!-- Questions -->
        <dl class="space-y-3">
          <div 
            v-for="(item, questionIndex) in category.questions" 
            :key="questionIndex"
            class="bg-white rounded-xl shadow-md overflow-hidden dark:bg-gray-800"
          >
            <dt>
              <button 
                @click="toggleQuestion(categoryIndex, questionIndex)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                :aria-expanded="item.isOpen"
                :aria-controls="`faq-answer-${categoryIndex}-${questionIndex}`"
              >
                <span class="font-medium">{{ item.question }}</span>
                <i :class="`pi ${item.isOpen ? 'pi-chevron-up' : 'pi-chevron-down'} text-[#00BD7E] transition-transform`"></i>
              </button>
            </dt>
            
            <dd 
              v-show="item.isOpen"
              :id="`faq-answer-${categoryIndex}-${questionIndex}`"
              class="px-6 py-4 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700"
            >
              <Paragraph color="primary" align="left">{{ item.answer }}</Paragraph>
            </dd>
          </div>
        </dl>
      </article>
    </section>

    <!-- Contact Section -->
    <aside class="w-full max-w-4xl mt-16 text-center">
      <Title type="subtitle" align="center">Still Have Questions?</Title>
      <Paragraph color="transparent" align="center" size="small" customClass="mb-6">
        Our team is here to help you with any questions you might have.
      </Paragraph>
      <router-link 
        to="/contact" 
        class="inline-flex items-center px-6 py-3 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00BD7E]/90 transition-colors"
      >
        <i class="pi pi-envelope mr-2"></i>
        Contact Us
      </router-link>
    </aside>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

button i {
  transition: transform 0.3s ease;
}

button[aria-expanded="true"] i {
  transform: rotate(180deg);
}
</style>