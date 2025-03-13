<template>
    <div class="stripe-payment-container">
      <h3>Плащане с карта</h3>
      
      <div v-if="loading" class="loading-spinner">
        Зареждане...
      </div>
      
      <div v-else-if="!clientSecret" class="payment-init">
        <button 
          @click="initializePayment" 
          class="payment-button"
          :disabled="!canInitPayment"
        >
          Продължи към плащане
        </button>
      </div>
      
      <div v-else>
        <div id="payment-element" ref="paymentElement"></div>
        
        <button 
          @click="handleSubmit" 
          class="payment-button"
          :disabled="isProcessing || !stripe || !elements"
        >
          <span v-if="isProcessing">Обработка...</span>
          <span v-else>Плати сега</span>
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { usePaymentStore } from "@/stores/usePaymentStore";
  import { useCartStore } from "@/stores/useCartStore";
  import { useRouter } from "vue-router";
  
  const props = defineProps({
    orderId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(["payment-success", "payment-error"]);
  
  const paymentStore = usePaymentStore();
  const cartStore = useCartStore();
  const router = useRouter();
  
  const stripe = ref(null);
  const elements = ref(null);
  const paymentElement = ref(null);
  const errorMessage = ref("");
  const isProcessing = ref(false);
  const loading = ref(false);
  
  const clientSecret = computed(() => paymentStore.clientSecret);
  const canInitPayment = computed(() => props.orderId && props.amount > 0);
  
  // Инициализиране на Stripe
  onMounted(async () => {
    console.log("[StripePayment] Component mounted");
    try {
      stripe.value = await paymentStore.getStripeInstance();
      console.log("[StripePayment] Stripe instance loaded:", !!stripe.value);
    } catch (error) {
      console.log("[StripePayment] Error loading Stripe:", error);
      errorMessage.value = "Не можахме да заредим Stripe. Моля, опитайте отново.";
    }
  });
  
  // Наблюдаване за промени в clientSecret
  watch(clientSecret, async (newSecret) => {
    console.log("[StripePayment] Client secret changed:", !!newSecret);
    if (newSecret && stripe.value) {
      await mountPaymentElement();
    }
  });
  
  // Инициализиране на плащането
  const initializePayment = async () => {
    console.log("[StripePayment] Initializing payment");
    loading.value = true;
    errorMessage.value = "";
    
    try {
      await paymentStore.createPaymentIntent(props.orderId, props.amount);
      console.log("[StripePayment] Payment intent created successfully");
    } catch (error) {
      console.log("[StripePayment] Error initializing payment:", error);
      errorMessage.value = "Грешка при инициализиране на плащането. Моля, опитайте отново.";
    } finally {
      loading.value = false;
    }
  };
  
  // Монтиране на Stripe Payment Element
  const mountPaymentElement = async () => {
    console.log("[StripePayment] Mounting payment element");
    if (!clientSecret.value || !stripe.value) return;
    
    // Създаване на елементите
    elements.value = stripe.value.elements({
      clientSecret: clientSecret.value,
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#0570de",
          colorBackground: "#ffffff",
          colorText: "#30313d",
          colorDanger: "#df1b41",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          spacingUnit: "4px",
          borderRadius: "4px"
        }
      }
    });
    
    // Монтиране на Payment Element
    const paymentElementInstance = elements.value.create("payment");
    paymentElementInstance.mount(paymentElement.value);
  };
  
  // Обработка на изпращането на формата
  const handleSubmit = async () => {
    console.log("[StripePayment] Submitting payment");
    if (!stripe.value || !elements.value) {
      console.log("[StripePayment] Stripe or elements not loaded");
      return;
    }
    
    isProcessing.value = true;
    errorMessage.value = "";
    
    try {
      // Потвърждаване на плащането
      const { error, paymentIntent } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required"
      });
      
      if (error) {
        console.log("[StripePayment] Payment error:", error);
        errorMessage.value = error.message || "Възникна грешка при обработката на плащането.";
        emit("payment-error", error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("[StripePayment] Payment succeeded:", paymentIntent);
        // Потвърждаване на плащането в бекенда
        await paymentStore.confirmPayment(paymentIntent.id);
        emit("payment-success", paymentIntent);
        
        // Пренасочване към страница за успешно плащане
        router.push("/payment-success");
      } else {
        console.log("[StripePayment] Payment requires additional action");
        // Плащането може да изисква допълнителни действия (3D Secure и т.н.)
      }
    } catch (error) {
      console.log("[StripePayment] Error processing payment:", error);
      errorMessage.value = "Възникна грешка при обработката на плащането. Моля, опитайте отново.";
      emit("payment-error", error);
    } finally {
      isProcessing.value = false;
    }
  };
  </script>
  
  <style scoped>
  .stripe-payment-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .payment-button {
    background-color: #5469d4;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    width: 100%;
    margin-top: 20px;
    transition: all 0.2s ease;
  }
  
  .payment-button:hover {
    filter: brightness(1.1);
  }
  
  .payment-button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  
  .error-message {
    color: #df1b41;
    margin-top: 16px;
    text-align: center;
  }
  
  #payment-element {
    margin-top: 24px;
  }
  
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  </style>