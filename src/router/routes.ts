// 对外暴露配置路由
export const constantRoutes = [
  {
    name: '/',
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/layout/index.vue'),
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
  },
  {
    name: 'any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
