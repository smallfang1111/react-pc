// 和用户相关的状态管理

const { createSlice } = require("@reduxjs/toolkit");
const { useStore } = require("react-redux");

const userStore= createSlice({
    name:'user',
    // 数据状态
    initialState:{
        token:''
    },
    // 同步修改方法
    reducers:{
        setToken(state,action){
            state.token=action.payload
        }
    }
})

// 解构出action
const {setToken}=userStore.actions

// 获取reducer 函数
const userReducer=useStore.reducer

// 异步方法 完成登录获取token
const fetchLogin=(loginForm)=>{

}

export {setToken}

export default userReducer