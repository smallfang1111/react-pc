
import { useEffect, useState } from "react";

import { getChannelApi } from "@/apis/publish";
const useChannel = () => {
    // 获取频道列表所有逻辑

    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelApi()
            setChannelList(res.data)
        }
        getChannelList()
    }, [])

    // 把组件要用到的数据return 出去
    return {
        channelList
    }
}

export { useChannel }