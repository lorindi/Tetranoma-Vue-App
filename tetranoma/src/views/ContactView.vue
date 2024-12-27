<script setup>
import { ref } from "vue"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import emailjs from "@emailjs/browser"
import { useToast } from "vue-toastification"
import Title from "@/components/common/title/Title.vue"

console.log("ContactView component mounted")

const toast = useToast()
const isLoading = ref(false)

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Email must be valid"),
  subject: yup.string().required("Subject is required").min(3, "Subject must be at least 3 characters"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters")
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField("name")
const { value: email, errorMessage: emailError } = useField("email")
const { value: subject, errorMessage: subjectError } = useField("subject")
const { value: message, errorMessage: messageError } = useField("message")

const onSubmit = handleSubmit(async (values) => {
  console.log("Attempting to send email with values:", values)
  isLoading.value = true

  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
      {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      },
      "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
    )

    console.log("Email sent successfully:", response)
    toast.success("Message sent successfully!")
    resetForm()
  } catch (error) {
    console.error("Failed to send email:", error)
    toast.error("Failed to send message. Please try again.")
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-[1336px] min-h-[calc(100vh-125px)] p-4 md:p-8">
    <Title title="Get in Touch" />

    <div class="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Contact Information -->
      <div class="space-y-6 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-[#00BD7E]">Contact Information</h2>
        
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center">
              <i class="pi pi-map-marker text-[#00BD7E]"></i>
            </div>
            <div>
              <h3 class="font-semibold">Address</h3>
              <p class="text-gray-600 dark:text-gray-400">123 3D Print Street, Sofia, Bulgaria</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center">
              <i class="pi pi-phone text-[#00BD7E]"></i>
            </div>
            <div>
              <h3 class="font-semibold">Phone</h3>
              <p class="text-gray-600 dark:text-gray-400">+359 888 123 456</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center">
              <i class="pi pi-envelope text-[#00BD7E]"></i>
            </div>
            <div>
              <h3 class="font-semibold">Email</h3>
              <p class="text-gray-600 dark:text-gray-400">contact@tetranoma.com</p>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center hover:bg-[#00BD7E]/20 transition-colors">
              <i class="pi pi-facebook text-[#00BD7E]"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center hover:bg-[#00BD7E]/20 transition-colors">
              <i class="pi pi-twitter text-[#00BD7E]"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center hover:bg-[#00BD7E]/20 transition-colors">
              <i class="pi pi-instagram text-[#00BD7E]"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="onSubmit" class="space-y-6 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-[#00BD7E]">Send us a Message</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input 
              v-model="name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BD7E] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your name"
            />
            <span v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
              v-model="email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BD7E] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@email.com"
            />
            <span v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input 
              v-model="subject"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BD7E] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Message subject"
            />
            <span v-if="subjectError" class="text-red-500 text-sm mt-1">{{ subjectError }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea 
              v-model="message"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BD7E] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your message"
            ></textarea>
            <span v-if="messageError" class="text-red-500 text-sm mt-1">{{ messageError }}</span>
          </div>
        </div>

        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-[#00BD7E] text-white py-2 px-4 rounded-lg hover:bg-[#00BD7E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Message</span>
        </button>
      </form>
    </div>
  </div>
</template>
<!-- 
"YOUR_SERVICE_ID" // EmailJS service ID
"YOUR_TEMPLATE_ID" // EmailJS template ID
"YOUR_PUBLIC_KEY" // EmailJS public key -->