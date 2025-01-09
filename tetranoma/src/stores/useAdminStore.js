import { defineStore } from 'pinia'
import api from '@/api/axios'
import { useToast } from 'vue-toastification'

export const useAdminStore = defineStore('admin', {
    state: () => ({
        users: [],
        orders: [],
        stats: {
            totalUsers: 0,
            totalFigures: 0,
            totalOrders: 0,
            revenue: [{ total: 0 }],
        },
        loading: false,
        error: null,
    }),

    actions: {
        async getAllUsersWithActivity(filters = {}) {
            console.log('Getting all users with activity')
            this.loading = true
            try {
                const response = await api.get('/admin/users-with-activity', {
                    params: filters,
                })
                this.users = response.data.users
                return response.data
            } catch (error) {
                console.error('Error fetching users:', error)
                this.error =
                    error.response?.data?.message || 'Error loading users'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateUserRole(userId, role) {
            console.log('Updating user role', { userId, role })
            this.loading = true
            try {
                const response = await api.put('/admin/users/role', {
                    userId,
                    role,
                })
                const updatedUserIndex = this.users.findIndex(
                    u => u._id === userId,
                )
                if (updatedUserIndex !== -1) {
                    this.users[updatedUserIndex] = response.data.user
                }
                useToast().success('User role updated successfully')
                return response.data
            } catch (error) {
                console.error('Error updating user role:', error)
                useToast().error(
                    error.response?.data?.message || 'Error updating role',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async createUser(userData) {
            console.log('Creating new user')
            this.loading = true
            try {
                const response = await api.post('/admin/create-user', userData)
                useToast().success('User created successfully')
                return response.data
            } catch (error) {
                console.error('Error creating user:', error)
                useToast().error(
                    error.response?.data?.message || 'Error creating user',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateUser(userId, userData) {
            console.log('Updating user', { userId })
            this.loading = true
            try {
                const response = await api.put(
                    `/admin/update-user/${userId}`,
                    userData,
                )
                const updatedUserIndex = this.users.findIndex(
                    u => u._id === userId,
                )
                if (updatedUserIndex !== -1) {
                    this.users[updatedUserIndex] = response.data.user
                }
                useToast().success('User updated successfully')
                return response.data
            } catch (error) {
                console.error('Error updating user:', error)
                useToast().error(
                    error.response?.data?.message || 'Error updating user',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteUser(userId) {
            console.log('Deleting user', { userId })
            this.loading = true
            try {
                await api.delete(`/admin/delete-user/${userId}`)
                this.users = this.users.filter(user => user._id !== userId)
                useToast().success('User deleted successfully')
            } catch (error) {
                console.error('Error deleting user:', error)
                useToast().error(
                    error.response?.data?.message || 'Error deleting user',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async getAllOrders(filters = {}) {
            console.log('Getting all orders')
            this.loading = true
            try {
                const response = await api.get('/admin/orders', {
                    params: filters,
                })
                this.orders = response.data.orders
                return response.data
            } catch (error) {
                console.error('Error fetching orders:', error)
                this.error =
                    error.response?.data?.message || 'Error loading orders'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateOrderStatus(orderId, status) {
            console.log('Updating order status', { orderId, status })
            this.loading = true
            try {
                const response = await api.put(
                    `/admin/orders/${orderId}/status`,
                    { status },
                )
                const orderIndex = this.orders.findIndex(o => o._id === orderId)
                if (orderIndex !== -1) {
                    this.orders[orderIndex] = response.data.order
                }
                useToast().success('Order status updated successfully')
                return response.data
            } catch (error) {
                console.error('Error updating order status:', error)
                useToast().error(
                    error.response?.data?.message || 'Error updating status',
                )
                throw error
            } finally {
                this.loading = false
            }
        },
        async getDashboardStats() {
            this.loading = true
            try {
                const response = await api.get('/admin/dashboard-stats')
                this.stats = {
                    ...response.data.stats,
                    revenue: response.data.stats.revenue || [{ total: 0 }],
                }
                return response.data
            } catch (error) {
                console.error('Error fetching dashboard stats:', error)
                this.error =
                    error.response?.data?.message || 'Error loading stats'
                throw error
            } finally {
                this.loading = false
            }
        },
        async createFigureAdmin(figureData) {
            console.log('Creating figure as admin', figureData)
            this.loading = true
            try {
                const response = await api.post(
                    '/admin/create-figure',
                    figureData,
                )
                useToast().success('Figure created successfully')
                return response.data
            } catch (error) {
                console.error('Error creating figure:', error)
                useToast().error(
                    error.response?.data?.message || 'Error creating figure',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateFigureAdmin(figureId, figureData) {
            console.log('Updating figure as admin', { figureId, figureData })
            this.loading = true
            try {
                const response = await api.put(
                    `/admin/update-figure/${figureId}`,
                    figureData,
                )
                useToast().success('Figure updated successfully')
                return response.data
            } catch (error) {
                console.error('Error updating figure:', error)
                useToast().error(
                    error.response?.data?.message || 'Error updating figure',
                )
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteFigureAdmin(figureId, data) {
            console.log('Deleting figure as admin', { figureId, data })
            this.loading = true
            try {
                await api.delete(`/admin/delete-figure/${figureId}`, { data })
                useToast().success('Figure deleted successfully')
            } catch (error) {
                console.error('Error deleting figure:', error)
                useToast().error(
                    error.response?.data?.message || 'Error deleting figure',
                )
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
