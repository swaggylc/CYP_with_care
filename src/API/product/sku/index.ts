// sku相关接口与方法
import request from '@/utils/request'
// 引入ts类型
import type { SkuListRes } from './type'

enum API {
  // 获取sku列表
  GETSKULIST_URL = '/admin/product/list/',
}

// 获取sku列表的方法
export const getSkuList = (page: number, limit: number) => {
  return request.get<any, SkuListRes>(API.GETSKULIST_URL + `${page}/${limit}`)
}
