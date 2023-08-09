import request from '@/utils/request'
// 引入ts类型
import type { MenuListType, AddOrUpdateMenuParamsType } from './type'
// 枚举接口
enum API {
  // 获取菜单列表
  GETMENULIST_URL = '/admin/acl/permission',
  // 新增菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  // 修改菜单
  UPDATEMENU_URL = '/admin/acl/permission/update',
}

// 获取菜单列表的方法
export const getMenuList = () => {
  return request.get<any, MenuListType>(API.GETMENULIST_URL)
}
// 新增/修改菜单的方法
export const addOrUpdateMenu = (data: AddOrUpdateMenuParamsType) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
