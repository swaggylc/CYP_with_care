import request from '@/utils/request'
// 引入ts数据类型
import { IGetSPUListResType } from './type'

enum API {
  // 获取spu列表
  GETSPULIST = '/admin/product/',
}

// 获取spu列表的方法
export const getSPUList = (
  page: number,
  limit: number,
  category3Id: number | string,
) => {
  return request.get<any, IGetSPUListResType>(
    API.GETSPULIST + `${page}/${limit}?category3Id=${category3Id}`,
  )
}
