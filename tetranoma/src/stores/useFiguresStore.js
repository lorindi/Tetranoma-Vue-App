import { defineStore } from "pinia"
import api from "@/api/axios"

export const useFiguresStore = defineStore("figures", {
  state: () => ({
    figures: [],
    loading: false,
    error: null
  }),

  actions: {
    async createFigure(figureData) {
      console.log("Creating figure with data:", figureData)
      this.loading = true
      try {
        const response = await api.post("/figures/create", figureData)
        console.log("Figure created successfully:", response.data)
        return response.data
      } catch (error) {
        console.error("Error creating figure:", error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})