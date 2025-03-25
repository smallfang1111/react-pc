## 配置基础路由

### 1.安装路由包 react-router-dom
### 2.准备两个基础路由组件 Layout 和 Login
### 3.在router/index.js 引入组件进行路由配置,导出router实例
### 4.在入口文件中渲染<RouterProvider /> 传入router实例


## 登录-封装request请求模块

## 登录-使用Redux 管理token
### token 作为一个用户的标识数据，需要在很多个模块中共享，redux可以方便的解决状态共享问题


## 登录-Token持久化
### 现存问题: redux 存入Token之后如果刷新浏览器，Token就会丢失（持久化就是防止刷新时丢失Token）localStorage 本地存储
#### 出现原因：redux是基于浏览器内存的存储方式，刷新时状态恢复为初始值
<!-- initialState: {taken : ''} -->


# Axios 请求拦截器注入Toekn
## Token 作为用户的一个标识数据，后端很多接口都会以它作为接口权限判断的依据，请求拦截器注入Token之后，所有用到Axios 实例的接口请求都自动携带了Token


