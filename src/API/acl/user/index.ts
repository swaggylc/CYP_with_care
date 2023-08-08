// 用户管理相关接口
import request from '@/utils/request'
// 引入ts类型
import {
  UserListResponse,
  User,
  RoleListResponse,
  AssignRoleParams,
} from './type.ts'

enum API {
  // 获取用户列表
  GETUSERLIST_URL = '/admin/acl/user/',
  // 新增用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，以及当前用户的职位
  GETROLELIST_URL = '/admin/acl/user/toAssign/',
  // 给用户分配职位
  ASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个用户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除用户
  DELETEBATCH_URL = '/admin/acl/user/batchRemove',
}

// 获取用户列表的方法
export const getUserList = (page: number, size: number, username: string) => {
  return request.get<any, UserListResponse>(
    API.GETUSERLIST_URL + `${page}/${size}/?username=${username}`,
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
// 获取职位列表的方法
export const getRoleList = (userId: string | number) => {
  return request.get<any, RoleListResponse>(API.GETROLELIST_URL + userId)
}
// 分配职位的方法
export const assignRole = (data: AssignRoleParams) => {
  return request.post<any, any>(API.ASSIGNROLE_URL, data)
}
// 删除某一个用户的方法
export const deleteUser = (id: string | number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + id)
}
// 批量删除用户的方法
export const deleteBatch = (idList: number[]) => {
  return request.delete<any, any>(API.DELETEBATCH_URL, { data: idList })
}
