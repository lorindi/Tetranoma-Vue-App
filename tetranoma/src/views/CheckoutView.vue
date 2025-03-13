<script setup>
import { ref, onMounted } from "vue"
import { useCartStore } from "@/stores/useCartStore"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"
import FormField from "@/components/form/formField/FormField.vue"

import Title from "@/components/ui/Title.vue"
import Paragraph from "@/components/ui/Paragraph.vue"
import FormButton from "@/components/form/formButton/FormButton.vue"
import FormGridContainer from "@/components/form/formGridContainer/FormGridContainer.vue"

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const paymentMethod = ref("credit card")
const shippingAddress = ref("")
const isProcessing = ref(false)

const paymentMethods = [
    { value: "credit card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank transfer", label: "Bank Transfer" }
]

onMounted(async () => {
    console.log("Fetching cart data")
    await cartStore.getCart()

    if (!cartStore.items.length) {
        toast.warning("Your cart is empty")
        router.push("/figures")
    }
})

const handleCheckout = async () => {
    console.log("Processing checkout")
    if (!shippingAddress.value) {
        toast.error("Please enter a shipping address")
        return
    }

    isProcessing.value = true
    try {
        await cartStore.checkout({
            paymentMethod: paymentMethod.value,
            shippingAddress: shippingAddress.value
        })

        toast.success("Order completed successfully!")
        router.push("/")
    } catch (error) {
        console.error("Checkout error:", error)
        toast.error("Error processing order")
    } finally {
        isProcessing.value = false
    }
}
</script>

<template>
    <div class="flex flex-col px-4 py-8 w-full">
        <Title type="title" align="left-center" class="mb-4">Complete Your Order</Title>

        <FormGridContainer :columns="2" :gap="4">
            <div class="bg-white dark:bg-gray-800 rounded-lg w-full shadow p-6">
                <Title type="subsubtitle" align="left" color="dark" class="mb-4">Order Summary</Title>

                <div v-if="cartStore.loading" class="text-center py-4">
                    <Paragraph color="transparent" size="medium" align="center">Loading...</Paragraph>
                </div>

                <div v-else>
                    <div class="space-y-4">
                        <div v-for="item in cartStore.items" :key="item.product._id"
                            class="flex items-center justify-between border-b pb-4 dark:border-gray-700">
                            <div class="flex items-center gap-4 w-full">
                                <img :src="item.product.images[0]" :alt="item.product.title"
                                    class="w-16 h-16 object-cover rounded" />
                                <div class="flex flex-col justify-start items-start">
                                    <Title type="minortitle" align="left-center" color="dark" size="small">{{ item.product.title }}</Title>
                                    <Paragraph color="transparent" size="small">
                                        Quantity: {{ item.quantity }}
                                    </Paragraph>
                                </div>
                            </div>
                            <Paragraph color="primary" size="small">{{ item.price * item.quantity }} BGN</Paragraph>
                        </div>
                    </div>

                    <div class="mt-6 text-right">
                        <Title type="subsubtitle" align="right" color="primary">
                            Total: {{ cartStore.totalPrice }} BGN
                        </Title>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 w-full rounded-lg shadow p-6">
                <Title type="subsubtitle" align="left" color="dark" class="mb-4">Shipping Information</Title>

                <div class="space-y-4">
                    <FormField 
                        v-model="shippingAddress" 
                        label="Shipping Address" 
                        type="textarea"
                        placeholder="Enter your complete shipping address" 
                        icon="map-marker" 
                        required 
                    />

                    <div class="checkout-form-field">
                        <Paragraph color="primary" size="small" class="mb-2">Payment Method</Paragraph>
                        <FormField
                            v-model="paymentMethod"
                            type="select"
                            icon="credit-card"
                            :options="paymentMethods"
                            placeholder="Select payment method"
                        />
                    </div>

                    <FormButton 
                        @click="handleCheckout" 
                        :text="isProcessing ? 'Processing...' : 'Complete Order'" 
                        icon="check-circle"
                        type="button"
                        variant="primary"
                        size="full"
                        :disabled="isProcessing || !cartStore.items.length"
                    />
                </div>
            </div>
        </FormGridContainer>
    </div>
</template>

<style scoped>
.checkout-form-field :deep(.pi) {
    top: 50% !important;
    transform: translateY(-50%) !important;
}
</style>