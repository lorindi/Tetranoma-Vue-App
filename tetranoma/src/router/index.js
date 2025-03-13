import { useAuthStore } from '@/stores/useAuthStore'
import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import AddFigureView from '@/views/AddFigureView.vue'
import ContactView from '@/views/ContactView.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import FiguresView from '@/views/FiguresView.vue'
import HomeView from '@/views/home/HomeView.vue'
import SearchByCategoryView from '@/views/SearchByCategoryView.vue'
import SignInView from '@/views/SignInView.vue'
import FaqView from '@/views/FaqView.vue'
import FigureDetailsView from '@/views/SingleView/FigureDetailsView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UpdateFigureView from '@/views/UpdateFigureView.vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard.vue'
import AdminUsers from '@/components/admin/AdminUsers.vue'
import AdminFigures from '@/components/admin/AdminFigures.vue'
import AdminOrders from '@/components/admin/AdminOrders.vue'
import PaymentSuccessView from '@/views/PaymentSuccessView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInView,
            meta: { requiresGuest: true },
        },
        {
            path: '/create-account',
            name: 'create-account',
            component: CreateAccountView,
            meta: { requiresGuest: true },
        },
        {
            path: '/payment-success',
            name: 'PaymentSuccess',
            component: PaymentSuccessView,
        },
        {
            path: '/figures',
            name: 'figures',
            component: FiguresView,
        },
        {
            path: '/figures/:id',
            name: 'figure-details',
            component: FigureDetailsView,
        },
        {
            path: '/search-figure',
            name: 'search-figure',
            component: SearchByCategoryView,
        },
        {
            path: '/add-figure',
            name: 'add-figure',
            component: AddFigureView,
            meta: { requiresAuth: true },
        },
        {
            path: '/update-figure/:id',
            name: 'update-figure',
            component: UpdateFigureView,
            meta: { requiresAuth: true },
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
        },
        {
            path: '/faq',
            name: 'faq',
            component: FaqView,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView,
            meta: { requiresAuth: true },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAuth: true, requiresAdmin: true },
            children: [
                {
                    path: '',
                    name: 'admin-dashboard',
                    component: AdminDashboard,
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: AdminUsers,
                },
                {
                    path: 'orders',
                    name: 'admin-orders',
                    component: AdminOrders,
                },
                {
                    path: 'figures',
                    name: 'admin-figures',
                    component: AdminFigures,
                },
            ],
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = await authStore.checkAuth()
    const isAdmin = authStore.user?.role === 'admin'

    if (to.meta.requiresAdmin && !isAdmin) {
        console.log('Access denied: Admin rights required')
        next({ name: 'home' })
        return
    }

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'sign-in' })
        return
    }

    next()
})
export default router
