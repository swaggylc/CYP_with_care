// 登录接口携带参数的ts类型
export interface LoginParamsType {
  username: string
  password: string
}
// 全部接口都有的返回值类型
export interface ResponseType {
  code: number
  message: string
  ok: boolean
}
// 登陆接口返回的数据类型
export interface LoginResponseType extends ResponseType {
  data: string
}
// 获取用户信息接口返回的数据类型
export interface GetUserInfoResponseType extends ResponseType {
  data: {
    routes: string[]
    buttons: string[]
    roules: string[]
    name: string
    avatar: string
  }
}
