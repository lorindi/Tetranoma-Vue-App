import CreateAccountView from '@/views/CreateAccountView.vue'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
        },
        {
            path: '/create-account',
            name: 'create-account',
            component: CreateAccountView,
        },
    ],
})

export default router
