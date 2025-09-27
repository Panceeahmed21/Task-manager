import { useMemo, useState } from 'react'
import { Layout, Button, Segmented, Input, DatePicker } from 'antd'
import Navbar from '../components/Navbar/Navbar.jsx'
import TaskList from '../components/TaskList/TaskList.jsx'
import TaskForm from '../components/TaskForm/TaskForm.jsx'
import { createTask, listTasks, removeTask, updateTask } from '../services/tasks'
import { useAuth } from '../context/AuthContext'
import dayjs from 'dayjs'

export default function Dashboard() {
    const { user } = useAuth()
    const [q, setQ] = useState('')
    const [status, setStatus] = useState('all')
    const [date, setDate] = useState(null)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(null)
    const [tick, setTick] = useState(0)

    const data = useMemo(() => listTasks(user.email), [user, tick])

    const filtered = useMemo(() => {
        return data.filter(x => {
            const okStatus = status === 'all' || x.status === status
            const okText = q ? (x.title.toLowerCase().includes(q.toLowerCase()) || x.description.toLowerCase().includes(q.toLowerCase())) : true
            const okDate = date ? (x.dueDate && dayjs(x.dueDate).isSame(date, 'day')) : true
            return okStatus && okText && okDate
        })
    }, [data, q, status, date])

    const onCreate = () => { setEdit(null); setOpen(true) }
    const onEdit = (r) => { setEdit(r); setOpen(true) }
    const onDelete = (r) => { removeTask(user.email, r.id); setTick(t => t + 1) }
    const onSubmit = (payload) => {
        if (edit) updateTask(user.email, edit.id, payload); else createTask(user.email, payload)
        setOpen(false)
        setEdit(null)
        setTick(t => t + 1)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Layout.Content className="page">
                <div className="toolbar">
                    <Input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
                    <DatePicker allowClear onChange={v => setDate(v)} />
                    <Segmented value={status} onChange={setStatus} options={[
                        { label: 'All', value: 'all' },
                        { label: 'Pending', value: 'pending' },
                        { label: 'In Progress', value: 'in_progress' },
                        { label: 'Done', value: 'done' }
                    ]} className="seg" />
                    <Button type="primary" onClick={onCreate} className="new-btn">New Task</Button>
                </div>
                <TaskList data={filtered} onEdit={onEdit} onDelete={onDelete} />
            </Layout.Content>
            <TaskForm open={open} initial={edit} onCancel={() => { setOpen(false); setEdit(null) }} onSubmit={onSubmit} />
        </Layout>
    )
}
