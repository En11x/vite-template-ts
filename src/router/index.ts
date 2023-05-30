import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.auth) {
    //登录页

    return {
      path: '/login',
      //保存现在位置
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
