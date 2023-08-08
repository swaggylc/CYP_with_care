// 用户管理相关接口
import request from '@/utils/request'
// 引入ts类型
import type { IRoleListType } from './type.ts'
// 枚举
enum API {
  // 获取角色列表
  GETROLESLIST_URL = '/admin/acl/role/',
}

// 获取角色列表的方法
export const getRolesList = (page: number, limit: number, roleName: string) => {
  return request.get<any, IRoleListType>(
    API.GETROLESLIST_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
}
