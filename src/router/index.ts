import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/update-password',
      name: 'UpdatePassword',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('../views/PricingView.vue')
    },
    {
      path: '/upload',
      name: 'Uploader',
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/todo',
      name: 'Todo',
      component: () => import('../views/CrudView.vue')
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/legal/:id',
      name: 'Lega;',
      component: () => import('../views/LegalView.vue')
    },

    // Admin Routes
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: () => import('../admin/UsersView.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../admin/DashboardView.vue')
    },
    {
      path: '/admin/ui-components',
      name: 'AdminComponents',
      component: () => import('../admin/UiView.vue')
    },
  ]
})

export default router
