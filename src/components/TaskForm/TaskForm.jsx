import { useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'


export default function TaskForm({ open, onCancel, onSubmit, initial }) {
    const [form] = Form.useForm()


    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                title: initial?.title || '',
                description: initial?.description || '',
                dueDate: initial?.dueDate ? dayjs(initial.dueDate) : null,
                status: initial?.status || 'pending'
            })
        }
    }, [open, initial, form])


    const handleOk = async () => {
        const v = await form.validateFields()
        onSubmit({ title: v.title.trim(), description: v.description?.trim() || '', dueDate: v.dueDate?.toISOString() || null, status: v.status })
    }


    return (
        <Modal open={open} onCancel={onCancel} onOk={handleOk} title={initial ? 'Edit Task' : 'New Task'} okText={initial ? 'Save' : 'Create'}>
            <Form layout="vertical" form={form}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }, { min: 3, message: 'Min 3 chars' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item name="dueDate" label="Due Date">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Select options={[{ value: 'pending', label: 'Pending' }, { value: 'in_progress', label: 'In Progress' }, { value: 'done', label: 'Done' }]} />
                </Form.Item>
            </Form>
        </Modal>
    )
}