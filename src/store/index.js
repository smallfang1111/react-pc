// 组合redux 子模块 + 导出stpre 实例
import userReducer from "./modules/user";
import { configureStore } from "@reduxjs/toolkit"
const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store