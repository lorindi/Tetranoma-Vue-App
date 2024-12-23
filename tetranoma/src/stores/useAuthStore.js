import { defineStore } from "pinia"
import api from "@/api/axios"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  }),
  
  actions: {
    async createAccount(userData) {
      try {
        const response = await api.post("/auth/create-account", userData)
        return response.data
      } catch (error) {
        console.error("Account creation error:", error.response?.data || error.message)
        throw error
      }
    }, 
    async signIn(credentials) {
      try {
        const response = await api.post("/auth/sign-in", credentials)
        
        this.isAuthenticated = true
        this.user = response.data.user
        
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        return response.data
      } catch (error) {
        console.error("Sign error:", error.response?.data || error.message)
        throw error
      }
    },
    
    async logout() {
      // console.log("Logging out user")
      try {
        // Send POST request to log out the user
        await api.post("/auth/logout")
        this.clearAuth()
      } catch (error) {
        console.error("Logout error:", error)
        this.clearAuth()
        throw error
      }
    },

    clearAuth() {
      // console.log("Clearing auth state")
      // Clear user and authentication state
      this.user = null
      this.isAuthenticated = false
      // Remove authentication data from localStorage
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("user")
    },

    async checkAuth() {
      console.log("Checking authentication status")
      // Check authentication status based on localStorage
      const isAuthenticated = !!localStorage.getItem("isAuthenticated")
      if (isAuthenticated) {
        // console.log("User is authenticated based on localStorage")
        this.isAuthenticated = true
        this.user = JSON.parse(localStorage.getItem("user"))
      } else {
        console.log("User is not authenticated")
        this.clearAuth()
      }
      return isAuthenticated
    }
  }
})