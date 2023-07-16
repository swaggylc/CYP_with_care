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

2. el-menu右侧的白色边框隐藏

    .el-menu{

    ​		border:none

    }

3. 
