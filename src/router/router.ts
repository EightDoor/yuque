import BaseLayout from '@/layout/BaseLayout.vue';
import Home from '@/pages/home/home.vue';
import Login from '@/pages/login/login.vue';
import NotFound from '@/pages/other/not_found.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
      },
    ],
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
