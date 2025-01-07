import { defineStore } from "pinia"
import api from "@/api/axios"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("isAuthenticated"),
    loading: false,
    error: null
  }),

  actions: {
    clearAuth() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")
    },

    async checkAuth() {
      try {
        const isAuthenticated = !!localStorage.getItem("isAuthenticated")
        if (isAuthenticated) {
          this.isAuthenticated = true
          this.user = JSON.parse(localStorage.getItem("user"))
          return true
        } else {
          console.log("User is not authenticated")
          this.clearAuth()
          return false
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        this.clearAuth()
        return false
      }
    },

    async signIn(credentials) {
      this.loading = true
      try {
        const response = await api.post("/auth/sign-in", credentials)
        
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(this.user))
        localStorage.setItem("isAuthenticated", "true")
        
        return response.data
      } catch (error) {
        console.error("Sign in error:", error)
        this.error = error.response?.data?.message || "Error signing in"
        throw error
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      try {
        this.clearAuth()
      } catch (error) {
        console.error("Sign out error:", error)
        throw error
      }
    },

    async getProfile() {
      console.log("Getting profile")
      try {
        const response = await api.get("/profile")
        this.user = response.data.user
        return response.data
      } catch (error) {
        console.error("Error fetching profile:", error)
        if (error.response?.status === 401) {
          this.clearAuth()
        }
        throw error
      }
    },

    async updateProfile(userData) {
      console.log("Updating profile:", userData)
      try {
        const response = await api.put("/profile/update", userData)
        this.user = response.data.user
        localStorage.setItem("user", JSON.stringify(this.user))
        return response.data
      } catch (error) {
        console.error("Error updating profile:", error)
        throw error
      }
    },

    async deleteProfile() {
      try {
        await api.delete("/profile/delete")
        this.clearAuth()
      } catch (error) {
        console.error("Error deleting profile:", error)
        throw error
      }
    },

    async createAccount(userData) {
      this.loading = true
      try {
        const response = await api.post("/auth/create-account", userData)
        return response.data
      } catch (error) {
        console.error("Account creation error:", error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})