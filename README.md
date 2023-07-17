#### 技术栈

`Vue3+Vite+Ts+Vue-router+Pinia+Element-plus+Axios+Echarts`

1. #### 企业级别编码规范

2. #### 从零到一，封装一个完整的后台管理系统

3. #### 菜单权限与按钮权限

4. #### 数据可视化大屏

5. #### svg矢量图在项目中的应用

6. #### 主题颜色切换与暗黑模式切换

#### trouble

1. ##### 递归组件生成动态菜单

    判断一级路由的情况，无子路由、有且只有一个子路由、有两个及以上子路由

    前两种均遍历 <el-menu-item> 即可，最后一种情况

    使用 <el-sub-menu> ，在子菜单处递归调用Menu组件

    注意：递归组件必须有name，无论什么情况，<el-menu-item> 还是 <el-sub-menu> 都必须有唯一值index

2. ##### el-menu右侧的白色边框隐藏

    .el-menu{

    ​		border:none

    }

3. ##### 全屏模式的切换

    可利用插件，也可利用原生的DOM方法，`document.documentElement.*requestFullscreen*() `与 `document.*exitFullscreen*()`

4. ##### 利用请求头携带token获取用户信息

    可在axios的请求拦截器中设置请求头携带公共参数如token

    ```js
    // 第二步：配置请求拦截器
    request.interceptors.request.use((config) => {
      // config配置对象，headers属性，存放请求头信息，经常给服务器携带公共参数，如token
      // 返回config配置对象
      // 从本地存储中获取token
      let token = GET_SOME('TOKEN')
      // 判断token是否存在
      if (token) {
        // 给请求头添加token
        config.headers.token = token
      }
      return config
    })
    ```

5. 

​			
