import { pinia } from '@/store/index.ts'
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  // 全局自定义指令：判断当前用户是否有按钮权限
  app.directive('has', {
    // 代表使用当前指令的元素（DOM,组件）挂载完毕后执行一次
    mounted(el: any, options: any) {
      // console.log(userStore.buttons)
      // 自定义指令右侧的值是否包含在仓库中的按钮权限中，如果不包含，就删除当前元素
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
