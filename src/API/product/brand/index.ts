// 品牌管理模块接口
import request from '@/utils/request'
import { IBrandListRes, IBrandItem } from './type'
enum API {
  // 获取品牌列表
  GETBRANDLIST_URL = '/admin/product/baseTrademark/',
  // 添加品牌的接口
  ADD_BRAND_URL = '/admin/product/baseTrademark/save',
  // 修改品牌的接口
  UPDATE_BRAND_URL = '/admin/product/baseTrademark/update',
  // 删除品牌的接口
  DELETE_BRAND_URL = '/admin/product/baseTrademark/remove/',
}

// 获取品牌列表的方法
export const getBrandList = (page: number, limit: number) => {
  return request.get<any, IBrandListRes>(
    API.GETBRANDLIST_URL + `${page}/${limit}`,
  )
}
// 添加/修改品牌的方法
export const addOrUpdateBrand = (data: IBrandItem) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_BRAND_URL, data)
  } else {
    return request.post<any, any>(API.ADD_BRAND_URL, data)
  }
}
// 删除品牌的方法
export const deleteBrand = (id: number) => {
  return request.delete<any, any>(API.DELETE_BRAND_URL + id)
}
