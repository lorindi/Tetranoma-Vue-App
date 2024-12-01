import { defineStore } from "pinia"
import api from "@/api/axios"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // Store user information from localStorage or set to null
    user: JSON.parse(localStorage.getItem("user")) || null,
    // Determine if the user is authenticated based on localStorage
    isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  }),
  
  actions: {
    async createAccount(userData) {
      console.log("Creating account with data:", userData)
      try {
        const response = await api.post("/auth/create-account", userData)
        console.log("Account creation successful:", response.data)
        return response.data
      } catch (error) {
        console.error("Account creation error:", error.response?.data || error.message)
        throw error
      }
    },
    async login(credentials) {
      // console.log("Attempting login with:", credentials)
      try {
        // Send POST request to sign in the user
        const response = await api.post("/auth/sign-in", credentials)
        // console.log("Login response:", response.data)
        
        // Update authentication state
        this.isAuthenticated = true
        this.user = response.data.user
        
        // Save authentication state in localStorage
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        return response.data
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message)
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