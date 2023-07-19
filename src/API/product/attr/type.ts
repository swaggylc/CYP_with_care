// 分类数据的相关ts类型

// 所有接口都有的数据类型
export interface IResponse {
  code: number
  message: string
  ok: boolean
}
// 一级单个分类的ts类型
export interface IType {
  id: number | string
  name: string
  createTime: string
  updateTime: string
  category1Id?: number
  category2Id?: number
}
// 分类接口返回的的ts类型

export interface ITypeRes extends IResponse {
  data: IType[]
}
