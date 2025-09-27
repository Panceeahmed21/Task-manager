import { useState } from 'react'
import { Card, Form, Input, Button, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { register } = useAuth()
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = async (v) => {
        setLoading(true)
        try {
            await register({ name: v.name, email: v.email, password: v.password })
            nav('/app', { replace: true })
        } catch (e) {
            if (e.code === 'EMAIL_EXISTS') {
                form.setFields([{ name: 'email', errors: [e.message] }])
            } else {
                message.error(e.message)
            }
        } finally { setLoading(false) }
    }

    return (
        <div className="centered hero">
            <Card title="Create account" style={{ width: 360 }}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }, { min: 3 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>Sign up</Button>
                    <Typography.Paragraph style={{ marginTop: 12 }}>
                        Have an account? <Link to="/login">Sign in</Link>
                    </Typography.Paragraph>
                </Form>
            </Card>
        </div>
    )
}
