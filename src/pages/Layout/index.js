import { Layout, Menu, Popconfirm } from "antd"
import { LogoutOutlined, DiscordOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from "react-router";
import './index.scss'
const { Header, Sider } = Layout

const items = [
    { label: '首页', key: '/', icon: <HomeOutlined /> },
    { label: '文章管理', key: '/article', icon: <DiffOutlined /> },
    { label: '创建文章', key: '/publish', icon: <EditOutlined /> },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const clickMenu = (e) => {
        navigate(e.key)
    }

    // 反向高亮
    // 1. 获取当前路由路径
   const location= useLocation()
   const selectedKey=location.pathname

    return <>
        <Layout>
            <Header className="header">
                <div className="logo"><DiscordOutlined /></div>
                <div className="user-info">
                    <span className="user-name">alita</span>
                    <span className="user-logout">
                        <Popconfirm
                            title="是否确认退出"
                            okText="退出"
                            cancelText="取消"
                        >
                            <LogoutOutlined />
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        style={{ height: '100%', borderRight: 0 }}
                        selectedKeys={selectedKey}
                        mode="inline"
                        theme="dark"
                        items={items}
                        onClick={clickMenu}
                    />
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>

        </Layout>
    </>
}

export default GeekLayout