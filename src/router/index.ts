import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const WHITE_LIST = ['/login'];

router.beforeEach((to, _, next) => {
  const hasToken = localStorage.getItem('accessToken');
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (to.meta.auth) {
        //auth permission
      } else {
        next();
      }
    }
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
