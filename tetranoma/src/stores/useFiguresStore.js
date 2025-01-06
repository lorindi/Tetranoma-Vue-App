import { defineStore } from 'pinia'
import api from '@/api/axios'
import router from '@/router'

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
            sortBy: 'createdAt',
            sortOrder: 'desc',
        },
    }),

    actions: {
        async createFigure(figureData) {
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
            this.loading = true
            try {
                const params = {
                    page,
                    limit: this.pagination.itemsPerPage,
                    sortBy: filters.sortBy || this.filters.sortBy,
                    sortOrder: filters.sortOrder || this.filters.sortOrder,
                    ...filters,
                }
                const response = await api.get('/figures/list', { params })
                this.figures = response.data.figures
                this.pagination = response.data.pagination
            } catch (error) {
                console.error('Error fetching figures:', error)
                this.error = error
            } finally {
                this.loading = false
            }
        },

        async toggleFavorite(figureId) {
            try {
                const response = await api.post(`/figures/favorite/${figureId}`)

                const figureIndex = this.figures.findIndex(
                    f => f._id === figureId,
                )

                if (figureIndex !== -1) {
                    const updatedFigure = { ...this.figures[figureIndex] }

                    if (!updatedFigure.favorites) {
                        updatedFigure.favorites = []
                    }

                    if (response.data.isFavorite) {
                        if (
                            !updatedFigure.favorites.includes(
                                response.data.userId,
                            )
                        ) {
                            updatedFigure.favorites.push(response.data.userId)
                        }
                    } else {
                        updatedFigure.favorites =
                            updatedFigure.favorites.filter(
                                id => id !== response.data.userId,
                            )
                    }

                    this.figures[figureIndex] = updatedFigure
                }

               
                
                return response.data
            } catch (error) {
                console.error('Error toggling favorite:', error)
                throw error
            }
        },
        updateFilters(newFilters) {
            this.filters = { ...this.filters, ...newFilters }
            this.getFigures(1, this.filters)
        },
    },
})
