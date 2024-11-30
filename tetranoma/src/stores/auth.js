import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  
  actions: {
    async login(credentials) {
      console.log("Attempting login with:", credentials)
      // Тук ще добавим истинската логика за вход по-късно
      this.isAuthenticated = true
      this.user = { email: credentials.email }
    },
    
    logout() {
      console.log("Logging out user")
      this.user = null
      this.isAuthenticated = false
    }
  }
})