import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useFiguresStore = defineStore('figures', {
    state: () => ({
        figures: [],
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10,
        },
        filters: {
            category: '',
            title: '',
            minPrice: null,
            maxPrice: null,
            minRating: null,
        },
    }),

    actions: {
        async createFigure(figureData) {
            console.log('Creating figure with data:', figureData)
            this.loading = true
            try {
                const response = await api.post('/figures/create', figureData)
                console.log('Figure created successfully:', response.data)
                return response.data
            } catch (error) {
                console.error('Error creating figure:', error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async getFigures(page = 1, filters = {}) {
            console.log('Fetching figures with filters:', filters)
            this.loading = true
            try {
                const params = {
                    page,
                    limit: this.pagination.itemsPerPage,
                    ...filters,
                }
                const response = await api.get('/figures/list', { params })
                console.log('Received figures data:', response.data)
                this.figures = response.data.figures
                this.pagination = response.data.pagination
            } catch (error) {
                console.error('Error fetching figures:', error)
                this.error = error
            } finally {
                this.loading = false
            }
        },

        updateFilters(newFilters) {
          console.log("Updating filters:", newFilters)
          this.filters = { ...this.filters, ...newFilters }
          this.getFigures(1, this.filters)
        },
    },
})
