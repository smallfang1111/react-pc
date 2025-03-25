// 封装高阶组件 有token 就显示，没有token就跳转到登录页面

const { getToken } = require("@/utills")
const { Navigate } = require("react-router")

const AuthRoute=({children})=>{
    const token=getToken()
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={'/login'} replace />
    }
}

export default AuthRoute