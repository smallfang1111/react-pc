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


 // 获取文章列表
export const getArticleListApi=(params)=>{
   return axios({
      method:'get',
      url:`${url}/articleList`,
      params
   })
}


 // 删除文章列表
 export const delArticleListApi=(params)=>{
   console.log(params)
return axios.delete(url+'/articleList/'+params)
}

