import { ElMessage } from 'element-plus'
// 进行axios的二次封装，使用请求与响应拦截器
import axios from 'axios'
// 第一步：利用axios对象的create方法，创建一个新的axios实例（方便配置其他配置项，基础路径，超时时间等）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径携带'/api'
  timeout: 10000,
})
// 第二步：配置请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性，存放请求头信息，经常给服务器携带公共参数，如token
  // 返回config配置对象
  return config
})
// 第三步：配置响应拦截器
request.interceptors.response.use(
  (response) => {
    // response响应对象，data属性，存放服务器返回的数据
    // 返回data数据
    return response.data
  },
  (error) => {
    // error错误对象，response属性，存放错误信息
    // 返回错误信息
    // 定义一个变量，存放错误信息
    let message = ''
    // 存放http状态码
    let code = error.response.status
    // 判断错误信息
    switch (code) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = '用户没有权限'
        break
      case 403:
        message = '禁止访问'
        break
      case 404:
        message = '请求资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      case 503:
        message = '服务器正在维护'
        break
      default:
        message = '未知错误'
        break
    }
    // 提示错误信息
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default request