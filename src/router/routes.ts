// 对外暴露配置路由
export const constantRoutes = [
  {
    name: '/',
    path: '/',
    redirect: '/login',
    meta: {
      title: '根路由',
      hidden: true,
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, // 是否隐藏 用于左侧菜单栏 true为隐藏 false为显示
    },
  },
  {
    name: 'layout',
    path: '/layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',
      hidden: false,
    },
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'House',
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    name: 'any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
