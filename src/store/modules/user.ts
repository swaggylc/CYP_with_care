// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { login, getUserInfo, logout } from '@/API/user/index.ts'
// 引入ts类型
import type {
  LoginParamsType,
  LoginResponseType,
  GetUserInfoResponseType,
} from '@/API/user/type.ts'
import type { UserState } from '@/store/type/type.ts'
// 引入本地存储方法
import { SET_SOME, GET_SOME, REMOVE_SOME } from '@/utils/localFunction'
// 引入常量路由,异步路由,任意路由
import { constantRoutes, asyncRoutes, anyRoute } from '@/router/routes.ts'
import router from '@/router'
// 引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 定义过滤异步路由的方法
function filterAsyncRoutes(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        // 其他账号登陆后，由于对异步路由的children进行了二次赋值，导致下一个账号登陆后，
        // 异步路由的children会变成上一个账号过滤后的结果，即可能由4个子路由变为2个子路由，所以考虑深拷贝
        item.children = filterAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

// 创建小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_SOME('TOKEN') || '',
      menuList: constantRoutes, // 菜单列表
      username: '',
      avatar: '',
      // 按钮权限
      buttons: [],
    }
  },

  // 处理异步/逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: LoginParamsType) {
      let res: LoginResponseType = await login(data)
      if (res.code === 200) {
        this.token = res.data as string
        // 将token存储到本地
        SET_SOME('TOKEN', res.data as string)
        // 返回一个成功的promise
        return 'ok'
      } else {
        // 返回一个失败的promise
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息的方法
    async GetUserInfo() {
      let res: GetUserInfoResponseType = await getUserInfo()
      // console.log(res.data.routes)

      if (res.code == 200) {
        // 将用户信息存储到小仓库中
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons
        // 计算当前用户需要展示的异步路由
        let userAsyncRoutes = filterAsyncRoutes(
          cloneDeep(asyncRoutes),
          res.data.routes,
        )
        // 菜单列表
        this.menuList = [...constantRoutes, ...userAsyncRoutes, anyRoute]
        // 目前路由器管理的只有常量路由：用户计算完后的异步路由和任意路由需要动态追加
        ;[...userAsyncRoutes, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出登录的方法
    async logout() {
      let res: any = await logout()
      if (res.code == 200) {
        // 清空token
        this.token = ''
        // 清空本地存储
        REMOVE_SOME('TOKEN')
        // 清空用户信息
        this.username = ''
        this.avatar = ''
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})

// 导出小仓库
export default useUserStore
