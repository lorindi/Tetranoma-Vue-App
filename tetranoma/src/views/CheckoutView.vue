<template>
    <div class="checkout-container">
      <h1>Завършване на поръчката</h1>
      
      <div v-if="cartStore.loading" class="loading">
        Зареждане...
      </div>
      
      <div v-else-if="cartStore.items.length === 0" class="empty-cart">
        <p>Вашата кошница е празна</p>
        <router-link to="/shop" class="continue-shopping">
          Продължете с пазаруването
        </router-link>
      </div>
      
      <div v-else class="checkout-content">
        <div class="order-summary">
          <h2>Резюме на поръчката</h2>
          
          <div class="cart-items">
            <div v-for="item in cartStore.items" :key="getItemKey(item)" class="cart-item">
              <div class="item-details">
                <h3>{{ item.figure?.name || 'Неизвестен продукт' }}</h3>
                <p>Количество: {{ item.quantity }}</p>
                <p>Цена: {{ item.figure?.price || 0 }} лв.</p>
              </div>
            </div>
          </div>
          
          <div class="order-total">
            <h3>Обща сума: {{ cartStore.totalPrice }} лв.</h3>
          </div>
        </div>
        
        <div class="shipping-info" v-if="!orderCreated">
          <h2>Информация за доставка</h2>
          
          <form @submit.prevent="createOrder" class="shipping-form">
            <div class="form-group">
              <label for="fullName">Име и фамилия</label>
              <input 
                type="text" 
                id="fullName" 
                v-model="shippingInfo.fullName" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="address">Адрес</label>
              <input 
                type="text" 
                id="address" 
                v-model="shippingInfo.address" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="city">Град</label>
              <input 
                type="text" 
                id="city" 
                v-model="shippingInfo.city" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="postalCode">Пощенски код</label>
              <input 
                type="text" 
                id="postalCode" 
                v-model="shippingInfo.postalCode" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Телефон</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="shippingInfo.phone" 
                required
              />
            </div>
            
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Обработка...' : 'Продължи към плащане' }}
            </button>
          </form>
        </div>
        
        <div v-if="orderCreated" class="payment-section">
          <h2>Плащане</h2>
          
          <StripePaymentForm 
            :orderId="orderId" 
            :amount="cartStore.totalPrice"
            @payment-success="handlePaymentSuccess"
            @payment-error="handlePaymentError"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { useCartStore } from "@/stores/useCartStore";
  import { usePaymentStore } from "@/stores/usePaymentStore";
  import { useToast } from "vue-toastification";
  import StripePaymentForm from "@/components/StripePaymentForm.vue";
  import api from "@/api/axios";
  
  const cartStore = useCartStore();
  const paymentStore = usePaymentStore();
  const toast = useToast();
  
  const shippingInfo = ref({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: ""
  });
  
  const isSubmitting = ref(false);
  const orderCreated = ref(false);
  const orderId = ref(null);
  
  // Функция за безопасно извличане на ключ
  const getItemKey = (item) => {
    console.log("Item in getItemKey:", item);
    return item?.figure?._id || item?._id || Math.random().toString(36).substring(2, 9);
  };
  
  onMounted(async () => {
    console.log("[Checkout] Component mounted");
    try {
      await cartStore.getCart();
      console.log("[Checkout] Cart loaded:", cartStore.items.length, "items");
      // Проверка на структурата на данните
      console.log("[Checkout] Cart items structure:", JSON.stringify(cartStore.items));
    } catch (error) {
      console.log("[Checkout] Error loading cart:", error);
      toast.error("Грешка при зареждане на кошницата");
    }
  });
  
  const createOrder = async () => {
    console.log("[Checkout] Creating order with shipping info:", shippingInfo.value);
    isSubmitting.value = true;
    
    try {
      // Създаване на поръчка
      const response = await api.post("/orders", {
        shippingInfo: shippingInfo.value,
        paymentMethod: "stripe"
      });
      
      console.log("[Checkout] Order created:", response.data);
      orderId.value = response.data.order._id;
      orderCreated.value = true;
      toast.success("Поръчката е създадена успешно!");
    } catch (error) {
      console.log("[Checkout] Error:", error);
      toast.error("Грешка при създаване на поръчката. Моля, опитайте отново.");
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const handlePaymentSuccess = (paymentIntent) => {
    console.log("[Checkout] Payment successful:", paymentIntent);
    toast.success("Плащането е успешно!");
    // Тук можете да изчистите кошницата или да направите други действия след успешно плащане
    cartStore.getCart(); // Обновяване на кошницата
  };
  
  const handlePaymentError = (error) => {
    console.log("[Checkout] Error:", error);
    toast.error("Възникна грешка при плащането. Моля, опитайте отново.");
  };
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .checkout-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    .checkout-content {
      grid-template-columns: 1fr;
    }
  }
  
  .order-summary, .shipping-info, .payment-section {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item {
    display: flex;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .item-details {
    flex: 1;
  }
  
  .order-total {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 2px solid #ddd;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  .submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .empty-cart {
    text-align: center;
    padding: 40px;
  }
  
  .continue-shopping {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #5469d4;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .loading {
    text-align: center;
    padding: 40px;
  }
  </style>