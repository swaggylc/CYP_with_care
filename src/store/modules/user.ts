// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { login, getUserInfo } from '@/API/user/index.ts'
// 引入ts类型
import type { LoginParamsType, LoginResultModel } from '@/API/user/type.ts'
import type { UserState } from '@/store/type/type.ts'
// 引入本地存储方法
import { SET_SOME, GET_SOME,REMOVE_SOME } from '@/utils/localFunction'
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
    async userLogin(data: LoginParamsType) {
      let res: LoginResultModel = await login(data)
      //   console.log(res);
      if (res.code === 200) {
        this.token = res.data.token as string
        // 将token存储到本地
        SET_SOME('TOKEN', res.data.token as string)
        // 返回一个成功的promise
        return 'ok'
      } else {
        // 返回一个失败的promise
        return Promise.reject(new Error(res.data.message))
      }
    },
    // 获取用户信息的方法
    async GetUserInfo() {
      let res: any = await getUserInfo()
      if (res.code == 200) {
        // 将用户信息存储到小仓库中
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },
    // 退出登录的方法
    async logout() {
      // 清空token
      this.token = ''
      // 清空本地存储
      REMOVE_SOME('TOKEN')
      // 清空用户信息
      this.username = ''
      this.avatar = ''
      return 'ok'
    },
  },
  getters: {},
})

// 导出小仓库
export default useUserStore
