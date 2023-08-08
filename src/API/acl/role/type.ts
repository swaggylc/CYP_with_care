// 所有接口都返回的数据类型
export interface IResponseData {
  code: number
  message: string
  ok: boolean
}

// 获取角色列表的接口返回的单个角色数据类型
export interface IRoleItem {
  id?: number | string
  roleName: string
  remark?: null
  createTime?: string
  updateTime?: string
}
// 获取角色列表的接口返回的数据类型
export interface IRoleListType extends IResponseData {
  data: {
    records: IRoleItem[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
// 单个权限的数据类型
export interface IPermissionItem {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: IPermissionItem[]
  select: boolean
}
// 获取权限列表的接口返回的数据类型
export interface IPermissionListType extends IResponseData {
  data: IPermissionItem[]
}
