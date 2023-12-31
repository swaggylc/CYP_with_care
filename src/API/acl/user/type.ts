// 用户管理接口都返回的数据类型
export interface UserResponse {
  code: number
  message: string
  ok: boolean
}

// 单个用户的数据类型
export interface User {
  id?: number
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
  createTime?: string
  updateTime?: string
}
// 获取用户列表接口返回的数据类型
export interface UserListResponse extends UserResponse {
  data: {
    records: User[]
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
// 单个职位的数据类型
export interface Role {
  id?: number
  roleName: string
  remark: string
  createTime?: string
  updateTime?: string
}
// 获取职位列表接口返回的数据类型
export interface RoleListResponse extends UserResponse {
  data: {
    assignRoles: Role[]
    allRolesList: Role[]
  }
}
// 分配职位方法的参数类型
export interface AssignRoleParams {
  userId: string | number
  roleIdList: number[]
}
