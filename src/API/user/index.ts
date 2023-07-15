// 管理用户相关接口
import request from '@/utils/request'
import type {
  LoginParamsType,
  LoginResultModel,
  UserInfoResultModel,
} from './type'

// 枚举接口地址
enum API {
  // 登录
  LOGIN_URL = '/user/login',
  // 获取用户信息
  USER_INFO_URL = '/user/info',
}

// 暴露请求函数
// 用户登陆的方法
export const login = (data: LoginParamsType) => {
  return request.post<any, LoginResultModel>(API.LOGIN_URL, data)
}
// 获取用户信息的方法
export const getUserInfo = () => {
  return request.get<any, UserInfoResultModel>(API.USER_INFO_URL)
}
