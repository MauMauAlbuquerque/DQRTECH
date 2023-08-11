import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/components/BasicLayout.vue'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/KnightsCenter',
    hidden: true,
    children: [
      { path: '/KnightsCenter', name: 'KnightsCenter', component: () => import('@/views/KnightsCenteView.vue') },
      { path: '/Instructions', name: 'Instructions', component: () => import('@/views/InstructionsView.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
