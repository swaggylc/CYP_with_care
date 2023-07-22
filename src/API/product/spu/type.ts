// 所有接口都有的ts数据类型
export interface IProductSpuType {
  code: number
  message: string
  ok: boolean
}

// 单个SPU的ts数据类型
export interface ISpuType {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | ISpuSaleAttrType[]
  spuImageList: null | ISpuImageType[]
  createTime?: string
  updateTime?: string
  spuPosterList?: null
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

// spu品牌列表单个品牌的ts数据类型
export interface ISpuBrandType {
  id: number
  logoUrl: string
  tmName: string
  createTime: string
  updateTime: string
}
// spu品牌列表多个品牌组成数组的ts数据类型
export type ISpuBrandListType = ISpuBrandType[]
// 获取spu品牌列表接口返回的数据类型
export interface IGetSPUBrandListResType extends IProductSpuType {
  data: ISpuBrandListType
}

// spu图片列表单个图片的ts数据类型
export interface ISpuImageType {
  id?: number
  imgName: string
  imgUrl: string
  spuId?: number
  createTime?: string
  updateTime?: string
  url?: string
  name?: string
}
// spu图片列表多个图片组成数组的ts数据类型
export type ISpuImageListType = ISpuImageType[]
// 获取spu图片列表接口返回的数据类型
export interface IGetSPUImageListResType extends IProductSpuType {
  data: ISpuImageListType
}

// spu销售属性列表单个销售属性的属性值的ts数据类型
export interface ISpuSaleAttrValue {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
// 属性值列表的数组的ts数据类型
export type ISpuSaleAttrValueListType = ISpuSaleAttrValue[]
// 单个销售属性的ts数据类型
export interface ISpuSaleAttrType {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: ISpuSaleAttrValueListType
  flag?: boolean
  inputValue?: string
}
// 销售属性接口返回的数据类型
export interface IGetSPUSaleAttrListResType extends IProductSpuType {
  data: ISpuSaleAttrType[]
}

// 所有销售属性列表单个销售属性的ts数据类型
export interface IBaseSaleAttrType {
  id: number
  name: string
  createTime: string
  updateTime: string
}
// 所有销售属性列表多个销售属性组成数组的ts数据类型
export type IBaseSaleAttrListType = IBaseSaleAttrType[]
// 所有销售属性列表接口返回的数据类型
export interface IGetBaseSaleAttrListResType extends IProductSpuType {
  data: IBaseSaleAttrListType
}
