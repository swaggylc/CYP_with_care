// 菜单管理接口都有的数据类型
export interface MenuType {
  code: number
  message: string
  ok: boolean
}

// 获取菜单列表的接口返回的单个菜单数据类型
export interface MenuItem {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuItem[]
  select?: boolean
}
// 获取菜单列表的接口返回的数据类型
export interface MenuListType extends MenuType {
  data: MenuItem[]
}

// 新增/修改菜单的接口的参数类型
export interface AddOrUpdateMenuParamsType {
  id?: number // 修改菜单时需要传递id
  pid: number // 父级菜单id
  name: string // 菜单名称
  code: string // 菜单权限编码
  level: number // 菜单层级
}
