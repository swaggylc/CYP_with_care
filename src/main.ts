import { createApp } from 'vue'
import App from './App.vue'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
// 引入 ElementPlus 样式
import 'element-plus/dist/index.css'
// 引入 ElementPlus 深色主题
import 'element-plus/theme-chalk/dark/css-vars.css'
// 国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入全局样式
import '@/styles/index.scss'
// svg插件需要的配置
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册全局组件
import globalComponents from '@/components/index.ts'
// 引入路由
import router from '@/router/index.ts'
// 引入仓库
import { pinia } from '@/store/index.ts'

const app = createApp(App)
// 安装自定义插件对象
app.use(globalComponents)
// 安装 ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册模板路由
app.use(router)
// 注册大仓库
app.use(pinia)
// 引入路由鉴权文件
import '@/Authentication.ts'
// 引入自定义指令文件
import { isHasButton } from '@/directive/has.ts'
isHasButton(app)
app.mount('#app')
