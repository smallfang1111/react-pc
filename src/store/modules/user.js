// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit"
// import {http} from '@/utills'
import axios from "axios"


const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState:{
        token: ''
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            // 打印当前状态
            // 更新状态中的 token 为 action.payload
            state.token = action.payload
        }
    }
})

// 解构出action
const { setToken } = userStore.actions


// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:6565/login', loginForm)
        dispatch(setToken(res.data.id))
    }
}

export { setToken, fetchLogin }

export default userStore.reducer