import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import { Suspense, lazy } from "react";

const Home = lazy(() => import('@/pages/Home'))
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article')) // 路由懒加载

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                // 默认路由
                index: true,
                // path: 'home',
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}> <Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}> <Publish /></Suspense>
            }
        ]
    },
    {
        path: '/Login',
        element: <Login />
    }
])

export default router