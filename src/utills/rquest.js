// axios 的封装处理

import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// 1.根域名配置
// 2.超时时间
// 3.请求拦截器/响应拦截器

const http= axios.create({
    baseURL:'http://geek.itheima.net/v1.0',
    timeout:5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做拦截 插入一些自定义的配置 【参数的处理】
    const token=getToken()
    if(token){
      config.headers['Authorization']=`Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控401 token失效 清除Token 并跳转到 登录页面
    if(error.response.status===401){
      removeToken()
      router.navigate('/Login')
      window.location.reload() // 强制刷新页面
    }
    return Promise.reject(error);
  });

  export {http}