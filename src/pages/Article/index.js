import { Breadcrumb, Card, Form, Select, DatePicker, Radio, Table, Space } from "antd"
import { Link } from "react-router-dom"
import locale from "antd/es/date-picker/locale/zh_CN"
import { useState } from "react";
import { useChannel } from "@/hooks/useChannel";

const { RangePicker } = DatePicker;
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
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
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
                享福
            </Space>
        ),
    },
    ]
    // 准备表格body数据
    const dataTable = [{
        key: '1',
        type: 'img',
        title: '解决方案',
        status: 1,
        createTime: '2024',
        readNum: '2024',
        commentNum: '2024',
        likeNum: '2024',
    },
    {
        key: '1',
        type: 'img',
        title: '解决方案',
        status: 1,
        createTime: '2024',
        readNum: '2024',
        commentNum: '2024',
        likeNum: '2024',
    },]
    return (
        <div>
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '文章列表' },
                ]}></Breadcrumb>
            } style={{ marginBottom: 20 }}>
                <Form initialValues={{ status: null }}>
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
                        <RangePicker locale={locale}>
                        </RangePicker>
                    </Form.Item>
                </Form>

            </Card>

            {/* 表格区域 */}
            <Card title={`根据筛选条件共查询到 count 条结果：`}>
                <Table rowKey={'id'} dataSource={dataTable} columns={columns}></Table>
            </Card>
        </div>
    )
}

export default Article