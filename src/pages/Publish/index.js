
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Breadcrumb, Button, Card, Form, Input, Select, Space } from "antd"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './index.scss'
import { getChannelApi } from "@/apis/publish";

const { Option } = Select

const Publish = () => {
    // 获取评到列表

    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {

            const res = await getChannelApi()
            setChannelList(res.data)

        }
        getChannelList()
    }, [])
    const [value, setValue] = useState('');
    return (
        <div className="publish">
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '发布文章' }
                ]} />
            }>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1 }}>
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请选择文章标题!' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>

                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道!' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}
                        >
                            {channelList.map(item =>
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容!' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" value={value} onChange={setValue} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">发布文章</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish 