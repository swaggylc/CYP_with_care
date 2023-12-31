// 管理用户相关接口
import request from '@/utils/request'
import {
  LoginParamsType,
  LoginResponseType,
  GetUserInfoResponseType,
} from './type.ts'
// 用户相关接口
enum API {
  // 登录接口
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息
  GET_INFO_URL = '/admin/acl/index/info',
  // 退出登录
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录方法
export const login = (data: LoginParamsType) => {
  return request.post<any, LoginResponseType>(API.LOGIN_URL, data)
}
// 获取用户信息的方法
export const getUserInfo = () => {
  return request.get<any, GetUserInfoResponseType>(API.GET_INFO_URL)
}
// 退出登录的方法
export const logout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
