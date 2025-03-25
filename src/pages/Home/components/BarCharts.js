
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

// 柱状图组件
const BarChart = ({title,XData,YData}) => {

    const chartRef = useRef(null)
  
    useEffect(() => {
        // 为什么要在useEffect 中执行，因为要确保dom已经渲染完成
        // 要确保dom已经渲染完成还可以在useLayoutEffect这个hook中执行

        // 渲染图标的dom节点
        const chartDom = chartRef.current
        // 2. 初始化生成图标实例对象
        const myChart = echarts.init(chartDom);
        let option;
        option = {
            title: {
                text: title,
              },
            xAxis: {
                type: 'category',
                data: XData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: YData,
                    type: 'bar'
                }
            ]
        };
        // 使用图标参数完成图标渲染
        option && myChart.setOption(option);
    }, [title,XData,YData])
    return <>
        <div ref={chartRef} style={{width:'500px',height:'500px'}}></div>
    </>
}

export default BarChart
