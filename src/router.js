import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/Pages/LandingPage.vue';
import AdminHome from './components/Pages/AdminHome.vue';
import GuestHome from './components/Pages/GuestHome.vue';

const routes = [
    {
        path: '/landing',
        name: 'landing-page',
        component: LandingPage
    },
    {
        path: '/admin',
        name: 'admin-home',
        component: AdminHome,
        meta: { requiresAdmin: true },
    },
    {
        path: '/guest',
        name: 'guest-home',
        component: GuestHome,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
      next();
    } else {
      next({ name: 'guest-home' });
    }
  } else {
    next();
  }
});

export default router;
