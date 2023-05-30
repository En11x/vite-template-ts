const routes = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/pages/home.vue'),
    meta: {
      title: 'Home',
      auth: true,
    },
  },
  {
    path: '/:pathMath(.*)*',
    component: () => import('@/pages/404.vue'),
  },
];

export default routes;
