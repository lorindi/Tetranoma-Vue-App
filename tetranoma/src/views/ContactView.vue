<script setup>
import { ref } from "vue"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import emailjs from "@emailjs/browser"
import { useToast } from "vue-toastification"
import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"
import FormField from "@/components/form/formField/FormField.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"

const contactInfo = ref([
  {
    icon: "map-marker",
    title: "Address",
    content: "123 3D Print Street, Sofia, Bulgaria"
  },
  {
    icon: "phone",
    title: "Phone",
    content: "+359 888 123 456"
  },
  {
    icon: "envelope",
    title: "Email",
    content: "contact@tetranoma.com"
  }
])

const socialMedia = ref([
  { icon: "facebook", url: "#" },
  { icon: "twitter", url: "#" },
  { icon: "instagram", url: "#" }
])

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
  isLoading.value = true

  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // EmailJS service ID
      "YOUR_TEMPLATE_ID", // EmailJS template ID
      {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      },
      "YOUR_PUBLIC_KEY" // EmailJS public key
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
  <main class="flex flex-col items-center w-full max-w-[1336px] min-h-[calc(100vh-125px)] p-4 md:p-8">
    <Title title="Get in Touch" />

    <section class="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Contact Information -->
      <article class="space-y-6 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
        <Title type="subsubtitle" color="primary" align="left">Contact Information</Title>

        <ul class="space-y-4">
          <li v-for="item in contactInfo" :key="item.title" class="flex items-center space-x-4">
            <figure class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center">
              <i :class="`pi pi-${item.icon} text-[#00BD7E]`"></i>
            </figure>
            <div>
              <Title type="minortitle" align="left" color="gray">{{ item.title }}</Title>
              <Paragraph color="transparent" align="left" size="small">{{ item.content }}</Paragraph>
            </div>
          </li>
        </ul>

        <!-- Social Media Links -->
        <footer class="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Title type="subsubtitle" color="primary" align="left">Follow Us</Title>
          <nav class="flex space-x-4">
            <a v-for="social in socialMedia" :key="social.icon" :href="social.url"
              class="w-10 h-10 bg-[#00BD7E]/10 rounded-full flex items-center justify-center hover:bg-[#00BD7E]/20 transition-colors"
              aria-label="`Follow us on ${social.icon}`">
              <i :class="`pi pi-${social.icon} text-[#00BD7E]`"></i>
            </a>
          </nav>
        </footer>
      </article>

      <!-- Contact Form -->
      <form @submit.prevent="onSubmit" class="space-y-6 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
        
        <Title type="subsubtitle" color="primary" align="left">Send us a Message</Title>

        <FormGridContainer :columns="2" :gap="2">
          <FormField v-model="name" label="Name" type="text" placeholder="Your name" icon="user" :error="nameError"
            :required="true" @blur="() => { }" />
          <FormField v-model="subject" label="Subject" type="text" placeholder="Message subject" icon="tag"
            :error="subjectError" :required="true" @blur="() => { }" />
        </FormGridContainer>

        <FormField v-model="email" label="Email" type="text" placeholder="your@email.com" icon="envelope"
          :error="emailError" :required="true" @blur="() => { }" />
        <FormField v-model="message" label="Message" type="textarea" placeholder="Your message" icon="comment"
          :error="messageError" :required="true" @blur="() => { }" />

        <FormButton :text="isLoading ? 'Sending...' : 'Send Message'" icon="send" type="submit" size="full" />

      </form>
    </section>
  </main>
</template>
<!-- 
"YOUR_SERVICE_ID" // EmailJS service ID
"YOUR_TEMPLATE_ID" // EmailJS template ID
"YOUR_PUBLIC_KEY" // EmailJS public key -->