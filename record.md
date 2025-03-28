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

# 处理Token 失效
## 什么是Token 失效： 为了用户的安全和隐私考虑，在用户 长时间未在网站中做任何操作 且 规定的失效时间到达 之后，当前的Token就会失效，一旦失效，不能再作为用户令牌标识请求隐私数据


# 前端如何知道Token 已经失效了？？
## 通常在Token 失效之后再去请求接口，后端会返回 401状态码 ，前端可以监控这个状态做后续的操作

## Token 失效了前端做什么？？
### 1. 在axios 拦截中监控401状态码 
### 2. 清除失效Token，跳转登录


## 什么是路由懒加载？
### 路由懒加载是指路由的js资源只有在被访问时才会动态获取，目的是为了优化项目首次打开的时间
### 如何进行配置：
### 1.把路由修改为由react 提供的lazy函数进行动态导入
### 2.使用react 内置的Suspense 组件 包裹路由中element 选项对应的组件


## 打包优化-包体积分析：通过可视化的方式，直观的体现项目中各种包打包之后的体积大小，方便做优化
### source-map-explorer
###     "analyze":"source-map-explorer 'build/static/js/*.js'"

## 打包优化-CDN优化
### 什么是CDN:CDN 是一种内容分发网络服务，当用户请求网站内容时，由离用户最近的服务器将缓存的资源内容传递给用户
### 哪些资源可以放到CDN 服务器？
### 体积较大的非业务JS文件，比如 react，react-dom
### 1.体积较大，需要利用CDN文件在浏览器的缓存特性，加快加载时间
### 2.非业务JS文件，不需要经常做变动，CDN不用频繁更新缓存


## useReducer
### 作用：和useState 作用类似，用来管理相对复杂的状态数据
### useReducer-基础用法
### 1.定义一个reducer 函数(根据不同的action 返回不同的新状态)
### 2.在组件中调用 useReducer，并传入reducer 函数和状态的初始值
### 3.事件发生时，通过dispatch 函数分派一个 action 对象（通知reducer 要返回哪个新状态并渲染UI）
### const [state,dispatch]=useReducer(reducer,initialArg,init)
  
# 注意：
## Hook 只能在组件的顶层作用域或自定义Hook中调用，而不能在循环或条件语句中调用--如果你有这种需求，可以创建一个新组件，并将state 移入其中

## useEffect 常用于在函数组件中 执行副作用
### 副作用:那些与组件的渲染逻辑无关的操作，例如：数据获取，订阅，手动更改dom，设置定时器，更改文档标题，



## useMemo
### 作用：在组件每次重新渲染的时候缓存计算的结果
### useMemo--基础语法
 <!-- useMemo(()=>{
    根据count1返回计算的结果
},[count1]) -->
### 说明：使用useMemo 做缓存之后可以保证 只有 count1 依赖项发生改变时才会重新计算
### 缓存：消耗非常大的计算才会用到

## React.memo
### 作用：允许组件在Prop 没有改变的情况下跳过渲染
### React 组件默认的渲染机制：只要父组件重新渲染子组件就会重新渲染
### 基础语法：
<!-- const memoConponent=memo(someComponent,arePropsEqual) -->
### 说明：经过memo函数包裹生成的缓存组件只有在props 发生变化的时候才会重新渲染

### React.memo - props 的比较机制
### 机制： 在使用memo缓存组件之后，react 会对每一个prop 使用Object.is 比较新值和老值 ，返回true--表示没有变化
<!-- 
prop 是简单类型
Object.is(3,3) => true 没有变化

prop 是引用类型（对象/数组）
Object.is([],[]) => false 有变化，React只关心引用是否变化 比较的是新值和旧值的引用是否相等  当父组件的函数重新执行时，实际上形成的是新的数组引用

如何保证引用稳定 ==> useMemo 组件渲染的过程中缓存一个值:类似像这样
   const list=useMemo(()=>{
     return [1]
   },[])

 -->

## useCallback
### 作用：在组件多次重新渲染的时候缓存函数   注意下 useMemo 是缓存值  useCallback 是缓存函数
<!-- const cachedFn =useCallback(fn,dependencies) -->
### 说明：使用useCallback 包裹函数之后，函数可以保证在App重新渲染的时候保持引用稳定


## forwardRef 
### 允许组件使用ref 将Dom 节点暴露给父组件
### react 19 直接使用ref
<!-- 
import { Button } from "antd"
import { useRef } from "react"

const Son = ({ label, ref }) => {
   return <input type="text" placeholder={label} ref={ref} />
}

const Home = () => {
   const sonRef = useRef(null)
   const showRef = () => {
      sonRef.current.focus()
   }
   return <div>
      <Son label="input your name" ref={sonRef} />
      <Button onClick={showRef}>focus</Button>
   </div>
}

export default Home
 -->

## useImperativeHandle
### 作用：通过ref 暴露子组件中的方法
<!-- 
import { Button } from "antd"
import {  useImperativeHandle, useRef } from "react"

const Son = ({ref}) => {
   const inputRef=useRef(null)
   useImperativeHandle(ref,()=>{
      return {
         focusFun(){
            inputRef.current.focus()
         }
      }
   })
   return <input type="text"  ref={inputRef} />
}

const Home = () => {
   const sonRef = useRef(null)
   const showRef=()=>{
      sonRef.current.focusFun()
   }
   return <div>
      <Son ref={sonRef} />
      <Button onClick={showRef}>focus</Button>
   </div>
}

export default Home
 -->


## 类组件 -- 也可以在函数组件中执行
### 类组件的生命周期函数：组件从创建到销毁的各个阶段自动执行的函数就是生命周期函数
### 挂载时：constructor-render-componentDidMount
### 更新时：render-componentDidUpdate
### 卸载时：componentWillUnmount
### 其中在更新时 render 会执行 New props setState() forceUpdate()
### render 到下面一个阶段的过程中 react 会更新DOM 和 refs
### Render阶段：纯净且不包含副作用，可能会被react 暂停，中止或重新启动
### Commit阶段：可以使用DOM,运行副作用，安排更新
### 1.componentDidMount:组件挂载完毕自动执行  --异步数据获取
### 2.componentWillUnmount：组件卸载时自动执行 -- 清理副作用
<!-- 
import { Button } from "antd"
import { Component, useState } from "react"

const Home = () => {
   const [show, setShow] = useState(true)
   return <div>
      {show && <Counter />}
      <Button onClick={() => setShow(false)}>unmount</Button>
   </div>
}

class Counter extends Component {
   componentDidMount() {
      console.log('组件渲染完毕，请求发送起来')
      // 开启定时器
      this.timer = setInterval(() => {
         console.log('定时器运行中')
      }, 1000)
   }
   componentDidUpdate() {

   }
   // 组件卸载的时候自动执行 副作用清理的工作 清除定时器 清除事件绑定
   componentWillUnmount() {
      console.log('组件卸载了')
      this.timer && clearInterval(this.timer)
   }
   render() {

      return <div>i am alita</div>
   }
}

export default Home
 -->
### 类组件的组件通信
### 概念：类组件和Hooks编写的组件在组件通信的思想上完全一致
### 1.父传子：通过prop绑定数据
### 2.子传父：通过prop绑定父组件中的函数，子组件调用
<!-- 
import { Button } from "antd"
import { Component, useState } from "react"

const Home = () => {
   const [count, setCount] = useState(0)
   return <div>
      <Button onClick={() => setCount(count + 1)}>{count}+</Button>
      <Parent count={count} />
   </div>
}

class Son extends Component {
   render() {
      return <div>我是子组件<button onClick={()=>this.props.getSonMsg('我是son组件中的数据')}>sendMsgToParent</button></div>
   }
}

class Parent extends Component {
   state = {
      msg: '我是父组件的msg'
   }

  getSonMsg=(sonMsg)=>{
   console.log(sonMsg)
  }
   render() {
      return <div>{this.props.count}我是父组件<Son getSonMsg={this.getSonMsg} /></div>
   }
}

export default Home
 -->
### 3.兄弟组件通信：状态提示，通过父组件做桥接---自己上手


## zustand 状态工具