import request from '@/utils/request'
// 引入ts数据类型
import {
  IGetSPUListResType,
  IGetSPUBrandListResType,
  IGetSPUImageListResType,
  IGetSPUSaleAttrListResType,
  IGetBaseSaleAttrListResType,
} from './type'

enum API {
  // 获取spu列表
  GETSPULIST_URL = '/admin/product/',
  // 获取spu品牌列表
  GETSPUBRANDLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取品牌图片列表
  GETSPUBRANDIMAGELIST_URL = '/admin/product/spuImageList/',
  // 获取spu销售属性列表
  GETSPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  // 所有销售属性列表
  GETBASESALEATTRLIST_URL = '/admin/product/baseSaleAttrList',
}

// 获取spu列表的方法
export const getSPUList = (
  page: number,
  limit: number,
  category3Id: number | string,
) => {
  return request.get<any, IGetSPUListResType>(
    API.GETSPULIST_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}
// 获取spu品牌列表的方法
export const getSPUBrandList = () => {
  return request.get<any, IGetSPUBrandListResType>(API.GETSPUBRANDLIST_URL)
}
// 获取品牌图片列表
export const getSPUBrandImageList = (spuId: number | string) => {
  return request.get<any, IGetSPUImageListResType>(
    API.GETSPUBRANDIMAGELIST_URL + spuId,
  )
}
// 获取spu销售属性列表的方法
export const getSPUSaleAttrList = (spuId: number | string) => {
  return request.get<any, IGetSPUSaleAttrListResType>(
    API.GETSPUSALEATTRLIST_URL + spuId,
  )
}
// 所有销售属性列表的方法
export const getBaseSaleAttrList = () => {
  return request.get<any, IGetBaseSaleAttrListResType>(
    API.GETBASESALEATTRLIST_URL,
  )
}
