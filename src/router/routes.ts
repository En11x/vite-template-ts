const Layout = () => import('@/layout/index.vue')

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/:pathMath(.*)*',
    component: () => import('@/pages/404.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/page1',
    meta: {
      title: 'Home',
      auth: false,
    },
    children: [
      {
        path: 'page1',
        component: () => import('@/pages/page1/index.vue'),
        name: 'page1',
        meta: {},
      },
    ],
  },
]

export default routes
