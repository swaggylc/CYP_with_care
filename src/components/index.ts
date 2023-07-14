// 引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'

// 全局组件对象
const globalComponents = { SvgIcon }

// 对外暴露插件对象
export default {
  // install方法，用于安装插件
  // 必须叫install
  install(app: any) {
    // 注册全局组件
    Object.keys(globalComponents).forEach((key) => {
      //@ts-ignore
      app.component(key, globalComponents[key])
    })
  },
}
