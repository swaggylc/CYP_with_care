// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { login, getUserInfo, logout } from '@/API/user/index.ts'
// 引入ts类型
import type { UserState } from '@/store/type/type.ts'
// 引入本地存储方法
import { SET_SOME, GET_SOME, REMOVE_SOME } from '@/utils/localFunction'
// 引入常量路由
import { constantRoutes } from '@/router/routes.ts'
// 创建小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_SOME('TOKEN') || '',
      menuList: constantRoutes, // 菜单列表
      username: '',
      avatar: '',
    }
  },

  // 处理异步/逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: any) {
      let res: any = await login(data)
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
      let res: any = await getUserInfo()
      if (res.code == 200) {
        // 将用户信息存储到小仓库中
        this.username = res.data.name
        this.avatar = res.data.avatar
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
