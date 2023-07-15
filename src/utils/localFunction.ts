// 封装本地存储的方法
export const SET_SOME = (key: string, value: any) => {
  // 如果是对象，转换成json字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
export const GET_SOME = (key: string) => {
  let value = localStorage.getItem(key)
  // 如果是json字符串，转换成对象
  if (value && value.startsWith('{') && value.endsWith('}')) {
    value = JSON.parse(value)
  }
  return value
}
export const REMOVE_SOME = (key: string) => {
  localStorage.removeItem(key)
}
