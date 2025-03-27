
import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload, message } from "antd"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './index.scss'
import { publishArticleApi } from "@/apis/article";
import { PlusOutlined } from "@ant-design/icons";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select

const Publish = () => {
    const [textContent, setTextContent] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    const { channelList } = useChannel() // 获取评到列表
    const formRef = useRef()

    const onFinish = async (formData) => {

        if (imageList.length !== typeName) {
            messageApi.warning('封面类型和图片数量不匹配！');
            return
        }
        const { title, content, channel_id } = formData
        const reqData = {
            title,
            content,
            cover: {
                type: typeName,
                images: imageList.map(e => e.thumbUrl)
            },
            channel_id
        }
        await publishArticleApi(reqData).then(() => {
            messageApi.success('发布成功');
            setTimeout(()=>{
                formRef.current.resetFields()
            },1000)

        }).catch(err => {
            messageApi.error('发布失败', err);
        })
    }

    // 上传回调
    const [imageList, setImageList] = useState([])
    const onChange = (val) => {
        setImageList(val.fileList)
    }

    // 封面模式切换
    const [typeName, setTypeName] = useState(0)
    const onTypeChange = ({ target: { value } }) => {
        setTypeName(value)
    }
    return (
        <div className="publish">
            {contextHolder}
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '发布文章' }
                ]} />
            }>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 0 }} onFinish={onFinish} ref={formRef}>
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
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange} value={typeName}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 
                        listType:决定选择文件框的外观样式
                        showUploadList：控制显示上传列表
                        */}
                        {typeName > 0 &&
                            <Upload maxCount={typeName} listType="picture-card" showUploadList action={''} name="image" onChange={onChange}>
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        }

                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容!' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" value={textContent} onChange={setTextContent} />
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