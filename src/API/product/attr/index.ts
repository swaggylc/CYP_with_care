import request from '@/utils/request'
// 商品属性相关API
// 引入ts类型
import { ITypeRes, IAttrRes, IAttr } from './type'
enum API {
  // 获取一级分类数据
  GETTYPEONE_URL = '/admin/product/getCategory1',
  // 获取二级分类数据
  GETTYPETWO_URL = '/admin/product/getCategory2/',
  // 获取三级分类数据
  GETTYPETHREE_URL = '/admin/product/getCategory3/',
  // 获取属性数据
  GETATTR_URL = '/admin/product/attrInfoList/',
  // 添加或修改已有属性的接口
  POSTATTR_URL = '/admin/product/saveAttrInfo/',
  // 删除已有属性的接口
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}
// 获取一级分类数据的方法
export const getTypeOne = () => {
  return request.get<any, ITypeRes>(API.GETTYPEONE_URL)
}
// 获取二级分类数据的方法
export const getTypeTwo = (category1Id: string | number) => {
  return request.get<any, ITypeRes>(API.GETTYPETWO_URL + `${category1Id}`)
}
// 获取三级分类数据的方法
export const getTypeThree = (category2Id: string | number) => {
  return request.get<any, ITypeRes>(API.GETTYPETHREE_URL + `${category2Id}`)
}
// 获取属性数据的方法
export const getAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) => {
  return request.get<any, IAttrRes>(
    API.GETATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
}

// 添加或修改已有属性的方法
export const postAttr = (data: IAttr) => {
  return request.post<any, any>(API.POSTATTR_URL, data)
}

// 删除已有属性的方法
export const deleteAttr = (attrId: string | number) => {
  return request.delete<any, any>(API.DELETEATTR_URL + `${attrId}`)
}
