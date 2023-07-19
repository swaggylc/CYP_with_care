// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入请求方法
import { getTypeOne } from '@/API/product/attr/index.ts'
// 引入ts类型
import type { ITypeRes } from '@/API/product/attr/type.ts'
import type { TypeState } from '../type/type'

let useTypeStore = defineStore('Type', {
  state: (): TypeState => {
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
      let res: ITypeRes = await getTypeOne()
      if (res.code == 200) {
        this.ArrTypeOne = res.data
      }
    },
  },
  getters: {},
})

export default useTypeStore
