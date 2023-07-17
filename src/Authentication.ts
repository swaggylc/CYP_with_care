// 路由鉴权：判断路由是否可以访问的设置
import router from './router/index.ts'
// 引入进度条插件
//@ts-ignore
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 设置进度条配置
NProgress.configure({ showSpinner: false })

// 添加路由守卫
// 全局前置守卫
/**
 * @description: 全局前置守卫
 * @param {to} 跳转的路由信息
 * @param {from} 跳转前的路由信息
 * @param {next} 跳转到下一个路由的方法，放行函数
 * @return {void}
 * @Date: 2023-7-17 19:32:00
 * @LastEditors: swaggy
 */
router.beforeEach((to, from, next) => {
  // 访问路由前触发
  // 开启进度条
  NProgress.start()

  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 访问路由后触发
  // 关闭进度条
  NProgress.done()
})
