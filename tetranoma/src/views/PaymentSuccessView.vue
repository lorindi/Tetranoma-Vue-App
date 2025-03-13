<template>
    <div class="payment-success">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>Плащането е успешно!</h1>
        <p>Благодарим ви за вашата поръчка. Ще получите имейл с потвърждение.</p>
        <router-link to="/" class="home-button">Към началната страница</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useCartStore } from "@/stores/useCartStore";
  
  const cartStore = useCartStore();
  
  onMounted(() => {
    console.log("[PaymentSuccess] Component mounted");
    // Изчистване на кошницата след успешно плащане
    cartStore.getCart();
  });
  </script>
  
  <style scoped>
  .payment-success {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
  }
  
  .success-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
    max-width: 500px;
  }
  
  .success-icon {
    background-color: #4caf50;
    color: white;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    margin: 0 auto 20px;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
  }
  
  .home-button {
    background-color: #5469d4;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #4054b2;
  }
  </style>