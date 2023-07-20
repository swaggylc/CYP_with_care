// 所有接口都有的ts数据类型
export interface IProductSpuType {
  code: number
  message: string
  ok: boolean
}

// 单个SPU的ts数据类型
export interface ISpuType {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
}
// 多个SPU组成数组的ts数据类型
export type ISpuListType = ISpuType[]

// 获取spu列表接口返回的data数据类型
export interface IGetSPUListDataType {
  records: ISpuListType
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  hitCount: boolean
  countId: null
  maxLimit: null
  searchCount: boolean
  pages: number
}

// 获取spu列表接口返回的数据类型
export interface IGetSPUListResType extends IProductSpuType {
  data: IGetSPUListDataType
}
