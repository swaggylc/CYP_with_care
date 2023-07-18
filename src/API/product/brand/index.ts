// 品牌管理模块接口
import request from '@/utils/request'
import { IBrandListRes } from './type'
enum API {
  // 获取品牌列表
  GETBRANDLIST_URL = '/admin/product/baseTrademark/',
}

// 获取品牌列表的方法
export const getBrandList = (page: number, limit: number) => {
  return request.get<any, IBrandListRes>(
    API.GETBRANDLIST_URL + `${page}/${limit}`,
  )
}
