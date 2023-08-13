import type { RouteRecordRaw } from 'vue-router'

// 引入ts类型
import { IType, IAttr } from '@/API/product/attr/type.ts'

// 定义小仓库数据state类型
export interface UserState {
  token: string
  menuList: RouteRecordRaw[]
  username: string
  avatar: string,
  buttons: string[]
}

// 定义分类仓库state数据类型
export interface TypeState {
  ArrTypeOne: IType[]
  ArrTypeTwo: IType[]
  ArrTypeThree: IType[]
  OneId: string | number
  TwoId: string | number
  ThreeId: string | number
}
