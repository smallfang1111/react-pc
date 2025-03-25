import axios from "axios"
// 用户相关的请求
const url='http://localhost:6565'
// const { http } = require("@/utills")

// const loginApi=(formData)=>{
//    return http({
//         url:'/xxx',
//         method:'POST',
//         data:formData
//     })
// }
// 登录请求
export const loginApi=(data)=>{
   return axios.post(`${url}/login`, data)
}

// 获取用户信息
export const getUserInfoApi=()=>{
    return axios.get(`${url}/userInfo`)
 }