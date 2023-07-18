import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入 svg 插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取环境变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', // 开发环境开启mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss 全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域配置
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据服务器的地址
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
