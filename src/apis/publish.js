import axios from "axios"
// 发布相关的请求
const url='http://localhost:6565'
// 获取频道列表的接口
export const getChannelApi=()=>{
   return axios.get(`${url}/channel`)
}

// 收集表单数据，发布文章的接口
export const publishArticleApi=(data)=>{
    return axios.post(`${url}/publishArticle`, data)
 }