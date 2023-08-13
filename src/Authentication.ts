// 路由鉴权：判断路由是否可以访问的设置
import router from './router/index.ts'
// 引入进度条插件
//@ts-ignore
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入仓库
import { pinia } from './store/index.ts'
// 引入用户仓库
//@ts-ignore
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore(pinia)
// 引入本地存储方法
import { REMOVE_SOME } from '@/utils/localFunction.ts'

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
router.beforeEach(async (to, from, next) => {
  document.title = 'ECUT运营平台-' + to.meta.title
  // 访问路由前触发
  // 开启进度条
  NProgress.start()
  // 判断仓库中是否有token，判断用户是否登录
  let token = userStore.token
  //   获取用户信息
  let username = userStore.username
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/',
      })
    } else {
      // 登陆成功后，访问其他页面
      // 判断是否有用户信息
      if (username) {
        next()
      } else {
        // 没有用户信息，获取用户信息
        try {
          await userStore.GetUserInfo()
          // 若此处访问的是异步路由，则可能导致虽然已经获取到了用户信息，但是异步路由还未添加到路由表中
          next({ ...to })
        } catch (error) {
          // 有token，但是获取用户信息失败，token失效
          // 清空token
          await userStore.logout()
          next({
            path: '/login',
            query: {
              redirect: to.path,
            },
          })
        }
      }
    }
  } else {
    // 未登录
    // 判断是否访问登录页面
    if (to.path === '/login') {
      next()
    } else {
      // 跳转到登录页面
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
    }
  }
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 访问路由后触发
  // 关闭进度条
  NProgress.done()
})

// 用户未登录，只能访问登录页面，访问其他页面重定向到登录页面
// 用户已登录，可以访问所有页面，但是不能访问登录页面，访问登录页面重定向到首页
