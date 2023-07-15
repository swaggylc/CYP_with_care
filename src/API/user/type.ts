// 登录接口携带参数的ts类型
export interface LoginParamsType {
  username: string
  password: string
}
// 登录接口返回数据的data的ts类型
interface dataType {
  token?: string
  message?: string
}
// 登录接口返回数据的ts类型
export interface LoginResultModel {
  code: number
  data: dataType
}
// 单个用户信息的ts类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
// 获取用户信息接口返回数据data的ts类型
interface user {
  checkUser: userInfo
}
// 获取用户接口返回数据的ts类型
export interface UserInfoResultModel {
  code: number
  data: user
}
