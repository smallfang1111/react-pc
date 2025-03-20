// 组合redux 子模块 + 导出stpre 实例
const { configureStore } = require("@reduxjs/toolkit");
import userReducer from "./modules/user";

const store= configureStore({
    reducer:{
        user:userReducer
    }
})

export default store