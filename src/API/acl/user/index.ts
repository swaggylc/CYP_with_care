// 用户管理相关接口
import request from '@/utils/request'
// 引入ts类型
import { UserListResponse, User } from './type.ts'

enum API {
  // 获取用户列表
  GETUSERLIST_URL = '/admin/acl/user/',
  // 新增用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户
  UPDATEUSER_URL = '/admin/acl/user/update',
}

// 获取用户列表的方法
export const getUserList = (page: number, size: number) => {
  return request.get<any, UserListResponse>(
    API.GETUSERLIST_URL + `${page}/${size}`,
  )
}
// 添加/修改用户的方法
export const addOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
