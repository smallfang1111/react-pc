

import BarChart from './components/BarCharts'
const Home = () => {
   const XSatisData=['Vue','React','Angular']
   const XUseData=['electron','nuxt','next']
   const YSatisData=['1','2','3']
   const YUseData=['3','6','5']
    return <>
       <BarChart title={'三大框架满意度'} YData={YSatisData} XData={XSatisData} />
       <BarChart title={'三大框架使用度'} YData={YUseData} XData={XUseData} />
    </>
}

export default Home