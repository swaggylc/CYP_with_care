// 定义所有接口都会返回的数据类型
export interface IBrand {
  code: number
  message: string
  ok: boolean
}
// 一个品牌的ts数据类型
export interface IBrandItem {
  id?: number
  logoUrl: string
  tmName: string
}
// 品牌数组类型
export type IBrandList = IBrandItem[]
// 品牌列表返回的数据类型
export interface IBrandListRes extends IBrand {
  data: {
    records: IBrandList
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
