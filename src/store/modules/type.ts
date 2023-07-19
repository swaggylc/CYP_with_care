// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入请求方法
import { getTypeOne, getTypeTwo,getTypeThree } from '@/API/product/attr/index.ts'
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
    async getTwoTypes(category1Id: number | string) {
      let res: ITypeRes = await getTypeTwo(category1Id)
      if (res.code == 200) {
        this.ArrTypeTwo = res.data
      }
    },
    async getThreeTypes(category2Id: number | string) {
      let res: ITypeRes = await getTypeThree(category2Id)
      if (res.code == 200) {
        this.ArrTypeThree = res.data
      }
    },
  },
  getters: {},
})

export default useTypeStore
