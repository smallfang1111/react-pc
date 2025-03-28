import { Button, Card, Form, Input, message } from "antd"
import classNames from 'classnames'
import './index.scss'
import { useDispatch } from "react-redux"
import { fetchLogin } from "@/store/modules/user"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (val) => {
        await dispatch(fetchLogin(val))
        navigate('/')
        messageApi.success('登录成功！');
    }

    return (
        <div className="login">
            {contextHolder}
            <Card className="login-container">
                <i className={classNames('iconfont', 'icon-guojibanlogo326fanbai-03-03', 'login-logo')} />
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号格式!',
                            }
                        ]}>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码!',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" >登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login