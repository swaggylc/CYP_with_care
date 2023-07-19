// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入请求方法
import { getTypeOne } from '@/API/product/attr/index.ts'

let useTypeStore = defineStore('Type', {
  state: () => {
    return {
      ArrTypeOne: [],
      ArrTypeTwo: [],
      ArrTypeThree: [],
      OneId: '',
      TwoId: '',
      ThreeId: '',
    }
  },
  actions: {
    async getOneTypes() {
      let res: any = await getTypeOne()
      if (res.code == 200) {
        this.ArrTypeOne = res.data
      }
    },
  },
  getters: {},
})

export default useTypeStore
