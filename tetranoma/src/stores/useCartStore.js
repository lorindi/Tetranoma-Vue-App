import { defineStore } from 'pinia'
import api from '@/api/axios'
import { useToast } from 'vue-toastification'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        loading: false,
        error: null,
        totalPrice: 0,
    }),

    actions: {
        async addToCart(figureId, quantity) {
            console.log('Adding to cart:', figureId, quantity)
            this.loading = true
            try {
                const response = await api.post('/cart/add', {
                    figureId,
                    quantity,
                })
                console.log('Added to cart successfully:', response.data)
                this.items = response.data.order.items
                this.totalPrice = response.data.order.totalPrice
                useToast().success('Added to cart successfully!')
            } catch (error) {
                console.error('Error adding to cart:', error)
                this.error =
                    error.response?.data?.message || 'Error adding to cart'
                useToast().error(this.error)
            } finally {
                this.loading = false
            }
        },

        async getCart() {
            console.log('Getting cart')
            this.loading = true
            try {
                const response = await api.get('/cart')
                console.log('Cart retrieved:', response.data)
                if (response.data.cart) {
                    this.items = response.data.cart.items
                    this.totalPrice = response.data.cart.totalPrice
                }
            } catch (error) {
                console.error('Error getting cart:', error)
                this.error =
                    error.response?.data?.message || 'Error retrieving cart'
            } finally {
                this.loading = false
            }
        },

        async checkout(paymentData) {
            console.log("Starting checkout process with data:", paymentData);
            this.loading = true;
            try {
                const response = await api.post("/cart/checkout", paymentData);
                console.log("Checkout response:", response.data);
                this.items = [];
                this.totalPrice = 0;
                useToast().success("Order completed successfully!");
                return response.data;
            } catch (error) {
                console.error("Checkout error details:", {
                    message: error.message,
                    response: error.response?.data
                });
                this.error = error.response?.data?.message || "Error processing checkout";
                useToast().error(this.error);
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async removeFromCart(productId) {
            this.loading = true
            try {
                const response = await api.delete(`/cart/remove/${productId}`)
                
                if (response.data.order) {
                    this.items = response.data.order.items
                    this.totalPrice = response.data.order.totalPrice
                } else {
                    this.items = []
                    this.totalPrice = 0
                }
                
                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || "Error removing from cart"
                throw error
            } finally {
                this.loading = false
            }
        }
    },
})
