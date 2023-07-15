// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { login } from '@/API/user/index.ts'
// 引入ts类型
import type { LoginParamsType, LoginResultModel } from '@/API/user/type.ts'
import type { UserState } from '@/store/type/type.ts'
// 引入本地存储方法
import { SET_SOME, GET_SOME } from '@/utils/localFunction'
// 创建小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_SOME('TOKEN') || '',
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
  },
  getters: {},
})

// 导出小仓库
export default useUserStore
