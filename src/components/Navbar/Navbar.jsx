import { Layout, Menu, Button, Space, Typography } from 'antd'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const { user, logout } = useAuth()
    const nav = useNavigate()
    const onLogout = () => { logout(); nav('/login', { replace: true }) }
    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>Task Manager</Typography.Title>
            <Space>
                <span style={{ color: '#fff' }}>{user?.name}</span>
                <Button onClick={onLogout}>Logout</Button>
            </Space>
        </Layout.Header>
    )
}