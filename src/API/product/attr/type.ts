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

// 属性与属性值的ts类型

// 属性值对象的ts类型
export interface IAttrValue {
  id?: number
  valueName: string
  attrId?: number | string
  createTime: null
  updateTime: null
}
// 存储属性值的数组的ts类型
export type IAttrValueArr = IAttrValue[]

// 属性对象的ts类型
export interface IAttr {
  id?: number
  createTime: null
  updateTime: null
  attrName: string
  categoryId: number|string
  categoryLevel: number
  attrValueList: IAttrValueArr
}
// 获取已有属性及属性值接口返回的ts类型
export interface IAttrRes extends IResponse {
  data: IAttr[]
}
