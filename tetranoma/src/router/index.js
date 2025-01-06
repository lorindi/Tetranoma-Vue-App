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
import FigureDetailsView from '@/views/FigureDetailsView.vue'

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
            path: '/figures',
            name: 'figures',
            component: FiguresView,
        },
        {
            path: "/figures/:id",
            name: "figure-details",
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
    ],
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = await authStore.checkAuth()

    if (to.meta.requiresAuth && !isAuthenticated) {
        console.log('Unauthorized access attempt - redirecting to sign-in')
        next({ name: 'sign-in' })
        return
    }

    if (to.meta.requiresGuest && isAuthenticated) {
        console.log(
            'Authenticated user trying to access guest route - redirecting to home',
        )
        next({ name: 'home' })
        return
    }

    console.log('Navigation allowed to proceed')
    next()
})

export default router
