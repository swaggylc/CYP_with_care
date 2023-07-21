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

5. ##### 设置进度条

    安装：`npm i nprogress`	引入：

    ```
    // *引入进度条插件*
    
    //*@ts-ignore*
    
    *import* NProgress *from* '*nprogress*'
    
    // *引入进度条样式*
    
    *import* '*nprogress/nprogress.css*'
    ```

    配置进度条：`NProgress.*configure*({ *showSpinner*: *false* })`	去除小圆圈

    设置开始与结束： `NProgress.*start*()`	 `NProgress.*done*()`

6. ##### 路由鉴权

    通过token判断用户是否登陆，有token所有路由放行，但访问login组件会被重定向到首页

    ​	若用户已登录，但无用户信息，如username等，则通知用户仓库发送请求获取用户信息，成功后放行

    ​	若用户已登陆，但无用户信息，且获取信息失败，即token失效，跳转至login组件，重新获取token

    若未登录，则跳转到login组件，携带query参数，保留当前路由路径，登陆后可直接跳转至退出登陆时的路径

7. ##### 表单输入框自动聚焦

    点击添加属性值按钮时及div切换为input框时，让input框能够自动聚焦

    el-input实例上有focus方法，在div切换为input框时，调用该方法即可让该input实例自动聚焦

    1. 思路一：通过某一变量控制focus方法是否调用，如：该变量为真时，调用focus方法，但问题在于input框可能有多个，若使用这种方法，则会导致一个变量控制多个input框，显然不合理。
    2. 思路二：通过ref的函数写法，获取到input实例，当由div切换至input时，将获取到的input实例通过下标传入一数组中，当input失去焦点时（切换为div），这一数组的该下标的元素为null。注意：当由div切换至input时，模板会重新渲染，会重新解析DOM，而我们必须保证在DOM解析完成后才能获取到这个input实例，若DOM解析未完成，则无法获取该input实例；则考虑到nextTick函数，在它的回调中将该input实例传入数组中，即可保证存在该input实例。同理，点击添加属性值按钮时，让存储input实例的数组的最后一项调用focus方法，同样也需要在DOM解析完成后调用该方法。
    
8. ##### 表单数据回显的深浅拷贝

    当我们获取到数据将表单数据进行回显时（通常用于修改业务），若回显的数据结构为对象中还有对象，如对象中又包含对象，或对象中包含数组等，我们必须将该数据进行深拷贝后再通过Object.*assign*（）方法合并，因为Object.*assign*（）方法是浅拷贝，合并后目标对象中的复杂数据（对象，数组等）的指针依然指向源对象的该属性，由此以来，我们若对目标对象的该复杂数据类型属性进行操作，则会影响到源对象的该属性，所以我们在合并前必须进行深拷贝。
    
9. ##### 在spu管理模块中，父组件有部分数据，而子组件需要全部数据，请求应该何时何地发送？

    1. 思路一：在父组件中发送请求获取数据再传值给子组件，能达到效果但不优雅，若请求较多时可能要传多组数据
    2. 思路二：在子组件挂载时，在子组件中发送请求，在本项目中不适用。由于子组件使用v-show来展示与隐藏，组件的挂载时机要早于展示时机，若是在挂载时发送请求，某些请求拿不到参数，从而失败。若使用v-if或许能解决该问题，但v-if较为耗费性能，不能完美解决该问题。
    3. 思路三：在子组件中添加一组件实例方法并对外暴露，在该方法中发送请求，在父组件中获取子组件实例，在适当时机调用该方法，即可发送请求，且返回的数据在子组件中，在该方法中可以将父组件的部分数据以参数形式传给子组件，一举两得，是个较好的解决办法。
