// 用户管理相关接口
import request from '@/utils/request'
// 引入ts类型
import { UserListResponse } from './type.ts'

enum API {
  // 获取用户列表
  GETUSERLIST_URL = '/admin/acl/user/',
}

// 获取用户列表的方法
export const getUserList = (page: number, size: number) => {
  return request.get<any, UserListResponse>(
    API.GETUSERLIST_URL + `${page}/${size}`,
  )
}
