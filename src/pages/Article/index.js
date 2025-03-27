import { Breadcrumb, Card, Form, Select, DatePicker, Radio, Table, Space, Tag, Button } from "antd"
import { Link } from "react-router-dom"
import locale from "antd/es/date-picker/locale/zh_CN"
import { useEffect, useState } from "react";
import { useChannel } from "@/hooks/useChannel";
import { getArticleListApi } from '@/apis/article'
import classNames from "classnames";

const { Option } = Select
const Article = () => {

    // 封面模式切换
    const [typeName, setTypeName] = useState(0)
    const onTypeChange = ({ target: { value } }) => {
        setTypeName(value)
    }

    const { channelList } = useChannel() // 获取评到列表

    // 准备列数据
    const columns = [{
        title: '封面',
        dataIndex: 'cover',
        width: 120,
        render: cover => {
            return <i className={classNames('iconfont', cover)}></i>
        }
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: data => <Tag color={data === 1 ? 'warning' : 'success'}>{data === 1 ? '待审核' : '审核通过'}</Tag>
    },
    {
        title: '发布时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '阅读数',
        dataIndex: 'readNum',
        key: 'readNum',
    },
    {
        title: '评论数数',
        dataIndex: 'commentNum',
        key: 'commentNum',
    },
    {
        title: '点赞数',
        dataIndex: 'likeNum',
        key: 'likeNum',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">

            </Space>
        ),
    },
    ]


    // 筛选功能
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        createTime: '',
    })

    // 获取文章列表
    const [count, setCount] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        const getListData = async () => {
            const res = await getArticleListApi(reqData)
            setList(res.data)
            setCount(res.data.length)
        }
        getListData()
        // 参数变化，重新渲染
    }, [reqData])


    const onFinish = (val) => {
        console.log(val.date)
        setReqData({
            channel_id: val.channel_id,
            status: val.status,
            createTime: val.date?.[0]?.format('YYYY-MM-DD'),
        })
    }

    return (
        <div>
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '文章列表' },
                ]}></Breadcrumb>
            } style={{ marginBottom: 20 }}>
                <Form initialValues={{ status: null }} onFinish={onFinish}>
                    <Form.Item label='状态' name="status">
                        <Radio.Group onChange={onTypeChange} value={typeName}>
                            <Radio value={null}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select placeholder="请选择文章频道" defaultValue="" style={{ width: 250 }}>
                            {channelList.map(item =>
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            )}

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale 属性 控制中文显示 */}
                        <DatePicker locale={locale} style={{ width: 250 }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" >筛选</Button>
                    </Form.Item>
                </Form>

            </Card>

            {/* 表格区域 */}
            <Card title={`根据筛选条件共查询到${count} 条结果：`}>
                <Table rowKey={'key'} dataSource={list} columns={columns}></Table>
            </Card>
        </div>
    )
}

export default Article