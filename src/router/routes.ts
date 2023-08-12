// 对外暴露配置路由
// 常量路由
export const constantRoutes = [
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, // 是否隐藏 用于左侧菜单栏 true为隐藏 false为显示
    },
  },
  // 主页
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
    },
    redirect: '/home',
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
  // 数据大屏
  {
    name: 'screen',
    path: '/screen',
    component: () => import('@/pages/screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'DataBoard',
    },
  },
  // 404页面
  {
    name: '404',
    path: '/404',
    component: () => import('@/pages/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
// 异步路由
export const asyncRoutes = [
  // 权限管理
  {
    name: 'acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        name: 'user',
        path: '/acl/user',
        component: () => import('@/pages/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        name: 'role',
        path: '/acl/role',
        component: () => import('@/pages/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Operation',
        },
      },
      {
        name: 'permission',
        path: '/acl/permission',
        component: () => import('@/pages/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },
  // 商品管理
  {
    name: 'goods',
    path: '/goods',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'ShoppingTrolley',
    },
    redirect: '/goods/brand',
    children: [
      {
        name: 'brand',
        path: '/goods/brand',
        component: () => import('@/pages/goods/brand/index.vue'),
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingBag',
        },
      },
      {
        name: 'attr',
        path: '/goods/attr',
        component: () => import('@/pages/goods/attr/index.vue'),
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'PriceTag',
        },
      },
      {
        name: 'spu',
        path: '/goods/spu',
        component: () => import('@/pages/goods/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'ScaleToOriginal',
        },
      },
      {
        name: 'sku',
        path: '/goods/sku',
        component: () => import('@/pages/goods/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Files',
        },
      },
    ],
  },
]
// 任意路由
export const anyRoute = {
  name: 'any',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  meta: {
    title: '任意路由',
    hidden: true,
  },
}
