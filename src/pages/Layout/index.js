import { Layout, Menu, Popconfirm } from "antd"
import { LogoutOutlined, DiscordOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import './index.scss'
const { Header, Sider } = Layout

const items = [
    { label: '首页', key: 1, icon: <HomeOutlined /> },
    { label: '文章管理', key: 2, icon: <DiffOutlined /> },
    { label: '创建文章', key: 3, icon: <EditOutlined /> },
]

const GeekLayout = () => {
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
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        items={items}
                    />
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>内容</Layout>
            </Layout>

        </Layout>
    </>
}

export default GeekLayout