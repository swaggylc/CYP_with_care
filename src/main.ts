import { createApp } from 'vue'
import App from './App.vue'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
// 引入 ElementPlus 样式
import 'element-plus/dist/index.css'
// 国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

// 引入全局样式
import '@/styles/index.scss'

// 引入自定义插件对象：注册全局组件
import globalComponents from '@/components/index.ts'
// 安装自定义插件对象
app.use(globalComponents)

// 安装 ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
})
// svg插件需要的配置
import 'virtual:svg-icons-register'


app.mount('#app')
