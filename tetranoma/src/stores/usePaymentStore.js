import { defineStore } from "pinia";
import api from "@/api/axios";
import { useToast } from "vue-toastification";
import { loadStripe } from "@stripe/stripe-js";

// Заредете Stripe с вашия публичен ключ
// Трябва да замените това с вашия действителен публичен ключ от Stripe
const stripePromise = loadStripe("pk_test_your_stripe_public_key");

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    loading: false,
    error: null,
    clientSecret: null,
    paymentId: null,
    paymentStatus: null,
  }),

  actions: {
    async createPaymentIntent(orderId, amount) {
      console.log("[Payment] Creating payment intent for order:", orderId, "amount:", amount);
      this.loading = true;
      try {
        // Уверете се, че URL адресът съвпада с вашия бекенд API
        const response = await api.post("/stripe/create-payment-intent", {
          orderId,
          amount,
        });
        
        console.log("[Payment] Payment intent created:", response.data);
        this.clientSecret = response.data.clientSecret;
        this.paymentId = response.data.paymentId;
        return response.data;
      } catch (error) {
        console.log("[Payment] Error creating intent:", error);
        this.error = error.response?.data?.message || "Failed to create payment intent";
        useToast().error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async confirmPayment(paymentIntentId) {
      console.log("[Payment] Confirming payment:", paymentIntentId);
      this.loading = true;
      try {
        const response = await api.post("/stripe/confirm-payment", {
          paymentIntentId,
        });
        
        console.log("[Payment] Payment confirmed:", response.data);
        this.paymentStatus = "completed";
        useToast().success("Payment completed successfully!");
        return response.data;
      } catch (error) {
        console.log("[Payment] Error confirming payment:", error);
        this.error = error.response?.data?.message || "Failed to confirm payment";
        this.paymentStatus = "failed";
        useToast().error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getStripeInstance() {
      console.log("[Payment] Getting Stripe instance");
      return await stripePromise;
    },

    resetPaymentState() {
      console.log("[Payment] Resetting payment state");
      this.clientSecret = null;
      this.paymentId = null;
      this.paymentStatus = null;
      this.error = null;
    },
  },
});