// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit"
// import {http} from '@/utills'
import axios from "axios"
import { getToken, setToken as _setToken, getLocalStorage, setLocalStorage, removeLocalStorage, removeToken } from "@/utills"


const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: (getLocalStorage('userInfo')&&JSON.parse(getLocalStorage('userInfo'))) || {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            // 打印当前状态
            // 更新状态中的 token 为 action.payload
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
            setLocalStorage('userInfo',JSON.stringify(action.payload))
        },
        clearUserInfo(state){
            state.userInfo={}
            state.token=''
            removeLocalStorage('userInfo')
            removeToken()
        }
    }
})

// 解构出action
const { setToken, setUserInfo,clearUserInfo } = userStore.actions


// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:6565/login', loginForm)
        dispatch(setToken(res.data.id))
    }
}

// 获取个人用户信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:6565/userInfo')
        dispatch(setUserInfo(res.data))
    }
}

export { setToken, fetchLogin, fetchUserInfo,clearUserInfo }

export default userStore.reducer