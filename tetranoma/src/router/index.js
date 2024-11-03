import AboutView from '@/views/AboutView.vue'
import AddFigureView from '@/views/AddFigureView.vue'
import ContactView from '@/views/ContactView.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import FiguresView from '@/views/FiguresView.vue'
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
        {
            path: '/figures',
            name: 'figures',
            component: FiguresView,
        },
        {
            path: '/add-figure',
            name: 'add-figure',
            component: AddFigureView,
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
    ],
})

export default router
