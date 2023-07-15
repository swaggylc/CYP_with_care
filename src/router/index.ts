import { constantRoutes } from './routes'
// 通过vue-router插件实现模板路由的配置
import { createRouter, createWebHashHistory } from 'vue-router'

// 创建路由器
const router = createRouter({
  // 指定路由模式
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export default router
