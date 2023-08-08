// 用户管理相关接口
import request from '@/utils/request'
// 引入ts类型
import type { IRoleListType, IRoleItem } from './type.ts'
// 枚举
enum API {
  // 获取角色列表
  GETROLESLIST_URL = '/admin/acl/role/',
  // 新增角色
  ADDROLE_URL = '/admin/acl/role/save',
  // 修改角色
  UPDATEROLE_URL = '/admin/acl/role/update',
}

// 获取角色列表的方法
export const getRolesList = (page: number, limit: number, roleName: string) => {
  return request.get<any, IRoleListType>(
    API.GETROLESLIST_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
}
// 新增/修改角色的方法
export const addOrUpdateRole = (data: IRoleItem) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
