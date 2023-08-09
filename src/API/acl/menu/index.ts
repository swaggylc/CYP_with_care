import request from '@/utils/request'
// 引入ts类型
import type { MenuListType } from './type'
// 枚举接口
enum API {
  // 获取菜单列表
  GETMENULIST_URL = '/admin/acl/permission',
}

// 获取菜单列表的方法
export const getMenuList = () => {
  return request.get<any, MenuListType>(API.GETMENULIST_URL)
}
