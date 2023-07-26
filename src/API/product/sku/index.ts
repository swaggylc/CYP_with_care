// sku相关接口与方法
import request from '@/utils/request'
// 引入ts类型
import type { SkuListRes,SkuInfoRes } from './type'

enum API {
  // 获取sku列表
  GETSKULIST_URL = '/admin/product/list/',
  // 商品下架的接口
  UNSALE_URL = '/admin/product/cancelSale/',
  // 商品上架的接口
  ONSALE_URL = '/admin/product/onSale/',
  // 获取商品详情的接口
  GETSKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除sku的接口
  DELETESKU_URL = '/admin/product/deleteSku/'
}

// 获取sku列表的方法
export const getSkuList = (page: number, limit: number) => {
  return request.get<any, SkuListRes>(API.GETSKULIST_URL + `${page}/${limit}`)
}
// 上架商品的方法
export const onSale = (skuId: number) => {
  return request.get<any, any>(API.ONSALE_URL + skuId)
}
// 下架商品的方法
export const unSale = (skuId: number) => {
  return request.get<any, any>(API.UNSALE_URL + skuId)
}
// 获取商品详情的方法
export const getSkuInfo = (skuId: number) => {
  return request.get<any, SkuInfoRes>(API.GETSKUINFO_URL + skuId)
}
// 删除sku的方法
export const deleteSku = (skuId: number) => {
  return request.delete<any, any>(API.DELETESKU_URL + skuId)
}