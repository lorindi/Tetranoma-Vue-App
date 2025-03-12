<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { useCartStore } from "@/stores/useCartStore"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"
import { loadStripe } from "@stripe/stripe-js"
import { StripeElement } from "@vue-stripe/vue-stripe"
import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"
import FormField from "@/components/form/formField/FormField.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const paymentMethod = ref("stripe")
const shippingAddress = ref("")
const isProcessing = ref(false)
const stripeLoaded = ref(false)
const stripeElements = ref(null)
const clientSecret = ref("")
const paymentId = ref("")

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripePublishableKey)
const stripeElementsOptions = ref({
  clientSecret: "",
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#00BD7E",
    },
  },
})

const paymentMethods = [
  { value: "stripe", label: "Credit Card (Stripe)" },
  { value: "bank transfer", label: "Bank Transfer" }
]

onMounted(async () => {
  console.log("[Checkout] Initializing component")
  await cartStore.getCart()

  if (!cartStore.items.length) {
    toast.warning("Your cart is empty")
    router.push("/figures")
  }
  
  console.log("[Checkout] Loading Stripe")
  stripeLoaded.value = true
})

// Watch for payment method changes
watch(paymentMethod, (newValue) => {
  console.log("[Checkout] Payment method changed to:", newValue)
  if (newValue === "stripe" && !clientSecret.value) {
    console.log("[Checkout] Automatically creating Stripe payment intent")
    createPaymentIntent()
  }
})

const createPaymentIntent = async () => {
  console.log("[Payment] Creating payment intent")
  try {
    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        orderId: "temp-order-id",
        amount: cartStore.totalPrice
      })
    })
    
    const data = await response.json()
    console.log("[Payment] Intent created:", data)
    
    if (data.clientSecret) {
      clientSecret.value = data.clientSecret
      paymentId.value = data.paymentId
      stripeElementsOptions.value.clientSecret = data.clientSecret
      return true
    }
    throw new Error("Client secret not received")
  } catch (error) {
    console.error("[Payment] Error creating intent:", error)
    toast.error("Error initializing payment")
    return false
  }
}

const handleCheckout = async () => {
  console.log("[Checkout] Starting processing")
  if (!shippingAddress.value) {
    toast.error("Please enter shipping address")
    return
  }

  isProcessing.value = true
  
  try {
    if (paymentMethod.value === "stripe") {
      console.log("[Checkout] Using Stripe payment")
      const success = await createPaymentIntent()
      if (!success) throw new Error("Failed to create payment intent")
      return
    }
    
    await cartStore.checkout({
      paymentMethod: paymentMethod.value,
      shippingAddress: shippingAddress.value
    })

    toast.success("Order completed successfully!")
    router.push("/")
  } catch (error) {
    console.error("[Checkout] Error:", error)
    toast.error("Error processing order")
  } finally {
    isProcessing.value = false
  }
}

const handleStripePayment = async () => {
  console.log("[Stripe] Starting payment confirmation")
  isProcessing.value = true
  
  try {
    const stripe = await stripePromise
    console.log("[Stripe] Instance loaded:", !!stripe)
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements: stripeElements.value,
      confirmParams: { return_url: `${window.location.origin}/payment-success` },
      redirect: "if_required"
    })
    
    console.log("[Stripe] Payment result:", { error, paymentIntent })
    
    if (error) {
      console.error("[Stripe] Payment error:", error)
      toast.error(error.message || "Payment failed")
      throw error
    }
    
    if (paymentIntent?.status === "succeeded") {
      console.log("[Stripe] Payment succeeded, confirming...")
      await fetch("/api/stripe/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ paymentIntentId: paymentIntent.id })
      })
      
      await cartStore.checkout({
        paymentMethod: "stripe",
        shippingAddress: shippingAddress.value,
        paymentId: paymentId.value
      })
      
      toast.success("Payment successful!")
      router.push("/payment-success")
    }
  } catch (error) {
    console.error("[Stripe] Processing error:", error)
    toast.error("Payment processing failed")
  } finally {
    isProcessing.value = false
  }
}

const showStripeForm = computed(() => {
  return paymentMethod.value === "stripe" && clientSecret.value && stripeLoaded.value
})

const onStripeElementsReady = (elements) => {
  console.log("[Stripe] Elements ready")
  stripeElements.value = elements
}
</script>

<template>
  <div class="flex flex-col px-4 py-8 w-full">
    <Title type="title" align="center" class="mb-8">Complete Your Order</Title>

    <FormGridContainer :columns="2" :gap="6" mobileColumns="1">
      <!-- Order Summary Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Title type="subtitle" class="mb-4">Order Summary</Title>

        <div v-if="cartStore.loading">
          <Paragraph color="transparent" align="center">Loading products...</Paragraph>
        </div>

        <div v-else>
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.product._id"
              class="flex items-center justify-between border-b pb-4 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <img :src="item.product.images[0]" :alt="item.product.title"
                  class="w-16 h-16 object-cover rounded" />
                <div>
                  <Title type="minortitle">{{ item.product.title }}</Title>
                  <Paragraph size="small" color="transparent">
                    Quantity: {{ item.quantity }}
                  </Paragraph>
                </div>
              </div>
              <Paragraph class="font-semibold">{{ (item.price * item.quantity).toFixed(2) }} BGN</Paragraph>
            </div>
          </div>

          <div class="mt-6 text-right">
            <Title type="subsubtitle">Total: {{ cartStore.totalPrice.toFixed(2) }} BGN</Title>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Title type="subtitle" class="mb-4">Shipping & Payment</Title>

        <FormGridContainer :columns="1" :gap="4">
          <FormField
            v-model="shippingAddress"
            label="Shipping Address"
            type="textarea"
            icon="map-marker"
            placeholder="Enter full shipping address"
            required
          />

          <FormField
            v-model="paymentMethod"
            label="Payment Method"
            type="select"
            icon="credit-card"
            :options="paymentMethods"
          />

          <!-- Stripe Payment Form -->
          <div v-if="showStripeForm" class="mt-4">
            <Title type="subsubtitle" class="mb-2">Card Details</Title>
            <StripeElement 
              v-if="clientSecret"
              :stripe="stripePromise" 
              :elements-options="stripeElementsOptions"
              @element-ready="onStripeElementsReady"
            />
            
            <FormButton 
              v-if="stripeElements"
              @click="handleStripePayment"
              :disabled="isProcessing"
              text="Pay Now"
              icon="lock"
              :loading="isProcessing"
              class="mt-4"
            />
          </div>

          <FormButton 
            v-if="paymentMethod !== 'stripe' || !showStripeForm"
            @click="handleCheckout" 
            :disabled="isProcessing || !cartStore.items.length"
            text="Complete Order"
            icon="check-circle"
            :loading="isProcessing"
          />
        </FormGridContainer>
      </div>
    </FormGridContainer>
  </div>
</template>