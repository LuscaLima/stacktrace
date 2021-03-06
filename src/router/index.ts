import { createRouter, createWebHistory } from 'vue-router'

// Views
import Home from '@/views/Home/index.vue'
import HomeJoin from '@/views/Home/Join/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {
        name: 'homeJoin'
      },
      children: [
        {
          path: 'join',
          name: 'homeJoin',
          component: HomeJoin
        },
        {
          path: 'create',
          name: 'homeCreate',
          component: () => import('@/views/Home/Create/index.vue')
        }
      ]
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import('@/views/Room/index.vue')
    }
  ]
})

export default router
