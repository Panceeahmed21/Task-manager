import { useState } from 'react'
import { Card, Form, Input, Button, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { login } = useAuth()
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = async (v) => {
        setLoading(true)
        try {
            await login(v.email, v.password)
            nav('/app', { replace: true })
        } catch (e) {
            if (e.code === 'EMAIL_NOT_FOUND') {
                form.setFields([{ name: 'email', errors: [e.message] }])
            } else if (e.code === 'WRONG_PASSWORD') {
                form.setFields([{ name: 'password', errors: [e.message] }])
            } else {
                message.error(e.message)
            }
        } finally { setLoading(false) }
    }

    return (
        <div className="centered hero">
            <Card title="Sign in" style={{ width: 360 }}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>Sign in</Button>
                    <Typography.Paragraph style={{ marginTop: 12 }}>
                        No account? <Link to="/register">Create one</Link>
                    </Typography.Paragraph>
                </Form>
            </Card>
        </div>
    )
}
