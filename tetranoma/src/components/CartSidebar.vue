<script setup>
import { ref, onMounted } from "vue"
import { useCartStore } from "@/stores/useCartStore"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const isOpen = ref(false)



const toggleCart = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    cartStore.getCart()
  }
}

const handleCheckout = () => {
  isOpen.value = false
  router.push("/checkout")
}

const removeFromCart = async (itemId) => {
  try {
    await cartStore.removeFromCart(itemId)
    toast.success("Item removed from cart")

    await cartStore.getCart()

    if (cartStore.items.length === 0) {
      isOpen.value = false
    }
  } catch (error) {
    console.error("Error removing item:", error)
    toast.error(error.response?.data?.message || "Failed to remove item")
  }
}

defineExpose({ toggleCart })

</script>

<template>
  <div>
    <!-- Cart Icon with Counter -->
    <button @click="toggleCart" class="relative p-2 ">
      <i class="pi pi-shopping-cart text-xl"></i>
      <span v-if="cartStore.items.length"
        class="absolute -top-1 -right-1 bg-[#00BD7E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ cartStore.items.length }}
      </span>
    </button>

    <!-- Sidebar Overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleCart">
    </div>

    <!-- Sidebar Content -->
    <div v-if="isOpen"
      class="fixed top-0 right-0 h-full w-[80%] sm:w-[400px] bg-white dark:bg-gray-800 z-50 shadow-xl transform transition-transform duration-300"
      v-motion :initial="{ x: 400 }" :enter="{ x: 0 }" :leave="{ x: 400 }">

      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 class="text-xl font-semibold">Shopping Cart</h2>
          <button @click="toggleCart" class="p-2">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.loading" class="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>

          <div v-else-if="!cartStore.items.length" class="flex justify-center items-center h-full">
            <p>Your cart is empty</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in cartStore.items" :key="item?.product?._id"
              class="flex gap-4 p-2 border rounded dark:border-gray-700">
              <img 
          :src="item?.product?.images?.[0] || '/placeholder-image.jpg'" 
          :alt="item?.product?.title || 'Product'"
          class="w-20 h-20 object-cover rounded" 
        />
              <div class="flex-1">
                <h3 class="font-semibold">{{ item?.product?.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Quantity: {{ item?.quantity }}
                </p>
                <p class="font-semibold">
                  {{ (item?.price || 0) * (item?.quantity || 0) }} BGN
                </p>
              </div>
              <button @click="removeFromCart(item._id)" class="self-start p-1 text-red-500 hover:text-red-700">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t dark:border-gray-700">
          <div class="flex justify-between mb-4">
            <span class="font-semibold">Total:</span>
            <span class="font-semibold">{{ cartStore.totalPrice.toFixed(2) }} BGN</span>
          </div>
          <button @click="handleCheckout" :disabled="!cartStore.items.length"
            class="w-full py-2 bg-[#00BD7E] text-white rounded-lg hover:bg-[#00a06a] disabled:opacity-50 disabled:cursor-not-allowed">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>