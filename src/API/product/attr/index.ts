import request from '@/utils/request'
// 商品属性相关API
// 引入ts类型
import { ITypeRes } from './type'
enum API {
  // 获取一级分类数据
  GETTYPEONE_URL = '/admin/product/getCategory1',
  // 获取二级分类数据
  GETTYPETWO_URL = '/admin/product/getCategory2',
  // 获取三级分类数据
  GETTYPETHREE_URL = '/admin/product/getCategory3',
}
// 获取一级分类数据的方法
export const getTypeOne = () => {
  return request.get<any, ITypeRes>(API.GETTYPEONE_URL)
}
// 获取二级分类数据的方法
export const getTypeTwo = (category1Id: string | number) => {
  return request.get<any, ITypeRes>(API.GETTYPETWO_URL, {
    params: {
      category1Id,
    },
  })
}
// 获取三级分类数据的方法
export const getTypeThree = (category2Id: string | number) => {
  return request.get<any, ITypeRes>(API.GETTYPETHREE_URL, {
    params: {
      category2Id,
    },
  })
}
