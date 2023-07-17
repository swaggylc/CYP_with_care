// layout组件相关数据
import { defineStore } from 'pinia'

let useLayoutStore = defineStore('layout', {
  state: () => {
    return {
      // 是否展示侧边栏
      isCollapse: false,
    }
  },
})






export default useLayoutStore