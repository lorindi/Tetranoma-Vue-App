<script setup>
import { ref, onMounted } from "vue"
import { useCartStore } from "@/stores/useCartStore"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"
import FormField from "@/components/form/formField/FormField.vue"

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
        <h1 class="text-2xl font-bold mb-8 text-center">Complete Your Order</h1>

        <div class="flex w-full justify-between gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg w-full shadow p-6">
                <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

                <div v-if="cartStore.loading" class="text-center py-4">
                    Loading...
                </div>

                <div v-else>
                    <div class="space-y-4">
                        <div v-for="item in cartStore.items" :key="item.product._id"
                            class="flex items-center justify-between border-b pb-4 dark:border-gray-700">
                            <div class="flex items-center gap-4">
                                <img :src="item.product.images[0]" :alt="item.product.title"
                                    class="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 class="font-semibold">{{ item.product.title }}</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        Quantity: {{ item.quantity }}
                                    </p>
                                </div>
                            </div>
                            <p class="font-semibold">{{ item.price * item.quantity }} BGN</p>
                        </div>
                    </div>

                    <div class="mt-6 text-right">
                        <p class="text-xl font-bold">
                            Total: {{ cartStore.totalPrice }} BGN
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 w-full rounded-lg shadow p-6">
                <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>

                <div class="space-y-4">
                    <FormField v-model="shippingAddress" label="Shipping Address" type="textarea"
                        placeholder="Enter your complete shipping address" required />

                    <div>
                        <label class="block text-sm font-medium mb-2">Payment Method</label>
                        <select v-model="paymentMethod"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                            <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                                {{ method.label }}
                            </option>
                        </select>
                    </div>

                    <button @click="handleCheckout" :disabled="isProcessing || !cartStore.items.length"
                        class="w-full py-3 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a] disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isProcessing">Processing...</span>
                        <span v-else>Complete Order</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>