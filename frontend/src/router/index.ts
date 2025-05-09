import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/Register-Page.vue'
import Login from '@/Login-Page.vue'
import Home from '@/Home-Page.vue'
import LeaderboardPage from '@/Leaderboard-Page.vue'
import Gameplay from '@/Game-play.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
      /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    */
    {
      path: '/leaderboard',
      component: LeaderboardPage,
    },
    {
       path: '/register',
       component: Register,
     },
     {
      path: '/login',
      component: Login,
     },
     {
      path: '/gameplay',
      component: Gameplay,
     },
  ],
})

export default router
